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
    FaServer,
    FaTicketAlt,
    FaTools,
    FaUser
} from 'react-icons/fa'
import '../assets/styles/css/sideNavigationStyle.css'
import { useAPI } from '../contexts/APIContext'

const pages = [
    {
        page: 'Dashboard',
        link: '/dashboard',
        icon: <FaChartLine />,
        subPages: [
            { name: 'Team Overview', link: '/dashboard/overview' },
            { name: 'Team Activities', link: '/dashboard/activities' },
            { name: 'Performance Summary', link: '/dashboard/performance' },
            { name: 'SLA Compliance', link: '/dashboard/sla' }
        ],
        permission: 'view dashboard'
        // permission: 'dashboard:read'
    },
    {
        page: 'Service Desk',
        link: '/servicedesk',
        icon: <FaTicketAlt />,
        subPages: [
            { name: 'My Overview', link: '/servicedesk/overview' },
            { name: 'My Tickets', link: '/servicedesk/tickets' },
            { name: 'My Reports', link: '/servicedesk/reports' }
        ],
        permission: 'access service desk'
        // permission: 'servicedesk:access'
    },
    {
        page: 'Employee Management',
        link: '/employees',
        icon: <FaUser />,
        subPages: [
            { name: 'Employee Directory', link: '/employees/all' },
            { name: 'Departments & Teams', link: '/employees/departments' },
            { name: 'Roles & Access', link: '/employees/roles' },
            { name: 'Activity History', link: '/employees/logs' }
        ],
        permission: 'manage employees'
        // permission: 'employees:manage'
    },
    {
        page: 'General Directory',
        link: '/directory',
        icon: <FaNetworkWired />,
        subPages: [
            { name: 'Telephone Directory', link: '/directory/telephoneList' },
            { name: 'Branch Locations', link: '/directory/locations' },
            { name: 'Staff Extensions', link: '/directory/extensions' },
            { name: 'Accounts Directory', link: '/directory/accounts' }
        ],
        permission: 'view general directory'
        // permission: 'directory:general:view'
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
            { name: 'System Accounts', link: '/itdirectory/accounts' },
            { name: 'Shared Drives', link: '/itdirectory/drives' },
            { name: 'Network Devices', link: '/itdirectory/network' }
        ],
        permission: 'view it directory'
        //  permission: 'directory:it:view'
    },
    {
        page: 'Reports & Analytics',
        link: '/reports',
        icon: <i className="bi bi-bar-chart"></i>,
        subPages: [
            { name: 'Ticket Analytics', link: '/reports/analytics' },
            { name: 'Performance Tracking', link: '/reports/performance' },
            { name: 'SLA Insights', link: '/reports/slaPerformance' },
            { name: 'Department Metrics', link: '/reports/departments' },
            { name: 'Monthly Trends', link: '/reports/monthly' },
            { name: 'User Satisfaction', link: '/reports/feedback' }
        ],
        permission: 'view analytics reports'
        // permission: 'analytics:reports:view'
    },
    {
        page: 'System Settings',
        link: '/settings',
        icon: <FaCog />,
        subPages: [
            { name: 'General Settings', link: '/settings/generalSettings' },
            { name: 'Security & Authentication', link: '/settings/authentication' },
            { name: 'Email & Notifications', link: '/settings/notifications' },
            { name: 'Department Settings', link: '/settings/departments' }
        ],
        // permission: 'settings:manage'
        permission: 'manage system settings'
    },
    {
        page: 'System Administration',
        link: '/administrator',
        icon: <FaTools />,
        subPages: [
            { name: 'System Overview', link: '/administrator/overview' },
            { name: 'User Access Control', link: '/administrator/access' },
            { name: 'Audit Logs', link: '/administrator/logs' },
            { name: 'Maintenance Mode', link: '/administrator/maintenance' },
            { name: 'Updates & Backups', link: '/administrator/backups' },
            { name: 'Security & Compliance', link: '/administrator/security' },
            { name: 'Integration Settings', link: '/administrator/integrations' },
            { name: 'System Feedback', link: '/administrator/feedback' }
        ],
        // permission: 'admin:system-management'
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

    // if (!authUser) {
    //     return null
    // }

    const visiblePages = pages.filter(
        ({ permission }) => !permission || authUser?.all_permissions?.includes(permission)
    )

    return (
        <div
            data-aos="fade-right"
            data-aos-duration="1200"
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
                            <li
                                key={index}
                                data-aos="fade-right"
                                data-aos-duration={`${300 + index * 300}`}
                                className="mb-1"
                            >
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

            <div className="bg-primary text-center text-white mt-auto small flex-column d-flex">
                {authUser?.role?.name && (
                    <strong className="text-uppercase border-bottom p-1 fs-4 flex-column">
                        <span>{authUser.role.name}</span>
                    </strong>
                )}

                {authUser?.department?.name && (
                    <strong
                        style={{ fontSize: '0.7rem' }}
                        className="text-uppercase border-bottom p-1 flex-column"
                    >
                        <span>{authUser.department.name}</span>{' '}
                    </strong>
                )}

                <span className="p-2">&copy; 2025 Goldnines</span>
            </div>
        </div>
    )
}

export default SideNavigation
