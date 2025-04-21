import { createContext, useState, useContext, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export const APIContext = createContext()

export const APIProvider = ({ children }) => {
    const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState(null)
    const [authLoading, setAuthLoading] = useState(false)
    const [userRole, setSetUserRole] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserDetails = async () => {
            setAuthLoading(true)
            // const token = localStorage.getItem('token')
            const token = sessionStorage.getItem('token')
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                const data = await getAuthenticatedUserDetails()
                if (data) {
                    setAuthenticatedUserDetails(data)
                    setSetUserRole(data.role)
                } else {
                    // localStorage.removeItem('token')
                    sessionStorage.removeItem('token')
                    delete api.defaults.headers.common['Authorization']
                    navigate('/login')
                }
            }
            setAuthLoading(false)
        }

        fetchUserDetails()
    }, [])

    const makeRequest = async (method, endpoint, data = null, setLoading, setData, setError) => {
        try {
            if (setLoading) setLoading(true)
            const config = data ? { data } : {}
            const response = await api[method](endpoint, data, config)
            if (setData) setData(response.data)
            return response.data
        } catch (error) {
            const errMsg = error?.response?.data || error.message
            console.error(`Error with ${method.toUpperCase()} ${endpoint}:`, errMsg)
            if (setError) setError(errMsg)
            return null
        } finally {
            if (setLoading) setLoading(false)
        }
    }

    const getData = (endpoint, setData, setLoading, setError) =>
        makeRequest('get', endpoint, null, setLoading, setData, setError)

    const postData = (endpoint, data, setData, setLoading, setError) =>
        makeRequest('post', endpoint, data, setLoading, setData, setError)

    const putData = (endpoint, data, setData, setLoading, setError) =>
        makeRequest('put', endpoint, data, setLoading, setData, setError)

    const deleteData = (endpoint, setLoading, setError) =>
        makeRequest('delete', endpoint, null, setLoading, null, setError)

    const login = async (username, password) => {
        try {
            const { data } = await api.post('/login', { username, password })
            if (data.token) {
                // localStorage.setItem('token', data.token)
                sessionStorage.setItem('token', data.token)
                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            }
            return data.message
        } catch (error) {
            const message = error?.response?.data?.message || 'Something went wrong'
            return message
        }
    }

    const logout = async () => {
        try {
            await api.post('/logout')
        } catch (error) {
            console.warn('Logout failed:', error?.response?.data?.message || error.message)
        } finally {
            // localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
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

    const getComments = async (ticketId) => await getData(`/tickets/${ticketId}/comments`)

    const showComment = async (ticketId, commentId) =>
        await getData(`/tickets/${ticketId}/comments/${commentId}`)

    const addComment = async (ticketId, commentData) =>
        await postData(`/tickets/${ticketId}/comments`, commentData)

    const updateComment = async (ticketId, commentId, commentData) =>
        await putData(`/tickets/${ticketId}/comments/${commentId}`, commentData)

    const deleteComment = async (ticketId, commentId) =>
        await deleteData(`/tickets/${ticketId}/comments/${commentId}`)

    const addTicket = async (ticketData) => await postData('/tickets', ticketData)

    const approveTicket = async (ticketId) => await postData(`/tickets/${ticketId}/approve`, {})

    const assignTicket = async (ticketId, assignedTo) =>
        await postData(`/tickets/${ticketId}/assign`, { assigned_to: assignedTo })

    const deleteTicket = async (ticketId) => await deleteData(`/tickets/${ticketId}`)

    return (
        <APIContext.Provider
            value={{
                login,
                logout,
                authenticatedUserDetails,
                setAuthenticatedUserDetails,
                getAuthenticatedUserDetails,
                userRole,

                getData,
                postData,
                putData,
                deleteData,

                addTicket,
                approveTicket,
                assignTicket,
                deleteTicket,

                getComments,
                showComment,
                addComment,
                updateComment,
                deleteComment
            }}
        >
            {authLoading ? (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center flex-column">
                    <div className="d-flex gap-4">
                        <div className="spinner-grow text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <h4 className="text-light mt-3">Authenticating</h4>
                </div>
            ) : (
                children
            )}
        </APIContext.Provider>
    )
}

export const useAPI = () => useContext(APIContext)
