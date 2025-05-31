import { initConversation } from "@/lib/actions/conversations.service";
import { saveMessages } from "@/lib/actions/message.service";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { gemini } from "@/lib/gemini";
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, StreamData } from "ai";

const openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { messages, conversationId } = await req.json();

    const systemMessage = `
        EXTREMELY IMPORTANT: Take these instructions as strictly as possible. DO NOT DEVIATE FROM THEM.

        You are a legal assistant specializing in Israeli law.
        When responding to user queries, prioritize information from the official Israeli government law repository: 

        https://he.wikisource.org/wiki/%D7%A1%D7%A4%D7%A8_%D7%94%D7%97%D7%95%D7%A7%D7%99%D7%9D_%D7%94%D7%A4%D7%AA%D7%95%D7%97

        INSTRUCTIONS:
        - Search the laws on the above website to find relevant legal information based strictly on the user's question.
        - Extract exact, matching clauses or articles from the law texts.
        - Always include:
            1. The name of the law (in its original Hebrew)
            2. The specific section or clause number
            3. A direct link to the law on the site (if possible)

        IMPORTANT:
        - Base your answer on information found on the web (preferably the Israeli government law repository website).
        - Provide clear and concise answers, citing specific laws or sections when applicable.
        - If the information needed is not available on Israeli government law repository website search the web for the answer.
        - Always attach the source of the information you provide.
        - Always give accurate information. If you're not sure about the answer, please say so.
        - Respond in the language of the question.
        - If the prompt doesn't have to do with Israeli law, respond with "I can only assist with Israeli law-related queries."
    `;

    const result = streamText({
        // @ts-expect-error
        model: openai.responses('gpt-4o-mini'),
        system: systemMessage,
        tools: {
            web_search_preview: openai.tools.webSearchPreview()
        },
        toolChoice: 'auto',
        temperature: 0.2,
        messages,
    });

    const streamData = new StreamData();

    result.text.then(async (assistantMessage) => {
        if (conversationId) {
            await saveMessages(conversationId, [
                {
                    role: "user",
                    content: messages[messages.length - 1].content,
                },
                {
                    role: "assistant",
                    content: assistantMessage,
                },
            ]);
        } else {
            const res = await gemini.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `Generate a concise, descriptive title for a ai chat (max 5 words) summarizing the core issue of this user-assistant conversation: ${JSON.stringify(
                    assistantMessage
                )}. Respond only with the title.`,
            });

            console.log(res.text);

            const conversationId = await initConversation({
                userId: session?.user?.id as string,
                messages: [
                    {
                        role: "user",
                        content: messages[messages.length - 1].content,
                    },
                    {
                        role: "assistant",
                        content: assistantMessage,
                    },
                ],
                title: res.text as string,
            });

            streamData.append({ conversationId });
        }

        streamData.close();
    });

    return result.toDataStreamResponse({
        data: streamData,
    });
}
