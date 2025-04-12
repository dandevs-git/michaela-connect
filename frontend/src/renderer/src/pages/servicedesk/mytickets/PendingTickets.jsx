import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CreateTicket from '../../../components/CreateTicket'

function PendingTickets() {
    const { getData, postData } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [confirmType, setConfirmType] = useState('')

    useEffect(() => {
        getData('/tickets?status=pending', setTickets, setLoading, setError)
    }, [])

    const handleApproveButton = (ticket) => {
        setSelectedTickets(ticket)
        setConfirmType('approve')
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleRejectButton = (ticket) => {
        setSelectedTickets(ticket)
        setConfirmType('reject')
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleConfirm = () => {
        if (!selectedTickets) return

        const url =
            confirmType === 'approve'
                ? `/tickets/${selectedTickets.id}/approve`
                : `/tickets/${selectedTickets.id}/reject`

        postData(url, '', setLoading, setError)
        getData('/tickets?status=pending', setTickets, setLoading, setError)
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
                    <button
                        onClick={() => handleApproveButton(row.original)}
                        className="btn text-light btn-success btn-sm"
                    >
                        <FaCheck /> Approve
                    </button>
                    <button
                        onClick={() => handleRejectButton(row.original)}
                        className="btn text-light btn-danger btn-sm"
                    >
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

            <ConfirmationModal
                id="confirmModal"
                title={`${confirmType === 'approve' ? 'Approve' : 'Reject'} Ticket`}
                message={`Are you sure you want to ${confirmType} ticket #${selectedTickets?.ticket_number}?`}
                confirmLabel={confirmType === 'approve' ? 'Approve' : 'Reject'}
                confirmClass={
                    confirmType === 'approve' ? 'btn-success text-light' : 'btn-danger text-light'
                }
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
            />
        </>
    )
}

export default PendingTickets
