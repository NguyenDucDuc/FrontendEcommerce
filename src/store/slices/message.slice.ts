import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api, { AuthApi, endpoint } from "../../configs/Api";
import { stat } from "fs";

interface IMessage {
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface IInitialState {
    listMessage: IMessage[];
    status: string;
}

const initialState: IInitialState = {
    listMessage: [],
    status: ""
}

export const getAllMessageAsyncThunk = createAsyncThunk("message/getAll", async (reqQuery: any) => {
    let url = `${endpoint.message.getAll}?senderId=${reqQuery.senderId}&receiverId=${reqQuery.receiverId}`
    const res = await AuthApi().get(url)
    console.log(res.data.data)
    return res.data.data
})

export const createMessageAsyncThunk = createAsyncThunk("message/create", async (reqBody: any) => {
    const res = await AuthApi().post(endpoint.message.create, {
        senderId: reqBody.senderId,
        content: reqBody.content,
        receiverId: reqBody.receiverId
    })
    console.log(res.data)
    return res.data.data
})

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessageRedux: (state, action) => {
            state.listMessage = [...state.listMessage, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMessageAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(getAllMessageAsyncThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.listMessage = action.payload
        })

        builder.addCase(createMessageAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(createMessageAsyncThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.listMessage = [...state.listMessage, action.payload]
        })
    }
})

export default messageSlice.reducer
export const {addMessageRedux} = messageSlice.actions
