import {configureStore} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartitemSlice from './slices/cartitem.slice'
import productCheckedSlice from './slices/product-checked.slice'
import reviewSlice from './slices/reviews.slice'
import userAdminSlice from './slices/user-admin.slice'
import userSlice from './slices/user.slice'


const store = configureStore({
    reducer: {
        user: userSlice,
        cartItem: cartitemSlice,
        reviews: reviewSlice,
        productsChecked: productCheckedSlice,
        userAdmin: userAdminSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store

