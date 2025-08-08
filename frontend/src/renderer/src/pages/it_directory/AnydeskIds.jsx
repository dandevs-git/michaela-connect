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
import AddAnydeskModal from '../../components/modals/AddAnydeskModal'
import ViewAnydeskDetailsModal from '../../components/modals/ViewAnydeskDetailsModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import EditAnydeskModal from '../../components/modals/EditAnydeskModal'

function AnydeskIds() {
    const { getData, deleteData } = useAPI()
    const [anydesk, setAnydesk] = useState([])
    const [selectedAnydesk, setSelectedAnydesk] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/anydesks', setAnydesk, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeleteAnydesk = async () => {
        const response = await deleteData(`/anydesks/${selectedAnydesk.id}`, setLoading, setError)
        if (response) {
            refreshList()
        }
    }

    const columns = [
        {
            header: 'User',
            accessorFn: (row) => row.user?.name || '',
            id: 'userName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.user?.name || 'N/A'
        },
        {
            header: 'Department',
            accessorFn: (row) => row.user?.department?.name || '',
            id: 'userDepartment',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.user?.department?.name || 'N/A'
        },
        {
            header: 'Anydesk Number',
            accessorKey: 'number',
            cell: ({ row }) => row.original?.number || 'N/A'
        },
        {
            header: 'Anydesk Password',
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
        // { header: 'Location', accessorKey: 'location' },
        // { header: 'Description', accessorKey: 'description' },
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
                                data-bs-target="#anydeskDetailsModal"
                                onClick={() => setSelectedAnydesk(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#editAnydeskModal"
                                onClick={() => setSelectedAnydesk(row.original)}
                            >
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteAnydeskConfirmModal"
                                onClick={() => setSelectedAnydesk(row.original)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                onClick={() => {
                                    setSelectedAnydesk(row.original)
                                    window.open(`anydesk:${row.original?.number}`)
                                }}
                            >
                                <FaExternalLinkAlt className="text-success" />
                                Goto Anydesk
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
                    Anydesk Ids
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddAnydeskModal id={'AddAnydeskModal'} refreshList={refreshList} />
                            }
                            isloading={loading}
                            columns={columns}
                            data={anydesk}
                        />
                    </div>
                </div>
            </div>

            <ViewAnydeskDetailsModal id="anydeskDetailsModal" anydesk={selectedAnydesk} />

            <EditAnydeskModal
                id="editAnydeskModal"
                anydesk={selectedAnydesk}
                refreshList={refreshList}
            />

            <ConfirmationModal
                id="deleteAnydeskConfirmModal"
                title="Delete Anydesk"
                message={`Are you sure you want to Delete Anydesk ${selectedAnydesk?.number}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeleteAnydesk(selectedAnydesk)}
            />
        </>
    )
}

export default AnydeskIds
