import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'

function AnydeskDirectory() {
    const { getData } = useAPI()
    const [anydesk, setAnydesk] = useState([])
    const [selectedAnydesk, setSelectedAnydesk] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/anydesks', setAnydesk, setLoading)
    }, [])

    const handleShowModal = (telephone) => {
        // console.log(telephone)
        setSelectedAnydesk(telephone)
    }

    const columns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'Anydesk Number', accessorKey: 'number' },
        { header: 'Location', accessorKey: 'location' },
        { header: 'Description', accessorKey: 'description' },
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

    const topContent = (
        <button className="btn btn-primary me-4">
            <FaPlus /> Add Anydesk
        </button>
    )

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    Anydesk Directory
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            isloading={loading}
                            topContent={topContent}
                            columns={columns}
                            data={anydesk}
                        />
                    </div>
                </div>
            </div>

            <div className="modal fade" id="employeesModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Employees for {selectedAnydesk?.telephone_number}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-center p-3">
                            {selectedAnydesk?.users?.length > 0 ? (
                                <ul className="list-group">
                                    {selectedAnydesk.users.map((perm) => (
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
            </div>
        </>
    )
}

export default AnydeskDirectory
