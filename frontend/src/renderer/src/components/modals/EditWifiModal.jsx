import { useState, useEffect, useRef } from 'react'
import { useAPI } from '../../contexts/APIContext'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { useToast } from '../../contexts/ToastContext'
import Select from 'react-select'
import { selectStyles } from '../../constants/config'

function EditWifiModal({ id, wifi, refreshList }) {
    const { putData, getData } = useAPI()
    const { showToast } = useToast()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [users, setUsers] = useState([])
    const [wifiData, setWifiData] = useState({
        user_id: '',
        device: '',
        ip_address: '',
        ssid: '',
        gateway: '',
        mac_address: ''
    })

    const modalRef = useRef(null)
    const formRef = useRef(null)

    useEffect(() => {
        getData('/users', setUsers, () => {}, setError)
    }, [])

    useEffect(() => {
        if (wifi) {
            setWifiData({
                user_id: wifi?.user?.id || '',
                device: wifi.device || '',
                ip_address: wifi.ip_address || '',
                ssid: wifi.ssid || '',
                gateway: wifi.gateway || '',
                mac_address: wifi.mac_address || ''
            })
        }
    }, [wifi])

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name
    }))

    const deviceOptions = [
        { value: 'Computer', label: 'Computer' },
        { value: 'Laptop', label: 'Laptop' },
        { value: 'Printer', label: 'Printer' },
        { value: 'Phone', label: 'Phone' },
        { value: 'Tablet', label: 'Tablet' },
        { value: 'CCTV', label: 'CCTV' },
        { value: 'Access Point', label: 'Access Point' },
        { value: 'Other', label: 'Other' }
    ]

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

        if (!form.checkValidity() || !wifiData.user_id) {
            form.classList.add('was-validated')
            return
        }

        const response = await putData(`/wifi/${wifi.id}`, wifiData, () => {}, setLoading, setError)

        if (response) {
            setIsSubmitted(false)
            resetForm()
            // Modal.getInstance(modalRef.current)?.hide()
            modalRef.current.querySelector('[data-bs-dismiss="modal"]').click()
            refreshList()
        }
    }

    return (
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
                        <h5 className="modal-title fw-semibold text-uppercase">Edit Wifi</h5>
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
                                <Select
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
                                <div className="invalid-feedback">Please select a device type.</div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="ip_address" className="form-label">
                                    IP Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ip_address"
                                    name="ip_address"
                                    value={wifiData.ip_address}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">Please enter the IP Address.</div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="gateway" className="form-label">
                                    Gateway
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gateway"
                                    name="gateway"
                                    value={wifiData.gateway}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter the gateway address.
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="ssid" className="form-label">
                                    SSID
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ssid"
                                    name="ssid"
                                    value={wifiData.ssid}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">Please enter a ssid.</div>
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
                                    className="btn text-light btn-warning w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-grow spinner-grow-sm me-2"
                                                role="status"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        'Update Wifi Record'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditWifiModal
