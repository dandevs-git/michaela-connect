import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { fetchData } from '../../utils/fetchData'

function Department() {
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('/departments', setDepartments, setLoading)
    }, [])

    const columns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'Name', accessorKey: 'name' },
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
            <FaPlus /> Add Department
        </button>
    )

    return (
        <div className="card shadow w-100">
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                Departments
            </div>
            <div className="card-body">
                <div className="col-12 p-4">
                    <CustomTable
                        isloading={loading}
                        topContent={topContent}
                        columns={columns}
                        data={departments}
                    />
                </div>
            </div>
        </div>
    )
}

export default Department
