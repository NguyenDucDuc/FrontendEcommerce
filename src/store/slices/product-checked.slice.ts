import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICheckedItem {
    id?: number;
    name?: string;
    price: number;
    quantity: number;
    image?: string;
    desc?: string;
    
}

interface IInitialState {
    listProductsChecked: ICheckedItem[];
    status: string;
    totalPrice: number;
}

const initialState: IInitialState = {
    listProductsChecked: [],
    status: "",
    totalPrice: 0
}


const productsCheckedSlice = createSlice({
    name: "checkedItem",
    initialState,
    reducers: {
        addItemChecked: (state, action: PayloadAction<ICheckedItem>) => {
            state.listProductsChecked = [...state.listProductsChecked, action.payload]
        },
        removeItemChecked: (state, action: PayloadAction<ICheckedItem>) => {
            state.listProductsChecked = state.listProductsChecked.filter((item) => item.id !== action.payload.id)
        },
        setNullListProductsChecked: (state) => {
            state.listProductsChecked = []
        },
        updateQuantityCheckedList: (state, action) => {
            console.log("update quantity")
            const index = state.listProductsChecked.findIndex((item) => item.id === action.payload.productId)
            if(index !== -1){
                state.listProductsChecked[index].quantity = action.payload.quantity
            }
        },
        updateTotalPriceCheckedList: (state, action) => {
            state.totalPrice = state.totalPrice + action.payload
            
        }
    },
    extraReducers: {

    }
})

export default productsCheckedSlice.reducer
export const {
    addItemChecked,
    removeItemChecked,
    setNullListProductsChecked,
    updateQuantityCheckedList,
    updateTotalPriceCheckedList
    
} = productsCheckedSlice.actions