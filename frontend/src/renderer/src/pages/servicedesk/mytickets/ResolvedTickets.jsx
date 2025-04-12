import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaCheckCircle, FaPlus, FaTimesCircle, FaUndo } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import CreateTicket from '../../../components/CreateTicket'

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
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.original.status} />
        },
        { header: 'Description', accessorKey: 'description' },
        { header: 'Title', accessorKey: 'title' },
        {
            header: 'Department',
            accessorKey: 'department_id',
            cell: ({ row }) => row.original.requester.department?.name || '-'
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="d-flex gap-2 justify-content-center align-items-center">
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
                                <button
                                    className="btn btn-primary text-nowrap border me-4"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addTicketModal"
                                >
                                    <FaPlus /> New Ticket
                                </button>
                            }
                            isloading={loading}
                            columns={columns}
                            data={tickets}
                        />
                    </div>
                </div>
            </div>

            <CreateTicket
                resetTickets={setTickets}
                resetLoading={setLoading}
                resetError={setError}
            />
        </>
    )
}
export default ResolvedTickets
