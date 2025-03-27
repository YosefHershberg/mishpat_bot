'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

function ThemeButton() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            size='icon'
            className='bg-transparent'
            variant='outline'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ?
                <Sun />
                :
                <Moon />
            }
        </Button>

    )
}

export default ThemeButton