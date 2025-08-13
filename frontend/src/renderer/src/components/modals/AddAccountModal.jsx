import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { createOptions } from '../../utils/createOptions'
import { selectStyles } from '../../constants/config'

function AddAccountModal({ id, refreshList }) {
    const { postData, getData } = useAPI()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [visible, setVisible] = useState(false)

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [users, setUsers] = useState([])
    const [accountList, setAccountList] = useState([])
    const [accountData, setAccountData] = useState({
        type: '',
        link: '',
        username: '',
        password: '',
        department: '',
        user_id: [],
        purpose: '',
        recovery_email: '',
        recovery_number: '',
        verification: '',
        description: ''
    })

    useEffect(() => {
        getData('/users', setUsers, () => {}, setError)
    }, [])

    useEffect(() => {
        getData('/accounts', setAccountList, () => {}, setError)
    }, [])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const typeOptions = createOptions(accountList, 'type')
    const linkOptions = createOptions(accountList, 'link')
    const usernameOptions = createOptions(accountList, 'username')
    const verificationOptions = createOptions(accountList, 'verification')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAccountData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setAccountData({
            type: '',
            link: '',
            username: '',
            password: '',
            department: '',
            user_id: [],
            purpose: '',
            recovery_email: '',
            recovery_number: '',
            verification: '',
            description: ''
        })
        setError('')
        formRef.current?.classList.remove('was-validated')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        form.classList.remove('was-validated')
        setIsSubmitted(true)
        setError('')

        if (!form.checkValidity() || !accountData.user_id) {
            form.classList.add('was-validated')
            return
        }

        const { user_id, ...rest } = accountData
        const payload = {
            user_ids: user_id,
            ...rest
        }

        const response = await postData('/accounts', payload, () => {}, setLoading, setError)

        if (response) {
            setIsSubmitted(false)
            resetForm()
            // Modal.getInstance(modalRef.current)?.hide()
            modalRef.current.querySelector('[data-bs-dismiss="modal"]').click()
            refreshList()
        }
    }

    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
            >
                <FaPlus /> New Account
            </button>

            <div
                className="modal fade"
                id={id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-semibold text-uppercase">
                                Add New Account
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body p-3">
                            <form
                                ref={formRef}
                                className="row g-3 needs-validation p-3"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <div className="col-md-5">
                                    <label htmlFor="type" className="form-label">
                                        Type
                                    </label>
                                    <CreatableSelect
                                        inputId="type"
                                        name="type"
                                        options={typeOptions}
                                        value={typeOptions.find(
                                            (option) => option.value === accountData.type
                                        )}
                                        onChange={(selected) =>
                                            setAccountData((prev) => ({
                                                ...prev,
                                                type: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(!!accountData.type || !isSubmitted)}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-2 ${!accountData.type && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">Please enter the type.</div>
                                </div>

                                <div className="col-md-7">
                                    <label htmlFor="link" className="form-label">
                                        Link
                                    </label>
                                    <CreatableSelect
                                        inputId="link"
                                        name="link"
                                        options={linkOptions}
                                        value={linkOptions.find(
                                            (option) => option.value === accountData.link
                                        )}
                                        onChange={(selected) =>
                                            setAccountData((prev) => ({
                                                ...prev,
                                                link: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(!!accountData.link || !isSubmitted)}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-2 ${!accountData.link && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">Please enter the link.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <CreatableSelect
                                        inputId="username"
                                        name="username"
                                        options={usernameOptions}
                                        value={usernameOptions.find(
                                            (option) => option.value === accountData.username
                                        )}
                                        onChange={(selected) =>
                                            setAccountData((prev) => ({
                                                ...prev,
                                                username: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!accountData.username || !isSubmitted
                                        )}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-2 ${!accountData.username && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        Please enter the username.
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={visible ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={accountData.password}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                        <button
                                            className="btn border"
                                            type="button"
                                            onClick={() => setVisible(!visible)}
                                            title={visible ? 'Hide password' : 'Show password'}
                                        >
                                            {visible ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="verification" className="form-label">
                                        2-Step Verification
                                    </label>
                                    <CreatableSelect
                                        inputId="verification"
                                        name="verification"
                                        options={verificationOptions}
                                        value={verificationOptions.find(
                                            (option) => option.value === accountData.verification
                                        )}
                                        onChange={(selected) =>
                                            setAccountData((prev) => ({
                                                ...prev,
                                                verification: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!accountData.verification || !isSubmitted
                                        )}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-2 ${!accountData.verification && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        Please enter the verification.
                                    </div>
                                </div>
                                {/* 
                                <div className="col-md-5">
                                    <label htmlFor="verification" className="form-label">
                                        2-Step Verification
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="verification"
                                        name="verification"
                                        value={accountData.verification}
                                        onChange={handleInputChange}
                                    />
                                </div> */}

                                <div className="col-md-12">
                                    <label htmlFor="user" className="form-label">
                                        Users
                                    </label>
                                    <Select
                                        isMulti
                                        inputId="user_id"
                                        name="user_id"
                                        options={userOptions}
                                        value={userOptions.filter((option) =>
                                            accountData.user_id.includes(option.value)
                                        )}
                                        onChange={(selected) =>
                                            setAccountData((prev) => ({
                                                ...prev,
                                                user_id: selected
                                                    ? selected.map((opt) => opt.value)
                                                    : []
                                            }))
                                        }
                                        styles={selectStyles(
                                            !!accountData?.user_id?.length || !isSubmitted
                                        )}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-3 ${!accountData?.user_id?.length && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">Please select a users.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="purpose" className="form-label">
                                        Purpose
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="purpose"
                                        name="purpose"
                                        value={accountData.purpose}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="recovery_email" className="form-label">
                                        Recovery Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="recovery_email"
                                        name="recovery_email"
                                        value={accountData.recovery_email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="recovery_number" className="form-label">
                                        Recovery Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recovery_number"
                                        name="recovery_number"
                                        value={accountData.recovery_number}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={accountData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-grow spinner-grow-sm me-2"
                                                    role="status"
                                                />
                                                Submitting...
                                            </>
                                        ) : (
                                            'Add Account'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAccountModal
