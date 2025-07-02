import React, { useEffect, useState } from 'react'
import StatisticsCard from '../../components/cards/StatisticsCard'
import Placeholder from '../../components/placeholders/Placeholder'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomTable from '../../components/tables/CustomTable'
import { useAPI } from '../../contexts/APIContext'
import CustomLineChart from '../../components/charts/CustomLineChart'
import { FaBolt, FaEye, FaStackpath, FaTachometerAlt } from 'react-icons/fa'

function PerformanceTracking() {
    const { getData } = useAPI()
    const [teamOverview, setStatisticsStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [period, setPeriod] = useState('monthly')

    useEffect(() => {
        getData('/team-overview', setStatisticsStats, setLoading, setError)
    }, [])

    const columnsEmployeesPerformance = [
        {
            header: 'Employee',
            accessorKey: 'employee'
        },
        {
            header: 'Tickets Resolved',
            accessorKey: 'ticketsResolved'
        },
        {
            header: 'Avg. Response Time',
            accessorKey: 'avgResponseTime'
        },
        {
            header: 'SLA Compliance',
            accessorKey: 'slaCompliance'
        },
        {
            header: 'Escalations',
            accessorKey: 'escalations'
        },
        {
            header: 'Performance Score',
            accessorKey: 'performanceScore'
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#"
                    // onClick={() => setSelectedDepartment(row.original)}
                >
                    {/* <FaEye /> */}
                    View Report
                </button>
            )
        }
    ]

    const dataEmployeesPerformance = [
        {
            employee: 'John Doe',
            ticketsResolved: 42,
            avgResponseTime: '1h 10m',
            slaCompliance: '95%',
            escalations: 1,
            performanceScore: '⭐⭐⭐⭐☆ (4.5/5)'
        },
        {
            employee: 'Jane Smith',
            ticketsResolved: 38,
            avgResponseTime: '1h 30m',
            slaCompliance: '90%',
            escalations: 2,
            performanceScore: '⭐⭐⭐⭐☆ (4.3/5)'
        },
        {
            employee: 'Mark Lee',
            ticketsResolved: 45,
            avgResponseTime: '2h 05m',
            slaCompliance: '85%',
            escalations: 4,
            performanceScore: '⭐⭐⭐☆ (3.8/5)'
        },
        {
            employee: 'Sarah Kim',
            ticketsResolved: 50,
            avgResponseTime: '1h 20m',
            slaCompliance: '98%',
            escalations: 0,
            performanceScore: '⭐⭐⭐⭐⭐ (5/5)'
        },
        {
            employee: 'David Brown',
            ticketsResolved: 30,
            avgResponseTime: '2h 45m',
            slaCompliance: '80%',
            escalations: 3,
            performanceScore: '⭐⭐⭐☆ (3.6/5)'
        },
        {
            employee: 'Emily White',
            ticketsResolved: 55,
            avgResponseTime: '50m',
            slaCompliance: '99%',
            escalations: 0,
            performanceScore: '⭐⭐⭐⭐⭐ (5/5)'
        }
    ]
    return (
        <>
            <div
                className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4"
                id="overview"
            >
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                    Performance Tracking
                </div>
                <div className="row card-body">
                    <div className="col-xl-12 m-0 p-4">
                        <div className="row bg-light-subtle border m-0 p-3 rounded-4 shadow">
                            <div className="d-flex justify-content-between align-items-center p-3">
                                <h2 className="fw-bold mb-0">
                                    Performance Dashboard <FaBolt className="text-warning" />
                                </h2>
                                <div
                                    className="btn-group gap-2"
                                    role="group"
                                    aria-label="Export options"
                                >
                                    <button type="button" className="btn btn-primary rounded-3">
                                        <i className="bi bi-file-earmark-pdf-fill me-1"></i> Export
                                        PDF
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary text-light rounded-3"
                                    >
                                        <i className="bi bi-file-earmark-excel-fill me-1"></i>{' '}
                                        Export Excel
                                    </button>
                                    <button type="button" className="btn btn-primary rounded-3">
                                        <i className="bi bi-printer-fill me-1"></i> Print
                                    </button>
                                </div>
                            </div>

                            <div className="mb-2 d-flex">
                                <label
                                    htmlFor="chartFilter"
                                    className="form-label me-2 mb-0 align-self-center"
                                >
                                    Filter:
                                </label>
                                <select
                                    id="chartFilter"
                                    className="form-select form-select-sm w-auto"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                >
                                    <option value="weekly">Last 7 Days</option>
                                    <option value="monthly">Last 30 Days</option>
                                    <option value="quarterly">Last 90 Days</option>
                                    <option value="yearly">Last Year</option>
                                    <option value="all">All</option>
                                </select>
                            </div>

                            <StatisticsCard
                                title="Total Tickets Resolved"
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                                col={3}
                            />

                            <StatisticsCard
                                title="Avg Performance Score"
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                                col={3}
                            />

                            <StatisticsCard
                                title="SLA Compliance"
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                                col={3}
                            />
                            <StatisticsCard
                                title="Employee Satisfaction"
                                iconClass="bi-emoji-smile"
                                unit="%"
                                loading={loading}
                                col={3}
                            />

                            <StatisticsCard
                                title="Avg Resolution Time"
                                // value={teamOverview.current?.teamAvgResolutionTime}
                                // delta={teamOverview.delta?.teamAvgResolutionTimeDelta}
                                iconClass="bi-lightning-fill"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Avg Response Time"
                                // value={teamOverview.current?.teamAvgResponseTime}
                                // delta={teamOverview.delta?.teamAvgResponseTimeDelta}
                                iconClass="bi-clock-history"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Tickets Escalated"
                                iconClass="bi-arrow-up-right-circle"
                                loading={loading}
                            />

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Top Performers
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !teamOverview?.teamVolumeTrends?.some(
                                              (e) =>
                                                  e.Created > 0 &&
                                                  e.Failed &&
                                                  e.Reopened &&
                                                  e.Resolved
                                          ) ? (
                                            <div className="text-center text-muted py-4">
                                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                                <div className="fs-6">No data available</div>
                                            </div>
                                        ) : (
                                            <CustomBarChart
                                                data={teamOverview?.teamDepartmentTimes}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Low Performers Needing Attention
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !teamOverview?.teamVolumeTrends?.some(
                                              (e) =>
                                                  e.Created > 0 &&
                                                  e.Failed &&
                                                  e.Reopened &&
                                                  e.Resolved
                                          ) ? (
                                            <div className="text-center text-muted py-4">
                                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                                <div className="fs-6">No data available</div>
                                            </div>
                                        ) : (
                                            <CustomBarChart
                                                data={teamOverview?.teamDepartmentTimes}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Department-Wise Performance
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !teamOverview?.teamVolumeTrends?.some(
                                              (e) =>
                                                  e.Created > 0 &&
                                                  e.Failed &&
                                                  e.Reopened &&
                                                  e.Resolved
                                          ) ? (
                                            <div className="text-center text-muted py-4">
                                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                                <div className="fs-6">No data available</div>
                                            </div>
                                        ) : (
                                            <CustomLineChart
                                                data={teamOverview?.teamVolumeTrends}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Goal Achievement Rate
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !teamOverview?.teamVolumeTrends?.some(
                                              (e) =>
                                                  e.Created > 0 &&
                                                  e.Failed &&
                                                  e.Reopened &&
                                                  e.Resolved
                                          ) ? (
                                            <div className="text-center text-muted py-4">
                                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                                <div className="fs-6">No data available</div>
                                            </div>
                                        ) : (
                                            <CustomLineChart
                                                data={teamOverview?.teamVolumeTrends}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 p-3">
                                <div className="card shadow w-100">
                                    <div className="card-header bg-light text-uppercase fs-4 fw-semibold text-center">
                                        Employee’s Performance Records
                                    </div>
                                    <div className="card-body">
                                        <div className="col-12 p-4">
                                            <CustomTable
                                                columns={columnsEmployeesPerformance}
                                                data={dataEmployeesPerformance}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerformanceTracking
