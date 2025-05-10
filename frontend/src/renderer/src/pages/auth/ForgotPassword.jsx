import { useEffect, useState } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { useNavigate } from 'react-router-dom'
import ResetTokenModal from '../../components/modals/ResetTokenModal'

function ForgotPassword() {
    const { requestPasswordReset } = useAPI()
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [resetToken, setResetToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await requestPasswordReset({ username }, setLoading, setError)

        if (response.token) {
            setResetToken(response.token)
            setMessage(response.message)
        }
    }

    return (
        <div className="shadow-lg p-4 rounded-4 border" style={{ width: '20rem' }}>
            <h2 className="text-center mb-3">Forgot Password</h2>
            {error.message && (
                <div className="alert small alert-danger text-center py-1" role="alert">
                    {error.message}
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
                <ResetTokenModal resetToken={resetToken} setResetToken={setResetToken} />
            )}
        </div>
    )
}

export default ForgotPassword
