import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import SidebarUserButton from "./SidebarUserButton"
import SidebarCustomHeader from "./SidebarHeader"
import { auth } from "@/lib/auth"
import { type Session } from "next-auth"
import { getUserConversationsById } from "@/lib/actions/conversations.service"
import { groupConversationsByDate } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export async function AppSidebar() {
    const session = await auth()
    const conversations = await getUserConversationsById(session?.user?.id as string)

    // Group conversations by date
    const groupedConversations = groupConversationsByDate(conversations)

    return (
        <Sidebar collapsible="icon">
            <SidebarCustomHeader />
            <SidebarContent>
                {Object.entries(groupedConversations).map(([groupName, groupConversations]) => (
                    <SidebarGroup key={groupName}>
                        <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {groupConversations.map((conversation) => (
                                    <ConversationItem
                                        key={conversation.id}
                                        conversation={conversation}
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarUserButton session={session as Session} />
            </SidebarFooter>
        </Sidebar>
    )
}

function ConversationItem({ conversation }: { conversation: { id: string; title: string } }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <a href={`/chat/${conversation.id}`}>
                            <span>{conversation.title}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </TooltipTrigger>
            <TooltipContent>
                <p>{conversation.title}</p>
            </TooltipContent>
        </Tooltip>
    )
}