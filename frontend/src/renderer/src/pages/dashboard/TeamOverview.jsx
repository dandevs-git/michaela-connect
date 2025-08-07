import { useEffect, useState, useCallback } from 'react'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomPieChart from '../../components/charts/CustomPieChart'
import { useAPI } from '../../contexts/APIContext'
import CustomRadarChart from '../../components/charts/CustomRadarChart'
import StatisticsCard from '../../components/cards/StatisticsCard'
import Placeholder from '../../components/placeholders/Placeholder'
import CustomTable from '../../components/tables/CustomTable'
import { COLORS } from '../../constants/config'

function TeamOverview() {
    const { getData } = useAPI()
    const [teamOverview, setTeamOverview] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/team-overview', setTeamOverview, setLoading, setError)
    }, [])

    const columnsLiveEmployeeStatus = [
        {
            header: 'Name',
            accessorKey: 'name'
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.original?.status
                const statusClass =
                    status === 'Online'
                        ? 'success'
                        : status === 'Offline'
                          ? 'secondary'
                          : status === 'Away'
                            ? 'warning'
                            : 'danger'

                return <span className={`badge fs-6 rounded-pill bg-${statusClass}`}>{status}</span>
            }
        },
        {
            header: 'Last Seen',
            accessorKey: 'last_activity_at'
        }
    ]

    return (
        <div className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4" id="overview">
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                Team Overview
            </div>
            <div className="row card-body">
                <div className="col-xl-8 m-0 p-4">
                    <div className="card bg-light-subtle h-100 p-0 rounded-4 shadow text-center mb-3">
                        <div className="card-header">
                            <h2>Welcome to the Dashboard</h2>
                            <div>Here’s an Overview of the latest activity.</div>
                        </div>
                        <div className="d-flex row card-body align-items-center justify-content-center m-0 px-3">
                            <StatisticsCard
                                title="Total Tickets"
                                value={teamOverview.current?.teamTotalTickets}
                                delta={teamOverview.delta?.teamTotalTicketsDelta}
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                                redirectTo="/service-desk/tickets/all"
                            />
                            <StatisticsCard
                                title="Resolved Tickets"
                                value={teamOverview.current?.teamResolvedTickets}
                                delta={teamOverview.delta?.teamResolvedTicketsDelta}
                                iconClass="bi-clipboard-check"
                                loading={loading}
                                redirectTo="/service-desk/tickets/resolved"
                            />
                            <StatisticsCard
                                title="SLA Compliance"
                                value={teamOverview.current?.teamSlaCompliance}
                                delta={teamOverview.delta?.teamSlaComplianceDelta}
                                iconClass="bi-shield-check"
                                unit="%"
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Avg Resolution Time"
                                value={teamOverview.current?.teamAvgResolutionTime}
                                delta={teamOverview.delta?.teamAvgResolutionTimeDelta}
                                iconClass="bi-lightning-fill"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Avg Response Time"
                                value={teamOverview.current?.teamAvgResponseTime}
                                delta={teamOverview.delta?.teamAvgResponseTimeDelta}
                                iconClass="bi-clock-history"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Pending Approvals"
                                value={teamOverview.current?.teamPendingApprovals}
                                delta={teamOverview.delta?.teamPendingApprovalsDelta}
                                iconClass="bi-hourglass-top"
                                reverseDelta={true}
                                loading={loading}
                                redirectTo="/service-desk/tickets/pending"
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
                                ) : !teamOverview?.teamStatusData?.some((e) => e.value > 0) ? (
                                    <div className="text-center text-muted py-4">
                                        <i className="bi bi-info-circle fs-1 mb-2"></i>
                                        <div className="fs-6">No data available</div>
                                    </div>
                                ) : (
                                    <CustomPieChart data={teamOverview.teamStatusData} />
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
                                ) : !teamOverview?.teamTicketVolume?.some((e) => e.value > 0) ? (
                                    <div className="text-center text-muted py-4">
                                        <i className="bi bi-info-circle fs-1 mb-2"></i>
                                        <div className="fs-6">No data available</div>
                                    </div>
                                ) : (
                                    <CustomRadarChart data={teamOverview.teamTicketVolume} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Team Member Workload
                        </div>
                        <div className="d-flex card-body align-items-center justify-content-center">
                            {loading ? (
                                <Placeholder height="350px" />
                            ) : !teamOverview?.teamWorkload?.some(
                                  (e) => e.current_workload > 0 && e.previous_workload
                              ) ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomBarChart
                                    data={teamOverview?.teamWorkload}
                                    bars={[
                                        {
                                            dataKey: 'previous_workload',
                                            name: 'Previous Workload',
                                            fill: COLORS[2]
                                        },
                                        {
                                            dataKey: 'current_workload',
                                            name: 'Current Workload',
                                            fill: COLORS[0]
                                        }
                                    ]}
                                    xAxisKey="name"
                                />
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
                                <Placeholder height="350px" />
                            ) : !teamOverview?.teamDepartmentTimes?.some(
                                  (e) => e.current_resolution_time > 0 && e.previous_resolution_time
                              ) ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomBarChart
                                    // data={teamOverview?.teamDepartmentTimes}
                                    // datakey="resolution_time"
                                    // display="Average Resolution Time"
                                    data={teamOverview?.teamDepartmentTimes}
                                    bars={[
                                        {
                                            dataKey: 'previous_resolution_time',
                                            name: 'Previous Resolution Time',
                                            fill: COLORS[2]
                                        },
                                        {
                                            dataKey: 'current_resolution_time',
                                            name: 'Current Resolution Time',
                                            fill: COLORS[0]
                                        }
                                    ]}
                                    xAxisKey="name"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Ticket Trends Over Time
                        </div>
                        <div className="d-flex card-body align-items-center justify-content-center">
                            {loading ? (
                                <Placeholder height="350px" />
                            ) : !teamOverview?.teamVolumeTrends?.some((e) => e.Created > 0) ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomLineChart
                                    data={teamOverview?.teamVolumeTrends}
                                    xKey="name"
                                    yKeys={['Resolved', 'Created', 'Reopened', 'Failed']}
                                    hasFilter={true}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Live Employees Status
                        </div>
                        <div className="d-flex card-body align-items-center justify-content-center">
                            <div className="col-xl-12 p-4">
                                <CustomTable
                                    isloading={loading}
                                    columns={columnsLiveEmployeeStatus}
                                    data={teamOverview?.liveEmployeeStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamOverview
