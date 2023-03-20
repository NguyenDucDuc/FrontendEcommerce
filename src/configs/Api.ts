import axios from "axios";


export const endpoint = {
    login: "/user/login",
    googleLogin: "/user/google-login",
    facebookLogin: "/user/facebook-login",
    user: {
        register: "/user",
        currentUser: "/user/current-user",
        updateUser: (userId: number) => `/user/${userId}`,
        roleAdmin: "/user/role-admin"
    },
    shop: {
        getDetail:(shopId:number) => `/shop/${shopId}`,
        create: "/shop",
        getAll: "/shop",
        lock: (shopId: number) => `/shop/block/${shopId}`,
        unLock: (shopId: number) => `/shop/unlock/${shopId}`
    },
    seller: {
        register: "/seller",
        getAll: "/seller",
        lock: (userId:number) => `/seller/lock/${userId}`,
        unLock: (userId: number) => `/seller/un-lock/${userId}`
    },
    address: {
        currentAddress: "/address/current",
        updateAddress: (userId: number) => `/user/${userId}`
    },
    product: {
        productDetail: (productId: string) => `/product/${productId}`,
        reviews: (productId: string) => `/product/${productId}/reviews`
    },
    cart: {
        getAllItem: "/cart/products",
        getByUserId: "/cart"
    },
    productCart: {
        add: "/product-cart",
        update: "/product-cart"
    },
    admin: {
        login: "/user/login"
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

export const AuthAdminApi = () => {
    return axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessTokenAdmin')}`
        }
    })
}

export default axios.create({
    baseURL: "http://localhost:5000/"
})