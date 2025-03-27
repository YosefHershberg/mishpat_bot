'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, MessageSquarePlus, Search, Settings } from "lucide-react"
import { Logo, LogoIcon } from "@/components/Logo"
import SidebarUserDropdown from "./SidebarUserButton"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

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

export function AppSidebar() {
    const { state } = useSidebar()
    const open = state === "expanded"

    return (
        <Sidebar collapsible="icon" className="py-1.5">
            <SidebarHeader className={cn('flex flex-col items-center', open && 'gap-5')}>
                <div className={cn(
                    "w-full flex items-center",
                    open ? 'justify-between flex-row' : 'justify-center items-center flex-col gap-6 my-3'
                )}>
                    {open ? <Logo size='small' /> : <LogoIcon size={35} />}
                    <SidebarTrigger />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        'size-10',
                        open ? 'w-full' : 'aspect-square'
                    )}
                >
                    <MessageSquarePlus />
                    <p className={open ? 'block' : 'hidden'}>New Chat</p>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    {open && <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarUserDropdown />
            </SidebarFooter>
        </Sidebar>
    )
}
