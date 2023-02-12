import {configureStore} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userSlice from './slices/user.slice'


const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store

