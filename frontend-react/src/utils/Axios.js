import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3005',
})

instance.interceptors.request.use((req) => {
    req.headers.authorization = localStorage.getItem('jwtKey') || ''
    return req
})

export const Axios = instance
