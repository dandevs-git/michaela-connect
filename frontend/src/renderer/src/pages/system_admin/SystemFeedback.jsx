import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { useAPI } from '../../contexts/APIContext'
import { FaEye } from 'react-icons/fa'

function SystemFeedback() {
    const { getData } = useAPI()
    const [feedback, setFeedback] = useState([])
    const [selectedFeedback, setSelectedFeedback] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/feedback', setFeedback, setLoading, setError)
    }, [])

    console.log(feedback)

    const columnsLogs = [
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
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => row.original.status.replace('_', ' ').toUpperCase() || 'N/A'
        },
        {
            header: 'Comment',
            accessorKey: 'comment',
            cell: ({ row }) => row.original.comment || 'N/A'
        },
        {
            header: 'Type',
            accessorKey: 'type',
            cell: ({ row }) => row.original.type || 'N/A'
        },
        {
            header: 'Severity',
            accessorKey: 'severity',
            cell: ({ row }) => row.original.severity || 'N/A'
        },
        {
            header: 'Source',
            accessorKey: 'source',
            cell: ({ row }) => row.original.source || 'N/A'
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
                                data-bs-target="#ticketDetailsModal"
                                onClick={() => setSelectedFeedback(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    return (
        <>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="activities">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                    System Feedback
                </div>
                <div className="row card-body">
                    <div className="col-xl-12 m-0 p-4">
                        <CustomTable isloading={loading} columns={columnsLogs} data={feedback} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default SystemFeedback
