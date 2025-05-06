import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { useEffect, useRef } from 'react'

const GlobalToast = ({ message, show, onClose, isPositive, title, delay }) => {
    const toastRef = useRef(null)
    const toastInstance = useRef(null)

    useEffect(() => {
        if (toastRef.current) {
            toastInstance.current = Toast.getOrCreateInstance(toastRef.current, {
                autohide: true,
                delay
            })
        }
    }, [delay])

    useEffect(() => {
        if (show && toastInstance.current) {
            toastInstance.current.show()
        }
    }, [show])

    useEffect(() => {
        const toastEl = toastRef.current
        const handleHidden = () => onClose()

        if (toastEl) {
            toastEl.addEventListener('hidden.bs.toast', handleHidden)
        }

        return () => {
            if (toastEl) {
                toastEl.removeEventListener('hidden.bs.toast', handleHidden)
            }
        }
    }, [onClose])

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3 mt-5 z-1055">
            <div
                ref={toastRef}
                className={`toast bg-${isPositive ? 'success' : 'danger'}-subtle border-0`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="toast-header">
                    <i
                        className={`bi ${isPositive ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'} me-2`}
                    ></i>
                    <strong className="me-auto">{title}</strong>
                    <small className="text-muted">Just now</small>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="toast-body">{message}</div>
            </div>
        </div>
    )
}

export default GlobalToast
