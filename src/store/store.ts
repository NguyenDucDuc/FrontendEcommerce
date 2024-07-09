import {configureStore} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartitemSlice from './slices/cartitem.slice'
import productCheckedSlice from './slices/product-checked.slice'
import reviewSlice from './slices/reviews.slice'
import userAdminSlice from './slices/user-admin.slice'
import userSlice from './slices/user.slice'
import conversationSlice from './slices/conversation.slice'
import messageSlice from './slices/message.slice'
import promotionSlice from './slices/promotion.slice'
import productCompareSlice from './slices/product-compare.slice'


const store = configureStore({
    reducer: {
        user: userSlice,
        cartItem: cartitemSlice,
        reviews: reviewSlice,
        productsChecked: productCheckedSlice,
        userAdmin: userAdminSlice,
        conversation: conversationSlice,
        message: messageSlice,
        promotion: promotionSlice,
        productCompare: productCompareSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store

