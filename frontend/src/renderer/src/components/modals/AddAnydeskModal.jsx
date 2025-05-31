import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import Select from 'react-select'
import { COLORS, selectStyles } from '../../constants/config'

function AddAnydeskModal({ id, refreshList }) {
    const { postData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [users, setUsers] = useState([])
    const [anydeskData, setAnydeskData] = useState({
        user_id: '',
        number: '',
        password: '',
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
        setAnydeskData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setAnydeskData({
            user_id: '',
            number: '',
            password: '',
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

        if (!form.checkValidity() || !anydeskData.user_id) {
            form.classList.add('was-validated')
            return
        }

        const response = await postData('/anydesks', anydeskData, () => {}, setLoading, setError)

        if (response) {
            setIsSubmitted(false)
            resetForm()
            Modal.getInstance(modalRef.current)?.hide()
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
                <FaPlus /> New Anydesk
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
                                Add New Anydesk
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
                                            (option) => option.value === anydeskData.user_id
                                        )}
                                        onChange={(selected) =>
                                            setAnydeskData((prev) => ({
                                                ...prev,
                                                user_id: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!anydeskData?.user_id || !isSubmitted || ''
                                        )}
                                        classNamePrefix="react-select"
                                        className={`form-control p-0 border-0 z-3 ${
                                            !anydeskData?.user_id && isSubmitted
                                                ? 'is-invalid border border-danger'
                                                : ''
                                        }`}
                                    />
                                    <div className="invalid-feedback">Please select a user.</div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="anydeskNumber" className="form-label">
                                        Anydesk Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="anydeskNumber"
                                        name="number"
                                        value={anydeskData.number}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter a unique Anydesk number.
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="password" className="form-label">
                                        Password (optional)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={anydeskData.password}
                                        onChange={handleInputChange}
                                    />
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
                                        value={anydeskData.location}
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
                                        value={anydeskData.description}
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
                                            'Add Anydesk'
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

export default AddAnydeskModal
