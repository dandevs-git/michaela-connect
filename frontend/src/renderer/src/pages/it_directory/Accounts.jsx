import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import {
    FaEye,
    FaExternalLinkAlt,
    FaEyeSlash,
    FaClipboard,
    FaCheckCircle,
    FaClipboardCheck,
    FaEdit,
    FaTrash
} from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddAccountModal from '../../components/modals/AddAccountModal'
import ViewAccountDetailsModal from '../../components/modals/ViewAccountDetailsModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
// import EditAccountModal from '../../components/modals/EditAccountModal'

function Accounts() {
    const { getData, deleteData } = useAPI()
    const [account, setAccount] = useState([])
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/accounts', setAccount, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeleteAccount = async () => {
        const response = await deleteData(`/accounts/${selectedAccount.id}`, setLoading, setError)
        if (response) {
            refreshList()
        }
    }

    const columns = [
        {
            header: 'Type',
            accessorKey: 'type',
            cell: ({ row }) => row.original?.type || 'N/A'
        },
        {
            header: 'Link',
            accessorKey: 'link',
            cell: ({ row }) => <div className="text-lowercase">{row.original?.link || 'N/A'}</div>
        },
        {
            header: 'Username',
            accessorKey: 'username',
            cell: ({ row }) => (
                <div className="text-lowercase">{row.original?.username || 'N/A'}</div>
            )
        },

        {
            header: 'Password',
            accessorKey: 'password',
            cell: ({ row }) => {
                const [visible, setVisible] = useState(false)
                const [copied, setCopied] = useState(false)
                const password = row.original?.password

                const copyToClipboard = () => {
                    navigator.clipboard.writeText(password).then(() => {
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                    })
                }

                if (!password) return <span className="text-muted">N/A</span>

                return (
                    <div className="input-group">
                        <input
                            type={visible ? 'text' : 'password'}
                            className="form-control border-primary-subtle border-end-0"
                            value={password || ''}
                            readOnly
                        />
                        <button
                            className="btn border-primary-subtle  "
                            type="button"
                            onClick={() => setVisible(!visible)}
                            aria-label={visible ? 'Hide password' : 'Show password'}
                            title={visible ? 'Hide password' : 'Show password'}
                        >
                            {visible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                            className="btn border-primary-subtle "
                            type="button"
                            onClick={copyToClipboard}
                            aria-label="Copy password"
                            title="Copy password"
                        >
                            {copied ? (
                                <>
                                    <FaClipboardCheck />
                                </>
                            ) : (
                                <>
                                    <FaClipboard />
                                </>
                            )}
                        </button>
                    </div>
                )
            }
        },
        {
            header: 'Department',
            accessorKey: 'department',
            enableHiding: true
        },
        {
            header: 'Users',
            accessorKey: 'user_id',
            enableHiding: true
        },
        {
            header: 'Purpose',
            accessorKey: 'purpose',
            enableHiding: true
        },
        {
            header: 'Recovery Email',
            accessorKey: 'recovery_email',
            enableHiding: true
        },
        {
            header: 'Recovery Number',
            accessorKey: 'recovery_number',
            enableHiding: true
        },
        {
            header: '2-Step Verification',
            accessorKey: 'verification',
            enableHiding: true
        },
        {
            header: 'Description',
            accessorKey: 'description',
            enableHiding: true
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="dropdown">
                    <button
                        className="action-btn btn border-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        aria-label="More actions"
                        title="More actions"
                    >
                        <i className="bi bi-list fs-5"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm rounded-3">
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#accountDetailsModal"
                                onClick={() => setSelectedAccount(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#editAccountModal"
                                onClick={() => setSelectedAccount(row.original)}
                            >
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteAccountConfirmModal"
                                onClick={() => setSelectedAccount(row.original)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100 rounded-4 ">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4 text-center">
                    Accounts
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddAccountModal id={'AddAccountModal'} refreshList={refreshList} />
                            }
                            isloading={loading}
                            columns={columns}
                            data={account}
                        />
                    </div>
                </div>
            </div>

            <ViewAccountDetailsModal id="accountDetailsModal" account={selectedAccount} />

            {/* <EditAccountModal
                id="editAccountModal"
                account={selectedAccount}
                refreshList={refreshList}
            /> */}

            <ConfirmationModal
                id="deleteAccountConfirmModal"
                title="Delete Account"
                message={`Are you sure you want to Delete Account ${selectedAccount?.number}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeleteAccount(selectedAccount)}
            />
        </>
    )
}

export default Accounts
