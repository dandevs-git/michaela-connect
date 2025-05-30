import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import logoBlack from '../assets/images/logos/logo-black.png'
import logoWhite from '../assets/images/logos/logo-white.png'
import ThemeContext from '../contexts/ThemeContext'
import { FaChartLine, FaCog, FaNetworkWired, FaServer, FaTicketAlt, FaUser } from 'react-icons/fa'
import '../assets/styles/css/sideNavigationStyle.css'
import { useAPI } from '../contexts/APIContext'

const pages = [
    {
        page: 'Dashboard',
        link: '/dashboard',
        icon: <FaChartLine />,
        subPages: [
            { name: 'Team Overview', link: '/dashboard/overview' },
            { name: 'Team Activities', link: '/dashboard/activities' }
            // { name: 'Team Reports', link: '/dashboard/reports' }
        ],
        permission: 'view dashboard'
    },
    {
        page: 'Service Desk',
        link: '/servicedesk',
        icon: <FaTicketAlt />,
        subPages: [
            { name: 'My Overview', link: '/servicedesk/overview' },
            { name: 'My Tickets', link: '/servicedesk/tickets' }
            // { name: 'My Reports', link: '/servicedesk/reports' }
        ],
        permission: 'access service desk'
    },
    {
        page: 'Employees',
        link: '/employees',
        icon: <FaUser />,
        subPages: [
            { name: 'All Employees', link: '/employees/all' },
            { name: 'Departments', link: '/employees/departments' },
            { name: 'Roles & Permissions', link: '/employees/roles' },
            { name: 'Activity Logs', link: '/employees/logs' }
        ],
        permission: 'manage employees'
    },
    {
        page: 'Directory',
        link: '/directory',
        icon: <FaNetworkWired />,
        subPages: [{ name: 'Telephone lines', link: '/directory/telephoneList' }],
        permission: 'view general directory'
    },
    {
        page: 'IT Directory',
        link: '/itdirectory',
        icon: <FaServer />,
        subPages: [
            { name: 'Telephone lines', link: '/itdirectory/telephones' },
            { name: 'Internet lines', link: '/itdirectory/internet' },
            { name: 'IP Addresses', link: '/itdirectory/ipAddress' },
            { name: 'Anydesk IDs', link: '/itdirectory/anydesks' },
            { name: 'Printers', link: '/itdirectory/printers' },
            { name: 'Accounts', link: '/itdirectory/accounts' }
        ],
        permission: 'view it directory'
    },
    {
        page: 'Reports',
        link: '/reports',
        icon: <i className="bi bi-bar-chart"></i>,
        subPages: [
            { name: 'Ticket Analytics', link: '/reports/employees' },
            { name: 'SLA Performance', link: '/reports/departments' },
            { name: 'Performance Tracking', link: '/reports/performance' },
            { name: 'Employee Feedback ', link: '/reports/ipAddress' }
        ],
        permission: 'view analytics reports'
    },
    {
        page: 'Settings',
        link: '/settings',
        icon: <FaCog />,
        subPages: [
            { name: 'General Settings', link: '/settings/generalSettings' },
            { name: 'Security & Authentication', link: '/settings/authentication' },
            { name: 'Email & Notifications', link: '/settings/notification' },
            { name: 'System Logs & Audits', link: '/settings/logs' },
            { name: 'Department Settings', link: '/settings/department' }
        ],
        permission: 'manage system settings'
    }
]

function SideNavigation() {
    const { authUser } = useAPI()
    const { darkMode } = useContext(ThemeContext)
    const location = useLocation()
    const [openMenus, setOpenMenus] = useState({})

    const toggleMenu = (index) => {
        setOpenMenus((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const visiblePages = pages.filter(
        (page) => !page.permission || authUser?.all_permissions.includes(page.permission)
    )

    return (
        <div
            className="d-flex flex-column bg-light-subtle border-end border-light-subtle shadow-lg pt-3 sticky-top vh-100"
            style={{ width: '280px' }}
        >
            <Link
                to="/"
                className="d-flex align-items-center justify-content-center text-decoration-none link-body-emphasis"
            >
                <img src={!darkMode ? logoBlack : logoWhite} className="img-fluid" width={35} />
                <span className="fs-3 fw-semibold ms-2">Michaela</span>
            </Link>
            <div className="flex-grow-1 p-2 overflow-auto scroll">
                <ul className="flex-column nav p-2">
                    {visiblePages.map((page, index) => {
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
                                                                `nav-link text-light-emphasis ps-3 border-start ms-4 my-1 p-1 
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
            <div className="bg-primary border text-center text-white mt-auto small flex-column d-flex">
                <strong className="text-uppercase border-bottom p-1">
                    {authUser?.department?.name || ''} {authUser?.role?.name || ''}
                </strong>
                <span className="p-2">&copy; 2025 Goldnines</span>
            </div>
        </div>
    )
}

export default SideNavigation
