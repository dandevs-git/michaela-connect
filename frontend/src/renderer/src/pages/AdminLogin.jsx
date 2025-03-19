import { useState } from 'react'
import logoBlack from '../assets/images/logos/logo-black.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { TbArrowBackUp } from 'react-icons/tb'

function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = () => {
        if (username == 'admin') {
            if (password == '123') {
                navigate('/dashboard')
            } else {
            }
        } else {
        }
    }

    return (
        <>
            <div className="shadow-lg p-4 rounded-4" style={{ width: '30rem' }}>
                <div className="d-flex mb-3">
                    <img src={logoBlack} className="img-fluid d-flex mx-auto" width={50} alt="" />
                    <h2 className="text-center fw-semibold">ADMIN</h2>
                    <img src={logoBlack} className="img-fluid d-flex mx-auto" width={50} alt="" />
                </div>
                <form className="needs-validation" noValidate>
                    <div className="input-group flex-nowrap mb-2">
                        <span className="input-group-text" id="addon-wrapping">
                            Username
                        </span>
                        <input type="text" className="form-control rounded-end" />
                        <div className="invalid-feedback">Enter password</div>
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                        <span className="input-group-text" id="addon-wrapping">
                            Password
                        </span>
                        <input type="text" className="form-control rounded-end" />
                        <div className="invalid-feedback">Enter password</div>
                    </div>

                    <div className="d-flex">
                        <button className="btn" onclick={history.back()}>
                            <TbArrowBackUp /> Login
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary rounded-4 mb-2 ms-auto w-50"
                        >
                            Authenticate
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AdminLogin
