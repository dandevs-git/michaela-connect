function Overview() {
    return (
        <>
            <div className="m-0 col-xl-8 p-4">
                <div className="card shadow rounded-4 mb-3 text-center h-100 p-0 bg-light-subtle">
                    <div className="card-header">
                        <h2>Welcome to the Dashboard</h2>
                        <div>Here’s an overview of the latest activity.</div>
                    </div>
                    <div className="row card-body d-flex justify-content-center align-items-center px-3 m-0">
                        <div className="col-xl-4 p-3 h-50">
                            <div className="card shadow rounded-4 mb-3 text-center h-100">
                                <div className="card-header text-uppercase fw-semibold">
                                    Overdue Tickets
                                </div>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <p className="card-text display-3 fw-bold">3</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 p-3 h-50">
                            <div className="card shadow rounded-4 mb-3 text-center h-100">
                                <div className="card-header text-uppercase fw-semibold">
                                    Open Tickets
                                </div>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <p className="card-text display-3 fw-bold">10</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 p-3 h-50">
                            <div className="card shadow rounded-4 mb-3 text-center h-100">
                                <div className="card-header text-uppercase fw-semibold">
                                    Resolved Tickets
                                </div>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <p className="card-text display-3 fw-bold">75</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 p-3 h-50">
                            <div className="card shadow rounded-4 mb-3 text-center h-100">
                                <div className="card-header text-uppercase fw-semibold">
                                    Average Resolution Time
                                </div>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <p className="card-text display-3 fw-bold p-0 m-0">30</p>
                                    <span className="fs-5">mins</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 p-3 h-50">
                            <div className="card shadow rounded-4 mb-3 text-center h-100">
                                <div className="card-header text-uppercase fw-semibold">
                                    Tickets Awaiting Approval
                                </div>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <p className="card-text display-3 fw-bold p-0 m-0">10</p>
                                    <span className="fs-5">mins</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 p-3 h-50">
                            <div className="card shadow rounded-4 mb-3 text-center h-100">
                                <div className="card-header text-uppercase fw-semibold">
                                    Reopened Tickets
                                </div>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <p className="card-text display-3 fw-bold">5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Overview
