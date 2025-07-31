import { useEffect, useState } from 'react'
import StatisticsCard from '../../components/cards/StatisticsCard'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import { useAPI } from '../../contexts/APIContext'
import Placeholder from '../../components/placeholders/Placeholder'

function MyOverview() {
    const { getData } = useAPI()
    const [myOverview, setMyOverview] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getData('/my-overview', setMyOverview, setLoading, setError)
    }, [])

    return (
        <>
            <div
                className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4"
                id="overview"
            >
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                    My Overview
                </div>
                <div className="row card-body">
                    <div className="col-xl-12 m-0 p-4">
                        <div className="row bg-light-subtle border m-0 p-3 rounded-4 shadow">
                            <div className="col-xl-12 d-flex flex-column p-3 my-auto">
                                <h2 className="fw-bold mb-0">
                                    My Tickets
                                    <i className="text-success bi bi-ticket-detailed-fill ms-2"></i>
                                </h2>
                                <div>Stay updated on your ticket progress in real time.</div>
                            </div>
                            <StatisticsCard
                                title="Total Tickets Assigned"
                                value={myOverview.current?.myAllTickets}
                                delta={myOverview.delta?.myAllTicketsDelta}
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                                redirectTo="/servicedesk/tickets/all"
                                col={3}
                            />
                            <StatisticsCard
                                title="Open Tickets"
                                value={myOverview.current?.myOpenTickets}
                                delta={myOverview.delta?.myOpenTicketsDelta}
                                iconClass="bi-ticket-perforated"
                                loading={loading}
                                redirectTo="/servicedesk/tickets/open"
                                col={3}
                            />
                            <StatisticsCard
                                title="In Progress Tickets"
                                value={myOverview.current?.myInProgressTickets}
                                delta={myOverview.delta?.myInProgressTicketsDelta}
                                iconClass="bi-hourglass-split"
                                loading={loading}
                                redirectTo="/servicedesk/tickets/inprogress"
                                col={3}
                            />
                            <StatisticsCard
                                title="Overdue Tickets"
                                value={myOverview.current?.myOverdueTickets}
                                delta={myOverview.delta?.myOverdueTicketsDelta}
                                iconClass="bi-exclamation-triangle-fill"
                                loading={loading}
                                reverseDelta={true}
                                col={3}
                            />

                            <hr className="mt-3" />
                            <div className="col-xl-12 d-flex flex-column p-3 my-auto">
                                <h2 className="fw-bold mb-0">
                                    My Performance <i className="text-warning bi bi-stars ms-2"></i>
                                </h2>
                                <div>Monitor your achievements and improve continuously.</div>
                            </div>
                            <StatisticsCard
                                title="Closed Tickets"
                                value={myOverview.current?.myClosedTickets}
                                delta={myOverview.delta?.myClosedTicketsDelta}
                                iconClass="bi-check-circle-fill"
                                loading={loading}
                                col={3}
                            />
                            <StatisticsCard
                                title="SLA Compliance"
                                value={myOverview.current?.mySlaCompliance}
                                delta={myOverview.delta?.mySlaComplianceDelta}
                                iconClass="bi-shield-check"
                                unit="%"
                                loading={loading}
                                col={3}
                            />
                            <StatisticsCard
                                title="Resolution Time"
                                value={myOverview.current?.myResolutionTime}
                                delta={myOverview.delta?.myResolutionTimeDelta}
                                iconClass="bi-lightning-fill"
                                loading={loading}
                                isTime={true}
                                reverseDelta={true}
                                col={3}
                            />
                            <StatisticsCard
                                title="Failed Tickets"
                                value={myOverview.current?.myFailedTickets}
                                delta={myOverview.delta?.myFailedTicketsDelta}
                                iconClass="bi-x-circle-fill"
                                loading={loading}
                                reverseDelta={true}
                                col={3}
                            />

                            <hr className="mt-3" />
                            <div className="col-xl-12 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Ticket Trends Over Time
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="350px" />
                                        ) : !myOverview?.myVolumeTrends?.some(
                                              (e) => e.Created > 0
                                          ) ? (
                                            <div className="text-center text-muted py-4">
                                                <i className="bi bi-info-circle fs-1 mb-2"></i>
                                                <div className="fs-6">No data available</div>
                                            </div>
                                        ) : (
                                            <CustomLineChart
                                                data={myOverview?.myVolumeTrends}
                                                xKey="name"
                                                yKeys={[
                                                    'Resolved',
                                                    'Created',
                                                    'Reopened',
                                                    'Failed'
                                                ]}
                                                hasFilter={true}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-xl-6 p-4">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fs-3 fw-semibold">
                                        Department-Wise Resolution Time
                                    </div>
                                    <div className="d-flex card-body align-items-center justify-content-center">
                                        {loading ? (
                                            <Placeholder height="300px" />
                                        ) : !myOverview?.teamDepartmentTimes?.some(
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
                                                data={myOverview?.teamDepartmentTimes}
                                                datakey="resolution_time"
                                                display="Average Resolution Time"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyOverview
