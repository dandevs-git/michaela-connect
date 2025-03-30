import { FaPlus } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import CreateTicket from '../components/CreateTicket'
import { useAPI } from '../contexts/APIContext'
import { useEffect, useState } from 'react'

const tabs = [
    { tab: 'All Tickets', link: '/servicedesk/tickets/all', role: ['admin', 'manager', 'head'] },
    {
        tab: 'Pending',
        link: '/servicedesk/tickets/pending',
        role: ['admin', 'manager', 'staff', 'head']
    },
    { tab: 'New', link: '/servicedesk/tickets/new', role: ['admin', 'manager', 'staff'] },
    { tab: 'Open', link: '/servicedesk/tickets/open' },
    { tab: 'In Progress', link: '/servicedesk/tickets/inprogress' },
    { tab: 'Resolved', link: '/servicedesk/tickets/resolved' },
    { tab: 'Closed', link: '/servicedesk/tickets/closed' },
    { tab: 'Failed', link: '/servicedesk/tickets/failed' },
    { tab: 'Reject', link: '/servicedesk/tickets/rejected', role: ['admin'] }
]

function ServiceDeskTicketLayout() {
    const { fetchData } = useAPI()
    const [userRole, setUserRole] = useState([])

    useEffect(() => {
        fetchData('/role', setUserRole)
    }, [])

    const filteredTabs = tabs.filter(
        (tab) => !tab.role || tab.role.some((r) => userRole?.includes(r))
    )

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    My Tickets
                </div>

                <div className="card-body">
                    <div className="p-3">
                        <nav className="navbar navbar-expand-lg mb-4 border rounded-pill shadow ">
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
                                        {filteredTabs.map((tab, index) => (
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

                        <Outlet />
                    </div>
                </div>
            </div>

            <CreateTicket />
        </>
    )
}

export default ServiceDeskTicketLayout

// import { NavLink, useLocation } from 'react-router-dom';
// import TicketsTable from '../components/TicketsTable';
// import CreateTicket from '../components/CreateTicket';

// const tabs = [
//     { tab: 'All Tickets', link: '/servicedesk/tickets/all', status: '' },
//     { tab: 'Pending', link: '/servicedesk/tickets/pending', status: 'pending' },
//     { tab: 'New', link: '/servicedesk/tickets/new', status: 'new' },
//     { tab: 'Open', link: '/servicedesk/tickets/open', status: 'open' },
//     { tab: 'In Progress', link: '/servicedesk/tickets/inprogress', status: 'in_progress' },
//     { tab: 'Resolved', link: '/servicedesk/tickets/resolved', status: 'resolved' },
//     { tab: 'Closed', link: '/servicedesk/tickets/closed', status: 'closed' },
//     { tab: 'Failed', link: '/servicedesk/tickets/failed', status: 'failed' },
//     { tab: 'Rejected', link: '/servicedesk/tickets/rejected', status: 'rejected' }
// ];

// function ServiceDeskTicketLayout() {
//     const location = useLocation()
//     const currentTab = tabs.find((tab) => location.pathname.includes(tab.link)) || tabs[0]
//     const endpoint = currentTab.status ? `/tickets?status=${currentTab.status}` : '/tickets'

//     return (
//         <>
//             <div className="card shadow w-100">
//                 <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
//                     My Tickets
//                 </div>

//                 <div className="card-body">
//                     <div className="p-3">
//                         <nav className="navbar navbar-expand-lg border rounded-pill mb-4 shadow">
//                             <div className="container-fluid py-1 px-3">
//                                 <button
//                                     className="navbar-toggler"
//                                     type="button"
//                                     data-bs-toggle="collapse"
//                                     data-bs-target="#ticketTabs"
//                                     aria-controls="ticketTabs"
//                                     aria-expanded="false"
//                                     aria-label="Toggle navigation"
//                                 >
//                                     <span className="navbar-toggler-icon"></span>
//                                 </button>
//                                 <div className="collapse navbar-collapse" id="ticketTabs">
//                                     <ul className="nav nav-pills d-flex w-100">
//                                         {tabs.map((tab, index) => (
//                                             <li className="nav-item flex-grow-1 text-center" key={index}>
//                                                 <NavLink
//                                                     className={({ isActive }) =>
//                                                         `nav-link rounded-pill ${isActive ? 'active' : 'link-body-emphasis bg-light-subtle'}`
//                                                     }
//                                                     to={tab.link}
//                                                 >
//                                                     <span className="mx-2">{tab.tab}</span>
//                                                 </NavLink>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </nav>

//                         <TicketsTable endpoint={endpoint} title={currentTab.tab} />
//                     </div>
//                 </div>
//             </div>

//             <CreateTicket />
//         </>
//     );
// }

// export default ServiceDeskTicketLayout;
