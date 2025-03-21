import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'

function Overview() {
    const ticketVolumeTrends = [
        {
            name: 'January',
            Created: 5375,
            Resolved: 5443,
            Reopened: 1234
        },
        {
            name: 'February',
            Created: 3577,
            Resolved: 5643,
            Reopened: 2573
        },
        {
            name: 'March',
            Created: 4854,
            Resolved: 2514,
            Reopened: 3625
        },
        {
            name: 'April',
            Created: 5274,
            Resolved: 1885,
            Reopened: 1747
        },
        {
            name: 'May',
            Created: 2838,
            Resolved: 2738,
            Reopened: 3747
        }
    ]

    const ticketsByPriority = [
        {
            name: 'Low',
            PriorityLevel: 4000
        },
        {
            name: 'Medium',
            PriorityLevel: 3000
        },
        {
            name: 'High',
            PriorityLevel: 2000
        },
        {
            name: 'Urgent',
            PriorityLevel: 2780
        }
    ]

    return (
        <>
            <div className="col-xl-12 p-3">
                <div className="row bg-light-subtle border m-0 p-3 rounded-4 shadow">
                    <div className="col-xl-3 d-flex flex-column p-3 my-auto">
                        <h2>
                            My Tickets
                            <i className="text-success bi bi-ticket-detailed-fill ms-2"></i>
                        </h2>
                        <div>Stay updated on your ticket progress in real time.</div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Open Tickets
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <p className="card-text display-6 m-0 p-0 fw-bold">10</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Pending Tickets
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <p className="card-text display-6 m-0 p-0 fw-bold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Overdue Tickets
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <p className="card-text display-6 m-0 p-0 fw-bold">3</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="col-xl-3 d-flex flex-column p-3 my-auto">
                        <h2>
                            My Performance <i className="text-warning bi bi-stars ms-2"></i>
                        </h2>
                        <div>Monitor your achievements and improve continuously.</div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Closed Tickets
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <p className="card-text display-6 m-0 p-0 fw-bold">10</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Success Rate
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <p className="card-text display-6 m-0 p-0 fw-bold">30.00%</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Resolution Time
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <p className="card-text display-6 m-0 p-0 fw-bold">30</p>
                                <span className="fs-5 ms-2">mins</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Reopened Tickets
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <p className="card-text display-6 m-0 p-0 fw-bold">3</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="col-xl-6 p-4">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fs-3 fw-semibold">
                                Ticket Volume Trends
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <CustomLineChart data={ticketVolumeTrends} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 p-4">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fs-3 fw-semibold">
                                Tickets by Priority
                            </div>
                            <div className="d-flex card-body align-items-center justify-content-center">
                                <CustomBarChart
                                    data={ticketsByPriority}
                                    datakey={'PriorityLevel'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Overview
