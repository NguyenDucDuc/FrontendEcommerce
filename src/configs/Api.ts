import axios from "axios";

export const endpoint = {
  login: "/user/login",
  googleLogin: "/user/google-login",
  facebookLogin: "/user/facebook-login",
  user: {
    register: "/user",
    currentUser: "/user/current-user",
    updateUser: (userId: number) => `/user/${userId}`,
    roleAdmin: "/user/role-admin",
    getShopOwner: (productId: number) => `/user/get-user-by-productId/${productId}`
  },
  shop: {
    getDetail: (shopId: number) => `/shop/${shopId}`,
    create: "/shop",
    getAll: "/shop",
    lock: (shopId: number) => `/shop/block/${shopId}`,
    unLock: (shopId: number) => `/shop/unlock/${shopId}`,
    getUserByShopID: (shopId: number) => `/shop/${shopId}/get-user`,
    update: (shopId: number) => `/shop/${shopId}`,
  },
  seller: {
    register: "/seller",
    getAll: "/seller",
    lock: (userId: number) => `/seller/lock/${userId}`,
    unLock: (userId: number) => `/seller/un-lock/${userId}`,
  },
  address: {
    currentAddress: "/address/current",
    updateAddress: (userId: number) => `/user/${userId}`,
  },
  product: {
    main: "/product",
    search: "/product",
    productDetail: (productId: string) => `/product/${productId}`,
    reviews: (productId: string) => `/product/${productId}/reviews`,
    update: (productId: string) => `product/${productId}`,
    getImages: (productId: string) => `product/${productId}/images`
  },
  cart: {
    getAllItem: "/cart/products",
    getByUserId: "/cart",
  },
  productCart: {
    add: "/product-cart",
    update: "/product-cart",
    delete: "/product-cart/delete"
  },
  admin: {
    login: "/admin/login",
  },
  order: {
    buyProduct: "/order",
    getOrder: "/order",
    confirmOrder: '/order/action',
    confirmOrderForCustomer: '/order/cancel-order',
    getDetail: '/order/details'
  },
  customer: {
    checkBoughtProduct: "/customer/check-bought-product",
    getDetail: (userId: number) => `/customer/${userId}`
  },
  category: {
    getAll: '/category'
  },
  notification: {
    base: '/notification'
  },
  review: {
    create: '/review/create-v2'
  },
  message: {
    getAll: (conversationId: string) => `/message/${conversationId}`,
    create: '/message'
  },
  payment: {
    checkout: '/checkout/payment',
    refund: '/checkout/refund'
  },
  conversation: {
    getAll: '/conversation'
  },
  promotion: {
    getAll: (shopId: number) => `promotion/${shopId}/get-all`,
    delete: (promotionId: number) => `promotion/${promotionId}/delete`,
    create: '/promotion',
    update: (promotionId: number) => `promotion/${promotionId}/update`
  },
};

export const AuthApi = () => {
  return axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const AuthAdminApi = () => {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessTokenAdmin")}`,
    },
  });
};

export default axios.create({
  baseURL: "http://localhost:5000/",
});
