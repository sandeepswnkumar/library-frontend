import { CityType, CountryType, StateType } from '@/types/MiscellaneousType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MiscellaneousState = {
    cities: CityType[]
    states: StateType[]
    country: CountryType[]
}

const initialState: MiscellaneousState = {
    cities: [],
    states: [],
    country: [],
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
    },
})

export const { setCities, setStates, setCountry } = MiscellaneousSlice.actions
export default MiscellaneousSlice.reducer
