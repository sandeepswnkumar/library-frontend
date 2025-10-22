import { libarayStatusType, libarayTypeType } from '@/types/LibraryType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LibraryState = {
    status: libarayTypeType[]
    types: libarayStatusType[]
}

const initialState: LibraryState = {
    status: [],
    types: [],
}

const LibararySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setLibraryStatus(state, action: PayloadAction<libarayStatusType[]>) {
            state.status = [...state.status, ...action.payload]
        },
        setLibraryType(state, action: PayloadAction<libarayTypeType[]>) {
            state.types = [...state.types, ...action.payload]
        },
    },
})

export const { setLibraryStatus, setLibraryType } = LibararySlice.actions
export default LibararySlice.reducer
