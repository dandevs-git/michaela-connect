import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import Select from 'react-select'
import { COLORS, selectStyles } from '../../constants/config'

function AddPrinterModal({ id, refreshList }) {
    const { postData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [users, setUsers] = useState([])
    const [printerData, setPrinterData] = useState({
        user_id: '',
        name: '',
        inkcode: ''
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
        setPrinterData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setPrinterData({
            user_id: '',
            name: '',
            inkcode: ''
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

        const response = await postData('/printers', printerData, () => {}, setLoading, setError)

        if (response) {
            setIsSubmitted(false)
            resetForm()
            Modal.getInstance(modalRef.current)?.hide()
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
                <FaPlus /> New Printer
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
                                Add New Printer
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
                                    <label htmlFor="user_id" className="form-label">
                                        User
                                    </label>
                                    <Select
                                        inputId="user_id"
                                        name="user_id"
                                        options={userOptions}
                                        value={userOptions.find(
                                            (option) => option.value === printerData.user_id
                                        )}
                                        onChange={(selected) =>
                                            setPrinterData((prev) => ({
                                                ...prev,
                                                user_id: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!printerData?.user_id || !isSubmitted || ''
                                        )}
                                        classNamePrefix="react-select"
                                        className={`form-control p-0 border-0 z-3 ${
                                            !printerData?.user_id && isSubmitted
                                                ? 'is-invalid border border-danger'
                                                : ''
                                        }`}
                                    />
                                    <div className="invalid-feedback">Please select a user.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="name" className="form-label">
                                        Printer Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={printerData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter a unique printer name.
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="inkcode" className="form-label">
                                        Ink Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inkcode"
                                        name="inkcode"
                                        value={printerData.inkcode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter an ink code.
                                    </div>
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
                                                />
                                                Submitting...
                                            </>
                                        ) : (
                                            'Add Printer'
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

export default AddPrinterModal
