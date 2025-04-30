import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaEye, FaPlus } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
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
        getData(`/tickets`, setTickets, setLoading)
    }, [])

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        { header: 'Priority Level', accessorKey: 'priority.name' },
        // { header: 'Department From', accessorKey: 'requester?.department?.name' },
        // { header: 'Department To', accessorKey: 'assigned_to?.department?.name' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.original.status} />
        },
        { header: 'Title', accessorKey: 'title' },
        {
            header: 'Updated At',
            accessorKey: 'updated_at',
            cell: ({ row }) => formatDateVerbose(row.original.updated_at)
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <>
                    <div className="d-flex gap-2 justify-content-center align-items-center text-nowrap">
                        <button
                            className="btn text-light btn-info btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#ticketDetailsModal"
                            onClick={() => setSelectedTickets(row.original)}
                        >
                            <FaEye /> View
                        </button>
                    </div>
                </>
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
                                    resetTickets={setTickets}
                                    resetLoading={setLoading}
                                    resetError={setError}
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
