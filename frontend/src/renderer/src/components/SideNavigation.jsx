// import { NavLink, useLocation } from 'react-router-dom'
// import {
//     FaChartLine,
//     FaCog,
//     FaNetworkWired,
//     FaRegEyeSlash,
//     FaTicketAlt,
//     FaUser
// } from 'react-icons/fa'

// const pages = [
//     { page: 'Dashboard', link: '/dashboard', icon: <FaChartLine /> },
//     { page: 'Service Desk', link: '/servicedesk', icon: <FaTicketAlt /> },
//     { page: 'Employees', link: '/employees', icon: <FaUser /> },
//     { page: 'Directory', link: '/directory', icon: <FaNetworkWired /> },
//     { page: 'Settings', link: '/settings', icon: <FaCog /> },
//     { page: '404 Error', link: '/notfound', icon: <FaRegEyeSlash /> }
// ]

// function SideNavigation() {
//     const location = useLocation()

//     const listPages = pages.map((page, index) => (
//         <li className="nav-item" key={index}>
//             <NavLink
//                 className={({ isActive }) =>
//                     `nav-link d-flex justify-content-start align-items-center ${isActive || location.pathname.startsWith('/' + page.link) ? 'active' : 'link-body-emphasis'}`
//                 }
//                 to={page.link}
//             >
//                 <div className="">{page.icon}</div>
//                 <div className="d-md-inline d-none me-5 ms-2">{page.page}</div>
//             </NavLink>
//         </li>
//     ))

//     return (
//         <>
//             <div className="d-flex flex-column bg-light-subtle shadow-lg pt-5 sticky-top vh-100">
//                 <div className="flex-column nav nav-pills mb-auto">
//                     <div className="pt-4 px-2 px-md-4">
//                         <ul className="list-unstyled text-nowrap">{listPages}</ul>
//                     </div>
//                 </div>

//                 <div className="bg-primary border p-2 text-center text-white mt-auto small">
//                     &copy; 2025 Goldnines
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SideNavigation

import { NavLink, useLocation } from 'react-router-dom'
import {
    FaChartLine,
    FaCog,
    FaNetworkWired,
    FaRegEyeSlash,
    FaTicketAlt,
    FaUser
} from 'react-icons/fa'

const pages = [
    {
        page: 'Dashboard',
        link: '/dashboard',
        icon: <FaChartLine />,
        subPages: [
            { name: 'Overview', link: '/dashboard/overview' },
            { name: 'Activities', link: '/dashboard/activities' },
            { name: 'Reports', link: '/dashboard/reports' }
        ]
    },
    {
        page: 'Service Desk',
        link: '/servicedesk',
        icon: <FaTicketAlt />,
        subPages: [
            { name: 'Overview', link: '/servicedesk/overview' },
            { name: 'Tickets', link: '/servicedesk/tickets' },
            { name: 'Reports', link: '/servicedesk/reports' }
        ]
    },
    {
        page: 'Employees',
        link: '/employees',
        icon: <FaUser />,
        subPages: [
            { name: 'All Employees', link: '/employees/all' },
            { name: 'Employee Directory', link: '/employees/directory' },
            { name: 'Roles & Permissions', link: '/employees/roles' },
            { name: 'Activity Logs', link: '/employees/logs' },
            { name: 'Performance Tracking', link: '/employees/performance' }
        ]
    },
    {
        page: 'Directory',
        link: '/directory',
        icon: <FaNetworkWired />,
        subPages: [
            { name: 'Employees', link: '/directory/employees' },
            { name: 'Department', link: '/directory/departments' },
            { name: 'Telephone', link: '/directory/telephones' },
            { name: 'IP Address', link: '/directory/ipaddress' },
            { name: 'Anydesk', link: '/directory/anydesk' },
            { name: 'PC Name', link: '/directory/pcname' },
            { name: 'Printers', link: '/directory/printers' }
        ]
    },
    { page: 'Settings', link: '/settings', icon: <FaCog /> },
    { page: '404 Error', link: '/notfound', icon: <FaRegEyeSlash /> }
]

function SideNavigation() {
    const location = useLocation()

    return (
        <div
            className="d-flex flex-column bg-light-subtle shadow-lg pt-5 sticky-top vh-100"
            style={{ width: '250px' }}
        >
            <div className="flex-grow-1 p-3 overflow-auto">
                <ul className="flex-column nav p-2">
                    {pages.map((page, index) => {
                        const isActive = location.pathname.startsWith(page.link)
                        const collapseId = `collapse-${index}`

                        return (
                            <li key={index} className="mb-1">
                                {page.subPages ? (
                                    <>
                                        <NavLink
                                            to={page.link}
                                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${isActive ? 'text-light bg-primary' : 'text-light-emphasis'}`}
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${collapseId}`}
                                            aria-expanded={isActive ? 'true' : 'false'}
                                        >
                                            {page.icon}
                                            <span className="ms-2">{page.page}</span>
                                            <i
                                                className={`bi ms-auto ${isActive ? 'bi-chevron-down' : 'bi-chevron-right'}`}
                                            ></i>
                                        </NavLink>

                                        <div
                                            className={`collapse ${isActive ? 'show' : ''}`}
                                            id={collapseId}
                                        >
                                            <ul className="flex-column nav ms-4 mt-1">
                                                {page.subPages.map((subPage, subIndex) => (
                                                    <li key={subIndex}>
                                                        <NavLink
                                                            to={subPage.link}
                                                            className={({ isActive }) =>
                                                                `nav-link text-light-emphasis ps-4 border-start my-1 p-1 ${isActive ? 'text-decoration-underline underline-offset-8 fw-bold' : ''}`
                                                            }
                                                        >
                                                            {subPage.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <NavLink
                                        to={page.link}
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${isActive ? 'bg-primary text-white' : 'text-light-emphasis'}`}
                                    >
                                        {page.icon} <span className="ms-2">{page.page}</span>
                                    </NavLink>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="bg-primary border p-2 text-center text-white mt-auto small">
                &copy; 2025 Goldnines
            </div>
        </div>
    )
}

export default SideNavigation
