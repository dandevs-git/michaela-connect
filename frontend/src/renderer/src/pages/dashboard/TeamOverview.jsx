import { useEffect, useState } from 'react'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomPieChart from '../../components/charts/CustomPieChart'
import { useAPI } from '../../contexts/APIContext'

function TeamOverview() {
    const { getData } = useAPI()
    const [ticketStatusData, setTicketStatusData] = useState([])
    const [ticketVolumeTrends, setTicketVolumeTrends] = useState([])
    const [ticketsByDepartment, setTicketsByDepartment] = useState([])
    const [dashboardStats, setDashboardStats] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                await Promise.all([
                    getData('/dashboard?department_id=1', setDashboardStats, setLoading, setError),
                    getData('/ticket-status-data?department_id=1', setTicketStatusData),
                    getData('/ticket-volume-trends?department_id=1', setTicketVolumeTrends),
                    getData('/department-resolution-time?department_id=1', setTicketsByDepartment)
                ])
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            }
        }

        fetchAllData()
    }, [])

    const renderStatCard = (title, value, delta, iconClass, trend, unit = '') => (
        <div className="col-xl-4 h-50 p-3">
            <div className="card h-100 rounded-4 shadow text-center mb-3">
                <div className="card-header text-uppercase fw-semibold">{title}</div>
                <div className="d-flex flex-column card-body align-items-center justify-content-center">
                    {loading ? (
                        <>
                            <span className="placeholder-glow w-50">
                                <span className="placeholder col-12 display-3"></span>
                            </span>
                            <span className="placeholder-glow w-75 mt-2">
                                <span className="placeholder col-8 fs-5"></span>
                            </span>
                            <span className="placeholder col-6 mt-2"></span>
                        </>
                    ) : (
                        <>
                            <p className="card-text display-3 m-0 fw-bold">
                                {value > 0 ? value : '-'}
                                {unit && value > 0 ? <span className="fs-5">{unit}</span> : ''}
                            </p>
                            <span className={`fs-5 fw-bold text-${trend}`}>
                                <i
                                    className={`bi ${trend === 'success' ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}
                                ></i>
                                {delta > 0 ? delta + (unit ? ` ${unit}` : '') : '-'}
                                <i className={`bi ${iconClass} ms-2`}></i>
                            </span>
                            <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                vs previous 30 days
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="col-xl-8 m-0 p-4">
                <div className="card bg-light-subtle h-100 p-0 rounded-4 shadow text-center mb-3">
                    <div className="card-header">
                        <h2>Welcome to the Dashboard</h2>
                        <div>Here’s an Overview of the latest activity.</div>
                    </div>
                    <div className="d-flex row card-body align-items-center justify-content-center m-0 px-3">
                        {renderStatCard(
                            'Total Tickets',
                            dashboardStats.totalTickets,
                            dashboardStats.totalTicketsDelta,
                            'bi-ticket-perforated',
                            'success'
                        )}
                        {renderStatCard(
                            'Resolved Tickets',
                            dashboardStats.resolvedTickets,
                            dashboardStats.resolvedTicketsDelta,
                            'bi-clipboard-check',
                            'danger'
                        )}
                        {renderStatCard(
                            'SLA Compliance',
                            dashboardStats.slaCompliance,
                            dashboardStats.slaComplianceDelta,
                            'bi-shield-check',
                            'success',
                            '%'
                        )}
                        {renderStatCard(
                            'Avg Resolution Time',
                            dashboardStats.avgResolutionTime,
                            dashboardStats.avgResolutionTimeDelta,
                            'bi-lightning-fill',
                            'danger',
                            'mins'
                        )}
                        {renderStatCard(
                            'Avg Response Time',
                            dashboardStats.avgResponseTime,
                            dashboardStats.avgResponseTimeDelta,
                            'bi-clock-history',
                            'danger',
                            'mins'
                        )}
                        {renderStatCard(
                            'Pending Approvals',
                            dashboardStats.pendingApprovals,
                            dashboardStats.pendingApprovalsDelta,
                            'bi-hourglass-top',
                            'success'
                        )}
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
                            <div className="spinner-grow" role="status"></div>
                        ) : (
                            <CustomPieChart data={ticketStatusData} />
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
                            <span className="placeholder-glow w-100">
                                <div
                                    className="placeholder col-12"
                                    style={{ height: '300px' }}
                                ></div>
                            </span>
                        ) : (
                            <CustomLineChart data={ticketVolumeTrends} />
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
                            <span className="placeholder-glow w-100">
                                <div
                                    className="placeholder col-12"
                                    style={{ height: '300px' }}
                                ></div>
                            </span>
                        ) : (
                            <CustomBarChart
                                data={ticketsByDepartment}
                                datakey={'resolution_time'}
                                display={'Average Resolution Time'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamOverview
