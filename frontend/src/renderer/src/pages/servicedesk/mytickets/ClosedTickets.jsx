import { useEffect, useState } from 'react'
import CustomTable from '../../../components/tables/CustomTable'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../../contexts/APIContext'
import StatusBadge from '../../../components/badge/StatusBadge'

function ClosedTickets() {
    const { getData } = useAPI()
    const [tickets, setTickets] = useState([])
    const [selectedTickets, setSelectedTickets] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/tickets?status=closed', setTickets, setLoading)
        // console.log(tickets)
    }, [])

    const handleShowModal = (tickets) => {
        // console.log(tickets)
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
                    <button className="btn text-light btn-info btn-sm">
                        <FaEye /> View
                    </button>
                    <button className="btn text-light btn-warning btn-sm">
                        <FaEdit /> Edit
                    </button>
                    <button className="btn text-light btn-danger btn-sm">
                        <FaTrash /> Delete
                    </button>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                    Closed tickets
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
export default ClosedTickets
