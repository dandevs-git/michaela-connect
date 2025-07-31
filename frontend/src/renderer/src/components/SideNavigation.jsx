import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import logoBlack from '../assets/images/logos/logo-black.png'
import logoWhite from '../assets/images/logos/logo-white.png'
import ThemeContext from '../contexts/ThemeContext'
import {
    FaBoxOpen,
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
import Placeholder from './placeholders/Placeholder'

const pages = [
    {
        page: 'Dashboard',
        link: '/dashboard',
        icon: <FaChartLine />,
        subPages: [
            { name: 'Team Overview', link: '/dashboard/overview' },
            { name: 'Team Activities', link: '/dashboard/activities' }
            // { name: 'Performance Summary', link: '/dashboard/performance' },
            // { name: 'SLA Compliance', link: '/dashboard/sla' }
        ],
        permission: 'view dashboard'
        // permission: 'dashboard:read'
    },
    {
        page: 'Service Desk',
        link: '/service-desk',
        icon: <FaTicketAlt />,
        subPages: [
            { name: 'My Overview', link: '/service-desk/overview' },
            { name: 'My Tickets', link: '/service-desk/tickets' }
            // { name: 'My Reports', link: '/service-desk/reports' }
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
            { name: 'Activity History', link: '/employees/activity-logs' }
        ],
        permission: 'manage employees'
        // permission: 'employees:manage'
    },
    {
        page: 'General Directory',
        link: '/directory',
        icon: <FaNetworkWired />,
        subPages: [
            { name: 'Telephone Directory', link: '/directory/telephones' },
            { name: 'Branch Locations', link: '/directory/branches' }
            // { name: 'Staff Extensions', link: '/directory/staff' },
            // { name: 'Accounts Directory', link: '/directory/accounts' }
        ],
        permission: 'view general directory'
        // permission: 'directory:general:view'
    },
    {
        page: 'IT Directory',
        link: '/it-directory',
        icon: <FaServer />,
        subPages: [
            { name: 'Telephone lines', link: '/it-directory/telephones' },
            { name: 'Internet lines', link: '/it-directory/internet' },
            { name: 'Wifi Clients', link: '/it-directory/wifi' },
            { name: 'IP Addresses', link: '/it-directory/ip-addresses' },
            { name: 'Anydesk IDs', link: '/it-directory/anydesk-ids' },
            { name: 'Accounts', link: '/it-directory/accounts' },
            { name: 'CCTV', link: '/it-directory/cctv' }
        ],
        permission: 'view it directory'
        //  permission: 'directory:it:view'
    },
    {
        page: 'IT Assets',
        link: '/it-assets',
        icon: <FaBoxOpen />,
        subPages: [
            { name: 'Printers', link: '/it-assets/printers' },
            { name: 'Inks', link: '/it-assets/inks' },
            { name: 'System Units', link: '/it-assets/system-units' },
            { name: 'Monitors', link: '/it-assets/monitors' },
            { name: 'Keyboards', link: '/it-assets/keyboards' },
            { name: 'Mice', link: '/it-assets/mice' },
            { name: 'Routers', link: '/it-assets/routers' },
            { name: 'Switch Hubs', link: '/it-assets/switch-hubs' },
            { name: 'CCTV Cameras', link: '/it-assets/cctv-cameras' },
            { name: 'DVR/NVRs', link: '/it-assets/dvr-nvrs' }
        ],
        permission: 'view it assets'
        // permission: 'assets:it:view'
    },
    {
        page: 'Reports & Analytics',
        link: '/reports',
        icon: <i className="bi bi-bar-chart"></i>,
        subPages: [
            { name: 'Ticket Analytics', link: '/reports/analytics' },
            { name: 'Performance Tracking', link: '/reports/performance' },
            { name: 'SLA Insights', link: '/reports/sla-insights' },
            { name: 'Department Metrics', link: '/reports/department-metrics' },
            { name: 'Monthly Trends', link: '/reports/monthly-trends' },
            { name: 'Employee Satisfaction', link: '/reports/employee-satisfaction' }
        ],
        permission: 'view analytics reports'
        // permission: 'analytics:reports:view'
    },
    {
        page: 'System Settings',
        link: '/system-settings',
        icon: <FaCog />,
        subPages: [
            { name: 'General Settings', link: '/system-settings/general' },
            { name: 'Security & Authentication', link: '/system-settings/security-authentication' },
            { name: 'Email & Notifications', link: '/system-settings/email-notification' },
            { name: 'Department Settings', link: '/system-settings/department' }
        ],
        // permission: 'settings:manage'
        permission: 'manage system settings'
    },
    {
        page: 'System Administration',
        link: '/system-administration',
        icon: <FaTools />,
        subPages: [
            { name: 'System Overview', link: '/system-administration/system-overview' },
            { name: 'User Access Control', link: '/system-administration/user-access-control' },
            { name: 'Audit Logs', link: '/system-administration/audit-logs' },
            { name: 'Maintenance Mode', link: '/system-administration/maintenance-mode' },
            { name: 'Updates & Backups', link: '/system-administration/updates-backups' },
            { name: 'Security & Compliance', link: '/system-administration/security-compliance' },
            { name: 'Integration Settings', link: '/system-administration/integration-settings' },
            { name: 'System Feedback', link: '/system-administration/system-feedback' }
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

    const visiblePages = pages.filter(
        ({ permission }) => !permission || authUser?.all_permissions?.includes(permission)
    )

    return (
        <div
            // data-aos="fade-right"
            // data-aos-duration="1200"
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
                    {!visiblePages[0]?.page ? (
                        <>
                            <Placeholder width="100%" height="40px" />
                            <Placeholder width="80%" height="40px" />
                            <Placeholder width="90%" height="40px" />
                            <Placeholder width="100%" height="40px" />
                            <Placeholder width="90%" height="40px" />
                            <Placeholder width="100%" height="40px" />
                            <Placeholder width="90%" height="40px" />
                            <Placeholder width="100%" height="40px" />
                            <Placeholder width="80%" height="40px" />
                            <Placeholder width="90%" height="40px" />
                            <Placeholder width="80%" height="40px" />
                            <Placeholder width="80%" height="40px" />
                        </>
                    ) : (
                        visiblePages.map((page, index) => {
                            const isActive = location.pathname.startsWith(page.link)
                            const isOpen = openMenus[index]

                            return (
                                <li
                                    key={index}
                                    // data-aos="fade-right"
                                    // data-aos-duration={`${300 + index * 300}`}
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

                                            <div
                                                className={`collapse-content ${isOpen ? 'show' : ''}`}
                                            >
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
                        })
                    )}
                </ul>
            </div>

            <div className="bg-primary text-center text-white mt-auto small flex-column d-flex">
                {authUser?.role?.name && (
                    <strong className="text-uppercase border-bottom p-1 fs-4 flex-column">
                        <span>{authUser.position}</span>
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

                <span className="p-2">&copy; {new Date().getFullYear()} Michaela</span>
            </div>
        </div>
    )
}

export default SideNavigation
