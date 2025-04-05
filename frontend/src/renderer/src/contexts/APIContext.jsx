import { createContext, useState, useContext, useEffect } from 'react'
import api from '../api'

export const APIContext = createContext()

export const APIProvider = ({ children }) => {
    const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [])

    const login = async (username, password) => {
        try {
            const { data } = await api.post('/login', { username, password })

            if (data.token) {
                localStorage.setItem('token', data.token)
                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            }

            return data.message || 'Login successful'
        } catch (error) {
            const status = error?.response?.status
            const message = error?.response?.data?.message || 'Something went wrong'

            if (status === 401) return 'Invalid username or password'
            if (status === 403) return 'Access denied. Please contact the administrator.'
            return message
        }
    }

    const logout = async () => {
        try {
            await api.post('/logout')
        } catch (error) {
            console.warn('Logout failed:', error?.response?.data?.message || error.message)
        } finally {
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
        }
    }

    const fetchData = async (endpoint, setData, setLoading) => {
        try {
            if (setLoading) setLoading(true)
            const { data } = await api.get(endpoint)
            if (setData) setData(data)
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error?.response?.data || error.message)
        } finally {
            if (setLoading) setLoading(false)
        }
    }

    const getAuthenticatedUserDetails = async () => {
        try {
            const { data } = await api.get('/auth')
            setAuthenticatedUserDetails(data)
            return data
        } catch (error) {
            console.error('Fetch user failed:', error?.response?.data || error.message)
            return null
        }
    }

    const addTicket = async (ticketData) => {
        try {
            const { data } = await api.post('/tickets', ticketData)
            return data
        } catch (error) {
            console.error('Add ticket failed:', error?.response?.data || error.message)
            return null
        }
    }

    const assignTicket = async (ticketId, assignedTo) => {
        try {
            const { data } = await api.post(`/tickets/${ticketId}/assign`, {
                assigned_to: assignedTo
            })
            return data
        } catch (error) {
            console.error('Assign ticket failed:', error?.response?.data || error.message)
            return null
        }
    }

    const deleteTicket = async (ticketId) => {
        try {
            const { data } = await api.delete(`/tickets/${ticketId}`)
            return data
        } catch (error) {
            console.error('Delete ticket failed:', error?.response?.data || error.message)
            return null
        }
    }

    const addComment = async (ticketId, commentData) => {
        try {
            const response = await api.post(`/tickets/${ticketId}/comments`, commentData)
            return response.data
        } catch (error) {
            console.error('Failed to add comment:', error)
        }
    }

    const updateComment = async (ticketId, commentId, commentData) => {
        try {
            const response = await api.put(
                `/tickets/${ticketId}/comments/${commentId}`,
                commentData
            )
            return response.data
        } catch (error) {
            console.error('Failed to update comment:', error)
        }
    }

    const deleteComment = async (ticketId, commentId) => {
        try {
            const { data } = await api.delete(`/tickets/${ticketId}/comments/${commentId}`)
            return data
        } catch (error) {
            console.error('Delete comment failed:', error?.response?.data || error.message)
            return null
        }
    }

    return (
        <APIContext.Provider
            value={{
                authenticatedUserDetails,
                setAuthenticatedUserDetails,
                getAuthenticatedUserDetails,

                login,
                logout,

                fetchData,

                addTicket,
                assignTicket,
                deleteTicket,

                addComment,
                updateComment,
                deleteComment
            }}
        >
            {children}
        </APIContext.Provider>
    )
}

export const useAPI = () => useContext(APIContext)
