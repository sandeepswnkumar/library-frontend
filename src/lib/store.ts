import { configureStore } from '@reduxjs/toolkit'
import AuthSliceReduder from './features/auth/AuthSlice'
import LibrarySliceReducer from './features/libarary/librarySlice'
import MiscellaneousSliceReducer from './features/MiscellaneousSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: AuthSliceReduder,
            library: LibrarySliceReducer,
            misc: MiscellaneousSliceReducer 
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
