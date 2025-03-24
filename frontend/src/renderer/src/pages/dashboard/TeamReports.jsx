import CustomTable from '../../components/tables/CustomTable'

function TeamReports() {
    const columnsEmployeesPerformance = [
        {
            header: '👤 Employee',
            accessorKey: 'employee'
        },
        {
            header: '🎟️ Tickets Resolved',
            accessorKey: 'ticketsResolved'
        },
        {
            header: '⏳ Avg. Response Time',
            accessorKey: 'avgResponseTime'
        },
        {
            header: '🏆 SLA Compliance',
            accessorKey: 'slaCompliance'
        },
        {
            header: '🔥 Escalations',
            accessorKey: 'escalations'
        },
        {
            header: '📊 Performance Score',
            accessorKey: 'performanceScore'
        }
    ]

    const dataEmployeesPerformance = [
        {
            employee: 'John Doe',
            ticketsResolved: 42,
            avgResponseTime: '1h 10m',
            slaCompliance: '95% ✅',
            escalations: 1,
            performanceScore: '⭐⭐⭐⭐☆ (4.5/5)'
        },
        {
            employee: 'Jane Smith',
            ticketsResolved: 38,
            avgResponseTime: '1h 30m',
            slaCompliance: '90% ✅',
            escalations: 2,
            performanceScore: '⭐⭐⭐⭐☆ (4.3/5)'
        },
        {
            employee: 'Mark Lee',
            ticketsResolved: 45,
            avgResponseTime: '2h 05m',
            slaCompliance: '85% ⚠️',
            escalations: 4,
            performanceScore: '⭐⭐⭐☆ (3.8/5)'
        },
        {
            employee: 'Sarah Kim',
            ticketsResolved: 50,
            avgResponseTime: '1h 20m',
            slaCompliance: '98% ✅',
            escalations: 0,
            performanceScore: '⭐⭐⭐⭐⭐ (5/5)'
        },
        {
            employee: 'David Brown',
            ticketsResolved: 30,
            avgResponseTime: '2h 45m',
            slaCompliance: '80% ⚠️',
            escalations: 3,
            performanceScore: '⭐⭐⭐☆ (3.6/5)'
        },
        {
            employee: 'Emily White',
            ticketsResolved: 55,
            avgResponseTime: '50m',
            slaCompliance: '99% ✅',
            escalations: 0,
            performanceScore: '⭐⭐⭐⭐⭐ (5/5)'
        }
    ]

    return (
        <>
            <div className="col-12 p-4">
                <div className="row">
                    <h4 className="text-start fw-semibold">Weekly Performance Report</h4>
                    <div className="col-xl-3 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Total Tickets Closed
                            </div>
                            <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                <p className="card-text display-3 m-0 fw-bold">3</p>
                                <span className="text-success fs-5 fw-bold">
                                    <i className="bi bi-arrow-up-short"></i>5
                                    <i className="bi bi-ticket-perforated ms-2"></i>
                                </span>
                                <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                    vs previews 7 days
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Avg. Resolution Time
                            </div>
                            <div className="d-flex flex-column card-body align-items-center justify-content-center">
                                <p className="card-text display-3 m-0 fw-bold">10</p>
                                <span className="text-danger fs-5 fw-bold">
                                    <i className="bi bi-arrow-down-short"></i>2
                                    <i className="bi bi-clipboard-check ms-2"></i>
                                </span>
                                <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                    vs previews 7 days
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 p-3">
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
                                    <i className="bi bi-check2-circle ms-2"></i>
                                </span>
                                <span style={{ fontSize: '0.8rem' }} className="text-muted">
                                    vs previews 7 days
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 p-3">
                        <div className="card h-100 rounded-4 shadow text-center mb-3">
                            <div className="card-header text-uppercase fw-semibold">
                                Employee Satisfaction
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
                                    vs previews 7 days
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 p-3">
                        <h4 className="text-start fw-semibold">Weekly Employee’s Performance</h4>
                        <CustomTable
                            columns={columnsEmployeesPerformance}
                            data={dataEmployeesPerformance}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeamReports
