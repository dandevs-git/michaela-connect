import { useEffect, useState } from 'react'
import { useAPI } from '../../contexts/APIContext'
import StatisticsCard from '../../components/cards/StatisticsCard'
import Placeholder from '../../components/placeholders/Placeholder'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomBarChart from '../../components/charts/CustomBarChart'
import { COLORS } from '../../constants/config'
import CustomTable from '../../components/tables/CustomTable'

function PerformanceSummary() {
    const { getData } = useAPI()
    const [performanceSummary, setPerformanceSummary] = useState({})
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

    // const mergedMonthlyTrends = () => {
    //     const current = performanceSummary.current.monthlyTrends || []
    //     const previous = performanceSummary.previous.monthlyTrends || []

    //     const allMonthsSet = new Set([
    //         ...current.map((item) => item.month),
    //         ...previous.map((item) => item.month)
    //     ])

    //     const allMonths = Array.from(allMonthsSet).sort()

    //     return allMonths.map((month) => {
    //         const currentItem = current.find((item) => item.month === month)
    //         const previousItem = previous.find((item) => item.month === month)

    //         return {
    //             month,
    //             Current: currentItem?.count || 0,
    //             Previous: previousItem?.count || 0
    //         }
    //     })
    // }

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
                        title="Top Employee Total Tickets"
                        value={performanceSummary.current?.totalTickets}
                        delta={performanceSummary.delta?.totalTicketsDelta}
                        iconClass="bi-ticket-perforated"
                        loading={loading}
                        col={4}
                    />
                    <StatisticsCard
                        title="Top Employee Resolved Tickets"
                        value={performanceSummary.current?.resolvedTickets}
                        delta={performanceSummary.delta?.resolvedTicketsDelta}
                        iconClass="bi-clipboard-check"
                        loading={loading}
                    />
                    <StatisticsCard
                        title="Top Employee SLA Compliance"
                        value={performanceSummary.current?.slaCompliance}
                        unit="%"
                        delta={performanceSummary.delta?.slaComplianceDelta}
                        iconClass="bi-shield-check"
                        loading={loading}
                    />
                    <StatisticsCard
                        title="Top Employee Avg First Response"
                        value={performanceSummary.current?.averageFirstResponseTime}
                        delta={performanceSummary.delta?.averageFirstResponseTimeDelta}
                        iconClass="bi-clock-history"
                        isTime
                        reverseDelta
                        loading={loading}
                    />
                    <StatisticsCard
                        title="Top Employee Avg Resolution"
                        value={performanceSummary.current?.averageResolutionTime}
                        delta={performanceSummary.delta?.averageResolutionTimeDelta}
                        iconClass="bi-lightning-fill"
                        isTime
                        reverseDelta
                        loading={loading}
                    />
                </div>

                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Monthly Performance Trends
                        </div>
                        <div className="d-flex card-body align-items-center justify-content-center">
                            {loading ? (
                                <Placeholder height="350px" />
                            ) : performanceSummary?.current?.monthlyTrends.length === 0 ? (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-info-circle fs-1 mb-2"></i>
                                    <div className="fs-6">No data available</div>
                                </div>
                            ) : (
                                <CustomLineChart
                                    data={performanceSummary.current.monthlyTrends.map((item) => ({
                                        month: item.month,
                                        Tickets: item.count
                                    }))}
                                    xKey="month"
                                    yKeys={['Tickets']}
                                    colors={[COLORS[0]]}
                                    hasFilter={true}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Department-Wise SLA - Placeholder or integrate logic later */}
                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Department-Wise SLA Compliance
                        </div>
                        <div className="d-flex card-body align-items-center justify-content-center">
                            <Placeholder height="350px" />
                        </div>
                    </div>
                </div>

                {/* Employee Performance Table */}
                <div className="col-xl-12 p-4">
                    <div className="card h-100 rounded-4 shadow text-center mb-3">
                        <div className="card-header text-uppercase fs-3 fw-semibold">
                            Employee Performance Scores
                        </div>
                        <div className="card-body">
                            <CustomTable
                                columns={columnsEmployeePerformance}
                                data={performanceSummary?.employeePerformance || []}
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
