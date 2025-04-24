import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddDepartmentModal from '../../components/modals/AddDepartmentModal'

function Department() {
    const { getData } = useAPI()
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/departments', setDepartments, setLoading)
    }, [])

    {
        console.log(departments)
    }
    const columns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'Name', accessorKey: 'name' },
        { header: 'Parent Department', accessorKey: 'parent.name' },
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
                        topComponent={
                            <AddDepartmentModal
                            // id={'AddTicketModal'}
                            // resetTickets={setTickets}
                            // resetLoading={setLoading}
                            // resetError={setError}
                            />
                        }
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
