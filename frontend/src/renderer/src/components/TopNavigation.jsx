import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import logoBlack from '../assets/images/logos/logo-black.png'
import logoWhite from '../assets/images/logos/logo-white.png'
import id from '../assets/images/photos/id.jpg'
import ThemeSwitch from './ThemeSwitch'
import ThemeContext from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const pages = [
    { page: 'Dashboard', link: 'dashboard' },
    { page: 'Profile', link: 'profile' },
    { page: 'Settings', link: 'settings' }
]

function TopNavigation() {
    const { darkMode } = useContext(ThemeContext)
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
            <div className="navbar navbar-expand-md bg-body-tertiary bg-light-subtle shadow fixed-top">
                <div className="col order-1">
                    <Link
                        to="/"
                        className="d-flex align-items-center text-decoration-none link-body-emphasis ms-4"
                    >
                        <img
                            src={!darkMode ? logoBlack : logoWhite}
                            className="img-fluid"
                            width={30}
                        />
                        <span className="fs-5 ms-2">Michaela</span>
                    </Link>
                </div>

                <div className="col order-3">
                    <div className="d-flex justify-content-end me-4">
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
