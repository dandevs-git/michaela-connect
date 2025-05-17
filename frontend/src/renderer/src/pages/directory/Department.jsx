import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddDepartmentModal from '../../components/modals/AddDepartmentModal'

function Department() {
    const { getData } = useAPI()
    const [departments, setDepartments] = useState([])
    const [mainDepartments, setMainDepartments] = useState([])
    const [loadingDepartments, setLoadingDepartments] = useState(true)
    const [loadingMainDepartments, setLoadingMainDepartments] = useState(true)
    const [selectedDepartment, setSelectedDepartment] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/departments', setDepartments, setLoadingDepartments, setError)
        getData('/departments?main', setMainDepartments, setLoadingMainDepartments, setError)
    }, [])

    const departmentColumns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'Department', accessorKey: 'name' },
        {
            header: 'Parent Department',
            accessorKey: 'parent.name',
            cell: ({ row }) => row.original?.parent?.name || 'N/A'
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
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
                                data-bs-target="#"
                                onClick={() => setSelectedDepartment(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const mainDepartmentColumns = [
        { header: 'No.', accessorKey: 'id' },
        {
            header: 'Department',
            accessorKey: 'name',
            cell: ({ row }) => row.original?.name || 'N/A'
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
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
                                data-bs-target="#"
                                onClick={() => setSelectedDepartment(row.original)}
                            >
                                <FaEye /> View
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
                Departments
            </div>
            <div className="card-body">
                <div className="col-xl-12 p-3">
                    <h4 className="text-start fw-semibold">Main Departments</h4>
                    <CustomTable
                        topComponent={<AddDepartmentModal />}
                        isloading={loadingMainDepartments}
                        columns={mainDepartmentColumns}
                        data={mainDepartments}
                    />
                    <hr />
                    <h4 className="text-start fw-semibold">All Departments</h4>
                    <CustomTable
                        isloading={loadingDepartments}
                        columns={departmentColumns}
                        data={departments}
                    />
                </div>
            </div>
        </div>
    )
}

export default Department
