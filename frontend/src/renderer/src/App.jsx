import { Routes, Route, Navigate } from 'react-router-dom'
import { useAPI } from './contexts/APIContext'
// import { useEffect } from 'react'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ProfileLayout from './layouts/ProfileLayout'
import ServiceDeskTicketLayout from './layouts/ServiceDeskTicketLayout'

import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ErrorPage from './pages/ErrorPage'

import OpenTickets from './pages/servicedesk/mytickets/OpenTickets'
import InProgressTickets from './pages/servicedesk/mytickets/InProgressTickets'
import ClosedTickets from './pages/servicedesk/mytickets/ClosedTickets'
import FailedTickets from './pages/servicedesk/mytickets/FailedTickets'
import AllTickets from './pages/servicedesk/mytickets/AllTickets'
import ResolvedTickets from './pages/servicedesk/mytickets/ResolvedTickets'
import PendingTickets from './pages/servicedesk/mytickets/PendingTickets'
import RejectedTickets from './pages/servicedesk/mytickets/RejectedTickets'
import MyOverview from './pages/servicedesk/MyOverview'
import MyReports from './pages/servicedesk/MyReports'

import AllEmployees from './pages/employees/AllEmployees'
import RolesPermissions from './pages/employees/RolesPermissions'
import ActivityLog from './pages/employees/ActivityLog'
import Department from './pages/directory/Department'
import TelephoneDirectory from './pages/directory/TelephoneDirectory'
import IpAddressDirectory from './pages/directory/IpAddressDirectory'
import AnydeskDirectory from './pages/directory/AnydeskDirectory'
import PrinterDirectory from './pages/directory/PrinterDirectory'
import InternetDirectory from './pages/directory/InternetDirectory'
import NewTickets from './pages/servicedesk/mytickets/NewTickets'
import TeamOverview from './pages/dashboard/TeamOverview'
import TeamActivities from './pages/dashboard/TeamActivities'
import TeamReports from './pages/dashboard/TeamReports'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import TelephoneList from './pages/directory/TelephoneList'
import PerformanceTracking from './pages/reports/PerformanceTracking'
import TicketAnalytics from './pages/reports/TicketAnalytics'

const PrivateRoute = ({ element, allowedRoles, isAuth, authUser }) => {
    if (!isAuth) {
        return <Navigate to="/login" replace />
    }
    return element
}

function App() {
    const { authUser } = useAPI()
    // const isAuth = !!localStorage.getItem('token')
    const isAuth = !!sessionStorage.getItem('token')

    return (
        <Routes>
            <Route path="/" element={<Navigate to={isAuth ? '/dashboard' : '/login'} />} />

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            <Route
                element={
                    <PrivateRoute element={<MainLayout />} isAuth={isAuth} authUser={authUser} />
                }
            >
                <Route path="/dashboard">
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<TeamOverview />} />
                    <Route path="activities" element={<TeamActivities />} />
                    <Route path="reports" element={<TeamReports />} />
                </Route>

                <Route path="/servicedesk">
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<MyOverview />} />
                    <Route path="reports" element={<MyReports />} />

                    <Route path="tickets" element={<ServiceDeskTicketLayout />}>
                        <Route index element={<Navigate to="all" replace />} />
                        <Route path="all" element={<AllTickets />} />
                        <Route path="pending" element={<PendingTickets />} />
                        <Route path="closed" element={<ClosedTickets />} />
                        <Route path="new" element={<NewTickets />} />
                        <Route path="open" element={<OpenTickets />} />
                        <Route path="inprogress" element={<InProgressTickets />} />
                        <Route path="resolved" element={<ResolvedTickets />} />
                        <Route path="failed" element={<FailedTickets />} />
                        <Route path="rejected" element={<RejectedTickets />} />
                    </Route>
                </Route>

                <Route path="/employees">
                    <Route index element={<Navigate to="all" replace />} />
                    <Route path="all" element={<AllEmployees />} />
                    <Route path="departments" element={<Department />} />
                    <Route path="roles" element={<RolesPermissions />} />
                    <Route path="logs" element={<ActivityLog />} />
                </Route>

                <Route path="/directory">
                    <Route index element={<Navigate to="telephones" replace />} />
                    <Route path="telephoneList" element={<TelephoneList />} />
                </Route>

                <Route path="/itdirectory">
                    <Route index element={<Navigate to="internet" replace />} />
                    <Route path="telephones" element={<TelephoneDirectory />} />
                    <Route path="internet" element={<InternetDirectory />} />
                    <Route path="ipAddress" element={<IpAddressDirectory />} />
                    <Route path="anydesks" element={<AnydeskDirectory />} />
                    <Route path="printers" element={<PrinterDirectory />} />
                </Route>

                <Route path="/reports">
                    <Route index element={<Navigate to="performance" replace />} />
                    <Route path="analytics" element={<TicketAnalytics />} />
                    <Route path="performance" element={<PerformanceTracking />} />
                </Route>

                <Route path="/settings">
                    <Route index element={<Navigate to="telephones" replace />} />
                    <Route path="telephoneList" element={<TelephoneList />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute element={<ProfileLayout />} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/403" element={<ErrorPage errorCode={403} />} />
            <Route path="/404" element={<ErrorPage errorCode={404} />} />
            <Route path="/500" element={<ErrorPage errorCode={500} />} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    )
}

export default App
