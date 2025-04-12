import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaArrowRight, FaCheck, FaHandPaper, FaPlus, FaTimes, FaUserCheck } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import CreateTicket from '../../../components/CreateTicket'

const subordinates = [
    { id: 1, name: 'Anna Dela Cruz', position: 'IT Support Specialist', request_id: 68 },
    { id: 2, name: 'Mark Reyes', position: 'Junior Developer', request_id: 62 },
    { id: 3, name: 'Janine Santos', position: 'Technical Staff', request_id: 61 },
    { id: 4, name: 'Carlos Gutierrez', position: 'Service Desk Agent', request_id: 38 },
    { id: 5, name: 'Sarah Lim', position: 'Network Assistant' }
]

function NewTickets() {
    const { getData } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [subordinates, setSubordinates] = useState([])

    useEffect(() => {
        getData('/tickets?status=new', setTickets, setLoading)
    }, [])

    useEffect(() => {
        getData(`/users/subordinates`, setSubordinates)
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
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <div className="dropdown">
                        <div
                            className="btn bg-success btn-sm text-light dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <FaUserCheck /> Assign
                        </div>
                        <ul className="dropdown-menu dropdown-menu-start">
                            {subordinates.length > 0 ? (
                                <>
                                    {subordinates
                                        .filter((user) => user.request_id)
                                        .map((user) => (
                                            <li key={user.id}>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        assignTicket(row.original.id, user.id)
                                                    }
                                                >
                                                    {user.name}
                                                </button>
                                            </li>
                                        ))}
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li className="dropdown-header text-center fw-bold">
                                        Accept Request
                                    </li>
                                    {subordinates
                                        .filter((user) => !user.request_id)
                                        .map((user) => (
                                            <li key={user.id}>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        assignTicket(row.original.id, user.id)
                                                    }
                                                >
                                                    {user.name}
                                                </button>
                                            </li>
                                        ))}
                                </>
                            ) : (
                                <li className="dropdown-header text-center fw-bold">
                                    No Subordinates
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* <button className="btn text-light btn-info btn-sm">
                        <FaHandPaper /> Assign to me
                    </button> */}
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    New Tickets
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
export default NewTickets
