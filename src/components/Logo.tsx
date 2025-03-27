'use client'

import Link from "next/link"
import Icon from "./ui/svg-icon"
import { useTheme } from "next-themes"
type LogoProps = {
    size?: 'small' | 'medium' | 'large';
};

export function Logo({ size = 'medium' }: LogoProps) {
    // Define sizes for the icon and text based on the size prop
    const iconSize = {
        small: 30,
        medium: 35,
        large: 40,
    }[size];

    const textSize = {
        small: 'text-xl',
        medium: 'text-2xl',
        large: 'text-3xl',
    }[size];

    return (
        <Link href='/' className='flex items-center gap-1 mx-2'>
            <LogoIcon size={iconSize} />
            <h1 className={`${textSize} tracking-tighter`}>
                MishpatBot
            </h1>
        </Link>
    );
}

type LogoIconProps = {
    size?: number,
    className?: string,
}

export function LogoIcon({ size = 30, className }: LogoIconProps) {
    const { theme } = useTheme()

    return (
        <Icon
            src={theme === 'dark' ? '/assets/logo/logo-light.svg' : '/assets/logo/logo-dark.svg'}
            alt='logo'
            width={size}
            height={size}
            className={className}
        />
    )
}