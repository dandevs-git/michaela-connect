import React from 'react'
import logoWhite from '../assets/images/logos/logo-white.png'
import { Link } from 'react-router-dom'

function MaintenancePage({ titlePage }) {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center rounded-4 bg-primary text-white text-center p-4"
            style={{ height: '80vh' }}
        >
            <img src={logoWhite} alt="logo" className="mb-3" width={80} />
            <h1 className="display-5 fw-bold">{titlePage} Page is Under Maintenance</h1>
            <p className="fs-5 mb-4">
                We’re currently updating this feature to serve you better. Please check back soon.
            </p>
            <p>In the meantime, you can:</p>
            <ul className="text-start">
                <li className="mb-2">
                    Go back to the{' '}
                    <Link to="/dashboard" className="btn btn-sm rounded-4 btn-outline-light px-3">
                        Dashboard
                    </Link>
                </li>
                <li className="mb-2">Or explore other available features.</li>
            </ul>
            <footer className="mt-4 text-white-50 small">
                &copy; {new Date().getFullYear()} Michaela
            </footer>
        </div>
    )
}

export default MaintenancePage
