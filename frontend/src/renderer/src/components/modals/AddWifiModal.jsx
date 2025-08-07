import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { FaPlus } from 'react-icons/fa'
import { useToast } from '../../contexts/ToastContext'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { selectStyles } from '../../constants/config'

function AddWifiModal({ id, refreshList }) {
    const { postData, getData } = useAPI()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [recommendedIP, setRecommendedIP] = useState('')

    const modalRef = useRef(null)
    const formRef = useRef(null)

    const [users, setUsers] = useState([])
    const [wifiList, setWifiList] = useState([])
    const [wifiData, setWifiData] = useState({
        user_id: '',
        device: 'Phone',
        ip_address: '',
        ssid: '',
        gateway: '',
        mac_address: ''
    })

    useEffect(() => {
        getData('/users', setUsers, () => {}, setError)
    }, [getData])

    useEffect(() => {
        getData('/wifi', setWifiList, () => {}, setError)
    }, [])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const deviceOptions = Array.from(
        new Set(wifiList.map((item) => item.device).filter(Boolean))
    ).map((device) => ({
        value: device,
        label: device
    }))

    const ssidOptions = Array.from(new Set(wifiList.map((item) => item.ssid).filter(Boolean))).map(
        (ssid) => ({
            value: ssid,
            label: ssid
        })
    )

    const gatewayOptions = Array.from(
        new Set(wifiList.map((item) => item.gateway).filter(Boolean))
    ).map((gateway) => ({
        value: gateway,
        label: gateway
    }))

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setWifiData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setWifiData({
            user_id: '',
            device: '',
            ip_address: '',
            ssid: '',
            gateway: '',
            mac_address: ''
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

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return
        }

        const response = await postData('/wifi', wifiData, () => {}, setLoading, setError)

        if (response) {
            // Modal.getInstance(modalRef.current)?.hide()
            modalRef.current.querySelector('[data-bs-dismiss="modal"]').click()
            resetForm()
            refreshList?.()
        }
    }

    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
            >
                <FaPlus /> New Wifi Line
            </button>

            <div
                className="modal fade"
                id={id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-semibold text-uppercase">
                                Add New Wifi Line
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
                                <div className="col-md-12">
                                    <label htmlFor="user" className="form-label">
                                        User
                                    </label>
                                    <Select
                                        inputId="user"
                                        name="user_id"
                                        options={userOptions}
                                        value={userOptions.find(
                                            (option) => option.value === wifiData.user_id
                                        )}
                                        onChange={(selected) =>
                                            setWifiData((prev) => ({
                                                ...prev,
                                                user_id: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(!!wifiData.user_id || !isSubmitted)}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-3 ${!wifiData.user_id && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">Please select a user.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="device" className="form-label">
                                        Device Type
                                    </label>
                                    <CreatableSelect
                                        inputId="device"
                                        name="device"
                                        options={deviceOptions}
                                        value={deviceOptions.find(
                                            (option) => option.value === wifiData.device
                                        )}
                                        onChange={(selected) =>
                                            setWifiData((prev) => ({
                                                ...prev,
                                                device: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(!!wifiData.device || !isSubmitted)}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-2 ${!wifiData.device && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        Please select a device type.
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="gateway" className="form-label">
                                        Gateway
                                    </label>
                                    <Select
                                        inputId="gateway"
                                        name="gateway"
                                        options={gatewayOptions}
                                        value={gatewayOptions.find(
                                            (option) => option.value === wifiData.gateway
                                        )}
                                        onChange={(selected) => {
                                            const selectedGateway = selected?.value || ''
                                            setWifiData((prev) => ({
                                                ...prev,
                                                gateway: selectedGateway
                                            }))

                                            if (selectedGateway) {
                                                const usedIps = wifiList
                                                    .filter((w) => w.gateway === selectedGateway)
                                                    .map((w) =>
                                                        parseInt(w.ip_address.split('.')[3])
                                                    )
                                                    .sort((a, b) => a - b)

                                                const base = selectedGateway
                                                    .split('.')
                                                    .slice(0, 3)
                                                    .join('.')
                                                let nextIp = ''
                                                for (let i = 11; i < 255; i++) {
                                                    if (!usedIps.includes(i)) {
                                                        nextIp = `${base}.${i}`
                                                        break
                                                    }
                                                }

                                                setRecommendedIP(nextIp)
                                            } else {
                                                setRecommendedIP('')
                                            }
                                        }}
                                        styles={selectStyles(!!wifiData.gateway || !isSubmitted)}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-1 ${!wifiData.gateway && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">
                                        Please select a gateway type.
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="ip_address" className="form-label">
                                        IP Address
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className={`form-control ${!wifiData.ip_address && isSubmitted ? 'is-invalid' : ''}`}
                                            id="ip_address"
                                            name="ip_address"
                                            value={wifiData.ip_address}
                                            onChange={handleInputChange}
                                            placeholder={
                                                recommendedIP
                                                    ? `Suggested: ${recommendedIP}`
                                                    : 'Enter IP address'
                                            }
                                            required
                                        />
                                        {recommendedIP && (
                                            <button
                                                type="button"
                                                style={{ fontSize: '0.8rem' }}
                                                className="btn btn-outline-secondary"
                                                onClick={() =>
                                                    setWifiData((prev) => ({
                                                        ...prev,
                                                        ip_address: recommendedIP
                                                    }))
                                                }
                                            >
                                                Use Suggestion
                                            </button>
                                        )}
                                    </div>
                                    <div className="invalid-feedback">
                                        Please enter a valid IP address.
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="ssid" className="form-label">
                                        SSID
                                    </label>
                                    <CreatableSelect
                                        inputId="ssid"
                                        name="ssid"
                                        options={ssidOptions}
                                        value={ssidOptions.find(
                                            (option) => option.value === wifiData.ssid
                                        )}
                                        onChange={(selected) =>
                                            setWifiData((prev) => ({
                                                ...prev,
                                                ssid: selected?.value || ''
                                            }))
                                        }
                                        styles={selectStyles(!!wifiData.ssid || !isSubmitted)}
                                        classNamePrefix="react-select"
                                        isClearable
                                        className={`form-control p-0 border-0 z-0 ${!wifiData.ssid && isSubmitted ? 'is-invalid border border-danger' : ''}`}
                                    />
                                    <div className="invalid-feedback">Please select a SSID.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="mac_address" className="form-label">
                                        MAC Address (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mac_address"
                                        name="mac_address"
                                        value={wifiData.mac_address}
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
                                                ></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Add Wifi Line'
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

export default AddWifiModal
