import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { useAPI } from '../../contexts/APIContext'

function TelephoneDirectory() {
    const { getData } = useAPI()
    const [telephones, setTelephones] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/telephones', setTelephones, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const columns = [
        { header: 'Telephone Number', accessorKey: 'number' },
        {
            header: 'User',
            accessorFn: (row) => row.user?.name || '',
            id: 'userName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.user?.name || 'N/A'
        },
        {
            header: 'Department',
            accessorFn: (row) => row.user?.department?.name || '',
            id: 'userDepartment',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.user?.department?.name || 'N/A'
        }
    ]

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4 text-center">
                    Telephone List
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable isloading={loading} columns={columns} data={telephones} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TelephoneDirectory
