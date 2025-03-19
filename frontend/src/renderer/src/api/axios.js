import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

const token = localStorage.getItem('token')
console.log('token:', token)

api.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
