import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomPieChart from '../../components/charts/CustomPieChart'

function Overview() {
    const ticketStatusData = [
        { name: 'Resolved', value: 123 },
        { name: 'Open', value: 300 },
        { name: 'In Progress', value: 300 },
        { name: 'Failed', value: 200 }
    ]

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

    const ticketsByDepartment = [
        {
            name: 'Accounting',
            tickets: 4000
        },
        {
            name: 'Admin',
            tickets: 3000
        },
        {
            name: 'Sales',
            tickets: 2000
        },
        {
            name: 'Warehouse',
            tickets: 2780
        },
        {
            name: 'HRIS',
            tickets: 1890
        },
        {
            name: 'Payroll',
            tickets: 2390
        },
        {
            name: 'Marketing',
            tickets: 3490
        },
        {
            name: 'Electronic Data',
            tickets: 3490
        },
        {
            name: 'Purchasing',
            tickets: 3490
        },
        {
            name: 'MCares',
            tickets: 3490
        }
    ]
    return (
        <>
            <div className="col-xl-8 m-0 p-4">
                <div className="card bg-light-subtle h-100 p-0 rounded-4 shadow text-center mb-3">
                    <div className="card-header">
                        <h2>Welcome to the Dashboard</h2>
                        <div>Here’s an Overview of the latest activity.</div>
                    </div>
                    <div className="d-flex row card-body align-items-center justify-content-center m-0 px-3">
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Total Tickets
                                </div>
                                <div className="d-flex card-body align-items-center justify-content-center position-relative">
                                    <p className="card-text display-3 fw-bold">3</p>
                                    <span className="m-2 position-absolute text-success end-0 fs-5 fw-bold me-3 mt-3 top-0">
                                        +5%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Resolved Tickets
                                </div>
                                <div className="d-flex card-body align-items-center justify-content-center position-relative">
                                    <p className="card-text display-3 fw-bold">10</p>
                                    <span className="m-2 position-absolute text-danger end-0 fs-5 fw-bold me-3 mt-3 top-0">
                                        -8%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    SLA Compliance
                                </div>
                                <div className="d-flex card-body align-items-center justify-content-center position-relative">
                                    <p className="card-text display-3 fw-bold">
                                        98<span className="fs-5">%</span>
                                    </p>
                                    <span className="m-2 position-absolute text-danger end-0 fs-5 fw-bold me-3 mt-3 top-0">
                                        -8%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Avg Resolution Time
                                </div>
                                <div className="d-flex card-body align-items-center justify-content-center position-relative">
                                    <p className="card-text display-3 m-0 p-0 fw-bold">
                                        30<span className="fs-5">mins</span>
                                    </p>
                                    <span className="m-2 position-absolute text-success end-0 fs-5 fw-bold me-3 mt-3 top-0">
                                        -8%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Avg Response Rate
                                </div>
                                <div className="d-flex card-body align-items-center justify-content-center position-relative">
                                    <p className="card-text display-3 m-0 p-0 fw-bold">
                                        10<span className="fs-5">mins</span>
                                    </p>
                                    <span className="m-2 position-absolute text-success end-0 fs-5 fw-bold me-3 mt-3 top-0">
                                        -8%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Pending Approvals
                                </div>
                                <div className="d-flex card-body align-items-center justify-content-center position-relative">
                                    <p className="card-text display-3 fw-bold">5</p>
                                    <span className="m-2 position-absolute text-success end-0 fs-5 fw-bold me-3 mt-3 top-0">
                                        -10%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 p-4">
                <div className="card h-100 rounded-4 shadow text-center mb-3">
                    <div className="card-header text-uppercase fs-3 fw-semibold">
                        Ticket Status Data
                    </div>
                    <div className="d-flex card-body align-items-center justify-content-center">
                        <CustomPieChart data={ticketStatusData} />
                    </div>
                </div>
            </div>
            <div className="col-xl-6 p-4">
                <div className="card h-100 rounded-4 shadow text-center mb-3">
                    <div className="card-header text-uppercase fs-3 fw-semibold">
                        Ticket Trends Over Time
                    </div>
                    <div className="d-flex card-body align-items-center justify-content-center">
                        <CustomLineChart data={ticketVolumeTrends} />
                    </div>
                </div>
            </div>
            <div className="col-xl-6 p-4">
                <div className="card h-100 rounded-4 shadow text-center mb-3">
                    <div className="card-header text-uppercase fs-3 fw-semibold">
                        Department-Wise Resolution Time
                    </div>
                    <div className="d-flex card-body align-items-center justify-content-center">
                        <CustomBarChart
                            data={ticketsByDepartment}
                            datakey={'tickets'}
                            display={'Avarage Resolution Time'}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Overview
