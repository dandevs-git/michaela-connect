import { FaPlus } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import CreateTicket from '../components/CreateTicket'
import { useAPI } from '../contexts/APIContext'

const tabs = [
    {
        tab: 'All Tickets',
        link: '/servicedesk/tickets/all',
        roles: ['admin', 'staff', 'head', 'manager']
    },
    { tab: 'Pending', link: '/servicedesk/tickets/pending', roles: ['admin', 'head'] },
    { tab: 'New', link: '/servicedesk/tickets/new', roles: ['admin', 'head'] },
    { tab: 'Open', link: '/servicedesk/tickets/open', roles: ['admin', 'head', 'staff'] },
    {
        tab: 'In Progress',
        link: '/servicedesk/tickets/inprogress',
        roles: ['admin', 'staff', 'head']
    },
    {
        tab: 'Resolved',
        link: '/servicedesk/tickets/resolved',
        roles: ['admin', 'staff', 'head', 'manager']
    },
    {
        tab: 'Closed',
        link: '/servicedesk/tickets/closed',
        roles: ['admin', 'staff', 'head', 'manager']
    },
    { tab: 'Failed', link: '/servicedesk/tickets/failed', roles: ['admin', 'manager', 'staff'] },
    { tab: 'Rejected', link: '/servicedesk/tickets/rejected', roles: ['admin', 'manager'] }
]

function ServiceDeskTicketLayout() {
    const { authenticatedUserDetails } = useAPI()
    const userRole = authenticatedUserDetails?.role

    const visibleTabs = tabs.filter((tab) => !tab.roles || tab.roles.includes(userRole))

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    My Tickets
                </div>

                <div className="card-body">
                    <div className="p-3">
                        <nav className="navbar navbar-expand-lg mb-4 border rounded-pill shadow">
                            <div className="px-2">
                                <button
                                    className="btn btn-primary text-nowrap mx-2 border-end rounded-start-pill"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addTicketModal"
                                >
                                    <FaPlus /> New Ticket
                                </button>
                            </div>
                            <div className="vr"></div>
                            <div className="px-4 w-100">
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
                                    <ul className="nav nav-pills d-flex w-100">
                                        {visibleTabs.map((tab, index) => (
                                            <li
                                                className="nav-item flex-grow-1 text-center"
                                                key={index}
                                            >
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

                        <div className="bg-light-subtle border p-4 rounded-4 shadow m-0 flex-grow-1">
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
