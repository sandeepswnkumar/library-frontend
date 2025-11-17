import { CityType, CountryType, RoomType, StateType } from '@/types/MiscellaneousType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MiscellaneousState = {
    cities: CityType[]
    states: StateType[]
    country: CountryType[]
    roomType: RoomType[]
}

const initialState: MiscellaneousState = {
    cities: [],
    states: [],
    country: [],
    roomType: [],
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
        setRoomType(state, action: PayloadAction<CountryType[]>) {
            state.roomType = [...state.roomType, ...action.payload]
        },
    },
})

export const { setCities, setStates, setCountry, setRoomType } = MiscellaneousSlice.actions
export default MiscellaneousSlice.reducer
