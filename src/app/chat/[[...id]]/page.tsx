import { AppSidebar } from "@/components/sidebar/AppSidebar";
import Chat from "@/components/chat";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getConversationById } from "@/lib/actions/conversations.service";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

type ChatLayoutProps = {
    params: Promise<{ id?: string[] }>
}

export default async function ChatLayout({ params }: ChatLayoutProps) {
    const session = await auth()
    const { id } = await params ?? {};
    const conversation = id?.[0] ? await getConversationById(id[0]) : null;

    return (
        <SidebarProvider>
            <SidebarTrigger className="sm:hidden flex absolute top-0 left-0 m-2" />
            <AppSidebar />
            <Chat 
                session={session as Session}
                conversationTitle={conversation?.title}
                initialMessages={conversation?.messages as any[] ?? null}
            />
        </SidebarProvider>
    )
}