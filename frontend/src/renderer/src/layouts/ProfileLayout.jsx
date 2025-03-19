import { Outlet, Link } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'

function ProfileLayout() {
    return (
        <>
            <TopNavigation />
            <div className="d-flex">
                <div className="p-4 mt-5">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default ProfileLayout
