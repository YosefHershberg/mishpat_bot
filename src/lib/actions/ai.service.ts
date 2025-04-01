'use server';

import gemini from '@/lib/gemini';

export const generateResponse = async (prompt: string) => {
    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    console.log(response.text);
}