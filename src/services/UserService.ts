import AxiosService from './AxiosService'

class UserService {
    async updateUser(userId: string, userData: { firstName?: string }) {
        return await AxiosService.put(
            'users/update-profile/' + userId,
            userData
        )
    }
}

export default new UserService()
