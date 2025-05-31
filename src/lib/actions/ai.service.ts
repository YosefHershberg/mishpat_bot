'use server';

import { gemini } from '@/lib/gemini';

export const generateResponse = async (prompt: string): Promise<string> => {
    try {
        const response = await gemini.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        return response.text as string;
    } catch (error) {
        console.error('Error generating response:', error);
        throw new Error('Failed to generate response');
    }
}