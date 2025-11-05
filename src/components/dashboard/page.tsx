import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const cardItems = [
    {
        title: 'BOOK YOUR CABIN',
        imgSrc: assets.officeChair,
    },
    {
        title: 'MANAGE BOOKINGS',
        imgSrc: assets.manageBookingImg,
    },
    {
        title: 'COMMUNITY',
        imgSrc: assets.communityImg,
    },
    {
        title: 'TESTMYSKILLS.AI',
        imgSrc: assets.skillImg,
    },
    {
        title: 'CABINMATE FRANCHISE ENQUIRY',
        imgSrc: assets.enquiryImg,
    },
    {
        title: 'OTHERS',
        imgSrc: assets.otherImg1,
    },
]

function DashBoardHero() {
    const router = useRouter()
    const handleNavigate = (item: any) => {
        console.log('itme', item)

        if (item?.title === 'BOOK YOUR CABIN') {
            return router.push('/home')
        } else if (item?.title === 'MANAGE BOOKINGS') {
            return router.push('/managebooking')
        } else if (item?.title === 'COMMUNITY') {
            return router.push('/community')
        } else if (item?.title === 'TESTMYSKILLS.AI') {
            return router.push('/testmyskill')
        } else if (item?.title === 'CABINMATE FRANCHISE ENQUIRY') {
            return router.push('/enquiry')
        } else if (item?.title === 'OTHERS') {
            return router.push('/others')
        }
    }
    return (
        <div
            className="flex flex-col lg:items-center justify-center p-6 min-h-screen 2xl:h-screen"
            style={{
                backgroundImage: 'url("/assets/images/For-Web SVG.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                width: '100%',
            }}
        >
            {/* Card Grid */}
            <div className="grid grid-cols-2 w-full max-w-[916px] gap-6 md:my-[96px] mx-auto">
                {cardItems.map((item, index) => (
                    <div
                        key={index}
                        className="shadow-md w-full pt-11 pb-11 cursor-pointer rounded-[12px]
                       bg-[rgba(29,77,59,0.5)] transition-all duration-300
                       hover:scale-105 hover:shadow-2xl hover:bg-green-900/70
                       hover:ring-2 hover:ring-green-400 hover:-translate-y-1"
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
