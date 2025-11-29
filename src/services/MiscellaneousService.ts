import AxiosService from './AxiosService'

class MiscellaneousService {
    async getCities(data = {}) {
        return await AxiosService.get('misc/cities', {
            params: data,
        })
    }
    async getStates(data = {}) {
        return await AxiosService.get('misc/states', {
            params: data,
        })
    }
    async getCountry(data = {}) {
        return await AxiosService.get('misc/country', {
            params: data,
        })
    }
    async getRoomType(data = {}) {
        return await AxiosService.get('misc/roomType', {
            params: data,
        })
    }
    async getBookingUnit(data = {}) {
        return await AxiosService.get('misc/bookingUnit', {
            params: data,
        })
    }
    async getFacilites(data = {}) {
        return await AxiosService.get('misc/facilities', {
            params: data,
        })
    }
}

export default new MiscellaneousService()
