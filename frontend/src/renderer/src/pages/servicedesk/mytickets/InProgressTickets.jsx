import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaUndo, FaCheckCircle, FaTimesCircle, FaPlus, FaEye } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import TicketDetailsModal from '../../../components/modals/TicketDetailsModal'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'
import { useToast } from '../../../contexts/ToastContext'

function InProgressTickets() {
    const { postData, getData } = useAPI()
    const { showToast } = useToast()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [confirmType, setConfirmType] = useState('')

    useEffect(() => {
        getData('/tickets?status=in_progress', setTickets, setLoading)
    }, [])

    const handleStatusChange = (ticket, status) => {
        setSelectedTickets(ticket)
        setConfirmType(status)
        const modal = new Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleConfirm = () => {
        if (!selectedTickets) return
        const url = `/tickets/${selectedTickets.id}/status`

        const status = confirmType

        postData(
            url,
            { status },
            () => {},
            () => {},
            setError
        )
        getData('/tickets?status=in_progress', setTickets, setLoading, setError)

        showToast({
            message: error.message || `Ticket ${confirmType} successfully!`,
            title: error.message ? 'Failed' : 'Success',
            isPositive: error.message ? false : true,
            delay: 5000
        })
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
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="dropdown">
                    <button
                        className="btn btn-light text-dark border-0"
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
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleStatusChange(row.original, 'resolved')}
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                            >
                                <FaCheckCircle /> Resolved
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleStatusChange(row.original, 'failed')}
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                            >
                                <FaTimesCircle /> Failed
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleStatusChange(row.original, 'reopened')}
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                            >
                                <FaUndo /> Reopened
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
                    In Progress tickets
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

            <ConfirmationModal
                id="confirmModal"
                title={`${confirmType} Ticket`}
                message={`Are you sure you want to ${confirmType} ticket #${selectedTickets?.ticket_number}?`}
                confirmLabel={confirmType}
                confirmClass={
                    confirmType === 'resolved'
                        ? 'btn-success text-light'
                        : confirmType === 'failed'
                          ? 'btn-danger text-light'
                          : 'btn-warning text-light'
                }
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
            />
        </>
    )
}
export default InProgressTickets
