import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi, endpoint } from "../../configs/Api";


interface IMessage {
    _id: string
    content: string
    creator: {
        id: number
        firstName: string
        lastName: string
        avatar: string
    }
    createdAt: string
    conversation: string
}

interface IInitialState {
    listMessage: IMessage[],
    status: string
}

const initialState: IInitialState = {
    listMessage: [],
    status: ""
}

export const getAllMessageAsyncThunk = createAsyncThunk('message/getAll', async (conversationId: string) => {
    const res = await AuthApi().get(endpoint.message.getAll(conversationId))
    console.log(res.data.data)
    return res.data.data
})

export const createMessageAsynkThunk = createAsyncThunk('message/create', async (reqBody: any) => {
    const res = await AuthApi().post(endpoint.message.create, {
        content: reqBody.content,
        conversation: reqBody.conversation
    })
    console.log(res.data)
    return res.data.data
})

const messageSlice = createSlice({
    name: 'message',
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
        builder.addCase(getAllMessageAsyncThunk.fulfilled, (state, action: any) => {
            state.listMessage = action.payload
            state.status = "fulfilled"
        })
        builder.addCase(createMessageAsynkThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(createMessageAsynkThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.listMessage = [...state.listMessage, action.payload]
        })
    }
})

export default messageSlice.reducer
export const {addMessageRedux} = messageSlice.actions