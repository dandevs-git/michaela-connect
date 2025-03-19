import { useContext, useState } from 'react'
import logoDark from '../assets/images/logos/logo-black.png'
import logoLight from '../assets/images/logos/logo-black.png'
import { useAuth } from '../contexts/AuthContext'
import ThemeContext from '../contexts/ThemeContext'

function Login() {
    const { darkMode } = useContext(ThemeContext)
    const { login } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setMessage('')
        setLoading(true)
        const response = await login(username, password)
        setMessage(response)
        setLoading(false)
    }

    return (
        <>
            <div className="shadow-lg p-4 rounded-4 border" style={{ width: '20rem' }}>
                <img
                    src={!darkMode ? logoDark : logoLight}
                    className="img-fluid d-flex mx-auto mb-3"
                    width={80}
                />
                <h2 className="text-center  mb-3">LOGIN</h2>
                <form className="needs-validation" noValidate>
                    {message && (
                        <div className="alert small alert-danger text-center py-1" role="alert">
                            {message}
                        </div>
                    )}
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
                        />
                        <div className="invalid-feedback">Enter password</div>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Remember me
                        </label>
                    </div>
                    {loading ? (
                        <button
                            className="btn btn-primary w-100 rounded-4 mb-2"
                            type="button"
                            disabled
                        >
                            <span
                                className="spinner-grow spinner-grow-sm"
                                aria-hidden="true"
                            ></span>
                            <span className="ms-2">Logging in...</span>
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary w-100 rounded-4 mb-2"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    )}
                </form>
                <div className="d-flex align-items-center">
                    <a className="" type="button">
                        Forgot password?
                    </a>
                </div>
            </div>
        </>
    )
}

export default Login
