import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api, { AuthApi, endpoint } from "../../configs/Api";

interface IConversation {
    _id: string;
    name: string;
    lastMessage: {
        content: string;
        createdAt: string;
    }
}

interface IInitialState {
    listConversation: IConversation[],
    status: string
}

const initialState: IInitialState = {
    listConversation: [],
    status: ""
}

export const getAllConversationAsyncThunk = createAsyncThunk('conversation/getAll', async () => {
    try {
        const res = await AuthApi().get(endpoint.conversation.getAll)
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        
    }
})

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllConversationAsyncThunk.pending, (state) => {
            state.status = "pending"
        });
        builder.addCase(getAllConversationAsyncThunk.fulfilled, (state, action: any) => {
            state.status = "fulfilled"
            state.listConversation = action.payload
        })
    }
})

export default conversationSlice.reducer