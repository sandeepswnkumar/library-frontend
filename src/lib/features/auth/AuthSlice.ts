import { UserData } from '@/types/UserTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
    currentUser: UserData | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserData | null>) {
            state.currentUser = action.payload
            state.isAuthenticated = !!action.payload
        },
    },
})

export const { setUser } = AuthSlice.actions
export const selectAuth = (state: unknown) =>
    (state as { auth: AuthState }).auth
export default AuthSlice.reducer
