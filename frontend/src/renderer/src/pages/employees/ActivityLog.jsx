import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { useAPI } from '../../contexts/APIContext'

function ActivityLog() {
    const { getData } = useAPI()
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/logs', setLogs, setLoading, setError)
    }, [])

    const columns = [
        {
            header: 'User',
            accessorFn: (row) => row.user?.name || '',
            id: 'userName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.user?.name || 'N/A'
        },
        { header: 'Category', accessorKey: 'category' },
        { header: 'Action', accessorKey: 'action' },
        { header: 'Details', accessorKey: 'details' },
        { header: 'IP Address', accessorKey: 'ip_address' },
        { header: 'PC Name', accessorKey: 'pc_name' },
        { header: 'Date', accessorKey: 'formatted_date' },
        { header: 'Time', accessorKey: 'formatted_time' }
    ]

    return (
        <>
            <div className="card shadow w-100 rounded-4 ">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4 text-center">
                    Activity Log
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable isloading={loading} columns={columns} data={logs} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityLog
