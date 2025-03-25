import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import api from '../../api'
import { FaPlus } from 'react-icons/fa'

function AllEmployees() {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users')
                setEmployees(response.data)
            } catch (error) {
                console.error('Error fetching employees:', error)
            }
        }
        fetchUsers()
    }, [])

    const columns = [
        { header: 'Name', accessorKey: 'name' },
        { header: 'Email', accessorKey: 'email' },
        {
            header: 'Department',
            cell: ({ row }) => row.original.department?.name + ' Department' || 'N/A'
        },
        { header: 'Role', accessorKey: 'role' },
        { header: 'Status', accessorKey: 'status' },
        {
            header: 'Actions',
            accessorKey: 'action',
            cell: ({ row }) => (
                <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-primary btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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
                    <CustomTable topContent={topContent} columns={columns} data={employees} />
                </div>
            </div>
        </div>
    )
}

export default AllEmployees
