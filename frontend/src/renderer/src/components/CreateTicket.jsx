import { useState, useEffect } from 'react'
import { useAPI } from '../contexts/APIContext'

function CreateTicket() {
    const { addTicket, fetchData } = useAPI()
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [message, setMessage] = useState('')
    const [departments, setDepartments] = useState([])
    const [ticketData, setTicketData] = useState({
        title: '',
        description: '',
        priority: 'normal',
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

            if (response?.success) {
                setMessage('Ticket created successfully.')

                setTicketData({
                    title: '',
                    description: '',
                    priority: 'normal',
                    department_id: ''
                })

                const modalElement = document.getElementById('addTicketModal')
                const modalInstance = bootstrap.Modal.getInstance(modalElement)
                modalInstance?.hide()
            } else {
                setMessage(response?.message || 'Failed to create ticket.')
            }
        } catch (error) {
            setMessage(error?.message || 'An error occurred. Please try again.')
        } finally {
            setLoadingBtn(false)
        }
    }

    useEffect(() => {
        fetchData('/departments', setDepartments)
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
                priority: 'normal',
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
                className="modal fade static"
                id="addTicketModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create New Ticket</h5>
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
                                {message && (
                                    <div className="alert alert-danger text-center py-1">
                                        {message}
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
                                        name="priority"
                                        value={ticketData.priority}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="priority">Priority</option>
                                        <option value="urgent">Urgent</option>
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
                                        rows="3"
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
                                        className="btn btn-success text-light"
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
        </>
    )
}
export default CreateTicket
