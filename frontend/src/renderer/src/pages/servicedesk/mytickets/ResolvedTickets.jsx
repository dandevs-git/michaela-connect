import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaCheckCircle, FaEye, FaPlus, FaTimesCircle, FaUndo } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import TicketDetailsModal from '../../../components/modals/TicketDetailsModal'

function ResolvedTickets() {
    const { getData } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/tickets?status=resolved&requester=me', setTickets, setLoading)
    }, [])

    const handleShowModal = (tickets) => {
        setSelectedTickets(tickets)
    }

    const handleAddModal = (tickets) => {
        setSelectedTickets(tickets)
    }

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        { header: 'Priority Level', accessorKey: 'priority.name' },
        { header: 'From Department', accessorKey: 'origin_department.name' },
        { header: 'To Department', accessorKey: 'target_department.name' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.original.status} />
        },
        { header: 'Title', accessorKey: 'title' },
        { header: 'Assigned To', accessorKey: 'assigned_to.name' },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="d-flex gap-2 justify-content-center align-items-center text-nowrap">
                    <button
                        className="btn text-light btn-info btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#ticketDetailsModal"
                        onClick={() => setSelectedTickets(row.original)}
                    >
                        <FaEye /> View
                    </button>

                    <button className="btn text-light btn-success btn-sm">
                        <FaCheckCircle /> Completed
                    </button>
                    <button className="btn text-light btn-danger btn-sm">
                        <FaUndo /> Reopened
                    </button>
                    <button className="btn text-light btn-warning btn-sm">
                        <FaTimesCircle /> Failed
                    </button>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    Resolved Tickets
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
export default ResolvedTickets
