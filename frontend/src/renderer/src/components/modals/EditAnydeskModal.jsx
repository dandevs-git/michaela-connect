import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import Select from 'react-select'
import { FaClipboard, FaClipboardCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import { COLORS, selectStyles } from '../../constants/config'

function EditAnydeskModal({ id, anydesk, refreshList }) {
    const { putData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [users, setUsers] = useState([])
    const [visible, setVisible] = useState(false)
    const [copied, setCopied] = useState(false)
    const [formData, setFormData] = useState({
        user_id: '',
        number: '',
        password: '',
        location: '',
        description: ''
    })

    const modalRef = useRef(null)
    const formRef = useRef(null)

    useEffect(() => {
        getData('/users', setUsers, () => {}, setError)
    }, [])

    useEffect(() => {
        if (anydesk) {
            setFormData({
                user_id: anydesk?.user?.id || '',
                number: anydesk.number || '',
                password: anydesk.password || '',
                location: anydesk.location || '',
                description: anydesk.description || ''
            })
        }
    }, [anydesk])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({
            user_id: '',
            number: '',
            password: '',
            location: '',
            description: ''
        })
        setError('')
        formRef.current?.classList.remove('was-validated')
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formData.password || '')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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

        const response = await putData(
            `/anydesks/${anydesk.id}`,
            formData,
            () => {},
            setLoading,
            setError
        )

        if (response) {
            setIsSubmitted(false)
            resetForm()
            Modal.getInstance(modalRef.current)?.hide()
            refreshList?.()
        }
    }

    return (
        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            ref={modalRef}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-semibold text-uppercase">Edit Anydesk</h5>
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
                                <div className="alert alert-danger text-center py-2">{error}</div>
                            )}

                            <div className="col-md-12">
                                <label htmlFor="user_id" className="form-label">
                                    User
                                </label>
                                <Select
                                    inputId="user_id"
                                    name="user_id"
                                    options={userOptions}
                                    value={userOptions.find(
                                        (option) => option.value === formData.user_id
                                    )}
                                    onChange={(selected) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            user_id: selected?.value || ''
                                        }))
                                    }
                                    styles={selectStyles(!!formData.user_id || !isSubmitted)}
                                    classNamePrefix="react-select"
                                    className={`form-control p-0 border-0 z-3 ${!formData.user_id && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                />
                                <div className="invalid-feedback">Please select a user.</div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="number" className="form-label">
                                    Anydesk Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter a unique anydesk number.
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="input-group">
                                    <input
                                        type={visible ? 'text' : 'password'}
                                        className="form-control border-primary-subtle border-end-0"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                    />
                                    <button
                                        className="btn border-primary-subtle"
                                        type="button"
                                        onClick={() => setVisible(!visible)}
                                        title={visible ? 'Hide password' : 'Show password'}
                                    >
                                        {visible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <button
                                        className="btn border-primary-subtle"
                                        type="button"
                                        onClick={copyToClipboard}
                                        title="Copy password"
                                    >
                                        {copied ? <FaClipboardCheck /> : <FaClipboard />}
                                    </button>
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
                                    value={formData.location}
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
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn text-light btn-warning w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-grow spinner-grow-sm me-2"
                                                role="status"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        'Update Internet'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAnydeskModal
