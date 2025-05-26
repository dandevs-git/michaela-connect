import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaEye, FaPlus } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badges/StatusBadge'
import TicketDetailsModal from '../../../components/modals/TicketDetailsModal'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import { formatDateVerbose } from '../../../utils/formatDateVerbose'

function AllTickets() {
    const { getData, authUser } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData(`/tickets`, setTickets, setLoading, setError)
    }, [])

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        {
            header: 'Priority Level',
            accessorKey: 'priority.name',
            cell: ({ row }) => row.original.priority?.name || 'N/A'
        },
        {
            header: 'From Department',
            accessorKey: 'origin_department.name',
            cell: ({ row }) => row.original.origin_department?.name || 'N/A'
        },
        {
            header: 'To Department',
            accessorKey: 'target_department.name',
            cell: ({ row }) => row.original.target_department?.name || 'N/A'
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.original.status} />
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
                                data-bs-target="#ticketDetailsModal"
                                onClick={() => setSelectedTickets(row.original)}
                            >
                                <FaEye className="me-1" /> View
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

            <TicketDetailsModal id={'ticketDetailsModal'} data={selectedTickets} />
        </>
    )
}
export default AllTickets
