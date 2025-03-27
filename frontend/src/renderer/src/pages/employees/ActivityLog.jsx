import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { fetchData } from '../../utils/fetchData'

function ActivityLog() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('/logs', setLogs, setLoading)
    }, [])

    const columns = [
        { header: 'No.', accessorKey: 'id' },
        { header: 'User', accessorKey: 'user.name' },
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
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
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
