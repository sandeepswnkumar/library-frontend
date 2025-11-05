import { LibraryLocation } from "./LibraryLocation"

export type LibraryCreateType = {
    libraryName: string
    diamension?: string
    floor?: number
    capacity?: number
    statusId: number | string
    typeId: number | string
}

export type LibraryUpdateType = {
    libraryName?: string
    diamension?: string
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
    fa
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
    libraryName: string
    name: string
    description?: string
    imageUrl?: string
}


export type libarayTypeType = { id: number; name: string; color: string }
export type libarayStatusType = { id: number; name: string; color: string }
