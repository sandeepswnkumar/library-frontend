export type AdminLoginType = {
    email: string;
    password: string;
     userType? : number | undefined ;
};
export type UserLoginType = {
    mobile: string;
    pin: number;
    userType? : number | undefined ;
};