import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import logoBlack from '../assets/images/logos/logo-black.png'
import logoWhite from '../assets/images/logos/logo-white.png'
import ThemeContext from '../contexts/ThemeContext'
import {
    FaChartLine,
    FaCog,
    FaNetworkWired,
    FaRegEyeSlash,
    FaTicketAlt,
    FaUser
} from 'react-icons/fa'
import '../assets/styles/collapseAnimation.css'

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
    const { darkMode } = useContext(ThemeContext)
    const location = useLocation()
    const [openMenus, setOpenMenus] = useState({})

    const toggleMenu = (index) => {
        setOpenMenus((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div
            className="d-flex flex-column bg-light-subtle shadow-lg border-end border-light-subtle pt-3 sticky-top vh-100"
            style={{ width: '280px' }}
        >
            <Link
                to="/"
                className="d-flex align-items-center justify-content-center text-decoration-none link-body-emphasis"
            >
                <img src={!darkMode ? logoBlack : logoWhite} className="img-fluid" width={35} />
                <span className="fs-3 ms-2 fw-semibold">Michaela</span>
            </Link>
            <div className="flex-grow-1 p-2 overflow-auto">
                <ul className="flex-column nav p-2">
                    {pages.map((page, index) => {
                        const isActive = location.pathname.startsWith(page.link)
                        const isOpen = openMenus[index]

                        return (
                            <li key={index} className="mb-1">
                                {page.subPages ? (
                                    <>
                                        <button
                                            className={`nav-link d-flex align-items-center px-3 py-2 rounded w-100 text-start 
                                                ${isActive ? 'text-light bg-primary' : 'text-light-emphasis'} 
                                                ${isOpen ? 'active-menu' : ''}`}
                                            onClick={() => toggleMenu(index)}
                                        >
                                            {page.icon}
                                            <span className="ms-2">{page.page}</span>
                                            <i
                                                className={`bi ms-auto ${isOpen ? 'bi-chevron-down' : 'bi-chevron-right'}`}
                                            ></i>
                                        </button>

                                        <div className={`collapse-content ${isOpen ? 'show' : ''}`}>
                                            <ul className="flex-column nav">
                                                {page.subPages.map((subPage, subIndex) => (
                                                    <li key={subIndex}>
                                                        <NavLink
                                                            to={subPage.link}
                                                            className={({ isActive }) =>
                                                                `nav-link text-light-emphasis ps-4 border-start ms-4 my-1 p-1 
                                                                ${isActive ? 'text-decoration-underline underline-offset-8 fw-bold' : ''}`
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
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded 
                                            ${isActive ? 'bg-primary text-white' : 'text-light-emphasis'}`}
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
