import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddInternetModal from '../../components/modals/AddInternetModal'
import InternetDetailsModal from '../../components/modals/InternetDetailsModal'

function InternetDirectory() {
    const { getData } = useAPI()
    const [internet, setInternet] = useState([])
    const [selectedInternet, setSelectedInternet] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/internet', setInternet, setLoading)
    }, [])

    const columns = [
        { header: 'No.', accessorKey: 'id' },
        {
            header: 'User',
            accessorKey: 'user',
            cell: ({ row }) => row.original.user?.name || 'N/A'
        },
        {
            header: 'Department',
            accessorKey: 'user?.department',
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
                    </ul>
                </div>
            )
        }
    ]

    const topContent = (
        <button className="btn btn-primary me-4">
            <FaPlus /> Add Internet
        </button>
    )

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
                                    resetEmployee={setInternet}
                                    resetLoading={setLoading}
                                    resetError={setError}
                                />
                            }
                            isloading={loading}
                            columns={columns}
                            data={internet}
                        />
                    </div>
                </div>
            </div>

            <InternetDetailsModal id="internetDetailsModal" internet={selectedInternet} />
        </>
    )
}

export default InternetDirectory
