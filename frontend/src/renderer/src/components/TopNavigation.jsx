import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import id from '../assets/images/photos/id.jpg'
import ThemeSwitch from './ThemeSwitch'
import { useAPI } from '../contexts/APIContext'

const pages = [
    { page: 'Dashboard', link: '/dashboard' },
    { page: 'Profile', link: '/profile' },
    { page: 'Settings', link: '/settings' }
]

function TopNavigation() {
    const { logout } = useAPI()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
        navigate('/login')
    }

    const pathnames = location.pathname.split('/').filter((x) => x)
    const breadcrumbItems = [
        ...pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
            return (
                <li key={routeTo} className="breadcrumb-item active" aria-current="page">
                    <Link className="text-decoration-none" to={routeTo}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Link>
                </li>
            )
        })
    ]

    return (
        <div className="navbar navbar-expand-md bg-light-subtle shadow-lg sticky-top">
            <div className="col d-flex justify-content-between order-3">
                <nav className="d-flex align-items-center mx-4">
                    <ol className="breadcrumb mb-0">{breadcrumbItems}</ol>
                </nav>

                <div className="me-4 d-flex">
                    <div className="dropdown mx-2">
                        <button
                            type="button"
                            className="btn bg-transparent border-0 p-1 position-relative"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-bell-fill fs-4 mx-1"></i>
                            <span className="badge bg-danger border border-light position-absolute mt-2 start-100 top-0 translate-middle">
                                <span>99+</span>
                            </span>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end shadow-lg rounded-3 border-0">
                            <li className="dropdown-header text-center fw-bold py-3">
                                Notifications
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-start" href="#">
                                    <div className="me-3">
                                        <i className="bi bi-box-seam text-primary fs-5"></i>
                                    </div>
                                    <div>
                                        <div className="fw-semibold">New Ticket Received</div>
                                        <small className="text-muted">2 mins ago</small>
                                    </div>
                                </a>
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-start" href="#">
                                    <div className="me-3">
                                        <i className="bi bi-chat-dots text-secondary fs-5"></i>
                                    </div>
                                    <div>
                                        <div className="fw-semibold">
                                            Message from HR Department
                                        </div>
                                        <small className="text-muted">10 mins ago</small>
                                    </div>
                                </a>
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-start" href="#">
                                    <div className="me-3">
                                        <i className="bi bi-exclamation-triangle text-warning fs-5"></i>
                                    </div>
                                    <div>
                                        <div className="fw-semibold">System Update Available</div>
                                        <small className="text-muted">1 hour ago</small>
                                    </div>
                                </a>
                            </li>

                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item text-center fw-bold" href="#">
                                    View All Notifications
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="d-flex dropdown align-items-center">
                        <Link
                            className="dropdown-toggle text-decoration-none link-body-emphasis mx-4"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                src={id}
                                alt=""
                                width="32"
                                height="32"
                                className="rounded-circle me-2"
                            />
                            <strong>Dan</strong>
                        </Link>

                        <ul className="dropdown-menu dropdown-menu-end bg-body shadow text-body text-small">
                            {pages.map((page, index) => (
                                <li key={index}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `dropdown-item ${isActive ? 'active' : ''}`
                                        }
                                        to={page.link}
                                    >
                                        {page.page}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    )
}

export default TopNavigation
