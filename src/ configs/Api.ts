import axios from "axios";


export const endpoint = {
    login: "/user/login",
    googleLogin: "/user/google-login",
    facebookLogin: "/user/facebook-login",
    user: {
        register: "/user",
    },
    //
    shop: {
        create: "/shop",
        getAll: "/shop",
        lock: (shopId: number) => `/shop/block/${shopId}`,
        unLock: (shopId: number) => `/shop/unlock/${shopId}`
    },
    seller: {
        getAll: "/seller",
        lock: (userId:number) => `/seller/lock/${userId}`,
        unLock: (userId: number) => `/seller/un-lock/${userId}`
    }
}

export const AuthApi = () => {
    return axios.create({
        baseURL: "http://localhost:5000/",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
}

export default axios.create({
    baseURL: "http://localhost:5000/"
})