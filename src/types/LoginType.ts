export type AdminLoginType = {
    email: string
    password: string
}
export type UserLoginType = {
    phone: number | string
    mpin: number | string
}

export type UserRegister = {
    phone: number | string
    otp?: number | string
    mpin?: number | string
    confirmMpin?: number | string
}
