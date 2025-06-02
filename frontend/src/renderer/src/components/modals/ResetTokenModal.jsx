import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { FaCheckCircle, FaClipboard, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ResetTokenModal({ resetToken, setResetToken }) {
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()
    const modalRef = useRef(null)

    const handleCopy = () => {
        navigator.clipboard.writeText(resetToken).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    const goToReset = () => {
        setResetToken('')
        navigate('/reset-password')
    }

    useEffect(() => {
        if (resetToken && modalRef.current) {
            const modalInstance = Modal.getInstance(modalRef.current) || new Modal(modalRef.current)
            if (!modalRef.current.classList.contains('show')) {
                modalInstance.show()
            }
        }
    }, [resetToken])

    return (
        <div
            className="modal fade"
            id="resetTokenModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="resetTokenModalLabel"
            ref={modalRef}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-sm rounded-3 border-0">
                    <div className="modal-header">
                        <h5
                            className="modal-title fw-bold text-uppercase"
                            id="resetTokenModalLabel"
                        >
                            Reset Token
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body p-4 text-center">
                        <p className="fw-semibold text-secondary text-uppercase mb-2">
                            Your Secure Reset Token:
                        </p>

                        <div className="bg-light border rounded px-3 py-2 mb-3 text-break small">
                            {resetToken}
                        </div>

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

                        <small className="d-block text-danger mb-3">
                            Please save this token for the next step.
                        </small>

                        <button
                            className="btn btn-primary w-100 btn-sm d-flex justify-content-center align-items-center gap-2"
                            onClick={goToReset}
                            data-bs-dismiss="modal"
                        >
                            <FaArrowRight />
                            Go to Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetTokenModal
