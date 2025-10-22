import AxiosService from './AxiosService'

class MiscellaneousService {
    async getCities() {
        return await AxiosService.get('misc/cities')
    }
    async getStates() {
        return await AxiosService.get('misc/states')
    }
    async getCountry() {
        return await AxiosService.get('misc/country')
    }
}

export default new MiscellaneousService()
