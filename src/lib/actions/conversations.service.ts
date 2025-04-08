'use server'

import { prisma } from '@/lib/prisma'
import { Message } from 'ai'

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

type initConversationProps = {
    userId: string,
    messages: Pick<Message, 'role' | 'content'>[],
    title: string,
}

export const initConversation = async ({ userId, messages, title }: initConversationProps) => {
    const conversationId = crypto.randomUUID(); 

    await prisma.$transaction([
        prisma.conversation.create({
            data: {
                id: conversationId,
                userId,
                title: title,
            },
        }),
        prisma.message.createMany({
            data: messages.map((message) => ({
                conversationId,
                role: message.role,
                content: message.content,
            })),
        }),
    ])

    return conversationId;
}