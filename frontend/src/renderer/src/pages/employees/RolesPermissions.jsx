import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import api from '../../api'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { fetchData } from '../../utils/fetchData'

function RolesPermissions() {
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('/roles', setRoles, setLoading)
    }, [])

    const handleShowModal = (role) => {
        setSelectedRole(role)
    }

    const columns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'Role Name', accessorKey: 'name' },
        {
            header: 'Permissions',
            accessorKey: 'permissions_count',
            cell: ({ row }) => <>{row.original.permissions?.length ?? 0} Permissions</>
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <button
                        className="btn text-light btn-info btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#permissionsModal"
                        onClick={() => handleShowModal(row.original)}
                    >
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
            <FaPlus /> Add Role
        </button>
    )
    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    Roles & Permissions
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            isloading={loading}
                            topContent={topContent}
                            columns={columns}
                            data={roles}
                        />
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="permissionsModal"
                tabIndex="-1"
                aria-labelledby="permissionsModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="permissionsModalLabel">
                                Permissions for {selectedRole?.name}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-center p-3">
                            {selectedRole?.permissions?.length > 0 ? (
                                <ul className="list-group">
                                    {selectedRole.permissions.map((perm) => (
                                        <li key={perm.id} className="list-group-item">
                                            {perm.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No permissions assigned.</p>
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

export default RolesPermissions
