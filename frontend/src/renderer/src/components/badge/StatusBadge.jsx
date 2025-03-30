import {
    FaClock,
    FaHourglassHalf,
    FaTimesCircle,
    FaSpinner,
    FaCheckCircle,
    FaBan,
    FaDoorClosed,
    FaRedo,
    FaPause,
    FaClipboardList
} from 'react-icons/fa'

const statusIcons = {
    pending: { icon: <FaClock />, class: 'bg-warning' },
    new: { icon: <FaClipboardList />, class: 'bg-secondary' },
    open: { icon: <FaHourglassHalf />, class: 'bg-primary' },
    in_progress: { icon: <FaSpinner className="fa-spin" />, class: 'bg-info' },
    on_hold: { icon: <FaPause />, class: 'bg-warning' },
    resolved: { icon: <FaCheckCircle />, class: 'bg-success' },
    reopened: { icon: <FaRedo />, class: 'bg-info' },
    failed: { icon: <FaBan />, class: 'bg-danger' },
    completed: { icon: <FaCheckCircle />, class: 'bg-success' },
    rejected: { icon: <FaTimesCircle />, class: 'bg-danger' },
    closed: { icon: <FaDoorClosed />, class: 'bg-secondary' }
}

function StatusBadge({ status }) {
    const info = statusIcons[status] || { icon: <FaClock />, class: 'bg-secondary' }

    return (
        <span className={`${info.class} text-light small rounded-pill py-1 px-3`}>
            {info.icon} {status.replace('_', ' ').toUpperCase()}
        </span>
    )
}

export default StatusBadge
