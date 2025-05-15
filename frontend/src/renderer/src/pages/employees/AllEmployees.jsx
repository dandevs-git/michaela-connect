import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaLock, FaSyncAlt, FaTrash, FaUnlock } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddEmployeeModal from '../../components/modals/AddEmployeeModal'
import EmployeeDetailsModal from '../../components/modals/EmployeeDetailsModal'
import { useToast } from '../../contexts/ToastContext'
import ConfirmationModal from '../../components/modals/ConfirmationModal'

function AllEmployees() {
    const { patchData, getData } = useAPI()
    const { showToast } = useToast()
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    useEffect(() => {
        getData('/users', setEmployees, setLoading, setError)
    }, [])

    const handleView = (employee) => {
        setSelectedEmployee(employee)
    }

    const handleLockUnlockUser = (employee) => {
        patchData(
            `/users/${employee?.id}/lock`,
            () => {},
            () => {},
            () => {},
            setError
        )

        getData('/users', setEmployees, setLoading, setError)

        showToast({
            message:
                error.message ||
                `Employee ${employee.status === 'active' ? 'Locked' : 'Unlock'} successfully!`,
            title: error.message ? 'Failed' : 'Success',
            isPositive: error.message ? false : true,
            delay: 5000
        })
    }

    const handleResetPassword = (employee) => {
        patchData(
            `/users/${employee.id}/reset-password`,
            () => {},
            () => {},
            () => {},
            setError
        )

        getData('/users', setEmployees, setLoading, setError)

        showToast({
            message: error.message || `Employee Password Reset successfully!`,
            title: error.message ? 'Failed' : 'Success',
            isPositive: error.message ? false : true,
            delay: 5000
        })
    }

    const columns = [
        { header: 'No.', accessorKey: 'id' },
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
            accessorKey: 'department.name',
            cell: ({ row }) => {
                return row.original.department ? row.original.department.name : 'N/A'
            }
        },
        { header: 'Role', accessorKey: 'role' },
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
                                onClick={() => handleView(row.original)}
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
                            >
                                {row.original?.status === 'active' ? (
                                    <>
                                        <FaLock /> Lock
                                    </>
                                ) : (
                                    <>
                                        <FaUnlock /> Unlock
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
                            >
                                <FaSyncAlt /> Reset Password
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    return (
        <div className="card shadow w-100">
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                All Employees
            </div>
            <div className="card-body">
                <div className="col-12 p-4">
                    <CustomTable
                        topComponent={<AddEmployeeModal />}
                        isloading={loading}
                        columns={columns}
                        data={employees}
                    />
                </div>
            </div>

            <EmployeeDetailsModal id="employeeDetailsModal" employee={selectedEmployee} />

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
                id="resetPasswordConfirmModal"
                title={`Force Reset Password`}
                message={`Are you sure you want to Reset Password?`}
                confirmLabel={'Reset Password'}
                confirmClass={`btn-danger text-light`}
                cancelLabel="Cancel"
                onConfirm={() => handleResetPassword(selectedEmployee)}
            />
        </div>
    )
}

export default AllEmployees
