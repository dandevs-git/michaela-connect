import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import TicketStatusBadge from '../../../components/badges/TicketStatusBadge'
import ViewTicketDetailsModal from '../../../components/modals/ViewTicketDetailsModal'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import { formatDateVerbose } from '../../../utils/formatDateVerbose'
import PermissionButton from '../../../components/buttons/PermissionButton'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'

function AllTickets() {
    const { getData, deleteData } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData(`/tickets`, setTickets, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeleteTicket = async () => {
        const response = await deleteData(`/tickets/${selectedTickets.id}`, setLoading, setError)
        if (response) {
            refreshList()
        }
    }

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        {
            header: 'Priority Level',
            accessorFn: (row) => row.priority?.name || '',
            id: 'priorityName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.priority?.name || 'N/A'
        },
        {
            header: 'From Department',
            accessorFn: (row) => row.origin_department?.name || '',
            id: 'origin_departmentName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.origin_department?.name || 'N/A'
        },
        {
            header: 'To Department',
            accessorFn: (row) => row.target_department?.name || '',
            id: 'target_departmentName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.target_department?.name || 'N/A'
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <TicketStatusBadge status={row.original.status} />
        },
        {
            header: 'Title',
            accessorKey: 'title',
            cell: ({ row }) => row.original.title || 'N/A'
        },
        {
            header: 'Updated At',
            accessorKey: 'updated_at',
            cell: ({ row }) => formatDateVerbose(row.original.updated_at)
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
                                onClick={() => setSelectedTickets(row.original)}
                            >
                                <FaEye className="me-1" /> View
                            </button>
                        </li>
                        <li>
                            <PermissionButton
                                permission={'delete tickets'}
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                onClick={() => setSelectedTickets(row.original)}
                                data-bs-toggle="modal"
                                data-bs-target="#deleteTicketConfirmModal"
                            >
                                <FaTrash className="me-1" /> Delete
                            </PermissionButton>
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    return (
        <>
            <div className="card shadow w-100 rounded-4 ">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    All Tickets
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddTicketModal
                                    id={'AddTicketModal'}
                                    refreshList={() =>
                                        getData(`/tickets`, setTickets, setLoading, setError)
                                    }
                                />
                            }
                            isloading={loading}
                            columns={columns}
                            data={tickets}
                        />
                    </div>
                </div>
            </div>

            <ViewTicketDetailsModal id={'ticketDetailsModal'} data={selectedTickets} />

            <ConfirmationModal
                id="deleteTicketConfirmModal"
                title="Delete Ticket"
                message={`Are you sure you want to Delete Ticket ${selectedTickets?.ticket_number}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeleteTicket(selectedTickets)}
            />
        </>
    )
}
export default AllTickets
