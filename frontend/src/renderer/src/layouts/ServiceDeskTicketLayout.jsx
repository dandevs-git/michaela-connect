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
                    `nav-link rounded-pill ${isActive ? 'active' : 'link-body-emphasis'}`
                }
                to={tab.link}
            >
                <div className="mx-2">{tab.tab}</div>
            </NavLink>
        </li>
    ))

    return (
        <>
            <div className="col-xl-12 p-3 d-flex">
                <div className="">
                    <div className="nav nav-pills shadow border rounded-4 pt-2 bg-light-subtle">
                        <div className="">
                            <div className="d-flex justify-content-center align-items-center p-3 text-nowrap">
                                <div className="fw-bold fs-4 py-0 px-2 text-start">My Tickets</div>
                                <div className="btn btn-sm btn-primary ms-2">+ New Ticket</div>
                            </div>
                            <hr className="my-1" />
                            <ul className="text-nowrap list-unstyled px-2 px-md-4 my-4 ">
                                {listTabs}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="shadow border rounded-4 p-4 ms-4 w-100 bg-light-subtle">
                    {<Outlet />}
                </div>
            </div>
        </>
    )
}
export default ServiceDeskTicketLayout
