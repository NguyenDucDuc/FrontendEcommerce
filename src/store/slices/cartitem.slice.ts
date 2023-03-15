import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthApi, endpoint } from "../../configs/Api";


export interface ICartItem {
    id?: number;
    image?: string;
    price: number;
    desc?: string;
    quantity: number;
    name?: string;
}

interface ICartResponse {
    listProducts: ICartItem[];
    totalProduct: number;
    totalPrice: number;
}

interface IInitialState {
    listProducts: ICartItem[];
    totalProduct: number;
    totalPrice: number;
    status: string;
    totalProductPayment: number;
}

const initialState: IInitialState = {
    listProducts: [],
    totalProduct: 0,
    totalPrice: 0,
    status: "",
    totalProductPayment: 0
}

export const getAllItemAsyncThunk = createAsyncThunk("cart/getAllItem", async () => {
    const res = await AuthApi().get(endpoint.cart.getAllItem)
    console.log(res.data.data)
    return res.data.data
})

const cartItemSlice = createSlice({
    name: "cartItem",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const index = state.listProducts.findIndex((item) => item.id === action.payload.id)
            if(index === -1){
                state.listProducts = [...state.listProducts, action.payload]
            }else {
                state.listProducts[index].quantity++
            }
        },
        updateCartCount: (state) => {
            state.totalProduct++
        },
        increaseTotalPriceTotalProductPayment: (state, action) => {
            state.totalProductPayment++
            state.totalPrice += action.payload.totalPrice
        },
        decreaseTotalPriceTotalProductPayment: (state,action) => {
            state.totalProductPayment--
            state.totalPrice -= action.payload.totalPrice
        },
        increaseTotalPrice: (state, action) => {
            state.totalPrice += action.payload.unitPrice
        },
        decreaseTotalPrice: (state, action) => {
            state.totalPrice -= action.payload.unitPrice
        },
        setNullTotalPriceAndTotalProduct: (state) => {
            state.totalPrice = 0
            state.totalProductPayment = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllItemAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(getAllItemAsyncThunk.fulfilled, (state, action: PayloadAction<ICartResponse>) => {
            state.listProducts = action.payload.listProducts
            state.status = "fulfilled"
            state.totalProduct = action.payload.totalProduct
        })
        builder.addCase(getAllItemAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })
    }
})

export default cartItemSlice.reducer
export const {
    addItem, 
    updateCartCount, 
    increaseTotalPriceTotalProductPayment, 
    decreaseTotalPriceTotalProductPayment, 
    increaseTotalPrice, 
    decreaseTotalPrice,
    setNullTotalPriceAndTotalProduct
} = cartItemSlice.actions