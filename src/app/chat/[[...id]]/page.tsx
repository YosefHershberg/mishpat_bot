import { AppSidebar } from "@/components/sidebar/AppSidebar";
import ChatDemo from "@/components/chat-demo";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function ChatLayout({
    params,
}: {
    params: Promise<{ id?: string[] }>
}) {
    const { id } = await params ?? {};

    console.log(id);

    return (
        <SidebarProvider>
            <SidebarTrigger className="sm:hidden flex absolute top-0 left-0 m-2" />
            <AppSidebar />
            <ChatDemo />
        </SidebarProvider>
    )
}