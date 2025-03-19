import CustomTable from '../../components/tables/CustomTable'
import { COLORS } from '../../constants/config'

const data = [
    {
        ticketID: '#1234',
        priorityLevel: 'Urgent',
        subject: 'Internet Connection',
        requester: 'Juan Delacruz',
        department: 'Marketing Department',
        assignedTo: 'Danilo Abancia Jr.',
        createdAt: '02-12-2025',
        status: 'In Progress'
    },
    {
        ticketID: '#5678',
        priorityLevel: 'Normal',
        subject: 'Printer Error',
        requester: 'Coco Martin',
        department: 'Graphics Department',
        assignedTo: 'Justine Feranil',
        createdAt: '02-25-2025',
        status: 'Done'
    },
    {
        ticketID: '#9876',
        priorityLevel: 'Priority',
        subject: 'CCTV Configuration',
        requester: 'Marian Rivera',
        department: 'Sales Department',
        assignedTo: 'Herminio Trinity',
        createdAt: '02-16-2025',
        status: 'Pending'
    },
    {
        ticketID: '#4352',
        priorityLevel: 'NORMAL',
        subject: 'Printer Error',
        requester: 'Dingdong Dantes',
        department: 'HR Department',
        assignedTo: 'Gilbert Steven Jose',
        createdAt: '02-30-2025',
        status: 'Declined'
    }
]

const columns = [
    {
        accessorKey: 'ticketID',
        header: 'Ticket ID',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'priorityLevel',
        header: 'Priority Level',
        cell: (info) => <i>{info.getValue()}</i>
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'requester',
        header: 'Requester',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'department',
        header: 'Department',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
            const status = info.getValue()
            const classColor =
                status === 'Done'
                    ? 'bg-success'
                    : status === 'In Progress'
                      ? 'bg-warning'
                      : status === 'Pending'
                        ? 'bg-info'
                        : status === 'Declined'
                          ? 'bg-danger'
                          : ''
            return <div className={`badge ${classColor}`}>{status}</div>
        }
    }
]

function RecentActivity() {
    return (
        <>
            <div className="col-xl-12 p-4">
                <div className="card shadow rounded-4 mb-3 text-center h-100">
                    <div className="card-header text-uppercase fw-semibold fs-3">
                        Recent Activities
                    </div>
                    <div className="card-body">
                        <CustomTable
                            data={data}
                            columns={columns}
                            caption='"Stay Updated on the Latest Issues!"'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default RecentActivity
