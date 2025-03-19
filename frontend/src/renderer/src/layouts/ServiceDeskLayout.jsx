import { NavLink, Outlet } from 'react-router-dom'

function ServiceDeskLayout() {
    const tabs = [
        { tab: 'Overview', link: '/servicedesk/overview' },
        { tab: 'Tickets', link: '/servicedesk/tickets' },
        { tab: 'Reporting', link: '/servicedesk/reports' }
    ]

    const listTabs = tabs.map((tab, index) => (
        <li className="nav-item" key={index}>
            <NavLink
                className={({ isActive }) =>
                    `nav-link px-5 rounded-pill ${isActive ? 'active' : 'link-body-emphasis'}`
                }
                to={tab.link}
            >
                {tab.tab}
            </NavLink>
        </li>
    ))

    return (
        <>
            <div className="card shadow text-center w-100">
                <div className="card-header text-uppercase fw-semibold fs-3 text-light bg-primary">
                    Service Desk
                </div>
                <div className="card-body">
                    <div className="shadow border rounded-pill p-2 bg-body-tertiary d-flex w-100 bg-light-subtle">
                        <ul className="nav nav-pills flex-row">{listTabs}</ul>
                    </div>

                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default ServiceDeskLayout
