'use client'

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import AuthService from '@/services/AuthService'
import { useRouter } from 'next/navigation'

type UserDetails = {
    id: number
    avatar: string | null
    fullName: string
    firstName: string
    middleName?: string | null
    lastName: string
    address1?: string | null
}

type AppUser = {
    id: number
    email: string
    isOnboardingCompleted?: boolean
    userTypeId?: number
    userType?: {
        id: number
        name: string
        createdBy: string | null
        createdAt: string
    }
    userDetails: UserDetails
}

export function NavUser({ user }: { user: AppUser }) {
    const router = useRouter()
    const { isMobile } = useSidebar()

    console.log('user', user)

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-purple-700 hover:bg-purple-700 hover:text-white cursor-pointer data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user?.user?.userDetails?.avatar || ''}
                                    alt={user?.user?.userDetails?.fullName}
                                />
                                <AvatarFallback className="rounded-lg text-purple-900 font-bold">
                                    {(user?.user?.userDetails?.firstName || '')
                                        .charAt(0)
                                        .toUpperCase() +
                                        (
                                            user?.user?.userDetails?.lastName ||
                                            ''
                                        )
                                            .charAt(0)
                                            .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {user?.user?.userDetails?.fullName}
                                </span>
                                <span className="truncate text-xs">
                                    {user?.user?.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={
                                            user?.user?.userDetails?.avatar ||
                                            ''
                                        }
                                        alt={user?.user?.userDetails?.fullName}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {(
                                            user?.user?.userDetails
                                                ?.firstName || ''
                                        )
                                            .charAt(0)
                                            .toUpperCase() +
                                            (
                                                user?.user?.userDetails
                                                    ?.lastName || ''
                                            )
                                                .charAt(0)
                                                .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user?.user?.userDetails?.fullName}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user?.user?.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={async () => {
                                const res = await AuthService.logOut()

                                if (res.data.success) {
                                    localStorage.clear()
                                    router.push('/admin/login')
                                }
                            }}
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
