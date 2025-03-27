'use client'

import { useSession } from 'next-auth/react'
import { UserDropdown } from '../auth/UserDropdown'
import LoadingSpinner from "../ui/LoadingSpinner";
import { Logo } from '../Logo'
import Image from 'next/image'
import ThemeButton from '../ThemeButton'

export default function Navbar() {
    const { data: session, status } = useSession()

    return (
        <nav
            className='flex items-center justify-between h-14 px-8 relative w-screen z-100'
            role='navigation'
        >
            <Logo />

            <div className='flex items-center gap-4'>
                <ThemeButton />

                {status === 'loading' ?
                    <LoadingSpinner
                        className='size-10'
                    /> :
                    session && (
                        <UserDropdown>
                            <Image
                                src={session?.user?.image as string}
                                alt='user-avatar'
                                width={33}
                                height={33}
                                className='rounded-full cursor-pointer'
                            />
                        </UserDropdown>
                    )
                }
            </div>
        </nav>
    )
}