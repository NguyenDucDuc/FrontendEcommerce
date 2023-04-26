import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface ICheckedItem {
    id?: number;
    name?: string;
    price: number;
    quantity: number;
    image?: string;
    desc?: string;
    shopName?: string;
    shopId?: number;
}

interface IOrder {
    shopId?: number;
    products: ICheckedItem[]
}

interface IInitialState {
    listProductsChecked: IOrder[];
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
            const index = state.listProductsChecked.findIndex((item) => item.shopId === action.payload.shopId)
            let newOrder: IOrder = {
                shopId: action.payload.shopId,
                products: []
            }
            newOrder.products?.push(action.payload)
            if(index === -1){
                state.listProductsChecked = [...state.listProductsChecked, newOrder]
            } else {
                state.listProductsChecked[index].products?.push(action.payload)
            }
        },
        removeItemChecked: (state, action: PayloadAction<ICheckedItem>) => {
            const index = state.listProductsChecked.findIndex((item) => item.shopId === action.payload.shopId)
            if (index !== -1) {
                state.listProductsChecked[index].products = state.listProductsChecked[index].products.filter(item => item.id !== action.payload.id)
            }
        },
        setNullListProductsChecked: (state) => {
            state.listProductsChecked = []
        },
        updateQuantityCheckedList: (state, action) => {
            const indexShopId = state.listProductsChecked.findIndex((item) => item.shopId === action.payload.shopId)
            console.log(indexShopId)
            if (indexShopId !== -1) {
                console.log("update quantity")
                const indexProductId = state.listProductsChecked[indexShopId].products?.findIndex((item) => item.id === action.payload.productId)
                console.log(state.listProductsChecked[indexShopId].products[indexProductId])
                state.listProductsChecked[indexShopId].products[indexProductId].quantity = action.payload.quantity
            }
            // if(index !== -1){
            //     state.listProductsChecked[index].quantity = action.payload.quantity
            // }
        },
        updateTotalPriceCheckedList: (state, action) => {
            state.totalPrice = state.totalPrice + action.payload   
        },
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