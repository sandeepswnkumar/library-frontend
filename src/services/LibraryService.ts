import {
    LibraryBookingType,
    LibraryCreateType,
    LibraryFacilitiesType,
    LibraryRoomType,
    LibraryShiftAndPriceType,
    LibraryUpdateType,
} from '@/types/LibraryType'
import AxiosService from './AxiosService'
class LibraryService {
    async createLibrary(libraryData: LibraryCreateType) {
        return await AxiosService.post('library', libraryData)
    }
    async getLibraries(data = {}) {
        return await AxiosService.get('library', { params: data })
    }
    async getLibrary(id: string) {
        return await AxiosService.get(`library/${id}`)
    }
    async deleteLibrary(id: string) {
        return await AxiosService.delete(`library/${id}`)
    }
    async updateLibrary(libraryId: string, libraryData: LibraryUpdateType) {
        return await AxiosService.put(`library/${libraryId}`, libraryData)
    }

    async getLibraryStatus(data = {}) {
        return await AxiosService.get('library/library-status')
    }
    async getLibraryType(data = {}) {
        return await AxiosService.get('library/library-type')
    }
    async getLibraryFacilities(data = {}) {
        return await AxiosService.get('library-facility')
    }
    async createLibraryFacility(value: LibraryFacilitiesType) {
        return await AxiosService.post('library-facility', value)
    }
    async createLibraryRoomType(value: LibraryRoomType) {
        return await AxiosService.post('library-location/room-type', value)
    }
    async getLibraryRoomType() {
        return await AxiosService.get('library-location/room-type')
    }
    async createLibraryBookingUnit(value: LibraryBookingType) {
        return await AxiosService.post('library-location/booking-unit', value)
    }
    async getLibraryBookingUnit() {
        return await AxiosService.get('library-location/booking-unit')
    }
    async createLibraryShiftAndPrice(value: LibraryShiftAndPriceType) {
        return await AxiosService.post('library-shift-price', value)
    }
    async getLibraryShiftAndPrice() {
        return await AxiosService.get('library-shift-price')
    }
}

export default new LibraryService()
