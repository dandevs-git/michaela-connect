import { Routes, Route, Navigate } from 'react-router-dom'
import { useAPI } from './contexts/APIContext'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

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
import Department from './pages/it_directory/Department'
import TelephoneLines from './pages/it_directory/TelephoneLines'
import IpAddresses from './pages/it_directory/IpAddresses'
import AnydeskIds from './pages/it_directory/AnydeskIds'
import Printers from './pages/it_directory/Printers'
import InternetLines from './pages/it_directory/InternetLines'
import NewTickets from './pages/servicedesk/mytickets/NewTickets'
import TeamOverview from './pages/dashboard/TeamOverview'
import TeamActivities from './pages/dashboard/TeamActivities'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import TelephoneList from './pages/directory/TelephoneDirectory'
import PerformanceTracking from './pages/reports/PerformanceTracking'
import TicketAnalytics from './pages/reports/TicketAnalytics'
import SystemFeedback from './pages/reports/SystemFeedback'
import TeamSla from './pages/dashboard/TeamSla'
import TeamPerformance from './pages/dashboard/TeamPerformance'
import TelephoneDirectory from './pages/directory/TelephoneDirectory'
import BranchLocations from './pages/directory/BranchLocations'
import StaffExtensions from './pages/directory/StaffExtensions'
import AccountsDirectory from './pages/directory/AccountsDirectory'
import SystemAccounts from './pages/it_directory/SystemAccounts'
import NetworkDevices from './pages/it_directory/NetworkDevices'
import SharedDrives from './pages/it_directory/SharedDrives'

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

    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

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
                    <Route path="performance" element={<TeamPerformance />} />
                    <Route path="sla" element={<TeamSla />} />
                </Route>

                <Route path="/service-desk">
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
                    <Route path="activity-logs" element={<ActivityLog />} />
                </Route>

                <Route path="/directory">
                    <Route index element={<Navigate to="telephones" replace />} />
                    <Route path="telephones" element={<TelephoneDirectory />} />
                    <Route path="branches" element={<BranchLocations />} />
                    <Route path="staff" element={<StaffExtensions />} />
                    <Route path="accounts" element={<AccountsDirectory />} />
                </Route>

                <Route path="/it-directory">
                    <Route index element={<Navigate to="telephones" replace />} />
                    <Route path="telephones" element={<TelephoneLines />} />
                    <Route path="internet" element={<InternetLines />} />
                    <Route path="ip-addresses" element={<IpAddresses />} />
                    <Route path="anydesk-ids" element={<AnydeskIds />} />
                    <Route path="printers" element={<Printers />} />
                    <Route path="accounts" element={<SystemAccounts />} />
                    <Route path="drives" element={<SharedDrives />} />
                    <Route path="network" element={<NetworkDevices />} />
                </Route>

                <Route path="/reports">
                    <Route index element={<Navigate to="analytics" replace />} />
                    <Route path="analytics" element={<TicketAnalytics />} />
                    <Route path="performance" element={<PerformanceTracking />} />
                    <Route path="sla-insights" element={<PerformanceTracking />} />
                    <Route path="department-metrics" element={<PerformanceTracking />} />
                    <Route path="monthly-trends" element={<PerformanceTracking />} />
                    <Route path="employee-satisfaction" element={<PerformanceTracking />} />
                </Route>

                <Route path="/system-settings">
                    <Route index element={<Navigate to="general" replace />} />
                    <Route path="general" element={<TelephoneList />} />
                    <Route path="security-authentication" element={<TelephoneList />} />
                    <Route path="email-notification" element={<TelephoneList />} />
                    <Route path="department" element={<TelephoneList />} />
                </Route>

                <Route path="/system-administration">
                    <Route index element={<Navigate to="feedback" replace />} />
                    <Route path="system-overview" element={<SystemFeedback />} />
                    <Route path="user-access-control" element={<SystemFeedback />} />
                    <Route path="audit-logs" element={<SystemFeedback />} />
                    <Route path="maintenance-mode" element={<SystemFeedback />} />
                    <Route path="updates-backups" element={<SystemFeedback />} />
                    <Route path="security-compliance" element={<SystemFeedback />} />
                    <Route path="integration-settings" element={<SystemFeedback />} />
                    <Route path="system-feedback" element={<SystemFeedback />} />
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
