import CustomBarChart from '../../../components/charts/CustomBarChart'
import CustomLineChart from '../../../components/charts/CustomLineChart'

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
                <div className="rounded-4 border shadow row m-0 p-3 bg-light-subtle">
                    <div className="col-xl-3 p-3 d-flex flex-column my-auto">
                        <h2>
                            My Tickets
                            <i className="bi bi-ticket-detailed-fill ms-2 text-success"></i>
                        </h2>
                        <div>Stay updated on your ticket progress in real time.</div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold">
                                Open Tickets
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p className="card-text display-6 fw-bold p-0 m-0">10</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold">
                                Pending Tickets
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p className="card-text display-6 fw-bold p-0 m-0">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold">
                                Overdue Tickets
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p className="card-text display-6 fw-bold p-0 m-0">3</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="col-xl-3 p-3 d-flex flex-column my-auto">
                        <h2>
                            My Performance <i className="bi bi-stars text-warning ms-2"></i>
                        </h2>
                        <div>Monitor your achievements and improve continuously.</div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold">
                                Closed Tickets
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p className="card-text display-6 fw-bold p-0 m-0">10</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 p-3">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold">
                                Success Rate
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p className="card-text display-6 fw-bold p-0 m-0">30.00%</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 p-3">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold">
                                Resolution Time
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p className="card-text display-6 fw-bold p-0 m-0">30</p>
                                <span className="fs-5 ms-2">mins</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 p-3">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold">
                                Reopened Tickets
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p className="card-text display-6 fw-bold p-0 m-0">3</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="col-xl-6 p-4">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold fs-3">
                                Ticket Volume Trends
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <CustomLineChart data={ticketVolumeTrends} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 p-4">
                        <div className="card shadow rounded-4 mb-3 text-center h-100">
                            <div className="card-header text-uppercase fw-semibold fs-3">
                                Tickets by Priority
                            </div>
                            <div className="card-body d-flex justify-content-center align-items-center">
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
