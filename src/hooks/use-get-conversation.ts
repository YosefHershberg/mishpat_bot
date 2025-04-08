import { getConversation } from "@/lib/actions/conversations.service"
import { useServerAction } from "./use-server-action";


export function useGetConversation(conversationId?: string) {
    const { data: conversation, isLoading } = useServerAction(getConversation, {
        executeImmediately: !!conversationId,
        initialArgs: [conversationId as string],
    });

    return {
        conversation,
        isLoading,
    };
}