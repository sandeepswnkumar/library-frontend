'use client'
import AuthLayout from '@/components/auth/AuthLayout'
import { assets } from '@/assets/assets'
import { useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoginForm } from '@/components/login-form'
import RegisterForm from '@/components/auth/RegisterForm'

function UserLogin() {
    const [activeTab, setActiveTab] = useState('login')
    const bgStyle = useMemo(
        () => ({
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${assets.LoginBg.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }),
        []
    )
    return (
        <div className="relative" style={bgStyle}>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md bg-body p-5 shadow-2xl rounded-sm bg-white">
                    <h1 className="w-full text-center font-bold text-xl my-2">
                        Welcome to MyDesk{' '}
                    </h1>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="w-full">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm setAuthTab={setActiveTab} />
                        </TabsContent>
                        <TabsContent value="register">
                            <RegisterForm setAuthTab={setActiveTab} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
