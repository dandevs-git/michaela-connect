import { createContext, useState, useContext, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { useToast } from './ToastContext'

export const APIContext = createContext()

export const APIProvider = ({ children }) => {
    const { showToast } = useToast()
    const [authUser, setAuthUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserDetails = async () => {
            setAuthLoading(true)
            // const token = localStorage.getItem('token')
            const token = sessionStorage.getItem('token')
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                const data = await getAuthUser()
                if (data) {
                    setAuthUser(data)
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

    const makeRequest = async (
        method,
        endpoint,
        data = null,
        setLoading,
        setData,
        setError,
        toastOptions = null // <-- New parameter
    ) => {
        try {
            if (setLoading) setLoading(true)
            const config = data ? { data } : {}
            const response = await api[method](endpoint, data, config)

            if (setData) setData(response.data)

            if (toastOptions?.onSuccess) {
                showToast({
                    message: toastOptions.onSuccess.message || 'Operation successful.',
                    title: toastOptions.onSuccess.title || 'Success',
                    isPositive: true,
                    delay: toastOptions.onSuccess.delay || 5000
                })
            }

            return response.data
        } catch (error) {
            const errMsg = error?.response?.data || error.message
            console.error(`Error with ${method.toUpperCase()} ${endpoint}:`, errMsg)

            if (setError) setError(errMsg)

            if (toastOptions?.onError) {
                showToast({
                    message: toastOptions.onError.message || 'An error occurred.',
                    title: toastOptions.onError.title || 'Error',
                    isPositive: false,
                    delay: toastOptions.onError.delay || 5000
                })
            }

            return null
        } finally {
            if (setLoading) setLoading(false)
        }
    }

    const getData = (endpoint, setData, setLoading, setError, toastOptions) =>
        makeRequest('get', endpoint, null, setLoading, setData, setError, toastOptions)

    const postData = (endpoint, data, setData, setLoading, setError, toastOptions) =>
        makeRequest('post', endpoint, data, setLoading, setData, setError, toastOptions)

    const putData = (endpoint, data, setData, setLoading, setError, toastOptions) =>
        makeRequest('put', endpoint, data, setLoading, setData, setError, toastOptions)

    const patchData = (endpoint, data, setData, setLoading, setError, toastOptions) =>
        makeRequest('patch', endpoint, data, setLoading, setData, setError, toastOptions)

    const deleteData = (endpoint, setLoading, setError, toastOptions) =>
        makeRequest('delete', endpoint, null, setLoading, null, setError, toastOptions)

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

    const getAuthUser = async () => {
        try {
            const { data } = await api.get('/auth')
            setAuthUser(data)
            return data
        } catch (error) {
            console.error('Fetch user failed:', error?.response?.data || error.message)
            return null
        }
    }

    const getComments = async (ticketId) => await getData(`/tickets/${ticketId}/comments`)

    const showComment = async (ticketId, commentId) =>
        await getData(`/tickets/${ticketId}/comments/${commentId}`)

    const addComment = async (ticketId, commentData, setLoading, setError) =>
        await postData(`/tickets/${ticketId}/comments`, commentData, () => {}, setLoading, setError)

    const updateComment = async (ticketId, commentId, commentData) =>
        await putData(`/tickets/${ticketId}/comments/${commentId}`, commentData)

    const deleteComment = async (ticketId, commentId) =>
        await deleteData(`/tickets/${ticketId}/comments/${commentId}`)

    const addTicket = async (ticketData) => await postData('/tickets', ticketData)

    const approveTicket = async (ticketId) => await postData(`/tickets/${ticketId}/approve`, {})

    const assignTicket = async (ticketId, assignedTo) =>
        await postData(`/tickets/${ticketId}/assign`, { assigned_to: assignedTo })

    const deleteTicket = async (ticketId) => await deleteData(`/tickets/${ticketId}`)

    const requestPasswordReset = async (data, setLoading, setError) =>
        await postData('/forgot-password', data, () => {}, setLoading, setError)

    const passwordReset = async (data, setLoading, setError) =>
        await postData('/reset-password', data, () => {}, setLoading, setError)

    return (
        <APIContext.Provider
            value={{
                login,
                logout,
                authUser,
                setAuthUser,
                getAuthUser,

                getData,
                postData,
                putData,
                patchData,
                deleteData,

                addTicket,
                approveTicket,
                assignTicket,
                deleteTicket,

                getComments,
                showComment,
                addComment,
                updateComment,
                deleteComment,

                requestPasswordReset,
                passwordReset
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
