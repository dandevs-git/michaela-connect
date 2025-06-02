import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaEye, FaTimes, FaUserCheck } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badges/StatusBadge'
import ConfirmationModal from '../../../components/modals/ConfirmationModal'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AddTicketModal from '../../../components/modals/AddTicketModal'
import ViewTicketDetailsModal from '../../../components/modals/ViewTicketDetailsModal'
import { useToast } from '../../../contexts/ToastContext'

function NewTickets() {
    const { getData, postData } = useAPI()
    const { showToast } = useToast()
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [subordinates, setSubordinates] = useState([])
    const [confirmType, setConfirmType] = useState('')
    const [remarks, setRemarks] = useState('')

    useEffect(() => {
        getData('/tickets?status=new', setTickets, setLoading, setError)
    }, [])

    useEffect(() => {
        getData(`/users/subordinates`, setSubordinates, setLoading, setError)
    }, [])

    const handleAssignButton = (ticket, user) => {
        setSelectedTickets(ticket)
        setSelectedUser(user)
        setConfirmType('assign')
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

        let url, payload
        if (confirmType === 'assign') {
            url = `/tickets/${selectedTickets.id}/assign`
            payload = { assigned_to: selectedUser.id }
        } else {
            url = `/tickets/${selectedTickets.id}/reject`
            payload = { remarks }
        }

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

    const flattenSubordinates = (users) => {
        let flat = []

        users.forEach((user) => {
            flat.push(user)
            if (user.subordinates && user.subordinates.length > 0) {
                flat = flat.concat(flattenSubordinates(user.subordinates))
            }
        })

        return flat
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
            cell: ({ row }) => <StatusBadge status={row.original.status} />
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
                    <ul
                        className="dropdown-menu dropdown-menu-end shadow-sm rounded-3"
                        data-bs-auto-close="outside"
                    >
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#ticketDetailsModal"
                                onClick={(e) => {
                                    setSelectedTickets(row.original)
                                    e.stopPropagation()
                                }}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li className="dropdown">
                            <button
                                className="dropdown-item w-100 d-flex align-items-center gap-2 fw-semibold dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="me-5">
                                    <FaUserCheck /> Assign
                                </span>
                            </button>

                            <ul className="dropdown-menu">
                                {subordinates.length > 0 ? (
                                    flattenSubordinates(subordinates)
                                        .filter((user) => !user.request_id)
                                        .map((user) => (
                                            <li key={user.id}>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        handleAssignButton(row.original, user)
                                                    }
                                                >
                                                    {user.name}
                                                </button>
                                            </li>
                                        ))
                                ) : (
                                    <li className="dropdown-header text-center fw-bold">
                                        No Subordinates
                                    </li>
                                )}
                            </ul>
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
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    New Tickets
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddTicketModal
                                    id={'AddTicketModal'}
                                    refreshList={() =>
                                        getData(
                                            '/tickets?status=new',
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
                    confirmType === 'assign' ? 'btn-success text-light' : 'btn-danger text-light'
                }
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
                disableConfirm={!remarks.trim()}
            />
        </>
    )
}
export default NewTickets
