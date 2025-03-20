import { Link, NavLink, useNavigate } from 'react-router-dom'
import id from '../assets/images/photos/id.jpg'
import ThemeSwitch from './ThemeSwitch'
import { useAuth } from '../contexts/AuthContext'

const pages = [
    { page: 'Dashboard', link: 'dashboard' },
    { page: 'Profile', link: 'profile' },
    { page: 'Settings', link: 'settings' }
]

function TopNavigation() {
    const { logout } = useAuth()
    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }

    const listPages = pages.map((page, index) => (
        <li key={index}>
            <NavLink
                className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                to={page.link}
            >
                {page.page}
            </NavLink>
        </li>
    ))

    return (
        <>
            <div className="navbar navbar-expand-md bg-light-subtle sticky-top shadow-lg">
                <div className="col order-3">
                    <div className="d-flex justify-content-end me-4">
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

                            <ul className="dropdown-menu dropdown-menu-end rounded-4 shadow-lg border">
                                <li className="dropdown-header text-center fw-bold py-3">
                                    Notifications
                                </li>

                                <li>
                                    <a className="d-flex dropdown-item align-items-start" href="#">
                                        <div className="me-3">
                                            <i className="text-primary bi bi-box-seam fs-5"></i>
                                        </div>
                                        <div>
                                            <div className="fw-semibold">New Ticket Received</div>
                                            <small className="text-muted">2 mins ago</small>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a className="d-flex dropdown-item align-items-start" href="#">
                                        <div className="me-3">
                                            <i className="text-success bi bi-chat-dots fs-5"></i>
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
                                    <a className="d-flex dropdown-item align-items-start" href="#">
                                        <div className="me-3">
                                            <i className="text-warning bi bi-exclamation-triangle fs-5"></i>
                                        </div>
                                        <div>
                                            <div className="fw-semibold">
                                                System Update Available
                                            </div>
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

                            <ul className="dropdown-menu bg-body shadow text-body text-small">
                                {listPages}
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
        </>
    )
}

export default TopNavigation
