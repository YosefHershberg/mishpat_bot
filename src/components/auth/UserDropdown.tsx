'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { LogOut } from "lucide-react";
import { Logo } from "@/components//Logo";
import { logout } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";

export function UserDropdown({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
               {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                    className="min-w-72 mx-4"
                >
                    <div className="flex gap-4 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Image
                            src={session?.user?.image as string}
                            alt={session?.user?.name as string}
                            width={40}
                            height={40}
                            className="rounded-full object-cover size-10"
                        />
                        <div className="flex flex-col justify-evenly">
                            <span className="font-bold">{session?.user?.name}</span>
                            <span>{session?.user?.email}</span>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex items-center gap-4"
                        onClick={logout}
                    >
                        <LogOut className='size-5' />
                        Sign out
                    </DropdownMenuItem>
                  
                    <DropdownMenuSeparator />
                    <footer className="flex justify-center gap-4 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Logo />
                    </footer>
                </DropdownMenuContent>
        </DropdownMenu>
    )
}
