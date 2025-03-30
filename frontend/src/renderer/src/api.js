import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        // if (error.response && error.response.status === 401) {
        //     localStorage.clear()
        //     sessionStorage.clear()
        //     window.location.href = '/login'
        // }
        return Promise.reject(error)
    }
)

export default api
