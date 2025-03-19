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
    { page: 'Dashboard', link: '/dashboard', icon: <FaChartLine /> },
    { page: 'Service Desk', link: '/servicedesk', icon: <FaTicketAlt /> },
    { page: 'Employees', link: '/employees', icon: <FaUser /> },
    { page: 'Directory', link: '/directory', icon: <FaNetworkWired /> },
    { page: 'Settings', link: '/settings', icon: <FaCog /> },
    { page: '404 Error', link: '/notfound', icon: <FaRegEyeSlash /> }
]

function SideNavigation() {
    const location = useLocation()

    const listPages = pages.map((page, index) => (
        <li className="nav-item" key={index}>
            <NavLink
                className={({ isActive }) =>
                    `nav-link d-flex justify-content-start align-items-center ${isActive || location.pathname.startsWith('/' + page.link) ? 'active' : 'link-body-emphasis'}`
                }
                to={page.link}
            >
                <div className="">{page.icon}</div>
                <div className="d-none d-md-inline ms-2 me-5">{page.page}</div>
            </NavLink>
        </li>
    ))

    return (
        <>
            <div className="pt-5 d-flex flex-column sticky-top vh-100 bg-light-subtle shadow-lg">
                <div className="nav nav-pills flex-column mb-auto">
                    <div className="px-2 px-md-4 pt-4">
                        <ul className="text-nowrap list-unstyled">{listPages}</ul>
                    </div>
                </div>

                <div className="text-center p-2 bg-primary text-white small mt-auto border">
                    &copy; 2025 Goldnines
                </div>
            </div>
        </>
    )
}

export default SideNavigation
