import axios from "axios";


export const endpoint = {
    login: "/user/login"
}

export default axios.create({
    baseURL: "http://localhost:5000/"
})