import {
    LibraryCreateType,
    LibraryFacilitiesType,
    LibraryUpdateType,
} from '@/types/LibraryType'
import AxiosService from './AxiosService'
class LibraryService {
    async createLibrary(libraryData: LibraryCreateType) {
        return await AxiosService.post('library', libraryData)
    }
    async getLibraries() {
        return await AxiosService.get('library')
    }
    async getLibrary(id: string) {
        return await AxiosService.get(`library/${id}`)
    }
    async deleteLibrary(id: string) {
        return await AxiosService.delete(`library/${id}`)
    }
    async updateLibrary(libraryId: number, libraryData: LibraryUpdateType) {
        return await AxiosService.put(`library/${libraryId}`, libraryData)
    }

    async getLibraryStatus() {
        return await AxiosService.get('library/library-status')
    }
    async getLibraryType() {
        return await AxiosService.get('library/library-type')
    }
    async getLibraryFacilities() {
        return await AxiosService.get('library-facility')
    }
    async createLibraryFacility(value: LibraryFacilitiesType) {
        return await AxiosService.post('library-facility', value)
    }
}

export default new LibraryService()
