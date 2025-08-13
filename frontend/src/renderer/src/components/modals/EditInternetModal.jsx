import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import CreatableSelect from 'react-select/creatable'
import { createOptions } from '../../utils/createOptions'
import { selectStyles } from '../../constants/config'

function EditInternetModal({ id, internet, refreshList }) {
    const { putData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [internetList, setInternetList] = useState([])
    const [internetData, setInternetData] = useState({
        name: '',
        provider: '',
        gateway: '',
        cable_code: '',
        location: '',
        description: ''
    })

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const providerOptions = createOptions(internetList, 'provider')
    const gatewayOptions = createOptions(internetList, 'gateway')
    const locationOptions = createOptions(internetList, 'location')

    useEffect(() => {
        getData('/internet', setInternetList, () => {}, setError)
    }, [])

    useEffect(() => {
        if (internet) {
            setInternetData({
                name: internet.name || '',
                provider: internet.provider || '',
                gateway: internet.gateway || '',
                cable_code: internet.cable_code || '',
                location: internet.location || '',
                description: internet.description || ''
            })
        }
    }, [internet])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInternetData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setInternetData({
            name: '',
            provider: '',
            gateway: '',
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
            `/internet/${internet.id}`,
            internetData,
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
                        <h5 className="modal-title fw-semibold text-uppercase">Edit Internet</h5>
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
                                <label htmlFor="name" className="form-label">
                                    Line Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={internetData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">Please enter a name.</div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="provider" className="form-label">
                                    Provider
                                </label>
                                <CreatableSelect
                                    inputId="provider"
                                    name="provider"
                                    options={providerOptions}
                                    value={providerOptions.find(
                                        (option) => option.value === internetData?.provider || ''
                                    )}
                                    onChange={(selected) =>
                                        setInternetData((prev) => ({
                                            ...prev,
                                            provider: selected?.value || ''
                                        }))
                                    }
                                    styles={selectStyles(!!internetData.location || !isSubmitted)}
                                    classNamePrefix="react-select"
                                    isClearable
                                    className={`form-control p-0 border-0 z-2 ${!internetData.location && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                />
                                <div className="invalid-feedback">Please enter a provider.</div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="gateway" className="form-label">
                                    Gateway
                                </label>
                                <CreatableSelect
                                    inputId="gateway"
                                    name="gateway"
                                    options={gatewayOptions}
                                    value={gatewayOptions.find(
                                        (option) => option.value === internetData?.gateway || ''
                                    )}
                                    onChange={(selected) =>
                                        setInternetData((prev) => ({
                                            ...prev,
                                            gateway: selected?.value || ''
                                        }))
                                    }
                                    styles={selectStyles(!!internetData.location || !isSubmitted)}
                                    classNamePrefix="react-select"
                                    isClearable
                                    className={`form-control p-0 border-0 z-2 ${!internetData.location && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                />
                                <div className="invalid-feedback">Please enter a gateway.</div>
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
                                <CreatableSelect
                                    inputId="location"
                                    name="location"
                                    options={locationOptions}
                                    value={locationOptions.find(
                                        (option) => option.value === internetData.location
                                    )}
                                    onChange={(selected) =>
                                        setInternetData((prev) => ({
                                            ...prev,
                                            location: selected?.value || ''
                                        }))
                                    }
                                    styles={selectStyles(!!internetData.location || !isSubmitted)}
                                    classNamePrefix="react-select"
                                    isClearable
                                    className={`form-control p-0 border-0 z-2 ${!internetData.location && isSubmitted ? 'is-invalid border border-danger' : ''}`}
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
                                        'Update Internet Record'
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

export default EditInternetModal
