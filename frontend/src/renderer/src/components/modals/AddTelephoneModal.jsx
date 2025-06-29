import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { FaPlus } from 'react-icons/fa'
import Select from 'react-select'
import { COLORS, selectStyles } from '../../constants/config'

function AddTelephoneModal({ id, refreshList }) {
    const { postData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [users, setUsers] = useState([])
    const [telephoneData, setTelephoneData] = useState({
        user_id: '',
        number: '',
        cable_code: '',
        location: '',
        description: ''
    })

    useEffect(() => {
        getData('/users', setUsers, () => {}, setError)
    }, [])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTelephoneData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setTelephoneData({
            user_id: '',
            number: '',
            cable_code: '',
            location: '',
            description: ''
        })
        setError('')
        formRef.current?.classList.remove('was-validated')
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

        const response = await postData(
            '/telephones',
            telephoneData,
            () => {},
            setLoading,
            setError
        )

        if (response) {
            setIsSubmitted(false)
            resetForm()
            // Modal.getInstance(modalRef.current)?.hide()
modalRef.current.querySelector('[data-bs-dismiss="modal"]').click()
            refreshList()
        }
    }

    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
            >
                <FaPlus /> New Telephone
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
                                Add New Telephone
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
                                {error && (
                                    <div className="alert alert-danger text-center py-2">
                                        {error}
                                    </div>
                                )}
                                <div className="col-md-12">
                                    <label htmlFor="user" className="form-label">
                                        User
                                    </label>
                                    <Select
                                        inputId="user_id"
                                        name="user_id"
                                        options={userOptions}
                                        value={userOptions.find(
                                            (option) => option.value === telephoneData.user_id
                                        )}
                                        onChange={(selected) =>
                                            setTelephoneData((prev) => ({
                                                ...prev,
                                                user_id: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!telephoneData?.user_id || !isSubmitted || ''
                                        )}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-3 ${!telephoneData?.user_id && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">Please select a user.</div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="telephoneNumber" className="form-label">
                                        Telephone Number
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="telephoneNumber"
                                        name="number"
                                        value={telephoneData.number}
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
                                        value={telephoneData.cable_code}
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
                                        value={telephoneData.location}
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
                                        value={telephoneData.description}
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
