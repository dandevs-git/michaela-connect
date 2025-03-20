import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomPieChart from '../../components/charts/CustomPieChart'

function Reports() {
    const ticketStatusData = [
        { name: 'Done', value: 123 },
        { name: 'In Progress', value: 300 },
        { name: 'Pending', value: 300 },
        { name: 'Declined', value: 200 }
    ]

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

    const ticketsByDepartment = [
        {
            name: 'Accounting',
            Tickets: 4000
        },
        {
            name: 'Admin',
            Tickets: 3000
        },
        {
            name: 'Sales',
            Tickets: 2000
        },
        {
            name: 'Warehouse',
            Tickets: 2780
        },
        {
            name: 'HRIS',
            Tickets: 1890
        },
        {
            name: 'Payroll',
            Tickets: 2390
        },
        {
            name: 'Marketing',
            Tickets: 3490
        },
        {
            name: 'Electronic Data',
            Tickets: 3490
        },
        {
            name: 'Purchasing',
            Tickets: 3490
        },
        {
            name: 'MCares',
            Tickets: 3490
        }
    ]

    return (
        <>
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
                        Tickets by Department
                    </div>
                    <div className="d-flex card-body align-items-center justify-content-center">
                        <CustomBarChart data={ticketsByDepartment} datakey={'Tickets'} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Reports
