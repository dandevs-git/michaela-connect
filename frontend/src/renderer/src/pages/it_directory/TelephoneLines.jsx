import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddTelephoneModal from '../../components/modals/AddTelephoneModal'
import ViewTelephoneDetailsModal from '../../components/modals/ViewTelephoneDetailsModal'
import EditTelephoneModal from '../../components/modals/EditTelephoneModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'

function TelephoneLines() {
    const { getData, deleteData } = useAPI()
    const [telephones, setTelephones] = useState([])
    const [selectedTelephone, setSelectedTelephone] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/telephones', setTelephones, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeleteTelephone = async () => {
        const response = await deleteData(
            `/telephones/${selectedTelephone.id}`,
            setLoading,
            setError
        )
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
        { header: 'Telephone Number', accessorKey: 'number' },
        { header: 'Cable Code', accessorKey: 'cable_code' },
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
                                data-bs-target="#telephoneDetailsModal"
                                onClick={() => setSelectedTelephone(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#editTelephoneModal"
                                onClick={() => setSelectedTelephone(row.original)}
                            >
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteTelephoneConfirmModal"
                                onClick={() => setSelectedTelephone(row.original)}
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
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4 text-center">
                    Telephone Lines
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddTelephoneModal
                                    id={'AddTelephoneModal'}
                                    refreshList={refreshList}
                                />
                            }
                            isloading={loading}
                            columns={columns}
                            data={telephones}
                        />
                    </div>
                </div>
            </div>

            <ViewTelephoneDetailsModal id="telephoneDetailsModal" telephone={selectedTelephone} />

            <EditTelephoneModal
                id="editTelephoneModal"
                telephone={selectedTelephone}
                refreshList={refreshList}
            />

            <ConfirmationModal
                id="deleteTelephoneConfirmModal"
                title="Delete Telephone"
                message={`Are you sure you want to Delete Telephone Number ${selectedTelephone?.number}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeleteTelephone(selectedTelephone)}
            />
        </>
    )
}

export default TelephoneLines
