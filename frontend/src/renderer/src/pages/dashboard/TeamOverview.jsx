import { useEffect, useState } from 'react'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomLineChart from '../../components/charts/CustomLineChart'
import CustomPieChart from '../../components/charts/CustomPieChart'
import { useAPI } from '../../contexts/APIContext'

function TeamOverview() {
    // const ticketStatusData = [
    //     { name: 'Resolved', value: 123 },
    //     { name: 'Open', value: 300 },
    //     { name: 'In Progress', value: 300 },
    //     { name: 'Failed', value: 200 }
    // ]

    // const ticketVolumeTrends = [
    //     {
    //         name: 'January',
    //         Created: 5375,
    //         Resolved: 5443,
    //         Failed: 1234
    //     },
    //     {
    //         name: 'February',
    //         Created: 3577,
    //         Resolved: 5643,
    //         Failed: 2573
    //     },
    //     {
    //         name: 'March',
    //         Created: 4854,
    //         Resolved: 2514,
    //         Failed: 3625
    //     },
    //     {
    //         name: 'April',
    //         Created: 5274,
    //         Resolved: 1885,
    //         Failed: 1747
    //     },
    //     {
    //         name: 'May',
    //         Created: 2838,
    //         Resolved: 2738,
    //         Failed: 3747
    //     }
    // ]

    // const ticketsByDepartment = [
    //     {
    //         name: 'Accounting',
    //         tickets: 4000
    //     },
    //     {
    //         name: 'Admin',
    //         tickets: 3000
    //     },
    //     {
    //         name: 'Sales',
    //         tickets: 2000
    //     },
    //     {
    //         name: 'Warehouse',
    //         tickets: 2780
    //     },
    //     {
    //         name: 'HRIS',
    //         tickets: 1890
    //     },
    //     {
    //         name: 'Payroll',
    //         tickets: 2390
    //     },
    //     {
    //         name: 'Marketing',
    //         tickets: 3490
    //     },
    //     {
    //         name: 'Electronic Data',
    //         tickets: 3490
    //     },
    //     {
    //         name: 'Purchasing',
    //         tickets: 3490
    //     },
    //     {
    //         name: 'MCares',
    //         tickets: 3490
    //     }
    // ]

    const { fetchData } = useAPI()
    const [ticketStatusData, setTicketStatusData] = useState([])
    const [ticketVolumeTrends, setTicketVolumeTrends] = useState([])
    const [ticketsByDepartment, setTicketsByDepartment] = useState([])

    useEffect(() => {
        fetchData('/tickets/status', setTicketStatusData)
        fetchData('/tickets/trends', setTicketVolumeTrends)
        fetchData('/tickets/departments', setTicketsByDepartment)
    }, [])

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
                                <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                    <p className="card-text display-3 m-0 fw-bold">3</p>
                                    <span className="text-success fs-5 fw-bold">
                                        <i className="bi bi-arrow-up-short"></i>5
                                        <i className="bi bi-ticket-perforated ms-2"></i>
                                    </span>
                                    <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                        vs previews 30 days
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Resolved Tickets
                                </div>
                                <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                    <p className="card-text display-3 m-0 fw-bold">10</p>
                                    <span className="text-danger fs-5 fw-bold">
                                        <i className="bi bi-arrow-down-short"></i>2
                                        <i className="bi bi-clipboard-check ms-2"></i>
                                    </span>
                                    <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                        vs previews 30 days
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    SLA Compliance
                                </div>
                                <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                    <p className="card-text display-3 m-0 fw-bold">
                                        98<span className="fs-5">%</span>
                                    </p>
                                    <span className="text-success fs-5 fw-bold">
                                        <i className="bi bi-arrow-up-short"></i>8%
                                        <i className="bi bi-shield-check ms-2"></i>
                                    </span>
                                    <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                        vs previews 30 days
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Avg Resolution Time
                                </div>
                                <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                    <p className="card-text display-3 m-0 fw-bold">
                                        30<span className="fs-5">mins</span>
                                    </p>
                                    <span className="text-danger fs-5 fw-bold">
                                        <i className="bi bi-arrow-up-short"></i>10 mins
                                        <i className="bi bi-lightning-fill ms-2"></i>
                                    </span>
                                    <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                        vs previews 30 days
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Avg Response Time
                                </div>
                                <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                    <p className="card-text display-3 m-0 fw-bold">
                                        10<span className="fs-5">mins</span>
                                    </p>
                                    <span className="text-danger fs-5 fw-bold">
                                        <i className="bi bi-arrow-up-short"></i>17 mins
                                        <i className="bi bi-clock-history ms-2"></i>
                                    </span>
                                    <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                        vs previews 30 days
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 h-50 p-3">
                            <div className="card h-100 rounded-4 shadow text-center mb-3">
                                <div className="card-header text-uppercase fw-semibold">
                                    Pending Approvals
                                </div>
                                <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                    <p className="card-text display-3 m-0 fw-bold">5</p>
                                    <span className="text-success fs-5 fw-bold">
                                        <i className="bi bi-arrow-down-short"></i>10
                                        <i className="bi bi-hourglass-top ms-2"></i>
                                    </span>
                                    <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                        vs previews 30 days
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
export default TeamOverview
