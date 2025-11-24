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
    async getRoomType() {
        return await AxiosService.get('misc/roomType')
    }
    async getBookingUnit() {
        return await AxiosService.get('misc/bookingUnit')
    }
    async getFacilites() {
        return await AxiosService.get('misc/facilities')
    }
}

export default new MiscellaneousService()
