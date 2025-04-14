import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'

function AllEmployees() {
    const { getData } = useAPI()
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/users', setEmployees, setLoading)
    }, [])

    const columns = [
        { header: 'No.', accessorKey: 'id' },
        // { header: 'RFID', accessorKey: 'rfid' },
        { header: 'Picture', accessorKey: 'profile_picture' },
        { header: 'Name', accessorKey: 'name' },
        // { header: 'Email', accessorKey: 'email' },
        { header: 'Department', accessorKey: 'department.name' },
        { header: 'Role', accessorKey: 'role' },
        { header: 'Status', accessorKey: 'status' },
        {
            header: 'Actions',
            accessorKey: 'action',
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
            <FaPlus /> Add Employee
        </button>
    )

    return (
        <div className="card shadow w-100">
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                All Employees
            </div>
            <div className="card-body">
                <div className="col-12 p-4">
                    <CustomTable
                        isloading={loading}
                        topContent={topContent}
                        columns={columns}
                        data={employees}
                    />
                </div>
            </div>
        </div>
    )
}

export default AllEmployees
