import React from 'react'

const VerboseTime = ({ minutes, large = true }) => {
    if (minutes === null || minutes === undefined || minutes === 0) {
        return <div>0</div>
    }

    minutes = Math.abs(minutes)

    let seconds = 0
    if (minutes < 1) {
        seconds = Math.round(minutes * 60)
    }

    const totalMinutes = minutes >= 1 ? Math.round(minutes) : 0

    const hours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60

    return (
        <div className="d-flex align-items-center">
            {hours > 0 && (
                <div key="hours" className={`${large ? 'display-5' : 'fs-6'} fw-bold me-2`}>
                    {hours} <span className="fs-6">hr{hours > 1 ? 's' : ''}</span>
                </div>
            )}
            {(remainingMinutes > 0 || (hours === 0 && seconds === 0)) && (
                <div
                    key="minutes"
                    className={`${large && hours === 0 ? 'display-5' : 'fs-6'} fw-bold`}
                >
                    {remainingMinutes}{' '}
                    <span className="fs-6">min{remainingMinutes !== 1 ? 's' : ''}</span>
                </div>
            )}
            {seconds > 0 && (
                <div
                    key="seconds"
                    className={`${large && hours === 0 ? 'display-5' : 'fs-6'} fw-bold`}
                >
                    {seconds} <span className="fs-6">sec{seconds !== 1 ? 's' : ''}</span>
                </div>
            )}
        </div>
    )
}

export default VerboseTime
