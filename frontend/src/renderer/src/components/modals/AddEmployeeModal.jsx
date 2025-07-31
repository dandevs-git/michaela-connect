import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { FaEye, FaPlus, FaClipboard, FaCheckCircle, FaArrowRight, FaEyeSlash } from 'react-icons/fa'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'

function AddEmployeeModal({ id, refreshList }) {
    const { postData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    const [copied, setCopied] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [saved, setSaved] = useState(false)

    const rfidRef = useRef(null)
    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [employeeData, setEmployeeData] = useState({
        rfid: '',
        name: '',
        role: '',
        position: '',
        department_id: ''
    })

    const [newEmployeeData, setNewEmployeeData] = useState({
        rfid: '',
        username: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const resetForm = () => {
        setEmployeeData({
            rfid: '',
            name: '',
            role: '',
            position: '',
            department_id: ''
        })
        setError('')
        formRef.current?.classList.remove('was-validated')
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

    useEffect(() => {
        getData('/departments', setDepartments, () => {}, setError)
        getData('/roles', setRoles, () => {}, setError)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        form.classList.remove('was-validated')
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        const response = await postData(
            '/users',
            employeeData,
            setEmployeeData,
            setLoading,
            setError
        )

        if (response) {
            setNewEmployeeData(response?.user)
        }
    }

    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
            >
                <FaPlus /> New Employee
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
                                Add New Employee
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body p-3">
                            {!newEmployeeData?.username ? (
                                <form
                                    className="row g-3 needs-validation p-3"
                                    noValidate
                                    onSubmit={handleSubmit}
                                    ref={formRef}
                                >
                                    {/* {error && (
                                        <div className="alert alert-danger text-center py-2">
                                            {error}
                                        </div>
                                    )} */}

                                    <div className="col-md-12">
                                        <label htmlFor="employeeRfid" className="form-label">
                                            RFID
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="employeeRfid"
                                            name="rfid"
                                            value={employeeData.rfid}
                                            onChange={handleInputChange}
                                            ref={rfidRef}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter RFID.</div>
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="employeeName" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="employeeName"
                                            name="name"
                                            value={employeeData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter a name.</div>
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="employeePosition" className="form-label">
                                            Position
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="employeePosition"
                                            name="position"
                                            value={employeeData.position}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Please enter a position.
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="employeeRole" className="form-label">
                                            Role
                                        </label>
                                        <select
                                            className="form-select text-capitalize"
                                            id="employeeRole"
                                            name="role"
                                            value={employeeData.role}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Role
                                            </option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.name}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a role.
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="employeeDepartment" className="form-label">
                                            Department
                                        </label>
                                        <select
                                            className="form-select text-capitalize"
                                            id="employeeDepartment"
                                            name="department_id"
                                            value={employeeData.department_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Department
                                            </option>
                                            {departments.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">
                                            Please choose a department.
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
                                                    ></span>
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Add Employee'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="modal-body p-4 text-center">
                                    <p className="fw-semibold text-secondary text-uppercase mb-2">
                                        Employee Credentials Created
                                    </p>

                                    <div className="bg-light border rounded px-3 py-2 mb-2 text-break small text-start">
                                        <div className="d-flex align-items-center">
                                            <strong className="me-2">Username:</strong>
                                            {newEmployeeData.username}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <strong className="me-2">Password:</strong>
                                            {showPassword ? newEmployeeData.password : '••••••••••'}
                                            <button
                                                className="btn btn-sm border-1 btn-primary ms-auto"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <>
                                                        <FaEyeSlash className="me-1" size={14} />
                                                        Show
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaEye className="me-1" size={14} />
                                                        Hide
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-outline-secondary btn-sm d-flex align-items-center mx-auto mb-2"
                                        onClick={() => {
                                            const text = `Username: ${newEmployeeData.username}\nPassword: ${newEmployeeData.password}`
                                            navigator.clipboard.writeText(text)
                                            setCopied(true)
                                            setTimeout(() => setCopied(false), 2000)
                                            setSaved(true)
                                        }}
                                    >
                                        {copied ? (
                                            <>
                                                <FaCheckCircle className="me-2" size={16} />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaClipboard className="me-2" size={16} />
                                                Copy to Clipboard
                                            </>
                                        )}
                                    </button>

                                    <small className="d-block text-danger mb-4">
                                        Please save this information securely.
                                    </small>

                                    <button
                                        className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
                                        onClick={() => {
                                            // Modal.getInstance(modalRef.current)?.hide()
                                            modalRef.current
                                                .querySelector('[data-bs-dismiss="modal"]')
                                                .click()
                                            resetForm()
                                            refreshList?.()
                                        }}
                                        disabled={!saved}
                                    >
                                        I’ve Saved This
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEmployeeModal
