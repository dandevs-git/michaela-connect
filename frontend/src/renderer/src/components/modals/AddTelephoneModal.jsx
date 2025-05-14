import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import { useToast } from '../../contexts/ToastContext'

function AddTelephoneModal() {
    const { postData } = useAPI()
    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const rfidRef = useRef(null)
    const modalRef = useRef(null)

    const [telephoneData, setTelephoneData] = useState({
        number: '',
        cable_code: '',
        location: '',
        description: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTelephoneData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setTelephoneData({
            number: '',
            cable_code: '',
            location: '',
            description: ''
        })
        setMessage('')
        setError('')
        document.querySelector('.needs-validation')?.classList.remove('was-validated')
    }

    useEffect(() => {
        const modalEl = modalRef.current
        if (!modalEl) return

        const handleShown = () => {
            rfidRef.current?.focus()
        }

        modalEl.addEventListener('shown.bs.modal', handleShown)
        return () => {
            modalEl.removeEventListener('shown.bs.modal', handleShown)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        form.classList.remove('was-validated')
        setMessage('')
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        postData('/telephones', telephoneData, setTelephoneData, setLoading, setError)
        Modal.getInstance(modalRef.current).hide()
        resetForm()
        showToast({
            message: 'Telephone added successfully!',
            title: 'Success',
            isPositive: true,
            delay: 5000
        })
    }

    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target="#AddTelephoneModal"
            >
                <FaPlus /> New Telephone
            </button>

            <div
                className="modal fade"
                id="AddTelephoneModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-semibold text-uppercase">
                                Add New Telephone
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body p-3">
                            <form
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
                                    <label htmlFor="telephoneNumber" className="form-label">
                                        Telephone Number
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="telephoneNumber"
                                        name="number"
                                        value={telephoneData?.number}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter a unique telephone number.
                                    </div>
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
                                        value={telephoneData?.cable_code}
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
                                        value={telephoneData?.location}
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
                                        value={telephoneData?.description}
                                        onChange={handleInputChange}
                                    ></textarea>
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
                                            'Add Telephone'
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

export default AddTelephoneModal
