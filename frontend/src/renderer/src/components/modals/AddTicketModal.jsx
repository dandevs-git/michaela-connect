import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import { useToast } from '../../contexts/ToastContext'
import { useLocation, useNavigate } from 'react-router-dom'

function AddTicketModal({ id, refreshList }) {
    const { postData, getData } = useAPI()
    const { showToast } = useToast()
    const navigate = useNavigate()
    const location = useLocation()

    const modalRef = useRef(null)
    const titleRef = useRef(null)

    const [ticketData, setTicketData] = useState({
        title: '',
        description: '',
        priority_id: '',
        department_id: ''
    })

    const [departments, setDepartments] = useState([])
    const [priorities, setPriorities] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        getData('/departments', setDepartments, () => {}, setError)
        getData('/priorities', setPriorities, () => {}, setError)
    }, [])

    useEffect(() => {
        const modalEl = modalRef.current
        if (!modalEl) return
        const handleShown = () => titleRef.current?.focus()
        modalEl.addEventListener('shown.bs.modal', handleShown)
        return () => modalEl.removeEventListener('shown.bs.modal', handleShown)
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTicketData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setTicketData({
            title: '',
            description: '',
            priority_id: '',
            department_id: ''
        })
        setMessage('')
        setError('')
        document.querySelector('.needs-validation')?.classList.remove('was-validated')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        form.classList.remove('was-validated')
        setMessage('')
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        const response = await postData('/tickets', ticketData, setTicketData, setLoading, setError)

        if (response) {
            Modal.getInstance(modalRef.current).hide()
            resetForm()
            showToast({
                message: 'Ticket submitted successfully!',
                title: 'Success',
                isPositive: true,
                delay: 5000
            })
            refreshList?.()
            navigate('/servicedesk/tickets/all', { replace: true })
        }
    }

    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
            >
                <FaPlus className="me-1" />
                New Ticket
            </button>

            <div
                className="modal modal-lg fade"
                id={id}
                tabIndex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-semibold text-uppercase">
                                Create New Ticket
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
                                    <label htmlFor="ticketTitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ticketTitle"
                                        name="title"
                                        value={ticketData.title}
                                        onChange={handleInputChange}
                                        ref={titleRef}
                                        required
                                    />
                                    <div className="invalid-feedback">Please enter a title.</div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="ticketDepartment" className="form-label">
                                        Department
                                    </label>
                                    <select
                                        className="form-select"
                                        id="ticketDepartment"
                                        name="department_id"
                                        value={ticketData.department_id}
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

                                <div className="col-md-6">
                                    <label htmlFor="ticketPriority" className="form-label">
                                        Priority
                                    </label>
                                    <select
                                        className="form-select"
                                        id="ticketPriority"
                                        name="priority_id"
                                        value={ticketData.priority_id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Priority
                                        </option>
                                        {priorities.map((priority) => (
                                            <option key={priority.id} value={priority.id}>
                                                {priority.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a priority.
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="ticketDescription" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="ticketDescription"
                                        name="description"
                                        rows="5"
                                        value={ticketData.description}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                    <div className="invalid-feedback">
                                        Please provide a description.
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
                                            'Submit Ticket'
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

export default AddTicketModal
