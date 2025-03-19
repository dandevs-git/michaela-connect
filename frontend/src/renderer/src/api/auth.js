import api from '../api'
import { useNavigate } from 'react-router-dom'

export const useAuth = (setIsAuthenticated) => {
    const navigate = useNavigate()

    const handleLogin = async (username, password) => {
        try {
            const response = await api.post('/login', { username, password })
            localStorage.setItem('token', response.data.token)
            setIsAuthenticated(true)
            navigate('/dashboard')
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        navigate('/login')
    }

    return { handleLogin, handleLogout }
}
