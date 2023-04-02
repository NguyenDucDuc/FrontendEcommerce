import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api, { endpoint } from "../../configs/Api";

interface ILoginResponse {
    user: {
        id: number;
        userName: string;
        firstName: string;
        lastName: string;
        avatar: string;
        accessToken: string;
    }
    status: string;
}


const initialState: ILoginResponse = {
    user: {
        id: 88,
        userName: "",
        firstName: "Chưa",
        lastName: "đăng nhập",
        avatar: "",
        accessToken: "",
    },
    status: ""
}

export const loginAdminAsyncThunk = createAsyncThunk("userAdmin/login", async (reqBody: any, {rejectWithValue}) => {
    try {
        const res = await Api.post(endpoint.admin.login, {
            userName: reqBody.userName,
            passWord: reqBody.passWord
        })
        console.log(res.data.data)
        return res.data.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

const userAdminSlice = createSlice({
    name: "userAdmin",
    initialState,
    reducers: {
        updateUserAdmin: (state, action) => {
            state.user = action.payload
        },
        logoutAdmin: (state) => {
            state.user.id = 0
            state.user.userName = ""
            state.user.firstName = "Chưa"
            state.user.lastName = "đăng nhập"
            state.user.avatar = ""
            state.user.accessToken = ""
            localStorage.removeItem("accessTokenAdmin")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAdminAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(loginAdminAsyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = "fulfilled"
            state.user = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(loginAdminAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })
    }
})

export default userAdminSlice.reducer
export const {updateUserAdmin, logoutAdmin} = userAdminSlice.actions