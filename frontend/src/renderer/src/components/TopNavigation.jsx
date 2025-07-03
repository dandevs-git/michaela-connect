import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import ThemeSwitch from './ThemeSwitch'
import { useAPI } from '../contexts/APIContext'
import { useState } from 'react'
import FullScreenLoader from './FullScreenLoader'
import Placeholder from './placeholders/Placeholder'

const pages = [{ page: 'Dashboard', link: '/dashboard' }]

function TopNavigation() {
    const { logout, authUser } = useAPI()
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogout = async (e) => {
        e.preventDefault()
        const response = await logout(setLoading, setError)
        if (response) navigate('/login')
    }

    const pathnames = location.pathname.split('/').filter((x) => x)
    const breadcrumbItems = [
        ...pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
            return (
                <li key={routeTo} className="breadcrumb-item active" aria-current="page">
                    <Link className="text-decoration-none" to={routeTo}>
                        {name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                </li>
            )
        })
    ]

    return (
        <>
            {loading && (
                <FullScreenLoader
                    title="Logging out"
                    message="Please wait while we sign you out securely."
                />
            )}

            <div
                // data-aos="fade-down"
                // data-aos-duration="3000"
                className="navbar navbar-expand-md bg-light-subtle shadow-lg sticky-top"
            >
                <div className="col d-flex justify-content-between order-3">
                    <nav className="d-flex align-items-center mx-4">
                        <ol className="breadcrumb mb-0">{breadcrumbItems}</ol>
                    </nav>

                    <div className="me-4 d-flex">
                        {/* <div className="dropdown mx-2">
                            <button
                                type="button"
                                className="btn bg-transparent border-0 p-1 position-relative"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-bell-fill fs-4 mx-1"></i>
                                <span className="badge bg-danger border border-light position-absolute mt-2 start-100 top-0 translate-middle">
                                    <span>0</span>
                                </span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end shadow-lg rounded-3 border-0">
                                <li className="dropdown-header text-center fw-bold py-3">
                                    Notifications
                                </li>
                                <li className="text-center py-4 text-muted">
                                    <i className="bi bi-tools fs-2 mb-2 text-secondary"></i>
                                    <div className="fw-semibold">Under Maintenance</div>
                                    <small>Notifications temporarily unavailable</small>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <span className="dropdown-item text-center disabled">
                                        View All Notifications
                                    </span>
                                </li>
                            </ul>
                        </div> */}

                        <div className="dropdown mx-2">
                            <button
                                type="button"
                                className="btn bg-transparent border-0 p-1 position-relative"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-bell-fill fs-4 mx-1"></i>
                                <span className="badge bg-danger border border-light position-absolute mt-2 start-100 top-0 translate-middle">
                                    <span>0</span>
                                </span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end shadow-lg rounded-3 border-0">
                                <li className="dropdown-header text-center fw-bold py-3">
                                    Notifications
                                </li>

                                <li className="text-center py-4 text-muted">
                                    <i className="bi bi-tools fs-2 mb-2 text-secondary"></i>
                                    <div className="fw-semibold">Under Maintenance</div>
                                    <small>Notifications temporarily unavailable</small>
                                </li>

                                {/* <li>
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
                                            <div className="fw-semibold">
                                                System Update Available
                                            </div>
                                            <small className="text-muted">1 hour ago</small>
                                        </div>
                                    </a>
                                </li> */}

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
                                to="#"
                            >
                                {authUser?.profile_picture ? (
                                    <img
                                        src={authUser?.profile_picture}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="rounded-circle object-cover me-2"
                                    />
                                ) : (
                                    <div
                                        className="bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2"
                                        style={{ width: '32px', height: '32px', fontSize: '1rem' }}
                                    >
                                        <span>{authUser?.name?.[0] || '?'}</span>
                                    </div>
                                )}

                                {!authUser?.name[0] ? (
                                    <>
                                        <Placeholder width="100px" height="30px" />
                                    </>
                                ) : (
                                    <strong>{authUser?.name}</strong>
                                )}
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
        </>
    )
}

export default TopNavigation
