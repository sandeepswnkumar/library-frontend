import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const cardItems = [
    {
        title: 'BOOK YOUR CABIN',
        imgSrc: assets.officeChair,
        isDisabled: false,
        url: '/booking/choose-library',
    },
    {
        title: 'MANAGE BOOKINGS',
        imgSrc: assets.manageBookingImg,
        isDisabled: false,
        url: '/booking',
    },
    {
        title: 'COMMUNITY',
        imgSrc: assets.communityImg,
        isDisabled: true,
        url: '/',
    },
    {
        title: 'TESTMYSKILLS.AI',
        imgSrc: assets.skillImg,
        isDisabled: true,
        url: '/',
    },
    {
        title: 'CABINMATE FRANCHISE ENQUIRY',
        imgSrc: assets.enquiryImg,
        isDisabled: true,
        url: '/',
    },
    {
        title: 'OTHERS',
        imgSrc: assets.otherImg1,
        isDisabled: true,
        url: '/',
    },
]

function DashBoardHero() {
    const router = useRouter()
    const handleNavigate = (item: any) => {
        if (item.isDisabled) return null
        return router.push(item.url)
    }
    return (
        <div className="flex flex-col justify-center w-full">
            {/* Card Grid */}
            <div className="grid xl:grid-cols-4 gap-10">
                {cardItems.map((item, index) => (
                    <div
                        key={index}
                        className="shadow-md w-full pt-11 pb-11 cursor-pointer rounded-[12px]
                       bg-purple-950 transition-all duration-300
                       hover:scale-105 hover:shadow-2xl hover:bg-purple-900/95
                       hover:ring-2 hover:ring-purple-800 hover:-translate-y-1"
                        onClick={() => handleNavigate(item)}
                    >
                        <section className="flex flex-col items-center justify-center text-white">
                            <Image
                                src={item.imgSrc}
                                alt={item.title}
                                width={64}
                                height={64}
                                className="mx-auto mb-4"
                            />
                            <p className="font-avenir font-bold text-sm leading-5 tracking-[-0.01em] text-center">
                                {item.title}
                            </p>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashBoardHero
