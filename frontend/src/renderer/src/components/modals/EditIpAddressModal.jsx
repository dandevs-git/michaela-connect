import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import Select from 'react-select'
import { COLORS, selectStyles } from '../../constants/config'

function EditIpAddressModal({ id, ipAddress, refreshList }) {
    const { putData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [users, setUsers] = useState([])
    const [ipData, setIpData] = useState({
        user_id: '',
        ip: '',
        type: '',
        assigned_date: '',
        location: '',
        description: ''
    })

    const modalRef = useRef(null)
    const formRef = useRef(null)

    useEffect(() => {
        getData('/users', setUsers, () => {}, setError)
    }, [])

    useEffect(() => {
        if (ipAddress) {
            setIpData({
                user_id: ipAddress?.user?.id || '',
                ip: ipAddress.ip || '',
                type: ipAddress.type || '',
                assigned_date: ipAddress.assigned_date || '',
                location: ipAddress.location || '',
                description: ipAddress.description || ''
            })
        }
    }, [ipAddress])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const typeOptions = [
        { value: 'Computer', label: 'Computer' },
        { value: 'Printer', label: 'Printer' },
        { value: 'Server', label: 'Server' },
        { value: 'Other', label: 'Other' }
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setIpData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setIpData({
            user_id: '',
            ip: '',
            type: '',
            assigned_date: '',
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

        const response = await putData(
            `/ipaddress/${ipAddress.id}`,
            ipData,
            setIpData,
            setLoading,
            setError,
            {
                onSuccess: {
                    message: 'IP Address updated successfully!',
                    title: 'Success',
                    delay: 5000
                },
                onError: {
                    message: 'Failed to update IP address.',
                    title: 'Error',
                    delay: 5000
                }
            }
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
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            ref={modalRef}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-semibold text-uppercase">Edit IP Address</h5>
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
                            {error?.message && (
                                <div className="alert alert-danger text-center py-2">
                                    {error.message}
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
                                        (option) => option.value === ipData.user_id
                                    )}
                                    onChange={(selected) =>
                                        setIpData((prev) => ({
                                            ...prev,
                                            user_id: selected?.value || ''
                                        }))
                                    }
                                    styles={selectStyles(!!ipData.user_id || !isSubmitted)}
                                    classNamePrefix="react-select"
                                    className={`form-control p-0 border-0 ${!ipData.user_id && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                />
                                <div className="invalid-feedback">Please select a user.</div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="ip" className="form-label">
                                    IP Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ip"
                                    name="ip"
                                    value={ipData.ip}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter a valid and unique IP address.
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="type" className="form-label">
                                    Type
                                </label>
                                <Select
                                    inputId="type"
                                    name="type"
                                    options={typeOptions}
                                    value={typeOptions.find(
                                        (option) => option.value === ipData.type
                                    )}
                                    onChange={(selected) =>
                                        setIpData((prev) => ({
                                            ...prev,
                                            type: selected?.value || ''
                                        }))
                                    }
                                    styles={selectStyles(!!ipData.type || !isSubmitted)}
                                    classNamePrefix="react-select"
                                    className={`form-control p-0 border-0 ${!ipData.type && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                />
                                <div className="invalid-feedback">Please select a type.</div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="assignedDate" className="form-label">
                                    Assigned Date (optional)
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="assignedDate"
                                    name="assigned_date"
                                    value={ipData.assigned_date}
                                    onChange={handleInputChange}
                                    max={new Date().toISOString().split('T')[0]}
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
                                    value={ipData.location}
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
                                    value={ipData.description}
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
                                        'Update IP Address'
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

export default EditIpAddressModal
