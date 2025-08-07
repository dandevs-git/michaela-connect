import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { FaPlus } from 'react-icons/fa'
import CreatableSelect from 'react-select/creatable'
import { COLORS, selectStyles } from '../../constants/config'

function AddInternetModal({ id, refreshList }) {
    const { postData, getData } = useAPI()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [internetList, setInternetList] = useState([])
    const [internetData, setInternetData] = useState({
        name: '',
        provider: '',
        gateway: '',
        cable_code: '',
        location: '',
        description: ''
    })

    useEffect(() => {
        getData('/internet', setInternetList, () => {}, setError)
    }, [])

    const providerOptions = Array.from(
        new Set(internetList.map((item) => item.provider).filter(Boolean))
    ).map((provider) => ({
        value: provider,
        label: provider
    }))

    const gatewayOptions = Array.from(
        new Set(internetList.map((item) => item.gateway).filter(Boolean))
    ).map((gateway) => ({
        value: gateway,
        label: gateway
    }))

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

        const response = await postData('/internet', internetData, () => {}, setLoading, setError)

        if (response) {
            // Modal.getInstance(modalRef.current)?.hide()
            modalRef.current.querySelector('[data-bs-dismiss="modal"]').click()
            resetForm()
            refreshList?.()
        }
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
                                    <div className="invalid-feedback">
                                        Please enter the internet line name.
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="provider" className="form-label">
                                        Provider / Device
                                    </label>
                                    <CreatableSelect
                                        inputId="provider"
                                        name="provider"
                                        options={providerOptions}
                                        value={providerOptions.find(
                                            (option) => option.value === internetData.provider
                                        )}
                                        onChange={(selected) =>
                                            setInternetData((prev) => ({
                                                ...prev,
                                                provider: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!internetData.provider || !isSubmitted
                                        )}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-2 ${!internetData.provider && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        Please enter the provider name.
                                    </div>
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
                                            (option) => option.value === internetData.gateway
                                        )}
                                        onChange={(selected) =>
                                            setInternetData((prev) => ({
                                                ...prev,
                                                gateway: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!internetData.gateway || !isSubmitted
                                        )}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-2 ${!internetData.gateway && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />

                                    {/* <input
                                        type="text"
                                        className="form-control"
                                        id="gateway"
                                        name="gateway"
                                        value={internetData.gateway}
                                        onChange={handleInputChange}
                                        required
                                    /> */}
                                    <div className="invalid-feedback">
                                        Please enter the gateway address.
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
