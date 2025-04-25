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
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/departments', setDepartments, setLoadingDepartments, setError)
        getData('/departments?main', setMainDepartments, setLoadingMainDepartments, setError)
    }, [])

    console.log(departments)

    const departmentColumns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'Departments', accessorKey: 'name' },
        {
            header: 'Parent Department',
            accessorKey: 'parent.name',
            cell: ({ row }) => {
                return row.original.parent?.name ? (
                    row.original.parent?.name
                ) : (
                    <span className="text-danger">Main Department</span>
                )
            }
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
    const mainDepartmentColumns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'Departments', accessorKey: 'name' },
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
            <FaPlus /> Add Department
        </button>
    )

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
