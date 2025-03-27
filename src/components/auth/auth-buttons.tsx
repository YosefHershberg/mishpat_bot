"use client"

import { useEffect, useState } from "react"
import { signIn, signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { useParams, useSearchParams } from "next/navigation"

type AuthButtonProps = {
    children: React.ReactNode,
    className?: string,
}

// This gets the the redirect from the url params. use wisely.

export function SignInButton({
    children, className
}: AuthButtonProps) {
    const redirect = useSearchParams().get('redirect');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log(redirect);
    }, [redirect]);

    const handleSignIn = async () => {
        setIsLoading(true)
        try {
            await signIn("google", { callbackUrl: redirect ?? '/' })
        } catch (error) {
            console.error("Sign in error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? "Signing in..." : children}
        </Button>
    )
}

export function SignOutButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSignOut = async () => {
        setIsLoading(true)
        try {
            await signOut({ callbackUrl: "/" })
        } catch (error) {
            console.error("Sign out error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleSignOut}
            disabled={isLoading}
        >
            {isLoading ? "Signing out..." : "Sign out"}
        </Button>
    )
}