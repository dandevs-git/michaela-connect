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
            header: 'Affected Ticket/Module',
            accessorKey: 'details'
        },
        {
            header: 'Timestamp',
            accessorKey: 'formatted_time'
        },
        {
            header: 'PC Name',
            accessorKey: 'pc_name'
        },
        {
            header: 'IP Address',
            accessorKey: 'ip_address'
        }
    ]
    // const columnsTask = [
    //     {
    //         header: 'Task Name',
    //         accessorKey: 'taskName'
    //     },
    //     {
    //         header: 'Assigned To',
    //         accessorKey: 'assignedTo'
    //     },
    //     {
    //         header: 'Due Date',
    //         accessorKey: 'dueDate'
    //     },
    //     {
    //         header: 'Priority',
    //         accessorKey: 'priority'
    //     },
    //     {
    //         header: 'Status',
    //         accessorKey: 'status'
    //     },
    //     {
    //         header: 'Time Remaining',
    //         accessorKey: 'timeRemaining'
    //     }
    // ]
    return (
        <>
            <div className="col-12 p-4">
                <h4 className="text-start fw-semibold">Recent Tasks & Assignments</h4>
                <CustomTable isloading={loading} columns={columnsLogs} data={dataLogs} />
                {/* <h4 className="text-start fw-semibold">Upcoming Deadlines</h4>
                <CustomTable columns={columnsTask} data={dataTask} /> */}
            </div>
        </>
    )
}
export default TeamActivities
