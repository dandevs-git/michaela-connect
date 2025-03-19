export const getFilteredColumns = (filter, columns) => {
    return columns.filter((col) => {
        if (filter === 'UNASSIGNED' && col.accessorKey === 'assignedTo') {
            return false
        } else if (filter === 'CLOSED' && col.accessorKey === 'action') {
            return false
        } else if (filter === 'ALL' && col.accessorKey === 'action') {
            return false
        }
        return true
    })
}
