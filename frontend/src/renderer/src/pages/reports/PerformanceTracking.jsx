import React, { useEffect, useState } from 'react'
import StatisticsCard from '../../components/cards/StatisticsCard'
import { useAPI } from '../../contexts/APIContext'
import CustomTable from '../../components/tables/CustomTable'
import Placeholder from '../../components/placeholders/Placeholder'
import CustomPieChart from '../../components/charts/CustomPieChart'
import CustomBarChart from '../../components/charts/CustomBarChart'
import PerformanceDashboard from './performance/PerformanceDashboard'

function PerformanceTracking() {
    return (
        <>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="overview">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                    Performance Tracking
                </div>
                <div className="row card-body">
                    <PerformanceDashboard />
                </div>
            </div>

            <div className="container py-4">
                {/* Overview Panel */}
                <h2 className="mb-4">📊 Performance Dashboard</h2>
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="card text-bg-primary h-100">
                            <div className="card-body">
                                <h5 className="card-title">Average Performance Score</h5>
                                <p className="display-6">89%</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-bg-success h-100">
                            <div className="card-body">
                                <h5 className="card-title">Top 5 Performers</h5>
                                <ul className="mb-0">
                                    <li>Jane Doe</li>
                                    <li>John Smith</li>
                                    <li>Maria Cruz</li>
                                    <li>Carl Santos</li>
                                    <li>Ana Reyes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-bg-danger h-100">
                            <div className="card-body">
                                <h5 className="card-title">Low Performers Needing Attention</h5>
                                <ul className="mb-0">
                                    <li>Mark Lee</li>
                                    <li>Ella Tan</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Department-Wise Comparison and Goal Rate */}
                <div className="row g-4 mb-5">
                    <div className="col-md-6">
                        <div className="card border-secondary">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Department-Wise Performance Comparison
                                </h5>
                                <ul>
                                    <li>IT - 92%</li>
                                    <li>HR - 87%</li>
                                    <li>Sales - 80%</li>
                                    <li>Support - 75%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-info">
                            <div className="card-body">
                                <h5 className="card-title">Goal Achievement Rate</h5>
                                <div className="progress">
                                    <div className="progress-bar bg-info" style={{ width: '78%' }}>
                                        78%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employee Performance Records */}
                <h3 className="mb-3">📋 Employee Performance Records</h3>
                <div className="table-responsive mb-5">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>Supervisor</th>
                                <th>Last Evaluation</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jane Doe</td>
                                <td>IT</td>
                                <td>Developer</td>
                                <td>Mr. Cruz</td>
                                <td>2025-03-15</td>
                                <td>95</td>
                                <td>
                                    <span className="badge bg-success">Excellent</span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-primary">View Report</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Mark Lee</td>
                                <td>Support</td>
                                <td>Technician</td>
                                <td>Ms. Reyes</td>
                                <td>2025-03-10</td>
                                <td>68</td>
                                <td>
                                    <span className="badge bg-danger">Needs Improvement</span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-primary">View Report</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Performance Metrics */}
                <h3 className="mb-3">📈 Performance Metrics</h3>
                <div className="row g-4 mb-5">
                    <div className="col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item">✅ Punctuality: 96%</li>
                            <li className="list-group-item">✅ Task Completion Rate: 91%</li>
                            <li className="list-group-item">✅ Quality of Work: 93%</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item">✅ Collaboration: 88%</li>
                            <li className="list-group-item">✅ Customer Feedback: 90%</li>
                            <li className="list-group-item">✅ Training Completion: 85%</li>
                        </ul>
                    </div>
                </div>

                {/* Goals and KPIs */}
                <h3 className="mb-3">🎯 Goals and KPIs</h3>
                <div className="mb-4">
                    <p>Track SMART goals across departments:</p>
                    <ul>
                        <li>
                            🎯 Tickets Resolved: <strong>120/150</strong>{' '}
                            <div className="progress">
                                <div
                                    className="progress-bar bg-success"
                                    style={{ width: '80%' }}
                                ></div>
                            </div>
                        </li>
                        <li>
                            🎯 Projects Delivered: <strong>8/10</strong>{' '}
                            <div className="progress">
                                <div
                                    className="progress-bar bg-warning"
                                    style={{ width: '75%' }}
                                ></div>
                            </div>
                        </li>
                        <li>
                            🎯 Sales Targets: <strong>₱500k / ₱700k</strong>{' '}
                            <div className="progress">
                                <div
                                    className="progress-bar bg-info"
                                    style={{ width: '71%' }}
                                ></div>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Evaluation History */}
                <h3 className="mb-3">🕒 Evaluation History</h3>
                <div className="mb-5">
                    <ul>
                        <li>Q1 2025: 88% - "Strong performance with excellent teamwork"</li>
                        <li>Q4 2024: 85% - "Met most goals, needs better time management"</li>
                        <li>Q3 2024: 82% - "Consistent but needs to upskill"</li>
                    </ul>
                </div>

                {/* Feedback & Notes */}
                <h3 className="mb-3">📝 Feedback & Notes</h3>
                <div className="mb-5">
                    <ul>
                        <li>
                            <strong>Manager:</strong> “Consistently exceeds expectations.”
                        </li>
                        <li>
                            <strong>Peer:</strong> “Very helpful during high-pressure sprints.”
                        </li>
                        <li>
                            <strong>Self:</strong> “Want to grow leadership skills this year.”
                        </li>
                        <li>
                            <strong>Recognition:</strong> 🏅 "Employee of the Month – Feb 2025"
                        </li>
                    </ul>
                </div>

                {/* Export Options */}
                <h3 className="mb-3">📁 Export / Print</h3>
                <div className="d-flex gap-3 mb-5">
                    <button className="btn btn-outline-primary">Export as PDF</button>
                    <button className="btn btn-outline-success">Export as Excel</button>
                    <button className="btn btn-outline-secondary">Print Report</button>
                </div>
            </div>
        </>
    )
}

export default PerformanceTracking
