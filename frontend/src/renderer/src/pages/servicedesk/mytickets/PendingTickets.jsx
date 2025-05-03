import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaCheck, FaEye, FaPlus, FaTimes } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import TicketDetailsModal from '../../../components/modals/TicketDetailsModal'
import PermissionButton from '../../../components/buttons/PermissionButton'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'

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

        postData(url, '', setLoading, setError)
        getData('/tickets?status=pending', setTickets, setLoading, setError)
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
                <div className="d-flex gap-2 justify-content-center align-items-center text-nowrap">
                    {/* <PermissionButton
                        permission="view ticket details"
                        onClick={() => setSelectedTickets(row.original)}
                        className="btn text-light btn-info btn-sm"
                    >
                        <FaEye /> View
                    </PermissionButton> */}

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
