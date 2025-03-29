import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import {
    FaBan,
    FaCheck,
    FaCheckCircle,
    FaClock,
    FaDoorClosed,
    FaHourglassHalf,
    FaRedo,
    FaSpinner,
    FaTimes,
    FaTimesCircle
} from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'

function PendingTickets() {
    const { fetchData } = useAPI()
    const [tickets, setTickets] = useState([])
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('/tickets?status=pending', setTickets, setLoading)
    }, [])

    const handleShowModal = (tickets) => {
        setSelectedTickets(tickets)
    }

    const statusIcons = {
        pending: {
            icon: <FaClock />,
            class: 'text-light bg-primary',
            label: 'Pending'
        },
        open: {
            icon: <FaHourglassHalf />,
            class: 'text-light bg-primary',
            label: 'Open'
        },
        rejected: {
            icon: <FaTimesCircle />,
            class: 'text-light bg-danger',
            label: 'Rejected'
        },
        in_progress: {
            icon: <FaSpinner />,
            class: 'text-light bg-warning',
            label: 'In Progress'
        },
        resolved: {
            icon: <FaCheckCircle />,
            class: 'text-light bg-success',
            label: 'Resolved'
        },
        failed: { icon: <FaBan />, class: 'text-light bg-dark', label: 'Failed' },
        closed: {
            icon: <FaDoorClosed />,
            class: 'text-light bg-info',
            label: 'Closed'
        },
        reopened: {
            icon: <FaRedo />,
            class: 'text-light bg-primary',
            label: 'Reopened'
        }
    }

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        { header: 'Priority Level', accessorKey: 'priority.name' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.original.status
                const statusInfo = statusIcons[status] || {
                    icon: null,
                    class: 'text-bg-secondary',
                    label: 'Unknown'
                }

                return (
                    <span className={`${statusInfo.class} small py-1 px-3 rounded-pill`}>
                        {statusInfo.icon} {statusInfo.label}
                    </span>
                )
            }
        },
        { header: 'Description', accessorKey: 'description' },
        { header: 'Title', accessorKey: 'title' },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <button className="btn text-light btn-success btn-sm">
                        <FaCheck /> Approve
                    </button>
                    <button className="btn text-light btn-danger btn-sm">
                        <FaTimes /> Reject
                    </button>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    Pending Tickets
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable isloading={loading} columns={columns} data={tickets} />
                    </div>
                </div>
            </div>

            {/* <div className="modal fade" id="employeesModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Employees for {selectedTickets?.telephone_number}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-center p-3">
                            {selectedTickets?.users?.length > 0 ? (
                                <ul className="list-group">
                                    {selectedTickets.users.map((perm) => (
                                        <li key={perm.id} className="list-group-item">
                                            {perm.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No employees assigned.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default PendingTickets
