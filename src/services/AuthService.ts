import userTypeEnum from '@/Enums/UserTypeEnum'
import AxiosService from './AxiosService'
import { AdminLoginType, UserLoginType, UserRegister } from '@/types/LoginType'

class AuthService {
    async adminLogin(loginData: AdminLoginType) {
        return await AxiosService.post('auth/admin-login', loginData)
    }
    async userLogin(loginData: UserLoginType) {
        return await AxiosService.post('auth/login', loginData)
    }
    async logOut() {
        return await AxiosService.post('auth/logout')
    }
    async getCurrentUser() {
        return await AxiosService.get('auth/current-user')
    }
    async userRegister(data: UserRegister) {
        return await AxiosService.post('auth/register-user', data)
    }
    async verifyOTP(data: UserRegister) {
        return await AxiosService.post('auth/verify-otp', data)
    }
    async createUserMPIN(data: UserRegister) {
        return await AxiosService.post('auth/create-mpin', data)
    }
}

export default new AuthService()
