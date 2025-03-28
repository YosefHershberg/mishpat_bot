'use client'

import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useSidebar } from '@/components/ui/sidebar'
import { UserDropdown } from '@/components/auth/UserDropdown'
import type { Session } from 'next-auth'


export default function SidebarUserButton({ session }: { session: Session }) {
  const { open } = useSidebar()

  const classNames = open ?
    'p-2 h-fit flex items-center justify-start gap-4 w-full' :
    'rounded-full h-10 w-10 flex items-center justify-center'

  return (
    <UserDropdown session={session as Session}>
      <Button
        variant='ghost'
        size={open ? 'default' : 'icon'}
        className={classNames}
      >
        <Image
          src={session?.user?.image || '/images/avatar-placeholder.png'}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        {open && <p>My Profile</p>}
      </Button>
    </UserDropdown>
  )
}
