import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { useAPI } from '../../contexts/APIContext'
import { diffForHumans } from '../../config/helpers'

function TeamActivities() {
    const { getData } = useAPI()
    const [dataLogs, setDataLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/logs/ticket', setDataLogs, setLoading, setError)
    }, [])

    const columnsLogs = [
        {
            header: 'User',
            accessorFn: (row) => row.user?.name || '',
            id: 'user',
            filterFn: 'includesString'
        },
        {
            header: 'Action',
            accessorKey: 'action'
        },
        {
            header: 'Affected Ticket',
            accessorKey: 'details'
        },
        {
            header: 'Date',
            accessorKey: 'formatted_date'
        },
        {
            header: 'Timestamp',
            accessorKey: 'formatted_time'
        },
        {
            header: 'Time Ago',
            accessorKey: 'formatted_time',
            cell: ({ row }) => diffForHumans(new Date(row.original.created_at))
        }
    ]
    return (
        <>
            <div
                className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4"
                id="activities"
            >
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                    Team Activities
                </div>
                <div className="row card-body">
                    <div className="col-xl-12 m-0 p-4">
                        <h4 className="text-start fw-semibold">Recent Tasks & Assignments</h4>
                        <CustomTable isloading={loading} columns={columnsLogs} data={dataLogs} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeamActivities
