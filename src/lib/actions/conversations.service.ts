'use server'

import { prisma } from '@/lib/prisma'

export const getConversationById = async (id: string) => {
    const conversation = await prisma.conversation.findUnique({
        where: {
            id,
        },
        include: {
            messages: true,
        },
    })

    return conversation
}

export const getUserConversationsById = async (userId: string) => {
    const conversations = await prisma.conversation.findMany({
        where: {
            userId,
        },
    })

    return conversations
}
