import { useState, useEffect } from 'react'
import { useAPI } from '../contexts/APIContext'
import { Modal, Toast } from 'bootstrap/dist/js/bootstrap.bundle.min'

function CreateTicket() {
    const { addTicket, fetchData } = useAPI()
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [message, setMessage] = useState('')
    const [departments, setDepartments] = useState([])
    const [priorities, setPriorities] = useState([])
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        setMessage('')
        form.classList.remove('was-validated')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        setLoadingBtn(true)

        try {
            const response = await addTicket(ticketData)

            if (response?.ticket?.id) {
                setMessage('✅ Ticket created successfully.')

                setTicketData({
                    title: '',
                    description: '',
                    priority_id: '',
                    department_id: ''
                })

                // Hide Modal
                const modalElement = document.getElementById('addTicketModal')
                const modalInstance = Modal.getInstance(modalElement)
                modalInstance?.hide()

                // Refresh Ticket List
                await fetchData('/tickets')

                // Show Toast
                const toastElement = document.getElementById('liveToast')
                if (toastElement) {
                    const toastInstance = new Toast(toastElement)
                    toastInstance.show()
                }
            } else {
                setMessage(response?.message || '❌ Failed to create ticket. Please try again.')
            }
        } catch (error) {
            setMessage(error?.message || '❌ An error occurred. Please try again.')
        } finally {
            setLoadingBtn(false)
        }
    }

    useEffect(() => {
        const fetchDropdownData = async () => {
            await fetchData('/departments', setDepartments)
            await fetchData('/priorities', setPriorities)
        }
        fetchDropdownData()
    }, [])

    useEffect(() => {
        const modalElement = document.getElementById('addTicketModal')

        const handleModalShown = () => {
            document.getElementById('ticketTitle')?.focus()
        }

        const handleModalHidden = () => {
            setMessage('')
            setTicketData({
                title: '',
                description: '',
                priority_id: '',
                department_id: ''
            })
            document.querySelector('.needs-validation')?.classList.remove('was-validated')
        }

        modalElement?.addEventListener('shown.bs.modal', handleModalShown)
        modalElement?.addEventListener('hidden.bs.modal', handleModalHidden)

        return () => {
            modalElement?.removeEventListener('shown.bs.modal', handleModalShown)
            modalElement?.removeEventListener('hidden.bs.modal', handleModalHidden)
        }
    }, [])

    return (
        <>
            <div
                className="modal fade"
                id="addTicketModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase fw-semibold">
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
                                {message && <div className="alert text-center py-1">{message}</div>}

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
                                        Please enter a ticket title.
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
                                        Please select a department.
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
                                        Please select priority level.
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
                                        rows="7"
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
                                        className="btn btn-primary text-light"
                                        disabled={loadingBtn}
                                    >
                                        {loadingBtn ? (
                                            <>
                                                <span
                                                    className="spinner-grow spinner-grow-sm"
                                                    aria-hidden="true"
                                                ></span>
                                                <span className="ms-2">Submitting...</span>
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
                    className="toast align-items-center shadow-lg border-1 fw-semibold rounded-3 bg-light"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header rounded-top-3">
                        <strong className="me-auto">Notification</strong>
                        <small>11 mins ago</small>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="toast-body text-center w-100 p-3 rounded-bottom-3 fs-3 text-uppercase">
                        Successfully created the ticket!
                    </div>
                </div>
            </div>

            {/* <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div
                    id="liveToast"
                    className="toast align-items-center text-bg-primary border-0"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            {message || 'Successfully created the ticket!'}
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default CreateTicket
