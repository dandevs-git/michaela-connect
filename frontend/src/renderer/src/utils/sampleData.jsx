export const userActivitycolumns = [
    {
        accessorKey: 'ticketID',
        header: 'Ticket ID',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'priorityLevel',
        header: 'Priority Level',
        cell: (info) => {
            const priorityLevel = info.getValue()
            const textColor =
                priorityLevel === 'Urgent'
                    ? 'opacity-100'
                    : priorityLevel === 'High'
                      ? 'opacity-75'
                      : priorityLevel === 'Medium'
                        ? 'opacity-50'
                        : priorityLevel === 'Low'
                          ? 'opacity-25'
                          : ''
            return (
                <div className={`fw-bold fst-italic text-danger ${textColor}`}>{priorityLevel}</div>
            )
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
            const status = info.getValue()
            const classColor =
                status === 'Pending'
                    ? 'bg-primary'
                    : status === 'Assigned'
                      ? 'bg-info'
                      : status === 'In Progress'
                        ? 'bg-warning'
                        : status === 'Done'
                          ? 'bg-success'
                          : status === 'Declined'
                            ? 'bg-danger'
                            : ''
            return <div className={`badge ${classColor}`}>{status}</div>
        }
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
        cell: (info) => (
            <div
                className="text-truncate"
                style={{
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {info.renderValue()}
            </div>
        )
    },

    {
        accessorKey: 'requester',
        header: 'Requester',
        cell: (info) => (
            <div
                className="text-truncate"
                style={{
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {info.renderValue()}
            </div>
        )
    },
    {
        accessorKey: 'department',
        header: 'Department',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        cell: (info) => (
            <div
                className="text-truncate"
                style={{
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {info.renderValue()}
            </div>
        )
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'assignedAt',
        header: 'Assigned At',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'lastUpdated',
        header: 'Last Updated',
        cell: (info) => info.renderValue()
    }
]
export const ticketColumns = [
    {
        accessorKey: 'ticketID',
        header: 'Ticket ID',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'priorityLevel',
        header: 'Priority Level',
        cell: (info) => {
            const priorityLevel = info.getValue()
            const textColor =
                priorityLevel === 'Urgent'
                    ? 'opacity-100'
                    : priorityLevel === 'High'
                      ? 'opacity-75'
                      : priorityLevel === 'Medium'
                        ? 'opacity-50'
                        : priorityLevel === 'Low'
                          ? 'opacity-25'
                          : ''
            return (
                <div className={`fw-bold fst-italic text-danger ${textColor}`}>{priorityLevel}</div>
            )
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
            const status = info.getValue()
            const classColor =
                status === 'Pending'
                    ? 'bg-primary'
                    : status === 'Assigned'
                      ? 'bg-info'
                      : status === 'In Progress'
                        ? 'bg-warning'
                        : status === 'Done'
                          ? 'bg-success'
                          : status === 'Declined'
                            ? 'bg-danger'
                            : ''
            return <div className={`badge ${classColor}`}>{status}</div>
        }
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
        cell: (info) => (
            <div
                className="text-truncate"
                style={{
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {info.renderValue()}
            </div>
        )
    },

    {
        accessorKey: 'requester',
        header: 'Requester',
        cell: (info) => (
            <div
                className="text-truncate"
                style={{
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {info.renderValue()}
            </div>
        )
    },
    {
        accessorKey: 'department',
        header: 'Department',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        cell: (info) => (
            <div
                className="text-truncate"
                style={{
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {info.renderValue()}
            </div>
        )
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.renderValue()
    },
    // {
    //     accessorKey: 'assignedAt',
    //     header: 'Assigned At',
    //     cell: (info) => info.renderValue()
    // },
    {
        accessorKey: 'deadline',
        header: 'Deadline',
        cell: (info) => info.renderValue()
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: (info) => {
            const rowData = info.row.original
            const status = rowData.status
            const buttons =
                status === 'Pending' ? (
                    <button className="btn btn-info btn-sm text-light w-100">Take</button>
                ) : status === 'Assigned' ? (
                    <button className="btn btn-sm btn-warning text-light w-100">In Progress</button>
                ) : status === 'In Progress' ? (
                    <button className="btn btn-sm btn-success text-light w-100">Done</button>
                ) : status === 'Declined' ? (
                    <button className="btn btn-primary btn-sm text-light w-100">Reopen</button>
                ) : (
                    ''
                )
            return <div className="d-flex gap-2">{buttons}</div>
        }
    }
]

export const userColumns = [
    {
        accessorKey: 'userID',
        header: 'ID',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'gender',
        header: 'Gender',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'dob',
        header: 'Date of Birth',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'last_login',
        header: 'Last Login',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'account_verified',
        header: 'Verified',
        cell: (info) => (info.getValue() === 'Yes' ? '✅ Yes' : '❌ No')
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => info.getValue()
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
            const status = info.getValue()
            return (
                <span
                    className={`badge ${status === 'Active' ? 'bg-success' : status === 'Inactive' ? 'bg-warning' : 'bg-danger'}`}
                >
                    {status}
                </span>
            )
        }
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: () => {
            return (
                <div className="d-flex justify-content-center text-nowrap gap-1">
                    <button className="btn btn-sm btn-success text-light">VIEW</button>
                    <button className="btn btn-info btn-sm text-light">UPDATE</button>
                    <button className="btn btn-danger btn-sm text-light">DELETE</button>
                    <button className="btn btn-sm btn-warning text-light">CHANGE ROLE</button>
                </div>
            )
        }
    }
]
