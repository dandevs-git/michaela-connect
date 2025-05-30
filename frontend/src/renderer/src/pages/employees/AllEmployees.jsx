import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import {
    FaEdit,
    FaEye,
    FaLock,
    FaRedoAlt,
    FaSyncAlt,
    FaTrash,
    FaUnlock,
    FaUser,
    FaUserCheck,
    FaUserLock,
    FaUserSlash
} from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddEmployeeModal from '../../components/modals/AddEmployeeModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import ViewEmployeeDetailsModal from '../../components/modals/ViewEmployeeDetailsModal'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'
import NewPasswordModal from '../../components/modals/NewPasswordModal'
import FullScreenLoader from '../../components/FullScreenLoader'

function AllEmployees() {
    const { patchData, getData } = useAPI()
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [resettingPassword, setResettingPassword] = useState(null)

    const refreshList = () => {
        getData('/users', setEmployees, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleLockUnlockUser = (employee) => {
        patchData(
            `/users/${employee?.id}/lock`,
            () => {},
            () => {},
            () => {},
            setError
        )
        refreshList()
    }

    const handleSuspendReinstateUser = (employee) => {
        patchData(
            `/users/${employee?.id}/suspend`,
            () => {},
            () => {},
            () => {},
            setError
        )
        refreshList()
    }

    const handleResetPassword = async (employee) => {
        setResettingPassword(true)
        try {
            const response = await patchData(
                `/users/${employee.id}/reset-password`,
                () => {},
                () => {},
                () => {},
                setError
            )
            if (response) {
                setNewPassword(response.new_password)
                const modal = new Modal(document.getElementById('NewPasswordModal'))
                modal.show()
                refreshList()
            }
        } finally {
            setResettingPassword(false)
        }
    }

    const handleDeactivateActivateUser = (employee) => {
        patchData(
            `/users/${employee?.id}/suspend`,
            () => {},
            () => {},
            () => {},
            setError
        )
        refreshList()
    }

    const columns = [
        {
            header: 'Picture',
            accessorKey: 'profile_picture',
            cell: ({ row }) => {
                const profilePicture = row.original.profile_picture

                if (profilePicture) {
                    return (
                        <img
                            src={profilePicture}
                            alt="Profile"
                            width={50}
                            className="rounded-circle object-cover"
                        />
                    )
                } else {
                    return (
                        <div
                            className="bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                            style={{ width: '50px', height: '50px', fontSize: '1rem' }}
                        >
                            <span>{row.original.name?.[0] || '?'}</span>
                        </div>
                    )
                }
            }
        },

        { header: 'Name', accessorKey: 'name' },
        {
            header: 'Department',
            accessorFn: (row) => row.department?.name || '',
            id: 'userDepartment',
            filterFn: 'includesString',
            cell: ({ row }) => {
                return row.original.department ? row.original.department.name : 'N/A'
            }
        },
        {
            header: 'Role',
            accessorKey: 'role',
            cell: ({ row }) => row.original.roles[0]?.name || 'N/A'
        },
        { header: 'Status', accessorKey: 'status' },
        {
            header: 'Actions',
            accessorKey: 'action',
            cell: ({ row }) => (
                <div className="dropdown">
                    <button
                        className="btn border-0"
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
                                data-bs-target="#employeeDetailsModal"
                                onClick={() => setSelectedEmployee(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#lockUnlockUserConfirmModal"
                                onClick={() => setSelectedEmployee(row.original)}
                                disabled={
                                    row.original?.status !== 'active' &&
                                    row.original?.status !== 'locked'
                                }
                            >
                                {row.original?.status === 'locked' ? (
                                    <>
                                        <FaUnlock /> Unlock
                                    </>
                                ) : (
                                    <>
                                        <FaLock /> Lock
                                    </>
                                )}
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#suspendReinstateUserConfirmModal"
                                onClick={() => setSelectedEmployee(row.original)}
                                disabled={
                                    row.original?.status !== 'active' &&
                                    row.original?.status !== 'suspended'
                                }
                            >
                                {row.original?.status === 'suspended' ? (
                                    <>
                                        <FaUser /> Reinstate
                                    </>
                                ) : (
                                    <>
                                        <FaUserSlash /> Suspend
                                    </>
                                )}
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#resetPasswordConfirmModal"
                                onClick={() => setSelectedEmployee(row.original)}
                                disabled={row.original?.status !== 'active'}
                            >
                                <FaRedoAlt /> Reset Password
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#activateDeactivateUserConfirmModal"
                                onClick={() => setSelectedEmployee(row.original)}
                                disabled={
                                    row.original?.status !== 'active' &&
                                    row.original?.status !== 'inactive'
                                }
                            >
                                {row.original?.status === 'active' ? (
                                    <>
                                        <FaUserLock /> Deactivate
                                    </>
                                ) : (
                                    <>
                                        <FaUserCheck /> Activate
                                    </>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    return (
        <>
            {resettingPassword && (
                <FullScreenLoader
                    title="Resetting Password"
                    message="Please wait while we reset the password."
                />
            )}

            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    All Employees
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddEmployeeModal
                                    id={'AddEmployeeModal'}
                                    refreshList={refreshList}
                                />
                            }
                            isloading={loading}
                            columns={columns}
                            data={employees}
                        />
                    </div>
                </div>

                <ViewEmployeeDetailsModal id="employeeDetailsModal" employee={selectedEmployee} />

                <ConfirmationModal
                    id="lockUnlockUserConfirmModal"
                    title={`${selectedEmployee?.status === 'active' ? 'Lock' : 'Unlock'} Employee`}
                    message={`Are you sure you want to ${selectedEmployee?.status === 'active' ? 'Lock' : 'Unlock'} Employee ${selectedEmployee?.name} ?`}
                    confirmLabel={selectedEmployee?.status === 'active' ? 'Lock' : 'Unlock'}
                    confirmClass={
                        selectedEmployee?.status === 'active'
                            ? 'btn-danger text-light'
                            : 'btn-success text-light'
                    }
                    cancelLabel="Cancel"
                    onConfirm={() => handleLockUnlockUser(selectedEmployee)}
                />

                <ConfirmationModal
                    id="suspendReinstateUserConfirmModal"
                    title={`${selectedEmployee?.status === 'active' ? 'Suspend' : 'Reinstate'} Employee`}
                    message={`Are you sure you want to ${selectedEmployee?.status === 'active' ? 'Suspend' : 'Reinstate'} Employee ${selectedEmployee?.name} ?`}
                    confirmLabel={selectedEmployee?.status === 'active' ? 'Suspend' : 'Reinstate'}
                    confirmClass={
                        selectedEmployee?.status === 'active'
                            ? 'btn-danger text-light'
                            : 'btn-success text-light'
                    }
                    cancelLabel="Cancel"
                    onConfirm={() => handleSuspendReinstateUser(selectedEmployee)}
                />

                <ConfirmationModal
                    id="resetPasswordConfirmModal"
                    title="Force Reset Password"
                    message="Are you sure you want to Reset Password?"
                    confirmLabel="Reset Password"
                    confirmClass="btn-danger text-light"
                    cancelLabel="Cancel"
                    onConfirm={() => handleResetPassword(selectedEmployee)}
                />

                <ConfirmationModal
                    id="activateDeactivateUserConfirmModal"
                    title={`${selectedEmployee?.status === 'active' ? 'Deactivate' : 'Activate'} Employee`}
                    message={`Are you sure you want to ${selectedEmployee?.status === 'active' ? 'Deactivate' : 'Activate'} Employee ${selectedEmployee?.name} ?`}
                    confirmLabel={selectedEmployee?.status === 'active' ? 'Deactivate' : 'Activate'}
                    confirmClass={
                        selectedEmployee?.status === 'active'
                            ? 'btn-danger text-light'
                            : 'btn-success text-light'
                    }
                    cancelLabel="Cancel"
                    onConfirm={() => handleDeactivateActivateUser(selectedEmployee)}
                />

                <NewPasswordModal id="NewPasswordModal" newPassword={newPassword} />
            </div>
        </>
    )
}

export default AllEmployees
