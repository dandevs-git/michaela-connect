import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal, Toast } from 'bootstrap/dist/js/bootstrap.bundle.min'

function CreateTicketModal({ id, resetTickets, resetLoading, resetError }) {
    const { addTicket, getData } = useAPI()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [departments, setDepartments] = useState([])
    const [priorities, setPriorities] = useState([])

    const toastRef = useRef(null)
    const modalRef = useRef(null)

    const [ticketData, setTicketData] = useState({
        title: '',
        description: '',
        priority_id: '',
        department_id: ''
    })

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
        setMessage('')
        setError('')
        form.classList.remove('was-validated')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        setLoading(true)

        try {
            const response = await addTicket(ticketData)

            if (response?.ticket?.id) {
                setMessage('Ticket created successfully!')
                resetForm()

                getData('/tickets', resetTickets, resetLoading, resetError)

                const modalInstance = Modal.getInstance(modalRef.current)
                modalInstance?.hide()

                if (toastRef.current) {
                    const toast = new Toast(toastRef.current, { delay: 4000 })
                    toast.show()
                }
            } else {
                setError(response?.message || 'Failed to create ticket.')
            }
        } catch (err) {
            setError(err?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData('/departments', setDepartments)
        getData('/priorities', setPriorities)
    }, [])

    useEffect(() => {
        const modalElement = modalRef.current

        const handleShown = () => document.getElementById('ticketTitle')?.focus()
        const handleHidden = resetForm

        modalElement?.addEventListener('shown.bs.modal', handleShown)
        modalElement?.addEventListener('hidden.bs.modal', handleHidden)

        return () => {
            modalElement?.removeEventListener('shown.bs.modal', handleShown)
            modalElement?.removeEventListener('hidden.bs.modal', handleHidden)
        }
    }, [])

    return (
        <>
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
                                        className={`alert text-center py-2 ${
                                            error ? 'alert-danger' : 'alert-success'
                                        }`}
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
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        PleaddTicketModalase enter a title.
                                    </div>
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
                                        rows="6"
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

            <div className="toast-container position-fixed top-50 start-50 translate-middle p-3">
                <div
                    id="liveToast"
                    className="toast shadow-lg border-1 rounded-4 bg-light"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    ref={toastRef}
                >
                    <div className="toast-header rounded-top-4">
                        <strong className="me-auto">Success</strong>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="toast-body text-uppercase fw-semibold text-center fs-4 rounded-bottom-4">
                        {message || 'Ticket submitted successfully!'}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTicketModal
