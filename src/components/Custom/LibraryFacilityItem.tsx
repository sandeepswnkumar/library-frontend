import React from 'react'
import facilityImages from '@/assets/images/facilities'
import Image from 'next/image'

const LibraryFacilityItem = ({
    facilites,
    idx,
}: {
    facilites: any
    idx: number
}) => {
    const imageKey = facilites.facility.imageUrl as keyof typeof facilityImages

    return (
        <div
            key={facilites.id ?? idx}
            className="border p-3  rounded-md box-border flex flex-wrap justify-center flex-col"
        >
            {/* <div className="flex gap-2 justify-end items-center">
                                                    <Trash2
                                                        size={20}
                                                        className="text-purple-800 cursor-pointer"
                                                    />
                                                </div> */}
            <div className="flex flex-col justify-evenly items-center">
                {/* <img
                    src={
                        facilityImages[facilites.facility.imageUrl]
                            ? facilityImages[facilites.facility.imageUrl]['src']
                            : '/file.svg'
                    }
                    alt={facilites.facility.name}
                    className="w-15"
                /> */}
                <Image
                    src={
                        facilityImages[imageKey]
                            ? facilityImages[imageKey].src
                            : '/file.svg'
                    }
                    alt={facilites.facility.name}
                    width={60}
                    height={60}
                />
                <h2 className="font-bold text-md">{facilites.facility.name}</h2>
            </div>
        </div>
    )
}

export default LibraryFacilityItem
