import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddInternetModal from '../../components/modals/AddInternetModal'
import ViewInternetDetailsModal from '../../components/modals/ViewInternetDetailsModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import EditInternetModal from '../../components/modals/EditInternetModal'

function InternetDirectory() {
    const { getData, deleteData } = useAPI()
    const [internet, setInternet] = useState([])
    const [selectedInternet, setSelectedInternet] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/internet', setInternet, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeleteInternet = async () => {
        const response = await deleteData(`/internet/${selectedInternet.id}`, setLoading, setError)
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
        { header: 'Provider', accessorKey: 'provider' },
        { header: 'Gateway', accessorKey: 'gateway' },
        // { header: 'Cable Code', accessorKey: 'cable_code' },
        // { header: 'Location', accessorKey: 'location' },
        // { header: 'Description', accessorKey: 'description' },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="dropdown">
                    <button
                        className="btn border-0"
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
                                data-bs-target="#internetDetailsModal"
                                onClick={() => setSelectedInternet(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#editInternetModal"
                                onClick={() => setSelectedInternet(row.original)}
                            >
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteInternetConfirmModal"
                                onClick={() => setSelectedInternet(row.original)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                onClick={() => {
                                    const gateway = row.original?.gateway
                                    if (gateway) {
                                        window.open(`https://${gateway}`, '_blank')
                                    }
                                }}
                            >
                                Redirect to {row.original?.gateway}
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    Internet Directory
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddInternetModal
                                    id={'AddInternetModal'}
                                    refreshList={refreshList}
                                />
                            }
                            isloading={loading}
                            columns={columns}
                            data={internet}
                        />
                    </div>
                </div>
            </div>

            <ViewInternetDetailsModal id="internetDetailsModal" internet={selectedInternet} />

            <EditInternetModal
                id="editInternetModal"
                internet={selectedInternet}
                refreshList={refreshList}
            />

            <ConfirmationModal
                id="deleteInternetConfirmModal"
                title="Delete Internet Line"
                message={`Are you sure you want to Delete Internet Line with Code ${selectedInternet?.cable_code}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeleteInternet(selectedInternet)}
            />
        </>
    )
}

export default InternetDirectory
