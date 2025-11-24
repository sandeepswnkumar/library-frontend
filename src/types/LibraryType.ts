import { LibraryLocation } from "./LibraryLocation"

export type LibraryCreateType = {
    libraryName: string
    dimension?: number
    floor?: number
    capacity?: number
    statusId: number | string
    typeId: number | string
}

export type LibraryUpdateType = {
    libraryName?: string
    dimension?: string
    floor?: string
    capacity?: string
    statusId?: number | string
    typeId?: number | string
}

export type Library = {
    id:number
    libraryName: string
    libraryId: number
    locationName: string
    email: string
    phone: string
    address1: string
    address2?: string
    cityId: number
    stateId: number
    countryId: number
    pincode: string
    latitude?: string
    longitude?: string
    mapUrl?: string
    isActive?:boolean
    locations : LibraryLocation
}

export type LibraryLocationCreateType = {
    libraryName: string
    libraryId: number
    locationName: string
    email: string
    phone: string
    address1: string
    address2?: string
    cityId: number
    stateId: number
    countryId: number
    pincode: string
    latitude?: string
    longitude?: string
    mapUrl?: string
    isActive?:boolean
}
export type LibraryLocationUpdateType = {
    libraryName?: string
    libraryId?: number
    locationName?: string
    email?: string
    phone?: string
    address1?: string
    address2?: string
    cityId?: number
    stateId?: number
    countryId?: number
    pincode?: string
    latitude?: string
    longitude?: string
    mapUrl?: string
    isActive?:boolean
}

export type LibraryFacilitiesType = {
    libraryId: number
    libraryLocationId: number
    facilityId: number
    description?: string
}
export type LibraryRoomType = {
    libraryId: number
    libraryLocationId: number
    roomType: string
}
export type LibraryBookingType = {
    libraryId: number
    libraryLocationId: number
    bookingUnit: string
}
export type LibraryShiftAndPriceType = {
    libraryId: number;
    libraryLocationId: number;
    libraryRoomTypeId: number;
    libraryBookingUnitId: number;
    period: string;
    startTime: string;
    endTime: string;
    rate: number;
};


export type libarayTypeType = { id: number; name: string; color: string }
export type libarayStatusType = { id: number; name: string; color: string }
