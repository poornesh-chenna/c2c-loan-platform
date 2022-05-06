import axios from 'axios'

axios.create({
    baseURL: 'http://localhost:3005',
})

axios.interceptors.request.use((req) => {
    req.headers.authorization = localStorage.getItem('jwtKey') || ''
    return req
})

export const Axios = axios
