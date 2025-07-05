import { useEffect, useState } from 'react'
import { useAPI } from '../../contexts/APIContext'
import StatisticsCard from '../../components/cards/StatisticsCard'
import Placeholder from '../../components/placeholders/Placeholder'
import CustomLineChart from '../../components/charts/CustomLineChart'
import { COLORS } from '../../constants/config'
import CustomTable from '../../components/tables/CustomTable'

function PerformanceSummary() {
    const { getData } = useAPI()
    const [performanceSummary, setPerformanceSummary] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/performance-summary', setPerformanceSummary, setLoading, setError)
    }, [])

    const columnsEmployeePerformance = [
        { header: 'Employee', accessorKey: 'employee' },
        { header: 'Department', accessorKey: 'department' },
        { header: 'Resolved Tickets', accessorKey: 'ticketsResolved' },
        { header: 'Reopened', accessorKey: 'reopenedTickets' },
        { header: 'Avg Resolution Time', accessorKey: 'avgResponseTime' },
        { header: 'SLA Compliance', accessorKey: 'slaCompliance' },
        { header: 'Performance Score', accessorKey: 'performanceScore' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.original?.status
                const badgeClass =
                    status === 'Excellent'
                        ? 'success'
                        : status === 'Satisfactory'
                          ? 'primary'
                          : status === 'Needs Improvement'
                            ? 'warning'
                            : 'danger'
                return <span className={`badge rounded-pill bg-${badgeClass}`}>{status}</span>
            }
        }
    ]

    return (
        <div
            className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4"
            id="performance-summary"
        >
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                Performance Summary
            </div>

            <div className="row card-body">
                {/* KPI summary cards */}
                <div className="d-flex row justify-content-center align-items-center px-3 mb-4">
                    <StatisticsCard
                        title="Total Tickets"
                        value={performanceSummary.current?.totalTickets}
                        delta={performanceSummary.delta?.totalTicketsDelta}
                        iconClass="bi-ticket-perforated"
                        loading={loading}
                    />
                    <StatisticsCard
                        title="Resolved Tickets"
                        value={performanceSummary.current?.resolvedTickets}
                        delta={performanceSummary.delta?.resolvedTicketsDelta}
                        iconClass="bi-clipboard-check"
                        loading={loading}
                    />
                    <StatisticsCard
                        title="SLA Compliance"
                        value={performanceSummary.current?.slaCompliance}
                        unit="%"
                        delta={performanceSummary.delta?.slaComplianceDelta}
                        iconClass="bi-shield-check"
                        loading={loading}
                    />
                    <StatisticsCard
                        title="Avg First Response"
                        value={performanceSummary.current?.averageFirstResponseTime}
                        delta={performanceSummary.delta?.averageFirstResponseTimeDelta}
                        iconClass="bi-clock-history"
                        isTime
                        reverseDelta
                        loading={loading}
                    />
                    <StatisticsCard
                        title="Avg Resolution"
                        value={performanceSummary.current?.averageResolutionTime}
                        delta={performanceSummary.delta?.averageResolutionTimeDelta}
                        iconClass="bi-lightning-fill"
                        isTime
                        reverseDelta
                        loading={loading}
                    />
                </div>

                {/* Monthly trends */}
                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Monthly Performance Trends
                        </div>
                        <div className="d-flex card-body align-items-center justify-content-center">
                            {loading ? (
                                <Placeholder height="350px" />
                            ) : !performanceSummary?.monthlyTrends?.length ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomLineChart
                                    data={performanceSummary.monthlyTrends}
                                    xKey="month"
                                    yKeys={['Created', 'Resolved', 'Failed', 'Reopened']}
                                    colors={[COLORS[0], COLORS[1], COLORS[2], COLORS[3]]}
                                    hasFilter={true}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Department-Wise SLA Compliance
                        </div>
                        <div className="d-flex card-body align-items-center justify-content-center">
                            {loading ? (
                                <Placeholder height="350px" />
                            ) : !performanceSummary?.departmentPerformance?.length ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomBarChart
                                    data={performanceSummary.departmentPerformance}
                                    bars={[
                                        {
                                            dataKey: 'slaCompliance',
                                            name: 'SLA Compliance',
                                            fill: COLORS[0]
                                        }
                                    ]}
                                    xAxisKey="department"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Employee Performance Scores
                        </div>
                        <div className="card-body">
                            <CustomTable
                                columns={columnsEmployeePerformance}
                                data={performanceSummary?.employeePerformance}
                                isloading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerformanceSummary
