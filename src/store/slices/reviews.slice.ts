import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api, { AuthApi, endpoint } from "../../configs/Api";

export interface IReview {
    id: number;
    content: string;
    rate: number;
    createdAt: string;
    User: {
        firstName: string;
        lastName: string;
        avatar: string;
    }
}

interface IReviewResponse {
    listReview: IReview[];
    amountPage: number;
    amountReview: number;
}

interface IInitialState {
    listReviews: IReview[];
    status: string;
    amountPage: number;
    amountReview: number;
}

const initialState: IInitialState = {
    listReviews: [],
    amountPage: 0,
    status: "",
    amountReview: 0
}

export const getAllReviewAsyncThunk = createAsyncThunk("reviews/getAll", async (body: any) => {
    const res = await Api.get(`${endpoint.product.reviews(body.productId)}?page=${body.page}`)
    
    return res.data.data
})

export const createReviewAsyncThunk = createAsyncThunk("review/create", async (body: any) => {
    const res = await AuthApi().post(endpoint.review.createV3, {
        rate: body.rate, 
        content: body.content,
        productId: body.productId
    })
    return res.data.data
})

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllReviewAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(getAllReviewAsyncThunk.fulfilled, (state, action: PayloadAction<IReviewResponse>) => {
            state.listReviews = action.payload.listReview
            state.status = "fulfilled"
            state.amountPage = action.payload.amountPage
            state.amountReview = action.payload.amountReview
        })
        builder.addCase(getAllReviewAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })

        builder.addCase(createReviewAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(createReviewAsyncThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.listReviews = [...state.listReviews, action.payload,]
        })
        builder.addCase(createReviewAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })
    }
})

export default reviewSlice.reducer
export const { } = reviewSlice.actions