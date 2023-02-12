import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { number } from "yup";
import Api, { endpoint } from "../../ configs/Api";


interface IUser {
    user: {
        id?: number;
        userName?: string;
        passWord?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        avatar?: string;
    },
    accessToken?: string;
    status: string;
}

export interface IReqLogin {
    username: string;
    password: string;
}

export const loginAsyncThunk = createAsyncThunk("user/login", async (reqLogin: IReqLogin) => {
    const res = await Api.post(endpoint.login, {
        userName: reqLogin.username,
        passWord: reqLogin.password
    })
    return res.data.data
})

const initialUser: IUser = {
    user: {
        id: 88,
        userName: "Guest",
        passWord: "",
        avatar: "",
        firstName: "Guest",
        lastName: "",
        phone: ""
    },
    accessToken: "",
    status: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(loginAsyncThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.status = "fulfilled"
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        })
        builder.addCase(loginAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })
    }
})

export default userSlice.reducer
