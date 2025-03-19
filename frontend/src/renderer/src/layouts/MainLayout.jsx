import { Outlet } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
import SideNavigation from '../components/SideNavigation'
import Chat from '../components/Chat'

function DashboardLayout() {
    return (
        <>
            <div className="d-flex bg-dark-subtle">
                <SideNavigation />
                <div className="w-100">
                    <TopNavigation />
                    <div className="p-4 mt-5 w-100">
                        <div className="shadow border rounded-4 mb-3 p-4 bg-light-subtle">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Chat />
        </>
    )
}

export default DashboardLayout
