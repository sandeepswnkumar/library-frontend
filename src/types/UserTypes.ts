// Root API Response
export interface UserApiResponse {
    success: boolean
    status_code: number
    message: string
    data: UserData
}

// User Data wrapper
export interface UserData {
    id: number
    token: string
    userId: number
    createdAt: string
    updatedAt: string
    user: User
}

// Main User object
export interface User {
    id: number
    email: string
    password: string
    roleId: number | null
    phone: string | null
    isActive: boolean
    userTypeId: number
    emailVerifiedAt: string | null
    phoneVerifiedAt: string | null
    rememberToken: string | null
    refreshToken: string
    isMpin: boolean
    isOnboardingCompleted: boolean
    otp: string | null
    otpExpiresAt: string | null
    createdBy: number | null
    updatedBy: number | null
    deletedBy: number | null
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    userDetails: UserDetails
    userType: UserType
}

// User Details
export interface UserDetails {
    id: number
    userId: number
    firstName: string
    middleName: string | null
    lastName: string
    fullName: string
    address1: string | null
    address2: string | null
    cityId: number | null
    stateId: number | null
    countryId: number | null
    pincode: string | null
    avatar: string | null
    createdBy: number | null
    updatedBy: number | null
    deletedBy: number | null
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

// User Type
export interface UserType {
    id: number
    name: string
    createdBy: number | null
    createdAt: string
}
