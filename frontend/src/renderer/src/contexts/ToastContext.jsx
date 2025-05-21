import { createContext, useContext, useState, useCallback } from 'react'
import GlobalToast from '../components/toast/GlobalToast'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        show: false,
        message: '',
        title: '',
        isPositive: true,
        delay: 3000
    })

    const showToast = useCallback((options) => {
        setToast({
            show: true,
            message: options.message || '',
            title: options.title || 'Notification',
            isPositive: options.isPositive !== false,
            delay: options.delay || 3000
        })
    }, [])

    const closeToast = () => {
        setToast((prev) => ({ ...prev, show: false }))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <GlobalToast {...toast} onClose={closeToast} />
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)
