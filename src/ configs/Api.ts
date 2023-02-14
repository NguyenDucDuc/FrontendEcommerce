import axios from "axios";


export const endpoint = {
    login: "/user/login",
    googleLogin: "/user/google-login",
    facebookLogin: "/user/facebook-login"
}

export default axios.create({
    baseURL: "http://localhost:5000/"
})