import { auth } from '@/lib/auth'
import Image from 'next/image'

export default async function TopNavbar() {
    const session = await auth()
    
    return (
        <nav className="w-full h-16 flex px-4 items-center justify-between">
            <h1 className='text-xl font-bold'>
                MishpatBot
            </h1>
            {session?.user?.image && <Image
                src={session?.user?.image || '/images/default-profile.jpg'}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
            />}
        </nav>
    )
}
