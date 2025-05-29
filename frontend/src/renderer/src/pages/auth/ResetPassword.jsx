import { useEffect, useState } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { useNavigate } from 'react-router-dom'
import { FaClipboardCheck } from 'react-icons/fa'
import { useToast } from '../../contexts/ToastContext'

function ResetPassword() {
    const { passwordReset } = useAPI()
    const [resetToken, setResetToken] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()
    const navigate = useNavigate()

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setResetToken(text)
        } catch (err) {
            console.error('Clipboard paste failed:', err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await passwordReset(
            {
                token: resetToken,
                password: password,
                password_confirmation: passwordConfirm
            },
            setLoading,
            setError
        )

        if (response) {
            setMessage(response.message)
            navigate('/login')
        }
    }

    return (
        <div className="shadow-lg p-4 rounded-4 border" style={{ width: '20rem' }}>
            <h2 className="text-center mb-3">Reset Password</h2>

            {error && <div className="alert alert-danger text-center py-2">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="resetToken" className="form-label">
                        Reset Token
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="resetToken"
                            required
                            value={resetToken}
                            onChange={(e) => setResetToken(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn border btn-sm"
                            title="Paste from clipboard"
                            onClick={handlePaste}
                        >
                            <FaClipboardCheck size={16} />
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        New Password
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

                <div className="mb-3">
                    <label htmlFor="passwordConfirm" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary w-100 btn-sm"
                    onClick={() => navigate('/')}
                >
                    Back to Login
                </button>
            </form>
        </div>
    )
}

export default ResetPassword
