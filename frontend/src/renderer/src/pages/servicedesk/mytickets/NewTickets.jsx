import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import {
    FaArrowRight,
    FaCheck,
    FaEye,
    FaHandPaper,
    FaPlus,
    FaTimes,
    FaUserCheck
} from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CreateTicketModal from '../../../components/modals/CreateTicketModal'
import TicketDetailsModal from '../../../components/modals/TicketDetailsModal'

const subordinates = [
    { id: 1, name: 'Anna Dela Cruz', position: 'IT Support Specialist', request_id: 68 },
    { id: 2, name: 'Mark Reyes', position: 'Junior Developer', request_id: 62 },
    { id: 3, name: 'Janine Santos', position: 'Technical Staff', request_id: 61 },
    { id: 4, name: 'Carlos Gutierrez', position: 'Service Desk Agent', request_id: 38 },
    { id: 5, name: 'Sarah Lim', position: 'Network Assistant' }
]

function NewTickets() {
    const { getData, postData, userRole } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [subordinates, setSubordinates] = useState([])
    const [confirmType, setConfirmType] = useState('')

    useEffect(() => {
        getData('/tickets?status=new', setTickets, setLoading)
    }, [])

    useEffect(() => {
        getData(`/users/subordinates`, setSubordinates)
    }, [])

    const handleAssignButton = (ticket, user) => {
        setSelectedTickets(ticket)
        setSelectedUser(user)
        setConfirmType('assign')
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    // const handleAcceptButton = (ticket) => {
    //     setSelectedTickets(ticket)
    //     setConfirmType('reject')
    //     const modal = new bootstrap.Modal(document.getElementById('confirmModal'))
    //     modal.show()
    // }

    const handleConfirm = () => {
        if (!selectedTickets) return
        let url, payload
        if (confirmType === 'assign') {
            url = `/tickets/${selectedTickets.id}/assign`
            payload = { assigned_to: selectedUser.id }
        } else {
            url = `/tickets/${selectedTickets.id}/accept/${selectedUser.id}`
            payload = ''
        }
        postData(url, payload, setLoading, setError)
        getData('/tickets?status=new', setTickets, setLoading, setError)
    }

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        { header: 'Priority Level', accessorKey: 'priority.name' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.original.status} />
        },
        { header: 'Title', accessorKey: 'title' },
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

                    {['head'].includes(userRole) && (
                        <>
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
                                                // .filter((user) => !user.request_id)
                                                .map((user) => (
                                                    <li key={user.id}>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() =>
                                                                handleAssignButton(
                                                                    row.original,
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            {user.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            {/* <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li className="dropdown-header text-center fw-bold">
                                        Accept Request
                                    </li>
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
                                        ))} */}
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
                        </>
                    )}
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
                                <CreateTicketModal
                                    id={'createTicketModal'}
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

            <ConfirmationModal
                id="confirmModal"
                title={`${confirmType === 'assign' ? 'Assign' : 'Reject'} Ticket`}
                message={`Are you sure you want to ${confirmType} ticket #${selectedTickets?.ticket_number} to user ${selectedUser?.name}?`}
                confirmLabel={confirmType === 'assign' ? 'Assign' : 'Reject'}
                confirmClass={
                    confirmType === 'assign' ? 'btn-success text-light' : 'btn-danger text-light'
                }
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
            />
        </>
    )
}
export default NewTickets
