'use server'

import { prisma } from '@/lib/prisma'
import { Message } from 'ai'

export const saveMessages = async (conversationId: string, messages: Pick<Message, 'role' | 'content'>[]) => {
    await prisma.message.createMany({
        data: messages.map((message) => ({
            conversationId,
            role: message.role,
            content: message.content,
        })),
    })
}