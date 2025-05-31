import Icon from '@/components/ui/svg-icon'
import React from 'react'
import { SignInButton } from '@/components/auth/auth-buttons'
import Navbar from '@/components/nav/Navbar'
import { LogoIcon } from '@/components/Logo'
import { GraduationCap, Lock, Shield } from 'lucide-react'

export default async function Signin() {
    return (
        <main className='flex-1 flex flex-col items-center min-h-[100dvh] relative'>
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,100,0.1),transparent_40%)]"></div>
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_70%,rgba(100,0,100,0.08),transparent_50%)]"></div>
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_30%,rgba(30,30,100,0.06)_70%)]"></div>
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>
            
            <Navbar />
            <div className='flex-1 flex flex-col items-center justify-center w-full px-4 py-12'>
                <div className='max-w-md w-full'>
                    {/* Auth card */}
                    <div className='bg-card/80 backdrop-blur-sm border shadow-lg rounded-xl overflow-hidden'>
                        {/* Card header with logo */}
                        <div className='bg-primary/10 px-6 py-8 flex flex-col items-center'>
                            <div className='bg-background size-20 rounded-full flex items-center justify-center shadow-sm mb-5'>
                                <LogoIcon size={40} className='animate-pulse' />
                            </div>
                            <h1 className='text-3xl font-bold text-center'>
                                Welcome to MishpatBot
                            </h1>
                            <p className='text-balance text-center mt-3 text-muted-foreground'>
                                Sign in to access personalized legal assistance
                            </p>
                        </div>
                        
                        {/* Card body */}
                        <div className='p-6 flex flex-col items-center'>
                            <SignInButton
                                className='h-12 w-full max-w-xs rounded-full transition-all duration-300 hover:shadow-md font-medium'
                            >
                                Sign in with Google
                                <Icon
                                    src='/assets/icons/google-logo.svg'
                                    alt='google-icon'
                                    width={20}
                                    height={20}
                                    className='ml-2'
                                />
                            </SignInButton>

                            {/* Features section */}
                            <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full'>
                                <div className='flex flex-col items-center text-center'>
                                    <div className='bg-primary/10 p-2 rounded-full mb-3'>
                                        <Shield className='size-5 text-primary' />
                                    </div>
                                    <h3 className='font-medium text-sm'>Secure Access</h3>
                                </div>
                                <div className='flex flex-col items-center text-center'>
                                    <div className='bg-primary/10 p-2 rounded-full mb-3'>
                                        <Lock className='size-5 text-primary' />
                                    </div>
                                    <h3 className='font-medium text-sm'>Privacy Protected</h3>
                                </div>
                                <div className='flex flex-col items-center text-center'>
                                    <div className='bg-primary/10 p-2 rounded-full mb-3'>
                                        <GraduationCap className='size-5 text-primary' />
                                    </div>
                                    <h3 className='font-medium text-sm'>Expert Knowledge</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
