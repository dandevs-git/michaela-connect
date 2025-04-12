import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaEye, FaPlus } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import ViewTicketDetails from '../../../components/modals/ViewTicketDetails'
import CreateTicket from '../../../components/CreateTicket'

function AllTickets() {
    const { getData } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/tickets', setTickets, setLoading)
    }, [])

    const getSelectedTicket = (tickets) => {
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
                <button
                    className="btn text-light btn-info btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#viewTicketModal"
                    onClick={() => getSelectedTicket(row.original)}
                >
                    <FaEye /> View
                </button>
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

            <ViewTicketDetails id={'viewTicketModal'} data={selectedTickets} />

            <CreateTicket
                resetTickets={setTickets}
                resetLoading={setLoading}
                resetError={setError}
            />
        </>
    )
}
export default AllTickets
