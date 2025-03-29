import { FaPlus } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import CreateTicket from '../components/CreateTicket'

const tabs = [
    { tab: 'All Tickets', link: '/servicedesk/tickets/all' },
    { tab: 'Pending', link: '/servicedesk/tickets/pending' },
    { tab: 'Open', link: '/servicedesk/tickets/open' },
    { tab: 'In Progress', link: '/servicedesk/tickets/inprogress' },
    { tab: 'Resolved', link: '/servicedesk/tickets/resolved' },
    { tab: 'Closed', link: '/servicedesk/tickets/closed' },
    { tab: 'Failed', link: '/servicedesk/tickets/failed' }
]

function ServiceDeskTicketLayout() {
    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    Service Desk
                </div>

                <div className="card-body">
                    <div className="p-3">
                        <nav className="navbar navbar-expand-lg border rounded-pill mb-4 shadow">
                            <div className="container-fluid py-1 px-3">
                                <span className="fw-bold fs-4 py-0 px-4 border-end me-3">
                                    My Tickets
                                </span>
                                <button
                                    className="btn btn-primary me-4"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addTicketModal"
                                >
                                    <FaPlus /> New Ticket
                                </button>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ticketTabs"
                                    aria-controls="ticketTabs"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="ticketTabs">
                                    <ul className="nav nav-pills ms-auto">
                                        {tabs.map((tab, index) => (
                                            <li className="nav-item" key={index}>
                                                <NavLink
                                                    className={({ isActive }) =>
                                                        `nav-link rounded-pill ${isActive ? 'active' : 'link-body-emphasis bg-light-subtle'}`
                                                    }
                                                    to={tab.link}
                                                >
                                                    <span className="mx-2">{tab.tab}</span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className="shadow border rounded-4 p-4 w-100 bg-light-subtle">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            <CreateTicket />
        </>
    )
}

export default ServiceDeskTicketLayout
