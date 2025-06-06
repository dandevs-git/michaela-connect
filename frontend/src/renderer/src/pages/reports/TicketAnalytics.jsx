import React, { useEffect, useState } from 'react'
import StatisticsCard from '../../components/cards/StatisticsCard'
import Placeholder from '../../components/placeholders/Placeholder'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomTable from '../../components/tables/CustomTable'
import { useAPI } from '../../contexts/APIContext'
import CustomLineChart from '../../components/charts/CustomLineChart'
import { FaBolt, FaEye, FaStackpath, FaTachometerAlt } from 'react-icons/fa'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CustomRadialBarChart from '../../components/charts/CustomRadialBarChart'
import CustomAreaChart from '../../components/charts/CustomAreaChart'
import CustomPieChart from '../../components/charts/CustomPieChart'
import CustomStackedBarChart from '../../components/charts/CustomAreaChart copy'
import StatusBadge from '../../components/badges/StatusBadge'
import { formatDateVerbose } from '../../utils/formatDateVerbose'

function TicketAnalytics() {
    const { getData } = useAPI()
    const [statistics, setStatisticsStats] = useState([])
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [ticketLoading, setTicketLoading] = useState(true)
    const [error, setError] = useState('')
    const [period, setPeriod] = useState('monthly')

    useEffect(() => {
        getData('/statistics', setStatisticsStats, setLoading, setError)
    }, [])

    useEffect(() => {
        getData(`/tickets`, setTickets, setTicketLoading, setError)
    }, [])

    const columns = [
        { header: 'Tickets No.', accessorKey: 'ticket_number' },
        {
            header: 'Priority Level',
            accessorFn: (row) => row.priority?.name || '',
            id: 'priorityName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.priority?.name || 'N/A'
        },
        {
            header: 'From Department',
            accessorFn: (row) => row.origin_department?.name || '',
            id: 'origin_departmentName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.origin_department?.name || 'N/A'
        },
        {
            header: 'To Department',
            accessorFn: (row) => row.target_department?.name || '',
            id: 'target_departmentName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.target_department?.name || 'N/A'
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.original.status} />
        },
        {
            header: 'Title',
            accessorKey: 'title',
            cell: ({ row }) => row.original.title || 'N/A'
        },
        {
            header: 'Updated At',
            accessorKey: 'updated_at',
            cell: ({ row }) => formatDateVerbose(row.original.updated_at)
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="dropdown">
                    <button
                        className="action-btn btn border-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        aria-label="More actions"
                        title="More actions"
                    >
                        <i className="bi bi-list fs-5"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm rounded-3">
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#ticketDetailsModal"
                                onClick={() => setSelectedTickets(row.original)}
                            >
                                <FaEye className="me-1" /> View
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    const kpiData = {
        totalTickets: { opened: 120, resolved: 95, pending: 25 },
        slaCompliance: 92,
        avgFirstResponseTime: 3.2, // hours
        avgResolutionTime: 10.5, // hours
        csat: 4.5, // out of 5
        backlogCount: 18,
        reopenRate: 6.5 // percentage
    }

    const csatData = [{ name: 'CSAT', value: kpiData.csat * 20, fill: '#4ade80' }]

    const areaData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ]

    const stackedBarChartData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ]

    return (
        <>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="overview">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                    Ticket Analytics
                </div>
                <div className="row card-body">
                    <div className="col-xl-12 m-0 p-4">
                        <div className="row bg-light-subtle border m-0 p-3 rounded-4 shadow">
                            <div className="d-flex justify-content-between align-items-center p-3">
                                <h2 className="fw-bold mb-0">Overview Metrics</h2>
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
                                title="All Tickets"
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                            />

                            <StatisticsCard
                                title="Pending Tickets"
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                            />

                            <StatisticsCard
                                title="New Tickets"
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                            />
                            <StatisticsCard
                                title="Open Tickets"
                                iconClass="bi-emoji-smile"
                                unit="%"
                                loading={loading}
                                col={2}
                            />

                            <StatisticsCard
                                title="In Progress Tickets"
                                iconClass="bi-lightning-fill"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                                col={2}
                            />
                            <StatisticsCard
                                title="Resolved Tickets"
                                iconClass="bi-clock-history"
                                isTime={true}
                                reverseDelta={true}
                                loading={loading}
                                col={2}
                            />
                            <StatisticsCard
                                title="Closed Tickets"
                                iconClass="bi-arrow-up-right-circle"
                                loading={loading}
                                col={2}
                            />
                            <StatisticsCard
                                title="Failed Tickets"
                                iconClass="bi-arrow-up-right-circle"
                                loading={loading}
                                col={2}
                            />
                            <StatisticsCard
                                title="Rejected Tickets"
                                iconClass="bi-arrow-up-right-circle"
                                loading={loading}
                                col={2}
                            />

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Tickets Over Time
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !statistics?.teamVolumeTrends?.some(
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
                                            <CustomLineChart data={statistics?.teamVolumeTrends} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Resolution Time Trend
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !statistics?.teamVolumeTrends?.some(
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
                                            <CustomLineChart data={statistics?.teamVolumeTrends} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Volume by Day of Week
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !statistics?.teamVolumeTrends?.some(
                                              (e) => e.Created > 0
                                          ) ? (
                                            <div className="text-center text-muted py-4">
                                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                                <div className="fs-6">No data available</div>
                                            </div>
                                        ) : (
                                            <CustomBarChart
                                                data={statistics?.teamDepartmentTimes}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Spike Detection
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !statistics?.teamVolumeTrends?.some(
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
                                            <CustomAreaChart data={areaData} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Volume by Category
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !statistics?.teamVolumeTrends?.some(
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
                                            <CustomStackedBarChart data={stackedBarChartData} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 p-3">
                                <div className="card rounded-4 shadow w-100">
                                    <div className="card-header rounded-top-4 bg-light text-uppercase fs-4 fw-semibold text-center">
                                        All Tickets
                                    </div>
                                    <div className="card-body">
                                        <div className="col-12 p-4">
                                            <CustomTable
                                                // topComponent={
                                                // }
                                                hasExportOptions={true}
                                                hasFilterByHeader={true}
                                                hasSearch={false}
                                                isloading={ticketLoading}
                                                columns={columns}
                                                data={tickets}
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

export default TicketAnalytics
