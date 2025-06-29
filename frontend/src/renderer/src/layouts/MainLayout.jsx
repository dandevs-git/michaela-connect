import { Outlet } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
import SideNavigation from '../components/SideNavigation'
import Chat from '../components/Chat'
import Feedback from '../components/Feedback'

function MainLayout() {
    return (
        <>
            <div className="d-flex bg-dark-subtle">
                <SideNavigation />
                <div className="w-100">
                    <TopNavigation />
                    <div
                        // data-aos="fade-up"
                        // data-aos-duration="1000"
                        className="p-4 w-100 d-flex flex-column"
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* <Chat /> */}
            <Feedback />
        </>
    )
}

export default MainLayout
