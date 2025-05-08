import { useEffect, useState } from 'react'
import StatisticsCard from '../../components/cards/StatisticsCard'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import { useAPI } from '../../contexts/APIContext'
import Placeholder from '../../components/placeholders/Placeholder'

function MyOverview() {
    const { getData } = useAPI()
    const [statistics, setStatisticsStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/statistics', setStatisticsStats, setLoading, setError)
    }, [])

    const ticketVolumeTrends = [
        {
            name: 'January',
            Created: 5375,
            Resolved: 5443,
            Failed: 1234
        },
        {
            name: 'February',
            Created: 3577,
            Resolved: 5643,
            Failed: 2573
        },
        {
            name: 'March',
            Created: 4854,
            Resolved: 2514,
            Failed: 3625
        },
        {
            name: 'April',
            Created: 5274,
            Resolved: 1885,
            Failed: 1747
        },
        {
            name: 'May',
            Created: 2838,
            Resolved: 2738,
            Failed: 3747
        }
    ]

    const ticketsByPriority = [
        {
            name: 'Low',
            tickets: 4000
        },
        {
            name: 'Medium',
            tickets: 3000
        },
        {
            name: 'High',
            tickets: 2000
        },
        {
            name: 'Urgent',
            tickets: 2780
        }
    ]

    console.log(statistics)

    return (
        <>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="overview">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                    My Overview
                </div>
                <div className="row card-body">
                    <div className="col-xl-12 m-0 p-4">
                        <div className="row bg-light-subtle border m-0 p-3 rounded-4 shadow">
                            <div className="col-xl-3 d-flex flex-column p-3 my-auto">
                                <h2>
                                    My Tickets
                                    <i className="text-success bi bi-ticket-detailed-fill ms-2"></i>
                                </h2>
                                <div>Stay updated on your ticket progress in real time.</div>
                            </div>
                            <StatisticsCard
                                title="Open Tickets"
                                value={statistics.current?.myOpenTickets}
                                delta={statistics.delta?.myOpenTicketsDelta}
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                                col={3}
                            />
                            <StatisticsCard
                                title="In Progress Tickets"
                                value={statistics.current?.myInProgressTickets}
                                delta={statistics.delta?.myInProgressTicketsDelta}
                                iconClass="bi-hourglass-split"
                                loading={loading}
                                col={3}
                            />
                            <StatisticsCard
                                title="Overdue Tickets"
                                value={statistics.current?.myOverdueTickets}
                                delta={statistics.delta?.myOverdueTicketsDelta}
                                iconClass="bi-exclamation-triangle-fill"
                                loading={loading}
                                reverseDelta={true}
                                col={3}
                            />

                            <hr className="mt-3" />
                            <div className="col-xl-3 d-flex flex-column p-3 my-auto">
                                <h2>
                                    My Performance <i className="text-warning bi bi-stars ms-2"></i>
                                </h2>
                                <div>Monitor your achievements and improve continuously.</div>
                            </div>
                            <StatisticsCard
                                title="Closed Tickets"
                                value={statistics.current?.myClosedTickets}
                                delta={statistics.delta?.myClosedTicketsDelta}
                                iconClass="bi-check-circle-fill"
                                loading={loading}
                                col={3}
                            />
                            <StatisticsCard
                                title="SLA Compliance"
                                value={statistics.current?.mySlaCompliance}
                                delta={statistics.delta?.mySlaComplianceDelta}
                                iconClass="bi-shield-check"
                                unit="%"
                                loading={loading}
                                col={2}
                            />
                            <StatisticsCard
                                title="Resolution Time"
                                value={statistics.current?.myResolutionTime}
                                delta={statistics.delta?.myResolutionTimeDelta}
                                iconClass="bi-lightning-fill"
                                loading={loading}
                                isTime={true}
                                reverseDelta={true}
                                col={2}
                            />
                            <StatisticsCard
                                title="Failed Tickets"
                                value={statistics.current?.myFailedTickets}
                                delta={statistics.delta?.myFailedTicketsDelta}
                                iconClass="bi-x-circle-fill"
                                loading={loading}
                                reverseDelta={true}
                                col={2}
                            />

                            <hr className="mt-3" />
                            <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Ticket Trends Over Time
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
                                        Department-Wise Resolution Time
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !statistics?.teamDepartmentTimes?.some(
                                              (e) =>
                                                  e.current_resolution_time > 0 &&
                                                  e.previous_resolution_time
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
                </div>
            </div>
        </>
    )
}
export default MyOverview
