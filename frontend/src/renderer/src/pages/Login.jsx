import { useContext, useState, useEffect } from 'react'
import logoDark from '../assets/images/logos/logo-black.png'
import logoLight from '../assets/images/logos/logo-black.png'
import { useAPI } from '../contexts/APIContext'
import ThemeContext from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { darkMode } = useContext(ThemeContext)
    const { login, getAuthenticatedUserDetails } = useAPI()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setMessage('')
        setLoading(true)

        try {
            const response = await login(username, password)
            if (!response.includes('Invalid') && !response.includes('Access denied')) {
                await getAuthenticatedUserDetails()
                navigate('/dashboard')
            }
            console.log('response')
            setMessage(response)
        } catch (error) {
            setMessage(error.response)
        }
        setLoading(false)
    }

    return (
        <div className="shadow-lg p-4 rounded-4 border" style={{ width: '20rem' }}>
            <img
                src={darkMode ? logoLight : logoDark}
                className="img-fluid d-flex mx-auto mb-3"
                width={80}
                alt="Company Logo"
            />
            <h2 className="text-center mb-3">LOGIN</h2>

            {message && (
                <div className="alert small alert-danger text-center py-1" role="alert">
                    {message}
                </div>
            )}

            <form className="needs-validation" noValidate onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        aria-label="Enter your username"
                    />
                    <div className="invalid-feedback">Enter username</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        aria-label="Enter your password"
                    />
                    <div className="invalid-feedback">Enter password</div>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                    </label>
                </div>

                <button
                    className="btn btn-primary w-100 rounded-4 mb-2"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span
                                className="spinner-grow spinner-grow-sm"
                                aria-hidden="true"
                            ></span>
                            <span className="ms-2">Logging in...</span>
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>

            <div className="d-flex align-items-center">
                <a href="#" className="text-decoration-none">
                    Forgot password?
                </a>
            </div>
        </div>
    )
}

export default Login
