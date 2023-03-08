import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICartItem {
    productId?: number;
    image?: string;
    price: number;
    desc?: string;
    quantity: number;
}

interface IInitialState {
    listCartItem: ICartItem[];
    totalProduct: number;
    totalAmount: number;
    status?: string;
}

const initialState: IInitialState = {
    listCartItem: [
        {
            productId: 88,
            image: "https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26",
            price: 350000,
            desc: "Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa.",
            quantity: 3
        }
    ],
    status: "",
    totalProduct: 5,
    totalAmount: 0
}

const cartItemSlice = createSlice({
    name: "cartItem",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const index = state.listCartItem.findIndex((item) => item.productId === action.payload.productId)
            if(index === -1){
                state.listCartItem = [...state.listCartItem, action.payload]
            }else {
                state.listCartItem[index].quantity++
            }
        },
        updateCartCount: (state) => {
            state.totalProduct++
        }

    },
    extraReducers: {

    }
})

export default cartItemSlice.reducer
export const {addItem, updateCartCount} = cartItemSlice.actions