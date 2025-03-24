import { Outlet } from 'react-router-dom'

function ServiceDeskLayout() {
    return (
        <>
            <div className="card shadow text-center w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                    My Tickets
                </div>
                <div className="card-body">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default ServiceDeskLayout
