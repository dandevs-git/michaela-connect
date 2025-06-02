import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import Select from 'react-select'
import { selectStyles } from '../../constants/config'

function AddDepartmentModal({ id, refreshList }) {
    const { postData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [departments, setDepartments] = useState([])

    const [departmentData, setDepartmentData] = useState({
        name: '',
        parent_id: ''
    })

    const modalRef = useRef(null)
    const formRef = useRef(null)

    useEffect(() => {
        getData('/departments', setDepartments, () => {}, setError)
    }, [])

    const parentOptions = departments.map((dept) => ({
        value: dept.id,
        label: dept.name
    }))

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setDepartmentData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setDepartmentData({
            name: '',
            parent_id: ''
        })
        setError('')
        setIsSubmitted(false)
        formRef.current?.classList.remove('was-validated')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        setIsSubmitted(true)
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        const response = await postData(
            '/departments',
            departmentData,
            () => {},
            setLoading,
            setError
        )

        if (response) {
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
                <FaPlus /> New Department
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
                                Add New Department
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
                                    <label htmlFor="departmentName" className="form-label">
                                        Department Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="departmentName"
                                        name="name"
                                        value={departmentData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter a department name.
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="parentDepartment" className="form-label">
                                        Parent Department (optional)
                                    </label>
                                    <Select
                                        inputId="parent_id"
                                        name="parent_id"
                                        options={parentOptions}
                                        value={parentOptions.find(
                                            (opt) => opt.value === departmentData.parent_id
                                        )}
                                        onChange={(selected) =>
                                            setDepartmentData((prev) => ({
                                                ...prev,
                                                parent_id: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!departmentData?.parent_id || !isSubmitted || '',
                                            false
                                        )}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className="form-control p-0 border-0 z-3"
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
                                            'Add Department'
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

export default AddDepartmentModal
