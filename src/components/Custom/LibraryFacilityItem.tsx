import React from 'react'
import facilityImages from '@/assets/images/facilities'

const LibraryFacilityItem = ({
    facilites,
    idx,
}: {
    facilites: any
    idx: number
}) => {
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
                <img
                    src={
                        facilityImages[facilites.facility.imageUrl]
                            ? facilityImages[facilites.facility.imageUrl]['src']
                            : '/file.svg'
                    }
                    alt={facilites.facility.name}
                    className="w-15"
                />
                <h2 className="font-bold text-md">{facilites.facility.name}</h2>
            </div>
        </div>
    )
}

export default LibraryFacilityItem
