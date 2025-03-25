import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import api from '../../api'

function ActivityLog() {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/logs')
                setLogs(response.data)
            } catch (error) {
                console.error('Error fetching logs:', error)
            }
        }
        fetchLogs()
    }, [])

    const columns = [
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
                        <CustomTable columns={columns} data={logs} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityLog
