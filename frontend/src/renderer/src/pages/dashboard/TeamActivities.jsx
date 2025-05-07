import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { useAPI } from '../../contexts/APIContext'

function TeamActivities() {
    const { getData } = useAPI()
    const [dataLogs, setDataLogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/logs/ticket', setDataLogs, setLoading)
    }, [])

    const columnsLogs = [
        {
            header: 'User',
            accessorKey: 'user.name'
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
        }
    ]
    return (
        <>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="activities">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                    Team Activities
                </div>
                <div className="row card-body">
                    <div className="col-xl-12 m-0 p-4">
                        <h4 className="text-start fw-semibold">Recent Tasks & Assignments</h4>
                        <CustomTable isloading={loading} columns={columnsLogs} data={dataLogs} />
                        {/* <h4 className="text-start fw-semibold">Upcoming Deadlines</h4>
                        <CustomTable isloading={loading} columns={columnsLogs} data={dataLogs} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeamActivities
