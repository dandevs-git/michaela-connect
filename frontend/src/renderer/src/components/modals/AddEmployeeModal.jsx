import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import { useToast } from '../../contexts/ToastContext'

function AddEmployeeModal({ id, resetEmployee, resetLoading, resetError }) {
    const { postData, getData } = useAPI()
    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])

    const rfidRef = useRef(null)
    const modalRef = useRef(null)

    const [employeeData, setEmployeeData] = useState({
        rfid: '',
        name: '',
        role: '',
        department_id: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEmployeeData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setEmployeeData({
            rfid: '',
            name: '',
            role: 'staff',
            department_id: ''
        })
        setMessage('')
        setError('')
        document.querySelector('.needs-validation')?.classList.remove('was-validated')
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        form.classList.remove('was-validated')
        setMessage('')
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        postData('/users', employeeData, setEmployeeData, setLoading, setError)
        Modal.getInstance(modalRef.current).hide()
        resetForm()
        showToast({
            message: 'Employee added successfully!',
            title: 'Success',
            isPositive: true,
            delay: 5000
        })

        getData('/users', resetEmployee, resetLoading, resetError)
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
                            <form
                                className="row g-3 needs-validation p-3"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                {(message || error) && (
                                    <div
                                        className={`alert text-center py-2 ${error ? 'alert-danger' : 'alert-success'}`}
                                    >
                                        {error || message}
                                    </div>
                                )}

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
                                    <div className="invalid-feedback">Please select a role.</div>
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
                                                    aria-hidden="true"
                                                ></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Add Employee'
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

export default AddEmployeeModal
