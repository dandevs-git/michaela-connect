import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import { useToast } from '../../contexts/ToastContext'
import Select from 'react-select'
import { COLORS, selectStyles } from '../../constants/config'

function AddInternetModal({ id, resetInternet, resetLoading, resetError }) {
    const { postData, getData } = useAPI()
    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [users, setUsers] = useState([])
    const [internetData, setInternetData] = useState({
        user_id: '',
        number: '',
        cable_code: '',
        location: '',
        description: ''
    })

    useEffect(() => {
        getData('/users', setUsers, setLoading, setError)
    }, [getData])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInternetData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setInternetData({
            user_id: '',
            number: '',
            cable_code: '',
            location: '',
            description: ''
        })
        setMessage('')
        setError('')
        formRef.current?.classList.remove('was-validated')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        form.classList.remove('was-validated')
        setIsSubmitted(true)
        setMessage('')
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        postData('/internet', internetData, setInternetData, setLoading, setError)
        Modal.getInstance(modalRef.current).hide()
        resetForm()
        showToast({
            message: 'Internet Line added successfully!',
            title: 'Success',
            isPositive: true,
            delay: 5000
        })

        getData('/internet', resetInternet, resetLoading, resetError)
    }

    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
            >
                <FaPlus /> New Internet Line
            </button>

            <div
                className="modal fade"
                id={id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-semibold text-uppercase">
                                Add New Internet Line
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <div className="modal-body p-3">
                            <form
                                ref={formRef}
                                className="row g-3 needs-validation p-3"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                {(message || error) && (
                                    <div
                                        className={`alert text-center py-2 ${error ? 'alert-danger' : 'alert-success'}`}
                                    >
                                        {error || message}
                                    </div>
                                )}

                                <div className="col-md-12">
                                    <label htmlFor="user" className="form-label">
                                        User
                                    </label>
                                    <Select
                                        inputId="user"
                                        name="user_id"
                                        options={userOptions}
                                        value={userOptions.find(
                                            (option) => option.value === internetData.user_id
                                        )}
                                        onChange={(selected) =>
                                            setInternetData((prev) => ({
                                                ...prev,
                                                user_id: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!internetData.user_id || !isSubmitted
                                        )}
                                        classNamePrefix="react-select"
                                        className={`form-control p-0 border-0 ${!internetData.user_id && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">Please select a user.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="cableCode" className="form-label">
                                        Cable Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cableCode"
                                        name="cable_code"
                                        value={internetData.cable_code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter a unique cable code.
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="location" className="form-label">
                                        Location (optional)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        value={internetData.location}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="description" className="form-label">
                                        Description (optional)
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="2"
                                        value={internetData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-grow spinner-grow-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Add Internet Line'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddInternetModal
