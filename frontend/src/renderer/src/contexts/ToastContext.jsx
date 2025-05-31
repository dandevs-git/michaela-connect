import { createContext, useContext, useState, useCallback } from 'react'
import GlobalToast from '../components/toast/GlobalToast'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const showToast = useCallback((options) => {
        const id = Date.now() + Math.random()
        setToasts((prev) => [
            {
                id,
                message: options.message || '',
                title: options.title || 'Notification',
                isPositive: options.isPositive !== false,
                delay: options.delay || 3000
            },
            ...prev
        ])
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div
                className="toast-container position-fixed top-0 end-0 p-3 mt-5 z-1055"
                style={{ zIndex: 1055 }}
            >
                {toasts.map((toast) => (
                    <GlobalToast
                        key={toast.id}
                        {...toast}
                        show={true}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)
