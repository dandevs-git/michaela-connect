import { useEffect, useRef, useState } from 'react'
import { FaCheckCircle, FaClipboard } from 'react-icons/fa'

function NewPasswordModal({ id, newPassword }) {
    const [copied, setCopied] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const modalRef = useRef(null)

    const handleCopy = () => {
        navigator.clipboard.writeText(newPassword).then(() => {
            setCopied(true)
            setDisabled(false)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    useEffect(() => {
        const modalEl = document.getElementById(id)
        modalRef.current = modalEl

        const handleHidden = () => {
            setDisabled(true)
            setCopied(false)
        }

        if (modalEl) {
            modalEl.addEventListener('hidden.bs.modal', handleHidden)
        }

        return () => {
            if (modalRef.current) {
                modalRef.current.removeEventListener('hidden.bs.modal', handleHidden)
            }
        }
    }, [id])

    return (
        <div
            className="modal fade"
            tabIndex="-1"
            id={id}
            aria-labelledby="newPasswordModalLabel"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="newPasswordModalLabel">
                            Password Reset Successful
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body text-center pt-3">
                        <p className="mb-2">The new password is:</p>
                        <div className="alert alert-primary fw-bold fs-5">{newPassword}</div>
                        <button
                            className="btn btn-outline-secondary btn-sm d-flex align-items-center mx-auto mb-2"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <>
                                    <FaCheckCircle className="me-2" size={16} />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <FaClipboard className="me-2" size={16} />
                                    Copy to Clipboard
                                </>
                            )}
                        </button>
                        <p className="text-muted small">
                            Please copy and share this password securely.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            disabled={disabled}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPasswordModal
