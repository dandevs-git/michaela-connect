import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddRoleModal from '../../components/modals/AddRoleModal'

function RolesPermissions() {
    const { getData } = useAPI()
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/roles', setRoles, setLoading, setError)
    }, [])

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
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#permissionsModal"
                                onClick={() => setSelectedRole(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item d-flex align-items-center gap-2 fw-semibold">
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item d-flex align-items-center gap-2 fw-semibold">
                                <FaTrash /> Delete
                            </button>
                        </li>
                    </ul>
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
            <div className="card shadow w-100 rounded-4 ">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4 text-center">
                    Roles & Permissions
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddRoleModal
                                // id={'AddRoleModal'}
                                // refreshList={() =>
                                //     getData('/roles', setRoles, setLoading, setError)
                                // }
                                />
                            }
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
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
                                            Can {perm.name}
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
