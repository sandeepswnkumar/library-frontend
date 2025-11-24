import {
    BookingUnit,
    CityType,
    CountryType,
    facilities,
    RoomType,
    StateType,
} from '@/types/MiscellaneousType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MiscellaneousState = {
    cities: CityType[]
    states: StateType[]
    country: CountryType[]
    roomType: RoomType[]
    bookingUnit: BookingUnit[]
    facilities: facilities[]
}

const initialState: MiscellaneousState = {
    cities: [],
    states: [],
    country: [],
    roomType: [],
    bookingUnit: [],
    facilities: [],
}

const MiscellaneousSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setCities(state, action: PayloadAction<CityType[]>) {
            state.cities = [...state.cities, ...action.payload]
        },
        setStates(state, action: PayloadAction<StateType[]>) {
            state.states = [...state.states, ...action.payload]
        },
        setCountry(state, action: PayloadAction<CountryType[]>) {
            state.country = [...state.country, ...action.payload]
        },
        setRoomType(state, action: PayloadAction<RoomType[]>) {
            state.roomType = [...state.roomType, ...action.payload]
        },
        setBookingUnit(state, action: PayloadAction<BookingUnit[]>) {
            state.bookingUnit = [...state.bookingUnit, ...action.payload]
        },
        setFacilities(state, action: PayloadAction<facilities[]>) {
            state.facilities = [...state.facilities, ...action.payload]
        },
    },
})

export const {
    setCities,
    setStates,
    setCountry,
    setRoomType,
    setBookingUnit,
    setFacilities,
} = MiscellaneousSlice.actions
export default MiscellaneousSlice.reducer
