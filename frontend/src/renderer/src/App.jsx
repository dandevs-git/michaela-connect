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

import ServicedeskReports from './pages/servicedesk/Reports'
import UnassignedTickets from './pages/servicedesk/tickets/UnassignedTickets'
import OpenTickets from './pages/servicedesk/tickets/OpenTickets'
import InProgressTickets from './pages/servicedesk/tickets/InProgressTickets'
import ClosedTickets from './pages/servicedesk/tickets/ClosedTickets'
import FailedTickets from './pages/servicedesk/tickets/FailedTickets'
import AllTickets from './pages/servicedesk/tickets/AllTickets'
import ServiceDeskOverviewLayout from './layouts/ServiceDeskOverviewLayout'
import ServiceDeskTicketLayout from './layouts/ServiceDeskTicketLayout'
import Employees from './pages/Employees'

import Overview from './pages/dashboard/Overview'
import Activities from './pages/dashboard/Activities'
import Reports from './pages/dashboard/Reports'

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
                    <Route path="/servicedesk/overview" element={<ServiceDeskOverviewLayout />} />
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
                    <Route path="/servicedesk/reports" element={<ServicedeskReports />} />
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
