import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaEye } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import ViewTicketDetails from '../../../components/modals/ViewTicketDetails'

function AllTickets() {
    const { getData } = useAPI()
    const [tickets, setTickets] = useState([])
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/tickets', setTickets, setLoading)
    }, [])

    const handleShowModal = (tickets) => {
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
                    onClick={() => handleShowModal(row.original)}
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
                        <CustomTable isloading={loading} columns={columns} data={tickets} />
                    </div>
                </div>
            </div>

            <ViewTicketDetails id={'viewTicketModal'} data={selectedTickets} />
        </>
    )
}
export default AllTickets
