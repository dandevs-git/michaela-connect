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
            <div className="navbar navbar-expand-md fixed-top bg-body-tertiary shadow bg-light-subtle">
                <div className="col order-1">
                    <Link
                        to="/"
                        className="d-flex align-items-center link-body-emphasis text-decoration-none ms-4"
                    >
                        <img
                            src={!darkMode ? logoBlack : logoWhite}
                            className="img-fluid"
                            width={30}
                        />
                        <span className="ms-2 fs-5">Michaela</span>
                    </Link>
                </div>

                <div className="col order-3">
                    <div className="d-flex justify-content-end me-4">
                        <div className="dropdown d-flex align-items-center ">
                            <Link
                                className="link-body-emphasis text-decoration-none dropdown-toggle mx-4"
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

                            <ul className="dropdown-menu text-small bg-body text-body shadow">
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
