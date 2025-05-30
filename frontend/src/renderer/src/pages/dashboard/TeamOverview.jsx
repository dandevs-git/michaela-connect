import { useEffect, useState, useCallback } from 'react'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomPieChart from '../../components/charts/CustomPieChart'
import { useAPI } from '../../contexts/APIContext'
import CustomRadarChart from '../../components/charts/CustomRadarChart'
import StatisticsCard from '../../components/cards/StatisticsCard'
import Placeholder from '../../components/placeholders/Placeholder'

function TeamOverview() {
    const { getData } = useAPI()
    const [statistics, setStatisticsStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/statistics', setStatisticsStats, setLoading, setError)
    }, [])

    return (
        <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="overview">
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                Team Overview
            </div>
            <div className="row card-body">
                <div className="col-xl-8 m-0 p-4">
                    <div className="card bg-light-subtle h-100 p-0 rounded-4 shadow text-center mb-3">
                        <div className="card-header">
                            <h2>Welcome to the Dashboard</h2>
                            <div>Here’s an Overview of the latest activity.</div>

                            {/* <div
                                className="input-group input-group-sm w-auto"
                                style={{ maxWidth: '300px' }}
                            >
                                <span className="input-group-text">Filter by Time Period</span>
                                <select
                                    id="periodSelect"
                                    className="form-select"
                                    // value={period}
                                    // onChange={(e) => setPeriod(e.target.value)}
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div> */}
                        </div>
                        <div className="d-flex row card-body align-items-center justify-content-center m-0 px-3">
                            <StatisticsCard
                                title="Total Tickets"
                                value={statistics.current?.teamTotalTickets}
                                delta={statistics.delta?.teamTotalTicketsDelta}
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Resolved Tickets"
                                value={statistics.current?.teamResolvedTickets}
                                delta={statistics.delta?.teamResolvedTicketsDelta}
                                iconClass="bi-clipboard-check"
                                loading={loading}
                            />
                            <StatisticsCard
                                title="SLA Compliance"
                                value={statistics.current?.teamSlaCompliance}
                                delta={statistics.delta?.teamSlaComplianceDelta}
                                iconClass="bi-shield-check"
                                unit="%"
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Avg Resolution Time"
                                value={statistics.current?.teamAvgResolutionTime}
                                delta={statistics.delta?.teamAvgResolutionTimeDelta}
                                iconClass="bi-lightning-fill"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Avg Response Time"
                                value={statistics.current?.teamAvgResponseTime}
                                delta={statistics.delta?.teamAvgResponseTimeDelta}
                                iconClass="bi-clock-history"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Pending Approvals"
                                value={statistics.current?.teamPendingApprovals}
                                delta={statistics.delta?.teamPendingApprovalsDelta}
                                iconClass="bi-hourglass-top"
                                reverseDelta={true}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>

                <div className="row col-xl-4">
                    <div className="col-xl-12 pb-2 pt-4 px-4">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fs-3 fw-semibold">
                                Ticket Status Data
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                {loading ? (
                                    <Placeholder height="200px" />
                                ) : !statistics?.teamStatusData?.some((e) => e.value > 0) ? (
                                    <div className="text-center text-muted py-4">
                                        <i className="bi bi-info-circle fs-1 mb-2"></i>
                                        <div className="fs-6">No data available</div>
                                    </div>
                                ) : (
                                    <CustomPieChart data={statistics.teamStatusData} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 pt-2 pb-4 px-4">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fs-3 fw-semibold d-flex flex-column">
                                <span className="">Ticket Volume</span>
                                <span style={{ fontSize: '0.8rem' }}>by Priority</span>
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                {loading ? (
                                    <Placeholder height="200px" />
                                ) : !statistics?.teamTicketVolume?.some((e) => e.value > 0) ? (
                                    <div className="text-center text-muted py-4">
                                        <i className="bi bi-info-circle fs-1 mb-2"></i>
                                        <div className="fs-6">No data available</div>
                                    </div>
                                ) : (
                                    <CustomRadarChart data={statistics.teamTicketVolume} />
                                )}
                            </div>
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
                                <Placeholder height="300px" />
                            ) : !statistics?.teamVolumeTrends?.some(
                                  (e) => e.Created > 0 && e.Failed && e.Reopened && e.Resolved
                              ) ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomLineChart data={statistics?.teamVolumeTrends} />
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
                            {loading ? (
                                <Placeholder height="300px" />
                            ) : !statistics?.teamDepartmentTimes?.some(
                                  (e) => e.current_resolution_time > 0 && e.previous_resolution_time
                              ) ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomBarChart
                                    data={statistics?.teamDepartmentTimes}
                                    datakey="resolution_time"
                                    display="Average Resolution Time"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamOverview
