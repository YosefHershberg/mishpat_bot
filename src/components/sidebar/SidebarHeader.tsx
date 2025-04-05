'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { MessageSquarePlus } from "lucide-react"
import { SidebarHeader, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Logo, LogoIcon } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function SidebarCustomHeader() {
    const { state } = useSidebar()
    const open = state === "expanded"

    return (
        <SidebarHeader className={cn('flex flex-col items-center', open && 'gap-5')}>
            <div className={cn(
                "w-full flex items-center",
                open ? 'justify-between flex-row' : 'justify-center items-center flex-col gap-6 my-3'
            )}>
                {open ? <Logo size='small' /> : <LogoIcon size={35} />}
                <SidebarTrigger />
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            'size-10',
                            open ? 'w-full' : 'aspect-square'
                        )}
                        asChild
                    >
                        <Link href="/chat">
                            <MessageSquarePlus />
                            <p className={open ? 'block' : 'hidden'}>New Chat</p>
                        </Link>
                    </Button>

                </TooltipTrigger>
                <TooltipContent>
                    <p>Start New Chat</p>
                </TooltipContent>
            </Tooltip>

        </SidebarHeader>
    )
}
