import PerformanceReports from '../pages/dashboard/PerformanceReports'
import Overview from '../pages/dashboard/Overview'
import RecentActivity from '../pages/dashboard/RecentActivity'

function DashboardLayout() {
    return (
        <>
            <div className="card shadow text-center w-100">
                <div className="card-header text-uppercase fw-semibold fs-3 text-light bg-primary">
                    IT Department
                </div>
                <div className="card-body">
                    <div className="bg-light-subtle border shadow rounded-4 mb-3 text-center h-100 p-0 row mx-2">
                        <Overview />
                        <PerformanceReports />
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout
