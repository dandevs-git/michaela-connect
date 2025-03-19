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
//                 <div className="d-none d-md-inline ms-2 me-5">{page.page}</div>
//             </NavLink>
//         </li>
//     ))

//     return (
//         <>
//             <div className="pt-5 d-flex flex-column sticky-top vh-100 bg-light-subtle shadow-lg">
//                 <div className="nav nav-pills flex-column mb-auto">
//                     <div className="px-2 px-md-4 pt-4">
//                         <ul className="text-nowrap list-unstyled">{listPages}</ul>
//                     </div>
//                 </div>

//                 <div className="text-center p-2 bg-primary text-white small mt-auto border">
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
            { name: 'Reports', link: '/dashboard/reports' }
        ]
    },
    {
        page: 'Service Desk',
        link: '/servicedesk',
        icon: <FaTicketAlt />,
        subPages: [
            { name: 'All Tickets', link: '/servicedesk/all' },
            { name: 'New Tickets', link: '/servicedesk/new' }
        ]
    },
    { page: 'Employees', link: '/employees', icon: <FaUser /> },
    { page: 'Directory', link: '/directory', icon: <FaNetworkWired /> },
    { page: 'Settings', link: '/settings', icon: <FaCog /> },
    { page: '404 Error', link: '/notfound', icon: <FaRegEyeSlash /> }
]

function SideNavigation() {
    const location = useLocation()

    return (
        <div
            className="pt-5 d-flex flex-column sticky-top vh-100 bg-light-subtle shadow-lg"
            style={{ width: '250px' }}
        >
            <div className="flex-grow-1 overflow-auto p-3">
                <ul className="nav flex-column p-2">
                    {pages.map((page, index) => {
                        const isActive = location.pathname.startsWith(page.link)
                        const collapseId = `collapse-${index}`

                        return (
                            <li key={index} className="mb-1">
                                {page.subPages ? (
                                    <>
                                        <NavLink
                                            to={page.link}
                                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${isActive ? 'bg-primary' : 'text-light-emphasis'}`}
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${collapseId}`}
                                            aria-expanded={isActive ? 'true' : 'false'}
                                        >
                                            {page.icon} <span className="ms-2">{page.page}</span>
                                        </NavLink>

                                        <div
                                            className={`collapse ${isActive ? 'show' : ''}`}
                                            id={collapseId}
                                        >
                                            <ul className="nav flex-column ms-3 border-start ps-2 mt-1">
                                                {page.subPages.map((subPage, subIndex) => (
                                                    <li key={subIndex}>
                                                        <NavLink
                                                            to={subPage.link}
                                                            className={({ isActive }) =>
                                                                `nav-link d-inline-flex align-items-center px-3 py-2 rounded text-light-emphasis ${isActive ? 'bg-light-subtle text-primary fw-bold text-underline' : 'text-light-emphasis'}`
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
            <div className="text-center p-2 bg-primary text-white small mt-auto border">
                &copy; 2025 Goldnines
            </div>
        </div>
    )
}

export default SideNavigation
