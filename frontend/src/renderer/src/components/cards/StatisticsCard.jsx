import Placeholder from '../placeholders/Placeholder'

function StatisticsCard({
    title,
    value,
    delta,
    iconClass,
    unit = '',
    isTime = false,
    reverseDelta = false,
    loading = false,
    col = 4
}) {
    const isZero = value === null || value === undefined || value === 0
    const trend = delta === 0 ? 'secondary' : delta > 0 ? 'success' : 'danger'
    const trendReverse = delta === 0 ? 'secondary' : delta > 0 ? 'danger' : 'success'

    let displayValue = value
    let displayDelta = delta

    const formatMinutesVerbose = (minutes, large = true) => {
        if (minutes === null || minutes === undefined || minutes === 0) return 0

        minutes = Math.abs(minutes)

        let seconds = 0
        if (minutes < 1) {
            seconds = Math.round(minutes * 60)
        }

        const totalMinutes = minutes >= 1 ? Math.round(minutes) : 0

        const hours = Math.floor(totalMinutes / 60)
        const remainingMinutes = totalMinutes % 60

        const parts = []

        if (hours > 0) {
            parts.push(
                <div key="hours" className={`${large ? 'display-5' : 'fs-6'} fw-bold me-2`}>
                    {hours} <span className="fs-6">hr{hours > 1 ? 's' : ''}</span>
                </div>
            )
        }
        if (remainingMinutes > 0 || (hours === 0 && seconds === 0)) {
            parts.push(
                <div
                    key="minutes"
                    className={`${large && hours === 0 ? 'display-5' : 'fs-6'} fw-bold`}
                >
                    {remainingMinutes}{' '}
                    <span className="fs-6">min{remainingMinutes !== 1 ? 's' : ''}</span>
                </div>
            )
        }
        if (seconds > 0) {
            parts.push(
                <div
                    key="seconds"
                    className={`${large && hours === 0 ? 'display-5' : 'fs-6'} fw-bold`}
                >
                    {seconds} <span className="fs-6">sec{seconds !== 1 ? 's' : ''}</span>
                </div>
            )
        }

        return parts
    }

    if (isTime) {
        displayValue =
            value !== null && value !== undefined && value !== 0
                ? formatMinutesVerbose(value, true)
                : '-'
        displayDelta =
            delta !== null && delta !== undefined && delta !== 0
                ? formatMinutesVerbose(delta, false)
                : '-'
    } else {
        displayValue = Math.abs(displayValue)
        displayDelta = Math.abs(displayDelta)
    }

    return (
        <div className={`col-xl-${col} h-50 p-3`}>
            <div className="card h-100 rounded-4 shadow text-center mb-3">
                <div className="card-header text-uppercase fw-semibold">{title}</div>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    {loading ? (
                        <Placeholder height="80px" />
                    ) : (
                        <div className="card-text display-4 m-0 fw-bold">
                            {isZero && !isTime ? '-' : displayValue}
                            {unit && !isZero && !isTime && <span className="fs-6">{unit}</span>}
                        </div>
                    )}
                </div>
                <div className="card-footer border mb-0">
                    {loading ? (
                        <Placeholder height="30px" />
                    ) : (
                        <div className="d-flex flex-column">
                            <span
                                className={`fs-6 fw-bold text-${reverseDelta ? trendReverse : trend} d-flex align-items-center justify-content-center`}
                            >
                                {delta !== null && delta !== undefined && delta !== 0 ? (
                                    <>
                                        <i
                                            className={`bi ${
                                                (
                                                    reverseDelta
                                                        ? trendReverse === 'danger'
                                                        : trend === 'success'
                                                )
                                                    ? 'bi-arrow-up-short'
                                                    : 'bi-arrow-down-short'
                                            }`}
                                        />
                                        {displayDelta}
                                        {unit && !isTime && <span className="fs-6">{unit}</span>}
                                        <i className={`bi ${iconClass} ms-2`}></i>
                                    </>
                                ) : (
                                    '-'
                                )}
                            </span>

                            <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                vs previous 30 days
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StatisticsCard
