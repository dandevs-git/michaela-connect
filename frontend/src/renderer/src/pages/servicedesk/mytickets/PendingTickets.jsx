import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaCheck, FaEye, FaPlus, FaTimes } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import TicketStatusBadge from '../../../components/badges/TicketStatusBadge'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import ViewTicketDetailsModal from '../../../components/modals/ViewTicketDetailsModal'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { useToast } from '../../../contexts/ToastContext'

function PendingTickets() {
    const { getData, postData } = useAPI()
    const { showToast } = useToast()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [confirmType, setConfirmType] = useState('')
    const [remarks, setRemarks] = useState('')

    useEffect(() => {
        getData('/tickets?status=pending', setTickets, setLoading, setError)
    }, [])

    const handleApproveButton = (ticket) => {
        setSelectedTickets(ticket)
        setConfirmType('approve')
        const modal = new Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleRejectButton = (ticket) => {
        setSelectedTickets(ticket)
        setConfirmType('reject')
        const modal = new Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleConfirm = () => {
        if (!selectedTickets) return

        const url =
            confirmType === 'approve'
                ? `/tickets/${selectedTickets.id}/approve`
                : `/tickets/${selectedTickets.id}/reject`

        const payload = confirmType === 'approve' ? () => {} : { remarks }

        postData(
            url,
            payload,
            () => {
                setRemarks('')
                setSelectedTickets(null)
                getData('/tickets?status=pending', setTickets, setLoading, setError)
            },
            () => {},
            setError
        )
    }

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        {
            header: 'Priority Level',
            accessorFn: (row) => row.priority?.name || '',
            id: 'priorityName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.priority?.name || 'N/A'
        },
        {
            header: 'From Department',
            accessorFn: (row) => row.origin_department?.name || '',
            id: 'origin_departmentName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.origin_department?.name || 'N/A'
        },
        {
            header: 'To Department',
            accessorFn: (row) => row.target_department?.name || '',
            id: 'target_departmentName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.target_department?.name || 'N/A'
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <TicketStatusBadge status={row.original.status} />
        },
        { header: 'Title', accessorKey: 'title' },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="dropdown">
                    <button
                        className="action-btn btn border-0"
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
                                onClick={() => handleApproveButton(row.original)}
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                            >
                                <FaCheck /> Approve
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleRejectButton(row.original)}
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                            >
                                <FaTimes /> Reject
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100 rounded-4 ">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    Pending Tickets
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddTicketModal
                                    id={'AddTicketModal'}
                                    refreshList={() =>
                                        getData(
                                            '/tickets?status=pending',
                                            setTickets,
                                            setLoading,
                                            setError
                                        )
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

            <ViewTicketDetailsModal id={'ticketDetailsModal'} data={selectedTickets} />

            <ConfirmationModal
                id="confirmModal"
                title={`${confirmType} Ticket`}
                message={
                    <>
                        <div className="mb-4">
                            {`Are you sure you want to ${confirmType} ticket #${selectedTickets?.ticket_number}?`}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="remarks" className="form-label">
                                Remarks
                            </label>
                            <textarea
                                className="form-control mb-1"
                                id="remarks"
                                rows="5"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                            {!remarks.trim() && (
                                <div className="small text-center text-danger">
                                    Remarks are required.
                                </div>
                            )}
                        </div>
                    </>
                }
                confirmLabel={confirmType}
                confirmClass={
                    confirmType === 'approve' ? 'btn-success text-light' : 'btn-danger text-light'
                }
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
                disableConfirm={!remarks.trim()}
            />
        </>
    )
}

export default PendingTickets
