import axios from 'axios'

const instance = axios.create({
    baseURL:
        process.env.backendUrl || 'https://c2c-loan-backend1.herokuapp.com/',
})

instance.interceptors.request.use((req) => {
    req.headers.authorization =
        'Bearer ' + (localStorage.getItem('jwtKey') || '')
    return req
})

export const Axios = instance
