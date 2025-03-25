import { Link } from 'react-router-dom'
import logoWhite from '../assets/images/logos/logo-white.png'

function ErrorPage({ errorCode }) {
    const errorMessages = {
        403: 'Sorry, you don’t have permission to access this page.',
        404: 'Oops! The page you’re looking for doesn’t exist or has been moved.',
        500: 'Something went wrong on our server. Please try again later.'
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-black text-white text-center">
            <img src={logoWhite} className="mb-3" alt="logo" width={80} />
            <h1 className="display-1 fw-bold">{errorCode}</h1>
            <p className="fs-5 mb-4">
                {errorMessages[errorCode] || 'An unexpected error occurred.'}
            </p>
            <p>What you can do:</p>
            <ul className="text-start">
                <li className="mb-2">
                    Return to the{' '}
                    <Link to="/dashboard" className="btn-sm btn rounded-4 btn-outline-light px-3">
                        Dashboard
                    </Link>
                </li>
                <li className="mb-2">
                    If you believe this is an error, please contact your Administrator.
                </li>
            </ul>
        </div>
    )
}
export default ErrorPage
