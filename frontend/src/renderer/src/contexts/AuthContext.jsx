import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
    const navigate = useNavigate()

    const login = async (username, password) => {
        try {
            const response = await api.post('/login', { username, password })

            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                setIsAuthenticated(true)
                navigate('/dashboard')
            }

            return response.data.message
        } catch (error) {
            if (error.response) {
                const status = error.response.status
                if (status != 200) {
                    return error.response.data.message
                } else {
                    return 'Something went wrong'
                }
            } else {
                return 'Network error. Please try again later.'
            }
        }
    }

    const logout = async () => {
        try {
            await api.post('/logout')
            localStorage.removeItem('token')
            setIsAuthenticated(false)
            navigate('/login')
        } catch (error) {
            return 'Logout failed. Please try again.'
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
