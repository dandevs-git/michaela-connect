import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import { useAPI } from '../contexts/APIContext'

// Ticket tab data
const tabs = [
    { tab: 'All Tickets', link: '/servicedesk/tickets/all' },
    { tab: 'Open', link: '/servicedesk/tickets/opentickets' },
    { tab: 'In Progress', link: '/servicedesk/tickets/inprogress' },
    { tab: 'Resolved', link: '/servicedesk/tickets/resolved' },
    { tab: 'Closed', link: '/servicedesk/tickets/closed' },
    { tab: 'Failed', link: '/servicedesk/tickets/failed' }
]

function ServiceDeskTicketLayout() {
    const { addTicket } = useAPI()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [ticketData, setTicketData] = useState({
        title: '',
        category: '',
        priority: 'Normal',
        description: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTicketData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // const handleLogin = async (e) => {
    //     e.preventDefault()
    //     setMessage('')
    //     setLoading(true)
    //     const response = await login(username, password)
    //     setMessage(response)
    //     setLoading(false)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setLoading(true)
        const response = await addTicket(ticketData)
        setMessage(response)
        setLoading(false)
    }

    useEffect(() => {
        const modal = document.getElementById('addTicketModal')
        modal?.addEventListener('shown.bs.modal', () => {
            document.getElementById('ticketTitle')?.focus()
        })

        return () => modal?.removeEventListener('shown.bs.modal', () => {})
    }, [])

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    Service Desk
                </div>
                <div className="card-body">
                    <div className="col-xl-12 p-3">
                        <div className="navbar-expand-lg border rounded-pill mb-4">
                            <div className="collapse navbar-collapse p-2">
                                <div className="fw-bold fs-4 py-0 px-4 border-end me-3">
                                    My Tickets
                                </div>
                                <button
                                    className="btn btn-primary me-4"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addTicketModal"
                                >
                                    <FaPlus /> New Ticket
                                </button>
                                <ul className="nav nav-pills ms-auto">
                                    {tabs.map((tab, index) => (
                                        <li className="nav-item" key={index}>
                                            <NavLink
                                                className={({ isActive }) =>
                                                    `nav-link rounded-pill ${isActive ? 'active' : 'link-body-emphasis bg-light-subtle'}`
                                                }
                                                to={tab.link}
                                            >
                                                <div className="mx-2">{tab.tab}</div>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="shadow border rounded-4 p-4 w-100 bg-light-subtle">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addTicketModal" tabIndex="-1">
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
                                    <div
                                        className="alert small alert-danger text-center py-1"
                                        role="alert"
                                    >
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
                                    <label htmlFor="ticketCategory" className="form-label">
                                        Department
                                    </label>
                                    <select
                                        className="form-select"
                                        id="ticketCategory"
                                        name="category"
                                        value={ticketData.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Department
                                        </option>
                                        <option value="it">IT Department</option>
                                        <option value="hr">HR Department</option>
                                        <option value="accounting">Accounting Department</option>
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
                                        <option value="Normal">Normal</option>
                                        <option value="Priority">Priority</option>
                                        <option value="Urgent">Urgent</option>
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
                                        className="btn btn-success"
                                        // data-bs-dismiss="modal"
                                    >
                                        Submit Ticket
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

export default ServiceDeskTicketLayout
