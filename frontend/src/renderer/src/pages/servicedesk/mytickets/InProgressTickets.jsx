import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaUndo, FaCheckCircle, FaTimesCircle, FaPlus, FaEye } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import TicketDetailsModal from '../../../components/modals/TicketDetailsModal'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'
import PermissionButton from '../../../components/buttons/PermissionButton'

function InProgressTickets() {
    const { postData, getData } = useAPI()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [confirmType, setConfirmType] = useState('')

    useEffect(() => {
        getData('/tickets?status=in_progress', setTickets, setLoading)
    }, [])

    const handleResolvedButton = (ticket) => {
        setSelectedTickets(ticket)
        setConfirmType('resolved')
        const modal = new Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleFailedButton = (ticket) => {
        setSelectedTickets(ticket)
        setConfirmType('failed')
        const modal = new Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleReopenedButton = (ticket) => {
        setSelectedTickets(ticket)
        setConfirmType('reopened')
        const modal = new Modal(document.getElementById('confirmModal'))
        modal.show()
    }

    const handleConfirm = () => {
        if (!selectedTickets) return
        const url = `/tickets/${selectedTickets.id}/status`

        const status =
            confirmType === 'resolved'
                ? 'resolved'
                : confirmType === 'failed'
                  ? 'failed'
                  : 'reopened'

        postData(url, { status }, null, setLoading, setError)
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
                    <PermissionButton
                        permission="view ticket details"
                        onClick={() => setSelectedTickets(row.original)}
                        className="btn text-light btn-info btn-sm"
                    >
                        <FaEye /> View
                    </PermissionButton>

                    <button
                        onClick={() => handleResolvedButton(row.original)}
                        className="btn text-light btn-success btn-sm"
                    >
                        <FaCheckCircle /> Resolved
                    </button>
                    <button
                        onClick={() => handleFailedButton(row.original)}
                        className="btn text-light btn-danger btn-sm"
                    >
                        <FaTimesCircle /> Failed
                    </button>
                    <button
                        onClick={() => handleReopenedButton(row.original)}
                        className="btn text-light btn-warning btn-sm"
                    >
                        <FaUndo /> Reopened
                    </button>
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
                title={`${confirmType === 'resolved' ? 'Resolved' : confirmType === 'failed' ? 'Failed' : 'Reopened'} Ticket`}
                message={`Are you sure you want to ${confirmType} ticket #${selectedTickets?.ticket_number}?`}
                confirmLabel={
                    confirmType === 'resolved'
                        ? 'Resolved'
                        : confirmType === 'failed'
                          ? 'Failed'
                          : 'Reopened'
                }
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
