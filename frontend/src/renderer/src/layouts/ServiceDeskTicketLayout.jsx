import { FaPlus } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'

const tabs = [
    { tab: 'Unassigned Tickets', link: '/servicedesk/tickets/unassigned' },
    { tab: 'Open Tickets', link: '/servicedesk/tickets/opentickets' },
    { tab: 'In Progress Tickets', link: '/servicedesk/tickets/inprogress' },
    { tab: 'Closed Tickets', link: '/servicedesk/tickets/closed' },
    { tab: 'Failed Tickets', link: '/servicedesk/tickets/failed' },
    { tab: 'All Tickets', link: '/servicedesk/tickets/all' }
]

function ServiceDeskTicketLayout() {
    const listTabs = tabs.map((tab, index) => (
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
    ))

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    Service Desk
                </div>
                <div className="card-body">
                    <div className="col-xl-12 p-3">
                        <div className="navbar-expand-lg border rounded-pill mb-4">
                            <div className="collapse navbar-collapse p-2 my">
                                <div className="fw-bold fs-4 py-0 px-4 border-end me-3">
                                    My Tickets
                                </div>
                                <button className="btn btn-primary me-4">
                                    <FaPlus /> New Ticket
                                </button>
                                <ul className="nav nav-pills ms-auto">{listTabs}</ul>
                            </div>
                        </div>
                        <div className="shadow border rounded-4 p-4 w-100 bg-light-subtle">
                            {<Outlet />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ServiceDeskTicketLayout
