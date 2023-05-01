import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi, endpoint } from "../../configs/Api";

interface IPromotion {
    id: number;
    code: string;
    desc: string;
    value: number;
    dateEnd: string;
    shopId: number;
    productId: number;
}

interface IInitialState {
    status: string;
    listPromotion: IPromotion[];
}

const initialState: IInitialState = {
    status: "",
    listPromotion: []
}

export const getAllPromotionAsyncThunk = createAsyncThunk('promotion/getAll', async (shopId: number) => {
    try {
        const res = await AuthApi().get(endpoint.promotion.getAll(shopId))
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const deletePromotionAsyncThunk = createAsyncThunk('promotion/delete', async (promotionId: number) => {
    try {
        const res = await AuthApi().post(endpoint.promotion.delete(promotionId))
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const updatePromotionAsyncThunk = createAsyncThunk('promotion/update', async (reqBody: any) => {
    try {
        console.log(reqBody)
        const res = await AuthApi().post(endpoint.promotion.update(reqBody.promotionId), reqBody)
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const createPromotionAsyncThunk = createAsyncThunk('promotion/create', async (reqBody: any) => {
    try {
        const res = await AuthApi().post(endpoint.promotion.create, {
            desc: reqBody.desc,
            value: reqBody.value,
            dateEnd: reqBody.dateEnd,
            shopId: reqBody.shopId,
            productId: reqBody.productId
        })
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

const promotionSlice = createSlice({
    name: 'promotion',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllPromotionAsyncThunk.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(getAllPromotionAsyncThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.listPromotion = action.payload
        })
        builder.addCase(getAllPromotionAsyncThunk.rejected, (state) => {
            state.status = 'rejected'
        })

        builder.addCase(deletePromotionAsyncThunk.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(deletePromotionAsyncThunk.fulfilled, (state, action: any) => {
            state.status = 'fulfilled'
            state.listPromotion = state.listPromotion.filter((promotionItem) => promotionItem.id !== action.payload.id)
        })
        builder.addCase(deletePromotionAsyncThunk.rejected, (state) => {
            state.status = 'rejected'
        })

        builder.addCase(createPromotionAsyncThunk.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(createPromotionAsyncThunk.fulfilled, (state, action: any) => {
            state.status = 'fulfilled'
            state.listPromotion = [...state.listPromotion, action.payload]
        })
        builder.addCase(createPromotionAsyncThunk.rejected, (state) => {
            state.status = 'rejected'
        })

        builder.addCase(updatePromotionAsyncThunk.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(updatePromotionAsyncThunk.fulfilled, (state, action: any) => {
            state.status = 'fulfilled'
            const index = state.listPromotion.findIndex((item) => item.id === action.payload.id)
            if(index !== -1){
                state.listPromotion[index] = action.payload
            }
        })
        builder.addCase(updatePromotionAsyncThunk.rejected, (state) => {
            state.status = 'rejected'
        })
    }
})

export default promotionSlice.reducer