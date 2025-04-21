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
                    <div className="p-4 w-100 d-flex flex-column" style={{ minHeight: '94vh' }}>
                        {/* <div className="bg-light-subtle border p-4 rounded-4 shadow m-0 flex-grow-1"> */}
                        <Outlet />
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <Chat />
        </>
    )
}

export default DashboardLayout
