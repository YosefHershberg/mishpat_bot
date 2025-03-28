import { UserDropdown } from '../auth/UserDropdown'
import { Logo } from '../Logo'
import Image from 'next/image'
import ThemeButton from '../ThemeButton'
import { auth } from '@/lib/auth';

export default async function Navbar() {
    const session = await auth()

    return (
        <nav
            className='flex items-center justify-between h-14 px-8 relative w-screen z-100'
            role='navigation'
        >
            <Logo />

            <div className='flex items-center gap-4'>
                <ThemeButton />

                {session?.user && (
                        <UserDropdown session={session}>
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