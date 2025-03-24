import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ProfileLayout from './layouts/ProfileLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ServiceDeskLayout from './layouts/ServiceDeskLayout'

import Login from './pages/Login'
import Directory from './pages/Directory'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

import UnassignedTickets from './pages/servicedesk/mytickets/UnassignedTickets'
import OpenTickets from './pages/servicedesk/mytickets/OpenTickets'
import InProgressTickets from './pages/servicedesk/mytickets/InProgressTickets'
import ClosedTickets from './pages/servicedesk/mytickets/ClosedTickets'
import FailedTickets from './pages/servicedesk/mytickets/FailedTickets'
import AllTickets from './pages/servicedesk/mytickets/AllTickets'
import ServiceDeskTicketLayout from './layouts/ServiceDeskTicketLayout'
import Employees from './pages/Employees'

import MyOverview from './pages/servicedesk/MyOverview'
import MyReports from './pages/servicedesk/MyReports'

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? element : <Navigate to="/login" replace />
}

function App() {
    const { isAuthenticated } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute element={<MainLayout />} />}>
                <Route path="/dashboard">
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path=":section" element={<DashboardLayout />} />
                </Route>

                <Route path="/servicedesk" element={<ServiceDeskLayout />}>
                    <Route index element={<Navigate to="/servicedesk/overview" />} />
                    <Route path="/servicedesk/overview" element={<MyOverview />} />
                    <Route path="/servicedesk/tickets" element={<ServiceDeskTicketLayout />}>
                        <Route index element={<Navigate to="/servicedesk/tickets/unassigned" />} />
                        <Route
                            path="/servicedesk/tickets/unassigned"
                            element={<UnassignedTickets />}
                        />
                        <Route path="/servicedesk/tickets/opentickets" element={<OpenTickets />} />
                        <Route
                            path="/servicedesk/tickets/inprogress"
                            element={<InProgressTickets />}
                        />
                        <Route path="/servicedesk/tickets/closed" element={<ClosedTickets />} />
                        <Route path="/servicedesk/tickets/failed" element={<FailedTickets />} />
                        <Route path="/servicedesk/tickets/all" element={<AllTickets />} />
                    </Route>
                    <Route path="/servicedesk/reports" element={<MyReports />} />
                </Route>
                <Route path="/employees" element={<Employees />} />
                <Route path="/directory" element={<Directory />} />
            </Route>

            <Route element={<PrivateRoute element={<ProfileLayout />} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
