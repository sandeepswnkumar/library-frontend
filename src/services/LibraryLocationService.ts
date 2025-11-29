import {
    LibraryLocationCreateType,
    LibraryLocationUpdateType,
} from '@/types/LibraryType'
import AxiosService from './AxiosService'
class LibraryLocationService {
    async createLibraryLocation(libraryData: LibraryLocationCreateType) {
        return await AxiosService.post('library-location', libraryData)
    }
    async getLibraryLocations(data = {}) {
        return await AxiosService.get('library-location', {
            params: data,
        })
    }
    async getLibraryLocationsByLibrary(libraryId?: number) {
        // If backend supports filtering by query param, use it. Otherwise this will return all locations.
        if (typeof libraryId !== 'undefined' && libraryId !== null) {
            return await AxiosService.get('library-location', {
                params: { libraryId },
            })
        }
        return await AxiosService.get('library-location')
    }
    async getLibraryLocation(id: number) {
        return await AxiosService.get(`library-location/${id}`)
    }
    async deleteLibraryLocation(id: string) {
        return await AxiosService.delete(`library-location/${id}`)
    }
    async updateLibraryLocation(
        libraryLocationId: number,
        libraryLocationData: LibraryLocationUpdateType
    ) {
        return await AxiosService.put(
            `library-location/${libraryLocationId}`,
            libraryLocationData
        )
    }

    async deleteLibraryRoomType(roomTypeId: string) {
        return await AxiosService.delete(
            'library-location/room-type/' + roomTypeId
        )
    }
    async deleteLibraryBookingUnit(bookingUnitId: string) {
        return await AxiosService.delete(
            'library-location/booking-unit/' + bookingUnitId
        )
    }
    async deleteLibraryShiftAndPrice(libraryShiftID: string) {
        return await AxiosService.delete(
            'library-shift-price/' + libraryShiftID
        )
    }
}

export default new LibraryLocationService()
