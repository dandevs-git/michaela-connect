import { useState } from 'react'
import { FaEye, FaEyeSlash, FaClipboard, FaClipboardCheck } from 'react-icons/fa'

function ViewAnydeskDetailsModal({ id, anydesk }) {
    const [visible, setVisible] = useState(false)
    const [copied, setCopied] = useState(false)

    const password = anydesk?.password || ''

    const copyToClipboard = () => {
        if (!password) return

        navigator.clipboard.writeText(password).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        })
    }

    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Anydesk Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>

                    <div className="modal-body p-4">
                        {anydesk ? (
                            <div className="text-center">
                                <div className="text-start p-3">
                                    <p>
                                        <strong className="me-2">User:</strong>{' '}
                                        <span className="text-uppercase">
                                            {anydesk?.user?.name || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Department:</strong>{' '}
                                        <span className="text-uppercase">
                                            {anydesk?.user?.department?.name || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Number:</strong>{' '}
                                        <span>{anydesk.number || 'N/A'}</span>
                                    </p>

                                    <p>
                                        <strong className="me-2">Location:</strong>{' '}
                                        <span>{anydesk.location || 'N/A'}</span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Description:</strong>{' '}
                                        <span>{anydesk.description || 'N/A'}</span>
                                    </p>

                                    <div className="input-group mb-3">
                                        {password ? (
                                            <>
                                                <span
                                                    className="input-group-text"
                                                    id="basic-addon1"
                                                >
                                                    <strong className="me-2">Password:</strong>
                                                </span>
                                                <input
                                                    type={visible ? 'text' : 'password'}
                                                    className="form-control border-primary-subtle border-end-0"
                                                    value={password}
                                                    readOnly
                                                    autoComplete="off"
                                                />
                                                <button
                                                    className="btn border-primary-subtle"
                                                    type="button"
                                                    onClick={() => setVisible(!visible)}
                                                    aria-label={
                                                        visible ? 'Hide password' : 'Show password'
                                                    }
                                                    title={
                                                        visible ? 'Hide password' : 'Show password'
                                                    }
                                                >
                                                    {visible ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                                <button
                                                    className="btn border-primary-subtle"
                                                    type="button"
                                                    onClick={copyToClipboard}
                                                    aria-label="Copy password"
                                                    title="Copy password"
                                                >
                                                    {copied ? (
                                                        <FaClipboardCheck />
                                                    ) : (
                                                        <FaClipboard />
                                                    )}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <strong className="me-2">Password:</strong>
                                                <span className="text-muted">N/A</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted">No data available.</p>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAnydeskDetailsModal
