import CustomTable from '../../components/tables/CustomTable'
import { tickets } from '../../utils/generateTickets'
import { userActivitycolumns } from '../../utils/sampleData'

const columnsLogs = [
    {
        header: '👤 User',
        accessorKey: 'user'
    },
    {
        header: '🛠️ Action',
        accessorKey: 'action'
    },
    {
        header: '🎟️ Affected Ticket/Module',
        accessorKey: 'ticket'
    },
    {
        header: '⏰ Timestamp',
        accessorKey: 'timestamp'
    },
    {
        header: '🖥️ PC Name',
        accessorKey: 'pcName'
    },
    {
        header: '📍 IP Address',
        accessorKey: 'ipAddress'
    }
]

const dataLogs = [
    {
        user: 'JohnDoe',
        action: 'Approved Ticket',
        ticket: '#1025 - Server Downtime',
        timestamp: '2:30 PM',
        pcName: 'Workstation-12',
        ipAddress: '192.168.1.5'
    },
    {
        user: 'JaneSmith',
        action: 'Started Processing',
        ticket: '#2048 - Software Installation',
        timestamp: '3:15 PM',
        pcName: 'Laptop-5',
        ipAddress: '192.168.1.9'
    },
    {
        user: 'Admin',
        action: 'Updated SLA Policy',
        ticket: 'SLA Management',
        timestamp: '4:00 PM',
        pcName: 'Admin-PC',
        ipAddress: '192.168.1.2'
    },
    {
        user: 'Support Team',
        action: 'Resolved Ticket',
        ticket: '#2090 - Printer Issue',
        timestamp: '4:30 PM',
        pcName: 'SupportDesk-3',
        ipAddress: '192.168.1.12'
    },
    {
        user: 'HR Manager',
        action: 'Assigned Ticket to HR',
        ticket: '#3001 - Employee Access Request',
        timestamp: '5:00 PM',
        pcName: 'HR-Desk1',
        ipAddress: '192.168.1.8'
    }
]

const columnsTask = [
    {
        header: '✅ Task Name',
        accessorKey: 'taskName'
    },
    {
        header: '👨‍💻 Assigned To',
        accessorKey: 'assignedTo'
    },
    {
        header: '📆 Due Date',
        accessorKey: 'dueDate'
    },
    {
        header: '🚨 Priority',
        accessorKey: 'priority'
    },
    {
        header: '🔄 Status',
        accessorKey: 'status'
    },
    {
        header: '⏳ Time Remaining',
        accessorKey: 'timeRemaining'
    }
]

const dataTask = [
    {
        taskName: 'Approve network issue ticket',
        assignedTo: 'Head of IT',
        dueDate: 'March 22',
        priority: '🔴 High',
        status: '⏳ Pending Approval',
        timeRemaining: '2 Days Left'
    },
    {
        taskName: 'Assign ticket to HR team',
        assignedTo: 'HR Manager',
        dueDate: 'March 24',
        priority: '🟡 Medium',
        status: '🕒 Waiting for Assignment',
        timeRemaining: '4 Days Left'
    },
    {
        taskName: 'Process workstation request',
        assignedTo: 'IT Support',
        dueDate: 'March 25',
        priority: '🟢 Low',
        status: '🔄 In Progress',
        timeRemaining: '5 Days Left'
    },
    {
        taskName: 'Review new software request',
        assignedTo: 'Software Team',
        dueDate: 'March 26',
        priority: '🔴 High',
        status: '🚀 Not Started',
        timeRemaining: '6 Days Left'
    },
    {
        taskName: 'Investigate email issue',
        assignedTo: 'Network Team',
        dueDate: 'March 27',
        priority: '🟡 Medium',
        status: '🛠️ Under Investigation',
        timeRemaining: '7 Days Left'
    }
]

function Activities() {
    return (
        <>
            <div className="col-12 p-4">
                <div className="bg-body-tertiary border p-4 rounded-4 shadow mb-5">
                    <div className="text-uppercase fs-4 fw-semibold">Activity Logs</div>
                    <hr />
                    <CustomTable
                        columns={columnsLogs}
                        data={dataLogs}
                        caption="Recent user activity logs"
                    />
                </div>
                <div className="bg-body-tertiary border p-4 rounded-4 shadow">
                    <div className="text-uppercase fs-4 fw-semibold">Assigned Task</div>
                    <hr />
                    <CustomTable
                        columns={columnsTask}
                        data={dataTask}
                        caption="Pending task assignments and actions per role."
                    />
                </div>
            </div>
        </>
    )
}
export default Activities
