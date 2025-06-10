import { NavLink, Outlet } from 'react-router-dom'
import { useAPI } from '../contexts/APIContext'

function ServiceDeskTicketLayout() {
    const { authUser } = useAPI()

    const tabs = [
        {
            tab: 'All Tickets',
            link: '/service-desk/tickets/all',
            permission: 'view all tickets tab'
        },
        {
            tab: 'Pending',
            link: '/service-desk/tickets/pending',
            permission: 'view pending tickets tab'
        },
        { tab: 'New', link: '/service-desk/tickets/new', permission: 'view new tickets tab' },
        { tab: 'Open', link: '/service-desk/tickets/open', permission: 'view open tickets tab' },
        {
            tab: 'In Progress',
            link: '/service-desk/tickets/inprogress',
            permission: 'view inprogress tickets tab'
        },
        {
            tab: 'Resolved',
            link: '/service-desk/tickets/resolved',
            permission: 'view resolved tickets tab'
        },
        {
            tab: 'Closed',
            link: '/service-desk/tickets/closed',
            permission: 'view closed tickets tab'
        },
        {
            tab: 'Failed',
            link: '/service-desk/tickets/failed',
            permission: 'view failed tickets tab'
        },
        {
            tab: 'Rejected',
            link: '/service-desk/tickets/rejected',
            permission: 'view rejected tickets tab'
        }
    ]
    const visibleTabs = tabs.filter(
        (tab) => !tab.permission || authUser?.all_permissions?.includes(tab.permission)
    )

    return (
        <div className="card shadow w-100">
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                My Tickets
            </div>

            <div className="card-body">
                <div className="p-3">
                    <nav className="navbar navbar-expand-lg mb-4 border rounded-pill shadow">
                        <div className="px-3 w-100">
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
                                                    `nav-link rounded-pill ${
                                                        isActive
                                                            ? 'active'
                                                            : 'link-body-emphasis bg-light-subtle'
                                                    }`
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

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ServiceDeskTicketLayout
