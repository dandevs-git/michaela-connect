import { useEffect, useState, useCallback } from 'react'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomPieChart from '../../components/charts/CustomPieChart'
import { useAPI } from '../../contexts/APIContext'

function TeamOverview() {
    const { getData } = useAPI()
    const [dashboardStats, setDashboardStats] = useState({ current: {}, delta: {} })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchAllData = useCallback(async () => {
        setLoading(true)
        setError('')
        try {
            await Promise.all([getData('/dashboard', setDashboardStats)])
        } catch (err) {
            console.error('Error fetching dashboard data:', err)
            setError('Failed to load dashboard data.')
        } finally {
            setLoading(false)
        }
    }, [getData])

    useEffect(() => {
        fetchAllData()
    }, [fetchAllData])

    const renderPlaceholder = (height = '300px') => (
        <div className="placeholder-glow w-100">
            <div className="placeholder col-12" style={{ height }}></div>
        </div>
    )

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

    const RenderStatCard = ({ title, value, delta, iconClass, unit = '', isTime = false }) => {
        const trend = delta > 0 ? 'success' : delta < 0 ? 'danger' : 'secondary'
        const isZero = value === null || value === undefined || value === 0

        let displayValue = value
        let displayDelta = delta

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
            <div className="col-xl-4 h-50 p-3">
                <div className="card h-100 rounded-4 shadow text-center mb-3">
                    <div className="card-header text-uppercase fw-semibold">{title}</div>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        {loading ? (
                            renderPlaceholder('80px')
                        ) : (
                            <div className="card-text display-4 m-0 fw-bold">
                                {isZero && !isTime ? '-' : displayValue}
                                {unit && !isZero && !isTime && <span className="fs-6">{unit}</span>}
                            </div>
                        )}
                    </div>
                    <div className="card-footer border mb-0">
                        {loading ? (
                            renderPlaceholder('40px')
                        ) : (
                            <div className="d-flex flex-column">
                                <span
                                    className={`fs-6 fw-bold text-${trend} d-flex align-items-center justify-content-center`}
                                >
                                    {delta !== null && delta !== undefined && delta !== 0 ? (
                                        <>
                                            <i
                                                className={`bi ${trend === 'success' ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}
                                            ></i>
                                            {displayDelta}
                                            {unit && !isTime && (
                                                <span className="fs-6">{unit}</span>
                                            )}
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

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        )
    }

    return (
        <div className="row m-0">
            <div className="col-xl-8 m-0 p-4">
                <div className="card bg-light-subtle h-100 p-0 rounded-4 shadow text-center mb-3">
                    <div className="card-header">
                        <h2>Welcome to the Dashboard</h2>
                        <div>Here’s an Overview of the latest activity.</div>
                    </div>
                    <div className="d-flex row card-body align-items-center justify-content-center m-0 px-3">
                        <RenderStatCard
                            title="Total Tickets"
                            value={dashboardStats.current?.totalTickets}
                            delta={dashboardStats.delta?.totalTicketsDelta}
                            iconClass="bi-ticket-perforated"
                        />
                        <RenderStatCard
                            title="Resolved Tickets"
                            value={dashboardStats.current?.resolvedTickets}
                            delta={dashboardStats.delta?.resolvedTicketsDelta}
                            iconClass="bi-clipboard-check"
                        />
                        <RenderStatCard
                            title="SLA Compliance"
                            value={dashboardStats.current?.slaCompliance}
                            delta={dashboardStats.delta?.slaComplianceDelta}
                            iconClass="bi-shield-check"
                            unit="%"
                        />
                        <RenderStatCard
                            title="Avg Resolution Time"
                            value={dashboardStats.current?.avgResolutionTime}
                            delta={dashboardStats.delta?.avgResolutionTimeDelta}
                            iconClass="bi-lightning-fill"
                            isTime={true}
                        />
                        <RenderStatCard
                            title="Avg Response Time"
                            value={dashboardStats.current?.avgResponseTime}
                            delta={dashboardStats.delta?.avgResponseTimeDelta}
                            iconClass="bi-clock-history"
                            isTime={true}
                        />
                        <RenderStatCard
                            title="Pending Approvals"
                            value={dashboardStats.current?.pendingApprovals}
                            delta={dashboardStats.delta?.pendingApprovalsDelta}
                            iconClass="bi-hourglass-top"
                        />
                    </div>
                </div>
            </div>

            <div className="col-xl-4 p-4">
                <div className="card h-100 rounded-4 shadow text-center mb-3">
                    <div className="card-header text-uppercase fs-3 fw-semibold">
                        Ticket Status Data
                    </div>
                    <div className="d-flex card-body align-items-center justify-content-center">
                        {loading ? (
                            renderPlaceholder()
                        ) : !dashboardStats?.statusData?.some((e) => e.value > 0) ? (
                            <div className="text-center text-muted py-4">
                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                <div className="fs-6">No data available</div>
                            </div>
                        ) : (
                            <CustomPieChart data={dashboardStats.statusData} />
                        )}
                    </div>
                </div>
            </div>

            <div className="col-xl-6 p-4">
                <div className="card h-100 rounded-4 shadow text-center mb-3">
                    <div className="card-header text-uppercase fs-3 fw-semibold">
                        Ticket Trends Over Time
                    </div>
                    <div className="d-flex card-body align-items-center justify-content-center">
                        {loading ? (
                            renderPlaceholder()
                        ) : !dashboardStats?.volumeTrends?.some(
                              (e) => e.Created > 0 && e.Failed && e.Reopened && e.Resolved
                          ) ? (
                            <div className="text-center text-muted py-4">
                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                <div className="fs-6">No data available</div>
                            </div>
                        ) : (
                            <CustomLineChart data={dashboardStats?.volumeTrends} />
                        )}
                    </div>
                </div>
            </div>

            <div className="col-xl-6 p-4">
                <div className="card h-100 rounded-4 shadow text-center mb-3">
                    <div className="card-header text-uppercase fs-3 fw-semibold">
                        Department-Wise Resolution Time
                    </div>
                    <div className="d-flex card-body align-items-center justify-content-center">
                        {console.log(dashboardStats?.departmentTimes)}
                        {loading ? (
                            renderPlaceholder()
                        ) : !dashboardStats?.departmentTimes?.some(
                              (e) => e.current_resolution_time > 0 && e.previous_resolution_time
                          ) ? (
                            <div className="text-center text-muted py-4">
                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                <div className="fs-6">No data available</div>
                            </div>
                        ) : (
                            <CustomBarChart
                                data={dashboardStats?.departmentTimes}
                                datakey="resolution_time"
                                display="Average Resolution Time"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamOverview
