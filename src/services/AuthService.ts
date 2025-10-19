import userTypeEnum from '@/Enums/UserTypeEnum'
import AxiosService from './AxiosService'
import { AdminLoginType, UserLoginType } from '@/types/LoginType'

class AuthService {
    async adminLogin(loginData: AdminLoginType) {
        loginData['userType'] = userTypeEnum.ADMIN
        return await AxiosService.post('auth/login', loginData)
    }
    async userLogin(loginData: UserLoginType) {
        loginData['userType'] = userTypeEnum.USER
        return await AxiosService.post('/login', loginData)
    }
    async getCurrentUser() {
        return await AxiosService.get('auth/current-user')
    }
}

export default new AuthService
