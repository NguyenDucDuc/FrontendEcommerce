import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICartItem {
    productId?: number;
    image?: string;
    price: number;
    desc?: string;
}

interface IInitialState {
    listCartItem?: ICartItem[];
    totalProduct: number;
    totalAmount: number;
    status?: string;
}

const initialState: IInitialState = {
    listCartItem: [],
    status: "",
    totalProduct: 0,
    totalAmount: 0
}

const cartItemSlice = createSlice({
    name: "cartItem",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            if(state.listCartItem)
            {
                console.log("add")
                state.listCartItem = [...state.listCartItem, action.payload]
            }
            state.status = "fulfilled"
            state.totalProduct++
            state.totalAmount += action.payload.price
        },
        deleteItem: (state, action: PayloadAction<ICartItem>) => {
            state.listCartItem = state.listCartItem?.filter((item) => item.productId !== action.payload.productId)
            state.status = "fulfilled"
            state.totalProduct--
            state.totalAmount -= action.payload.price
        }
    },
    extraReducers: {

    }
})

export default cartItemSlice.reducer
export const {addItem, deleteItem} = cartItemSlice.actions