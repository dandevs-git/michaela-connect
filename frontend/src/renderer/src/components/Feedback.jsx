import { useState, useRef } from 'react'
import { useAPI } from '../contexts/APIContext'
import { Collapse } from 'bootstrap/dist/js/bootstrap.bundle.min'

function Feedback() {
    const { postData } = useAPI()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const formRef = useRef(null)

    const [feedbackData, setFeedbackData] = useState({
        comment: '',
        type: 'general',
        source: 'system',
        severity: 'low',
        version: '1.0.0'
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFeedbackData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFeedbackData({
            comment: '',
            type: 'general',
            source: 'system',
            severity: 'low',
            version: ''
        })
        setError('')
        formRef.current?.classList.remove('was-validated')
        setIsSubmitted(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        form.classList.remove('was-validated')
        setIsSubmitted(true)
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        const response = await postData('/feedback', feedbackData, () => {}, setLoading, setError)

        if (response) {
            resetForm()
            Collapse.getInstance(document.getElementById('feedbackBox')).hide()
        }
    }

    return (
        <>
            <button
                className="btn btn-primary border-2 border-light p-2 position-fixed rounded-circle shadow bottom-0 end-0 mb-4 me-4 z-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#feedbackBox"
                title="Send Feedback"
            >
                <i className="bi bi-chat-left-text-fill fs-4 mx-1"></i>
            </button>

            <div
                className="collapse position-fixed shadow-lg bottom-0 end-0 mb-5 me-5 z-1 rounded-2"
                id="feedbackBox"
                style={{ width: '320px' }}
            >
                <div className="card">
                    <div className="d-flex card-header align-items-center bg-primary text-light py-2">
                        <span className="fs-5 fw-semibold">Feedback</span>
                        <button
                            type="button"
                            className="btn-close ms-auto btn-"
                            data-bs-toggle="collapse"
                            data-bs-target="#feedbackBox"
                        ></button>
                    </div>

                    <form
                        ref={formRef}
                        className="needs-validation"
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div className="card-body overflow-auto scroll" style={{ height: '500px' }}>
                            <p className="text-muted small">
                                We'd love to hear your thoughts! Please share your feedback below.
                            </p>

                            {error && (
                                <div className="alert alert-danger text-center py-2">{error}</div>
                            )}

                            <div className="mb-2">
                                <label htmlFor="comment" className="form-label small">
                                    Feedback Comment
                                </label>
                                <textarea
                                    className={`form-control ${!feedbackData.comment && isSubmitted ? 'is-invalid' : ''}`}
                                    id="comment"
                                    name="comment"
                                    rows="4"
                                    required
                                    value={feedbackData.comment}
                                    onChange={handleInputChange}
                                    placeholder="Type your feedback here..."
                                />
                                <div className="invalid-feedback">
                                    Please enter your feedback comment.
                                </div>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="type" className="form-label small">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    className="form-select form-select-sm"
                                    value={feedbackData.type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="general">General</option>
                                    <option value="bug">Bug</option>
                                    <option value="suggestion">Suggestion</option>
                                    <option value="compliment">Compliment</option>
                                </select>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="severity" className="form-label small">
                                    Severity
                                </label>
                                <select
                                    id="severity"
                                    name="severity"
                                    className="form-select form-select-sm"
                                    value={feedbackData.severity}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="source" className="form-label small">
                                    Source
                                </label>
                                <select
                                    id="source"
                                    name="source"
                                    className="form-select form-select-sm"
                                    value={feedbackData.source}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="system">System</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="website">Website</option>
                                </select>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="version" className="form-label small">
                                    Version
                                </label>
                                <input
                                    readOnly
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="version"
                                    name="version"
                                    value={feedbackData.version}
                                    onChange={handleInputChange}
                                    placeholder="e.g. v1.0.0"
                                />
                            </div>
                        </div>

                        <div className="card-footer d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary text-light"
                                disabled={loading || !feedbackData.comment.trim()}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-grow spinner-grow-sm me-2"
                                            role="status"
                                        ></span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-send-fill me-2"></i> Submit Feedback
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Feedback
