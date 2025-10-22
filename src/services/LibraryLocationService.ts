import {
    LibraryLocationCreateType,
    LibraryLocationUpdateType,
} from '@/types/LibraryType'
import AxiosService from './AxiosService'
class LibraryLocationService {
    async createLibraryLocation(libraryData: LibraryLocationCreateType) {
        return await AxiosService.post('library-location', libraryData)
    }
    async getLibraryLocations() {
        return await AxiosService.get('library-location')
    }
    async getLibraryLocation(id:number) {
        return await AxiosService.get(`library-location/${id}`)
    }
    async deleteLibraryLocation(id: string) {
        return await AxiosService.delete(`library-location/${id}`)
    }
    async updateLibraryLocation(
        libraryLocationId: number,
        libraryLocationData: LibraryLocationUpdateType
    ) {
        return await AxiosService.put(`library-location/${libraryLocationId}`, libraryLocationData)
    }
}

export default new LibraryLocationService()
