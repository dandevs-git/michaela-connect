import React, { useEffect, useState } from 'react'
import StatisticsCard from '../../../components/cards/StatisticsCard'
import Placeholder from '../../../components/placeholders/Placeholder'
import CustomBarChart from '../../../components/charts/CustomBarChart'
import CustomTable from '../../../components/tables/CustomTable'
import { useAPI } from '../../../contexts/APIContext'

function PerformanceDashboard() {
    const { getData } = useAPI()
    const [statistics, setStatisticsStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [period, setPeriod] = useState('monthly')

    useEffect(() => {
        getData('/statistics', setStatisticsStats, setLoading, setError)
    }, [])

    const columnsEmployeesPerformance = [
        { header: 'Employee Name', accessorKey: 'employeeName' },
        { header: 'Department', accessorKey: 'department' },
        { header: 'Role', accessorKey: 'role' },
        { header: 'Supervisor', accessorKey: 'supervisor' },
        { header: 'Last Evaluation', accessorKey: 'lastEvaluation' },
        { header: 'Score', accessorKey: 'score' },
        { header: 'Status', accessorKey: 'status' },
        { header: 'Actions', accessorKey: 'actions' }
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
        }
        // ...
    ]

    const renderChartCard = (title) => (
        <div className="col-xl-6 mb-4">
            <div className="card h-100 rounded-4 shadow">
                <div className="card-header text-uppercase fw-semibold fs-5 bg-primary-subtle rounded-top-4">
                    {title}
                </div>
                <div className="card-body d-flex align-items-center justify-content-center">
                    {loading ? (
                        <Placeholder height="300px" />
                    ) : !statistics?.teamDepartmentTimes?.some(
                          (e) => e.current_resolution_time > 0 && e.previous_resolution_time
                      ) ? (
                        <div className="text-center text-muted">
                            <i className="bi bi-info-circle fs-1 mb-2" />
                            <div>No data available</div>
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
    )

    return (
        <div className="col-xl-12 m-0 p-4">
            <div className="row bg-light-subtle border m-0 p-3 rounded-4 shadow">
                <div className="d-flex justify-content-between align-items-center p-3">
                    <h2 className="fw-bold mb-0">Performance Dashboard</h2>
                    <div className="btn-group gap-2" role="group" aria-label="Export options">
                        <button type="button" className="btn btn-primary rounded-3">
                            <i className="bi bi-file-earmark-pdf-fill me-1"></i> Export PDF
                        </button>
                        <button type="button" className="btn btn-primary text-light rounded-3">
                            <i className="bi bi-file-earmark-excel-fill me-1"></i> Export Excel
                        </button>
                        <button type="button" className="btn btn-primary rounded-3">
                            <i className="bi bi-printer-fill me-1"></i> Print
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <div
                        className="input-group input-group-sm w-auto"
                        style={{ maxWidth: '300px' }}
                    >
                        <span className="input-group-text">Filter by Time Period</span>
                        <select
                            id="periodSelect"
                            className="form-select"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>

                <StatisticsCard
                    title="Average Performance Score"
                    iconClass="bi-ticket-perforated"
                    loading={loading}
                />
                <StatisticsCard
                    title="Employee Satisfaction"
                    iconClass="bi-emoji-smile"
                    unit="%"
                    loading={loading}
                />
                <StatisticsCard
                    title="Tickets Escalated"
                    iconClass="bi-arrow-up-right-circle"
                    loading={loading}
                />

                <div className="row">
                    {renderChartCard('Top Performers')}
                    {renderChartCard('Low Performers Needing Attention')}
                    {renderChartCard('Department-Wise Performance')}
                    {renderChartCard('Goal Achievement Rate')}
                </div>

                <section className="mt-5">
                    <h3 className="mb-2 fw-semibold">👨‍💻 Employee Performance Records</h3>
                    <CustomTable
                        columns={columnsEmployeesPerformance}
                        data={dataEmployeesPerformance}
                    />
                </section>

                <section className="mt-5">
                    <h3 className="mb-2 fw-semibold">📈 Performance Metrics</h3>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <ul className="list-group shadow-sm">
                                <li className="list-group-item">✅ Punctuality: 96%</li>
                                <li className="list-group-item">✅ Task Completion Rate: 91%</li>
                                <li className="list-group-item">✅ Quality of Work: 93%</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-group shadow-sm">
                                <li className="list-group-item">✅ Collaboration: 88%</li>
                                <li className="list-group-item">✅ Customer Feedback: 90%</li>
                                <li className="list-group-item">✅ Training Completion: 85%</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mt-5">
                    <h3 className="mb-2 fw-semibold">🎯 Goals and KPIs</h3>
                    <ul className="list-group shadow-sm">
                        <li className="list-group-item">
                            Tickets Resolved: <strong>120 / 150</strong>
                            <div className="progress mt-1">
                                <div className="progress-bar bg-success" style={{ width: '80%' }} />
                            </div>
                        </li>
                        <li className="list-group-item">
                            Projects Delivered: <strong>8 / 10</strong>
                            <div className="progress mt-1">
                                <div className="progress-bar bg-warning" style={{ width: '75%' }} />
                            </div>
                        </li>
                        <li className="list-group-item">
                            Sales Targets: <strong>₱500k / ₱700k</strong>
                            <div className="progress mt-1">
                                <div className="progress-bar bg-info" style={{ width: '71%' }} />
                            </div>
                        </li>
                    </ul>
                </section>

                <section className="mt-5">
                    <h3 className="mb-2 fw-semibold">🕑 Evaluation History</h3>
                    <ul className="list-group shadow-sm">
                        <li className="list-group-item">
                            Q1 2025: 88% - Strong performance with excellent teamwork
                        </li>
                        <li className="list-group-item">
                            Q4 2024: 85% - Met most goals, needs better time management
                        </li>
                        <li className="list-group-item">
                            Q3 2024: 82% - Consistent but needs to upskill
                        </li>
                    </ul>
                </section>

                <section className="mt-5">
                    <h3 className="mb-2 fw-semibold">📝 Feedback & Notes</h3>
                    <ul className="list-group shadow-sm">
                        <li className="list-group-item">
                            <strong>Manager:</strong> “Consistently exceeds expectations.”
                        </li>
                        <li className="list-group-item">
                            <strong>Peer:</strong> “Very helpful during high-pressure sprints.”
                        </li>
                        <li className="list-group-item">
                            <strong>Self:</strong> “Want to grow leadership skills this year.”
                        </li>
                        <li className="list-group-item">
                            <strong>Recognition:</strong> 🏅 "Employee of the Month – Feb 2025"
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default PerformanceDashboard
