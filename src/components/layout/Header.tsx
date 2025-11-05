'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function Header() {
    const router = useRouter()

    return (
        <header className="border-b bg-background sticky top-0 z-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-xl">
                        <p>Next Js 15 </p>
                    </Link>
                    {/* <nav className="flex items-center gap-5 font-medium">
						{navItems.map((itme) => (
							<Link key={itme.href} href={itme.href}>
								{itme.label}
							</Link>
						))}
					</nav> */}
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:block">
                        {/* This space for theme */}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            className="cursor-pointer"
                            onClick={() => router.push('/auth')}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
