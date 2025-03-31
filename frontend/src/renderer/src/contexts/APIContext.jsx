import { createContext, useState, useEffect, useContext } from 'react'
import api from '../api'

export const APIContext = createContext()

export const APIProvider = ({ children }) => {
    const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState(null)

    const login = async (username, password) => {
        try {
            const response = await api.post('/login', { username, password })

            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
            }

            return response.data.message
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response

                if (status === 401) {
                    return 'Invalid username or password'
                } else if (status === 403) {
                    return 'Access denied. Please contact the administrator.'
                } else {
                    return data.message || 'Something went wrong'
                }
            } else {
                return 'Network error. Please try again later.'
            }
        }
    }

    const logout = async () => {
        try {
            await api.post('/logout')
        } catch (error) {
            console.warn('Logout API failed, but proceeding with logout.')
        } finally {
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
        }
    }

    const fetchData = async (endpoint, setData, setLoading) => {
        if (setLoading) setLoading(true)

        try {
            const response = await api.get(endpoint)
            if (setData) setData(response.data)
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error)
        } finally {
            if (setLoading) setLoading(false)
        }
    }

    const getAuthenticatedUserDetails = async () => {
        try {
            const response = await api.get('/auth')
            setAuthenticatedUserDetails(response.data)
            // console.log(response.data)

            return response.data
        } catch (error) {
            console.error('Failed to fetch user details:', error.response?.data || error.message)
            return null
        }
    }

    const addTicket = async (ticketData) => {
        try {
            const response = await api.post('/tickets', ticketData)
            return response.data
        } catch (error) {
            console.error('Failed to add ticket:', error.response?.data || error.message)
            return error
        }
    }

    const assignTicket = async (ticketId, assignedTo) => {
        try {
            const response = await api.post(`/tickets/${ticketId}/assign`, {
                assigned_to: assignedTo
            })
            return response.data
        } catch (error) {
            console.error('Failed to assign ticket:', error.response?.data || error.message)
            return error
        }
    }

    return (
        <APIContext.Provider
            value={{
                authenticatedUserDetails,
                getAuthenticatedUserDetails,
                setAuthenticatedUserDetails,
                login,
                logout,
                fetchData,
                addTicket,
                assignTicket
            }}
        >
            {children}
        </APIContext.Provider>
    )
}

export const useAPI = () => useContext(APIContext)
