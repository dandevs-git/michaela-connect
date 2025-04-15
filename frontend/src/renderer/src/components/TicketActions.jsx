import React from 'react'
import {
    FaEye,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes,
    FaCheckCircle,
    FaTimesCircle,
    FaUndo,
    FaUserCheck,
    FaPlay
} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import TicketDetailsModal from './modals/TicketDetailsModal'

function TicketActions({
    rowData,
    userRole,
    subordinates = [],
    setSelectedTickets,
    selectedTickets,
    handleApproveButton,
    handleRejectButton,
    handleAssignButton
}) {
    const location = useLocation()
    const currentPath = location.pathname

    const commonViewButton = (
        <button
            className="btn text-light btn-info btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#ticketDetailsModal"
            onClick={() => setSelectedTickets(rowData)}
        >
            <FaEye /> View
        </button>
    )

    const buttonsByRoleAndPath = () => {
        const isAdmin = userRole === 'admin'
        const isHead = userRole === 'head'
        const isStaff = userRole === 'staff'

        if (currentPath.includes('/tickets/unapproved') && isHead) {
            return (
                <>
                    <button
                        onClick={() => handleApproveButton(rowData)}
                        className="btn text-light btn-success btn-sm"
                    >
                        <FaCheck /> Approve
                    </button>
                    <button
                        onClick={() => handleRejectButton(rowData)}
                        className="btn text-light btn-danger btn-sm"
                    >
                        <FaTimes /> Reject
                    </button>
                </>
            )
        }

        if (currentPath.includes('/tickets/assign') && isHead) {
            return (
                <div className="dropdown">
                    <div
                        className="btn bg-success btn-sm text-light dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <FaUserCheck /> Assign
                    </div>
                    <ul className="dropdown-menu dropdown-menu-start">
                        {subordinates.length > 0 ? (
                            subordinates.map((user) => (
                                <li key={user.id}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => handleAssignButton(rowData, user)}
                                    >
                                        {user.name}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-header text-center fw-bold">No Subordinates</li>
                        )}
                    </ul>
                </div>
            )
        }

        if (currentPath.includes('/tickets/in-progress') && (isHead || isStaff)) {
            return (
                <button className="btn text-light btn-warning btn-sm">
                    <FaPlay /> Start Task
                </button>
            )
        }

        if (currentPath.includes('/tickets/completion') && (isHead || isStaff)) {
            return (
                <>
                    <button className="btn text-light btn-success btn-sm">
                        <FaCheckCircle /> Completed
                    </button>
                    <button className="btn text-light btn-danger btn-sm">
                        <FaUndo /> Reopened
                    </button>
                    <button className="btn text-light btn-warning btn-sm">
                        <FaTimesCircle /> Failed
                    </button>
                </>
            )
        }

        if (currentPath.includes('/tickets/manage') && isAdmin) {
            return (
                <>
                    <button className="btn text-light btn-warning btn-sm">
                        <FaEdit /> Edit
                    </button>
                    <button className="btn text-light btn-danger btn-sm">
                        <FaTrash /> Delete
                    </button>
                </>
            )
        }

        return null
    }

    return (
        <>
            <div className="d-flex gap-2 justify-content-center align-items-center text-nowrap">
                {commonViewButton}
                {buttonsByRoleAndPath()}
            </div>
            <TicketDetailsModal id={'ticketDetailsModal'} data={selectedTickets} />
        </>
    )
}

export default TicketActions
