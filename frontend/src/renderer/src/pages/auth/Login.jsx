import { useContext, useState, useEffect } from 'react'
import logoDark from '../../assets/images/logos/logo-black.png'
import logoLight from '../../assets/images/logos/logo-white.png'
import { useAPI } from '../../contexts/APIContext'
import ThemeContext from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { darkMode } = useContext(ThemeContext)
    const { login, getAuthUser } = useAPI()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        const storedPassword = localStorage.getItem('password')
        if (storedUsername) setUsername(storedUsername)
        if (storedPassword) setPassword(storedPassword)
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await login(username, password, setLoading, setError)

        if (response) {
            getAuthUser()
            if (rememberMe) {
                localStorage.setItem('username', username)
                localStorage.setItem('password', password)
            } else {
                localStorage.removeItem('username')
                localStorage.removeItem('password')
            }
            navigate('/dashboard')
        }
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

            {error && <div className="alert alert-danger text-center py-2">{error}</div>}

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
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                    </label>
                </div>

                <button
                    className="btn btn-primary w-100 rounded-4 mb-2"
                    type="submit"
                    disabled={loading && (username || password)}
                >
                    {loading && (username || password) ? (
                        <>
                            <span className="spinner-grow spinner-grow-sm"></span>
                            <span className="ms-2">Logging in...</span>
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>

            <div className="d-flex align-items-center">
                <button className="btn border-0" onClick={() => navigate('/forgot-password')}>
                    Forgot password?
                </button>
            </div>
        </div>
    )
}

export default Login
