import { initConversation } from '@/lib/actions/conversations.service';
import { saveMessages } from '@/lib/actions/message.service';
import { auth } from '@/lib/auth';
import { env } from '@/lib/env';
import gemini from '@/lib/gemini';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, StreamData } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
    const session = await auth()

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    const { messages, conversationId } = await req.json()

    const streamData = new StreamData()

    const result = streamText({
        //@ts-expect-error googleGenerativeAI is not yet typed
        model: google('gemini-2.0-flash-001'),
        messages,
    });

    result.text.then(async (assistantMessage) => {

        if (conversationId) {
            await saveMessages(conversationId, [
                {
                    role: 'user',
                    content: messages[messages.length - 1].content,
                },
                {
                    role: 'assistant',
                    content: assistantMessage,
                },
            ]);
        } else {
            const res = await gemini.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `Generate a concise, descriptive title for a ai chat (max 5 words) summarizing the core issue of this user-assistant conversation: ${JSON.stringify(assistantMessage)}. Respond only with the title.`,
            });

            const conversationId = await initConversation({
                userId: session?.user?.id as string,
                messages: [
                    {
                        role: 'user',
                        content: messages[messages.length - 1].content,
                    },
                    {
                        role: 'assistant',
                        content: assistantMessage,
                    },
                ],
                title: res.text as string,
            })

            streamData.append({ conversationId })
        }
        streamData.close();
    })

    return result.toDataStreamResponse({
        data: streamData
    });
}