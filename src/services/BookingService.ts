import { BookingCreateType } from '@/types/BookingType'
import AxiosService from './AxiosService'
class BookingService {
    async createBooking(bookingData: BookingCreateType) {
        return await AxiosService.post('booking', bookingData)
    }
    async getBookings() {
        return await AxiosService.get('booking')
    }
    async getBooking(id: string) {
        return await AxiosService.get('booking/' + id)
    }
    async updateBooking(id: string, updateBookingData: BookingCreateType) {
        return await AxiosService.put('booking/' + id, updateBookingData)
    }
    async deleteBooking(id: string) {
        return await AxiosService.delete('booking/' + id)
    }
}

export default new BookingService()
