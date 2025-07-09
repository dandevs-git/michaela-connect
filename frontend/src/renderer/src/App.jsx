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
import SystemFeedback from './pages/system_admin/SystemFeedback'
import TeamSla from './pages/dashboard/TeamSla'
import TeamPerformance from './pages/dashboard/TeamPerformance'
import TelephoneDirectory from './pages/directory/TelephoneDirectory'
import BranchLocations from './pages/directory/BranchLocations'
import StaffExtensions from './pages/directory/StaffExtensions'
import AccountsDirectory from './pages/directory/AccountsDirectory'
import SystemAccounts from './pages/it_directory/SystemAccounts'
import NetworkDevices from './pages/it_directory/NetworkDevices'
import SharedDrives from './pages/it_directory/SharedDrives'
import IntegrationSettings from './pages/system_admin/IntegrationSettings'
import SecurityCompliance from './pages/system_admin/SecurityCompliance'
import UpdatesBackup from './pages/system_admin/UpdatesBackup'
import MaintenanceMode from './pages/system_admin/MaintenanceMode'
import AuditLogs from './pages/system_admin/AuditLogs'
import UserAccessControl from './pages/system_admin/UserAccessControl'
import SystemOverview from './pages/system_admin/SystemOverview'
import DepartmentSettings from './pages/system_settings/DepartmentSettings'
import EmailNotifications from './pages/system_settings/EmailNotifications'
import SecurityAuthentication from './pages/system_settings/SecurityAuthentication'
import GeneralSettings from './pages/system_settings/GeneralSettings'
import EmployeeSatisfaction from './pages/reports/EmployeeSatisfaction'
import MonthlyTrends from './pages/reports/MonthlyTrends'
import DepartmentMetrics from './pages/reports/DepartmentMetrics'
import SlaInsights from './pages/reports/slaInsights'
import MaintenancePage from './pages/MaintenancePage'

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

    // useEffect(() => {
    //     AOS.init({ duration: 1000 })
    // }, [])

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
                    {/* <Route path="performance" element={<TeamPerformance />} /> */}
                    <Route
                        path="performance"
                        element={<MaintenancePage titlePage={'Performance Summary'} />}
                    />
                    {/* <Route path="sla" element={<TeamSla />} /> */}
                    <Route path="sla" element={<MaintenancePage titlePage={'SLA Compliance'} />} />
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
                    {/* <Route path="branches" element={<BranchLocations />} /> */}
                    <Route
                        path="branches"
                        element={<MaintenancePage titlePage={'Branch Locations'} />}
                    />
                    {/* <Route path="staff" element={<StaffExtensions />} /> */}
                    <Route
                        path="staff"
                        element={<MaintenancePage titlePage={'Staff Extensions'} />}
                    />
                    {/* <Route path="accounts" element={<AccountsDirectory />} /> */}
                    <Route
                        path="accounts"
                        element={<MaintenancePage titlePage={'Accounts Directory'} />}
                    />
                </Route>

                <Route path="/it-directory">
                    <Route index element={<Navigate to="telephones" replace />} />
                    <Route path="telephones" element={<TelephoneLines />} />
                    <Route path="internet" element={<InternetLines />} />
                    <Route path="ip-addresses" element={<IpAddresses />} />
                    <Route path="anydesk-ids" element={<AnydeskIds />} />
                    <Route path="printers" element={<Printers />} />
                    {/* <Route path="accounts" element={<SystemAccounts />} /> */}
                    <Route path="accounts" element={<MaintenancePage titlePage={'Accounts'} />} />
                    {/* <Route path="drives" element={<SharedDrives />} /> */}
                    <Route
                        path="drives"
                        element={<MaintenancePage titlePage={'Shared Drives'} />}
                    />
                    {/* <Route path="network" element={<NetworkDevices />} /> */}
                    <Route
                        path="network"
                        element={<MaintenancePage titlePage={'Network Devices'} />}
                    />
                </Route>

                <Route path="/reports">
                    <Route index element={<Navigate to="analytics" replace />} />
                    <Route path="analytics" element={<TicketAnalytics />} />
                    <Route path="performance" element={<PerformanceTracking />} />
                    {/* <Route path="sla-insights" element={<SlaInsights />} /> */}
                    <Route
                        path="sla-insights"
                        element={<MaintenancePage titlePage={'SLA Insights'} />}
                    />
                    {/* <Route path="department-metrics" element={<DepartmentMetrics />} /> */}
                    <Route
                        path="department-metrics"
                        element={<MaintenancePage titlePage={'Department Metrics'} />}
                    />
                    {/* <Route path="monthly-trends" element={<MonthlyTrends />} /> */}
                    <Route
                        path="monthly-trends"
                        element={<MaintenancePage titlePage={'Monthly Trends'} />}
                    />
                    {/* <Route path="employee-satisfaction" element={<EmployeeSatisfaction />} /> */}
                    <Route
                        path="employee-satisfaction"
                        element={<MaintenancePage titlePage={'Employee Satisfaction'} />}
                    />
                </Route>

                <Route path="/system-settings">
                    <Route index element={<Navigate to="general" replace />} />
                    {/* <Route path="general" element={<GeneralSettings />} /> */}
                    <Route
                        path="general"
                        element={<MaintenancePage titlePage={'General Settings'} />}
                    />
                    {/* <Route path="security-authentication" element={<SecurityAuthentication />} /> */}
                    <Route
                        path="security-authentication"
                        element={<MaintenancePage titlePage={'Security & Authentication'} />}
                    />
                    {/* <Route path="email-notification" element={<EmailNotifications />} /> */}
                    <Route
                        path="email-notification"
                        element={<MaintenancePage titlePage={'Email Notifications'} />}
                    />
                    {/* <Route path="department" element={<DepartmentSettings />} /> */}
                    <Route
                        path="department"
                        element={<MaintenancePage titlePage={'Department Settings'} />}
                    />
                </Route>

                <Route path="/system-administration">
                    <Route index element={<Navigate to="system-overview" replace />} />
                    {/* <Route path="system-overview" element={<SystemOverview />} /> */}
                    <Route
                        path="system-overview"
                        element={<MaintenancePage titlePage={'System Overview'} />}
                    />
                    {/* <Route path="user-access-control" element={<UserAccessControl />} /> */}
                    <Route
                        path="user-access-control"
                        element={<MaintenancePage titlePage={'User Access Control'} />}
                    />
                    {/* <Route path="audit-logs" element={<AuditLogs />} /> */}
                    <Route
                        path="audit-logs"
                        element={<MaintenancePage titlePage={'Audi Logs'} />}
                    />
                    {/* <Route path="maintenance-mode" element={<MaintenanceMode />} /> */}
                    <Route
                        path="maintenance-mode"
                        element={<MaintenancePage titlePage={'MaintenanceMode'} />}
                    />
                    {/* <Route path="updates-backups" element={<UpdatesBackup />} /> */}
                    <Route
                        path="updates-backups"
                        element={<MaintenancePage titlePage={'Updates & Backup'} />}
                    />
                    {/* <Route path="security-compliance" element={<SecurityCompliance />} /> */}
                    <Route
                        path="security-compliance"
                        element={<MaintenancePage titlePage={'Security & Compliance'} />}
                    />
                    {/* <Route path="integration-settings" element={<IntegrationSettings />} /> */}
                    <Route
                        path="integration-settings"
                        element={<MaintenancePage titlePage={'Integration Settings'} />}
                    />
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
