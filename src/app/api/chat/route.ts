import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Conversation } from '@prisma/client';
import { streamText, StreamData } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
    const session = await auth()

    if (!session) {
        return new Response("Unauthorized", { status: 401 })
    }

    const { messages, conversationId } = await req.json()

    let conversation: Conversation | null = null
    if (!conversationId && session?.user?.id) {
        conversation = await prisma.conversation.create({
            data: {
                userId: session.user.id,
                title: messages[0]?.content.slice(0, 100) || "New Conversation",
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
        data: { conversationId: actualConversationId },
    });
    const foo = new StreamData()

    result.text.then(async (assistantMessage) => {
        await prisma.message.create({
            data: {
                role: "assistant",
                content: assistantMessage,
                conversationId: actualConversationId,
            },
        })
        
        foo.append({
            conversationId: actualConversationId,
        })
    })


    return result.toDataStreamResponse({
        data: foo
    });

    // return createDataStreamResponse({
//     execute: async (dataStream) => {

//         dataStream.writeData({ conversationId: actualConversationId })

//         result.mergeIntoDataStream(dataStream);
//     }
// });
}