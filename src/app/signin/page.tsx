import Icon from '@/components/ui/svg-icon'
import React from 'react'
import { SignInButton } from '@/components/auth/auth-buttons'
import Navbar from '@/components/nav/Navbar'

export default async function Signin() {

    return (
        <main className='flex-1 flex flex-col items-center justify-center'>
            <Navbar />
            <section className='flex-1 flex flex-col items-center justify-between bg-secondary my-10 p-10 pb-[10rem] rounded-xl max-w-[30rem] w-full'>
                <h1 className='text-4xl text-center mt-4'>Signin to MishpatBot</h1>
                <p className='text-balance text-center mx-5 text-lg'>
                    Sign in easily with your google account to ensure a secure and personalized authentication.
                </p>
                <SignInButton
                    className='h-14 rounded-full px-10 transition-all duration-200 hover:scale-105'
                >
                    Sign in with google
                    <Icon
                        src='/assets/icons/google-logo.svg'
                        alt='google-icon'
                        width={20}
                        height={20}
                        className='ml-2'
                    />
                </SignInButton>
            </section>
        </main>
    )
}
