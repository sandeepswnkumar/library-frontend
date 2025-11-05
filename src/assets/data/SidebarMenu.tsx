import { LayoutDashboard } from 'lucide-react'
import { Home } from 'lucide-react'
import { BookCopy } from 'lucide-react'
import { UserRound } from 'lucide-react'
import { MapPinHouse } from 'lucide-react'
import { CalendarDays } from 'lucide-react'

export const SidebarMenu = [
    {
        id: '',
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
        isActive: false,
        items: [],
    },
    {
        id: '',
        title: 'Home',
        url: '/home',
        icon: Home,
        isActive: false,
        items: [],
    },
    {
        id: '',
        title: 'Library',
        url: '/library',
        icon: BookCopy,
        isActive: false,
        items: [],
    },
    {
        id: '',
        title: 'Library Location',
        url: '/library-location',
        icon: MapPinHouse,
        isActive: false,
        items: [],
    },
    {
        id: '',
        title: 'User',
        url: '/users',
        icon: UserRound,
        isActive: false,
        items: [],
    },
    {
        id: '',
        title: 'Booking',
        url: '/booking',
        icon: CalendarDays,
        isActive: false,
        items: [],
    },
]
