import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message === 'Unauthenticated.'
        ) {
            sessionStorage.removeItem('token')
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
        return Promise.reject(error)
    }
)

export default api
