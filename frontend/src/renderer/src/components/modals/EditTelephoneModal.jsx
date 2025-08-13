import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { createOptions } from '../../utils/createOptions'
import { selectStyles } from '../../constants/config'

function EditTelephoneModal({ id, telephone, refreshList }) {
    const { putData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [users, setUsers] = useState([])
    const [telephoneList, setTelephoneList] = useState([])
    const [telephoneData, setTelephoneData] = useState({
        user_id: '',
        number: '',
        cable_code: '',
        location: '',
        description: ''
    })

    const modalRef = useRef(null)
    const formRef = useRef(null)

    useEffect(() => {
        getData('/users', setUsers, () => { }, setError)
    }, [])

    useEffect(() => {
        getData('/telephones', setTelephoneList, () => { }, setError)
    }, [])

    useEffect(() => {
        if (telephone) {
            setTelephoneData({
                user_id: telephone?.user?.id || '',
                number: telephone.number || '',
                cable_code: telephone.cable_code || '',
                location: telephone.location || '',
                description: telephone.description || ''
            })
        }
    }, [telephone])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const locationOptions = createOptions(telephoneList, 'location')

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

        const response = await putData(
            `/telephones/${telephone.id}`,
            telephoneData,
            () => { },
            setLoading,
            setError
        )

        if (response) {
            setIsSubmitted(false)
            resetForm()
            // Modal.getInstance(modalRef.current)?.hide()
            modalRef.current.querySelector('[data-bs-dismiss="modal"]').click()
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
                        <h5 className="modal-title fw-semibold text-uppercase">Edit Telephone</h5>
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
                            <div className="col-md-12">
                                <label htmlFor="user" className="form-label">
                                    User
                                </label>
                                <Select
                                    inputId="user_id"
                                    name="user_id"
                                    options={userOptions}
                                    value={userOptions.find(
                                        (option) => option.value === telephoneData?.user_id || ''
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
                                <label htmlFor="number" className="form-label">
                                    Telephone Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    name="number"
                                    value={telephoneData?.number || ''}
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
                                    value={telephoneData?.cable_code || ''}
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
                                <CreatableSelect
                                    inputId="location"
                                    name="location"
                                    options={locationOptions}
                                    value={locationOptions.find(
                                        (option) => option.value === telephoneData.location
                                    )}
                                    onChange={(selected) =>
                                        setTelephoneData((prev) => ({
                                            ...prev,
                                            location: selected?.value || ''
                                        }))
                                    }
                                    styles={selectStyles(!!telephoneData.location || !isSubmitted)}
                                    classNamePrefix="react-select"
                                    isClearable
                                    className={`form-control p-0 border-0 z-2 ${!telephoneData.location && isSubmitted ? 'is-invalid border border-danger' : ''}`}
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
                                    value={telephoneData?.description || ''}
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
                                        'Update Telephone Record'
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

export default EditTelephoneModal
