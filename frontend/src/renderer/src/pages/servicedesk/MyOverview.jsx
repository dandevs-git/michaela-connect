import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'

function MyOverview() {
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

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    My Overview
                </div>
                <div className="card-body">
                    <div className="col-xl-12 p-4">
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
                                    <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                        <p className="card-text display-3 m-0 fw-bold">15</p>
                                        <span className="text-success fs-5 fw-bold">
                                            <i className="bi bi-arrow-up-short"></i>10
                                            <i className="bi bi-ticket-perforated ms-2"></i>
                                        </span>
                                        <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                            vs previews 30 days
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 p-3">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fw-semibold">
                                        In Progress Tickets
                                    </div>
                                    <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                        <p className="card-text display-3 m-0 fw-bold">10</p>
                                        <span className="text-danger fs-5 fw-bold">
                                            <i className="bi bi-arrow-down-short"></i>1
                                            <i className="bi bi-hourglass-split ms-2"></i>
                                        </span>
                                        <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                            vs previews 30 days
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 p-3">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fw-semibold">
                                        Overdue Tickets
                                    </div>
                                    <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                        <p className="card-text display-3 m-0 fw-bold">2</p>
                                        <span className="text-success fs-5 fw-bold">
                                            <i className="bi bi-arrow-down-short"></i>1
                                            <i className="bi bi-exclamation-triangle-fill ms-2"></i>
                                        </span>
                                        <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                            vs previews 30 days
                                        </span>
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
                                    <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                        <p className="card-text display-3 m-0 fw-bold">45</p>
                                        <span className="text-success fs-5 fw-bold">
                                            <i className="bi bi-arrow-up-short"></i>23
                                            <i className="bi bi-check-circle-fill ms-2"></i>
                                        </span>
                                        <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                            vs previews 30 days
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 p-3">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fw-semibold">
                                        Success Rate
                                    </div>
                                    <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                        <p className="card-text display-3 m-0 fw-bold">
                                            90<span className="fs-5">%</span>
                                        </p>
                                        <span className="text-danger fs-5 fw-bold">
                                            <i className="bi bi-arrow-down-short"></i>2%
                                            <i className="bi bi-graph-up-arrow ms-2"></i>
                                        </span>
                                        <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                            vs previews 30 days
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 p-3">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fw-semibold">
                                        Resolution Time
                                    </div>
                                    <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                        <p className="card-text display-3 m-0 fw-bold">
                                            32<span className="fs-5">mins</span>
                                        </p>
                                        <span className="text-success fs-5 fw-bold">
                                            <i className="bi bi-arrow-down-short"></i>10 mins
                                            <i className="bi bi-lightning-fill ms-2"></i>
                                        </span>
                                        <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                            vs previews 30 days
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 p-3">
                                <div className="card h-100 rounded-4 shadow text-center mb-3">
                                    <div className="card-header text-uppercase fw-semibold">
                                        Failed Tickets
                                    </div>
                                    <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                        <p className="card-text display-3 m-0 fw-bold">5</p>
                                        <span className="text-success fs-5 fw-bold">
                                            <i className="bi bi-arrow-down-short"></i>10
                                            <i className="bi bi-x-circle-fill ms-2"></i>
                                        </span>
                                        <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                            vs previews 30 days
                                        </span>
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
                                            datakey={'tickets'}
                                            display={'Priority Levels'}
                                        />
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
