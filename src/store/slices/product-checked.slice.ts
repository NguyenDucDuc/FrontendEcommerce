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
}

const initialState: IInitialState = {
    listProductsChecked: [],
    status: ""
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
        }
    },
    extraReducers: {

    }
})

export default productsCheckedSlice.reducer
export const {addItemChecked, removeItemChecked, setNullListProductsChecked} = productsCheckedSlice.actions