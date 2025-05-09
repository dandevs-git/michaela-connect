import { useEffect, useState } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [resetToken, setResetToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { requestPasswordReset } = useAPI()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await requestPasswordReset({ username }, setLoading, setError)
        setResetToken(response.token)
        setMessage(response.message)
        console.log(resetToken)
        console.log(message)
    }

    useEffect(() => {
        if (error?.message) {
            setError(error.message)
        }
    }, [error])

    return (
        <div className="shadow-lg p-4 rounded-4 border" style={{ width: '20rem' }}>
            <h2 className="text-center mb-3">Forgot Password</h2>
            {error && (
                <div className="alert small alert-success text-center py-1" role="alert">
                    {error}
                </div>
            )}

            {message && (
                <div className="alert small alert-success text-center py-1" role="alert">
                    {message}
                </div>
            )}
            <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                {/* Kapag gustong may RFID */}
                {/* <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        RFID
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="rfid"
                        required
                        value={rfid}
                        onChange={(e) => setRfid(e.target.value)}
                    />
                </div> */}
                <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Password Reset Token'}
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary w-100 btn-sm"
                    onClick={() => navigate('/')}
                >
                    Back to Login
                </button>
            </form>

            {resetToken && (
                <div className="text-center py-1 text-break d-flex flex-column mt-5">
                    <span className="fw-semibold text-uppercase">Reset Token Number:</span>
                    <span style={{ fontSize: '0.7rem' }}>{resetToken}</span>
                    <span style={{ fontSize: '0.7rem' }} className="text-danger mt-2">
                        Please Copy this
                    </span>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword
