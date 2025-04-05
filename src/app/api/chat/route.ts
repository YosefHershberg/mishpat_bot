import { auth } from '@/lib/auth';
import { env } from '@/lib/env';
import gemini from '@/lib/gemini';
import { prisma } from '@/lib/prisma';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Conversation } from '@prisma/client';
import { streamText, StreamData } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_API_KEY,
});

export async function POST(req: Request, res: Response) {
    const session = await auth()

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    const { messages, conversationId } = await req.json()

    let conversation: Conversation | null = null
    if (!conversationId) {
        conversation = await prisma.conversation.create({
            data: {
                userId: session.user.id,
                title: "New Conversation",
            },
        })
    }

    const actualConversationId = conversationId || conversation?.id

    // Add the conversation ID to the stream data
    await prisma.message.create({
        data: {
            conversationId: actualConversationId,
            content: messages[messages.length - 1].content,
            role: "user",
        },
    })

    const result = streamText({
        //@ts-expect-error googleGenerativeAI is not yet typed
        model: google('gemini-2.0-flash-001'),
        messages,
    });

    const streamData = new StreamData()

    result.text.then(async (assistantMessage) => {
        await prisma.message.create({
            data: {
                role: "assistant",
                content: assistantMessage,
                conversationId: actualConversationId,
            },
        })
        
        prisma.conversation.findUnique({
            where: {
                id: actualConversationId,
            },
        }).then(async (conversation) => {
            if (conversation?.title === 'New Conversation') {
                const res = await gemini.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: `Generate a concise, descriptive title for a ai chat (max 5 words) summarizing the core issue of this user-assistant conversation: ${JSON.stringify(assistantMessage)}. Respond only with the title.`,
                });
                console.log(res.text);
                prisma.conversation.update({
                    where: {
                        id: actualConversationId,
                    },
                    data: {
                        title: res.text,
                    },
                }).then((conversation) => {
                    streamData.append({
                        conversationId: conversation.id,
                    })
                }).then(() => {
                    streamData.close()
                })
            } else {
                streamData.close()
            }
        })
    })


    return result.toDataStreamResponse({
        data: streamData
    });

    // return createDataStreamResponse({
    //     execute: async (dataStream) => {

    //         dataStream.writeData({ conversationId: actualConversationId })

    //         result.mergeIntoDataStream(dataStream);
    //     }
    // });
}