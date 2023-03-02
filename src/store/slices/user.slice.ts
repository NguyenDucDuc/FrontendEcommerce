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

interface IUserGoogleLogin {
    id?: number;
    userName?: string;
    passWord?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    status: string;
}

interface IResponseError {
    status: number;
    data: [];
}

export interface IReqLogin {
    username: string;
    password: string;
}

export interface IReqGoogleLogin {
    email: string;
    avatar?: string;
    firstName?:string;
    lastName?:string;
}

export interface IReqFacebookLogin {
    userId: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
}

export const loginAsyncThunk = createAsyncThunk("user/login", async (reqLogin: IReqLogin, {rejectWithValue}) => {
    try {
        const res = await Api.post(endpoint.login, {
            userName: reqLogin.username,
            passWord: reqLogin.password
        })
        return res.data.data
    } catch (error: any) {
        return rejectWithValue (error.response.data)
    }
    
})

export const googleLoginAsyncThunk = createAsyncThunk("user/googleLogin", async (reqGoogleLogin: IReqGoogleLogin) => {
    console.log(reqGoogleLogin)
    const res = await Api.post(endpoint.googleLogin, {
        email: reqGoogleLogin.email,
        avatar: reqGoogleLogin.avatar,
        firstName: reqGoogleLogin.firstName,
        lastName: reqGoogleLogin.lastName
    })
    return res.data.data
})

export const facebookLoginAsyncThunk = createAsyncThunk("user/facebookLogin", async (reqFacebookLogin: IReqFacebookLogin) => {
    const res = await Api.post(endpoint.facebookLogin, {
        userId: reqFacebookLogin.userId,
        avatar: reqFacebookLogin.avatar,
        firstName: reqFacebookLogin.firstName,
        lastName: reqFacebookLogin.lastName,
        email: reqFacebookLogin.email
    })
    return res.data.data
})

const initialUser: IUser = {
    user: {
        id: 88,
        userName: "",
        passWord: "",
        avatar: "",
        firstName: "Chưa đăng nhập",
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
        logout: (state) => {
            state.user.userName = "Guest"
            state.user.passWord = ""
            state.user.avatar = ""
            state.user.firstName = "Guest"
            state.user.lastName = ""
            state.user.phone = ""
            state.accessToken = ""
        }
    },
    extraReducers: (builder) => {
        // normal login
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
        // google login
        builder.addCase(googleLoginAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(googleLoginAsyncThunk.fulfilled, (state, action: PayloadAction<IUserGoogleLogin>) => {
            state.status = "fulfilled"
            console.log(action.payload)
            state.user = action.payload
        })
        builder.addCase(googleLoginAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })
        //facebook login
        builder.addCase(facebookLoginAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(facebookLoginAsyncThunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.user = action.payload
        })
        builder.addCase(facebookLoginAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })
    }
})

export default userSlice.reducer
export const {logout} = userSlice.actions
