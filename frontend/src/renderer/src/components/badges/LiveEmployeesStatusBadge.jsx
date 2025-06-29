import {
    FaClock,
    FaHourglassHalf,
    FaClipboardList
} from 'react-icons/fa'

const statusIcons = {
    online: { icon: <FaClock />, class: 'bg-warning' },
    offline: { icon: <FaClipboardList />, class: 'bg-secondary' },
    away: { icon: <FaHourglassHalf />, class: 'bg-primary' },
}

function LiveEmployeesStatusBadge({ status }) {
    const info = statusIcons[status] || { icon: <FaClock />, class: 'bg-secondary' }

    return (
        <span
            className={`${info?.class} text-uppercase text-nowrap text-light small rounded-pill py-1 px-3 text-center`}
        >
            {info?.icon} {status ?? status?.replace('_', ' ').toUpperCase()}
        </span>
    )
}

export default LiveEmployeesStatusBadge
