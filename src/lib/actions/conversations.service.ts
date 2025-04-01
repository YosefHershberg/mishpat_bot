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
