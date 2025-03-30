import { Routes, Route, Navigate } from 'react-router-dom'
import { useAPI } from './contexts/APIContext'
import { useEffect, useMemo, useState } from 'react'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ProfileLayout from './layouts/ProfileLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ServiceDeskLayout from './layouts/ServiceDeskLayout'
import ServiceDeskTicketLayout from './layouts/ServiceDeskTicketLayout'
import EmployeeLayout from './layouts/EmployeeLayout'
import DirectoryLayout from './layouts/DirectoryLayout'

import Login from './pages/Login'
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

const PrivateRoute = ({ element, allowedRoles }) => {
    const { authenticatedUserDetails } = useAPI()

    const isAuthenticated = useMemo(() => !!authenticatedUserDetails, [authenticatedUserDetails])
    const userRole = authenticatedUserDetails?.role

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/403" replace />
    }

    return element
}

function App() {
    const { authenticatedUserDetails, getAuthenticatedUserDetails } = useAPI()
    const [auth, setAuth] = useState(!!authenticatedUserDetails)

    useEffect(() => {
        getAuthenticatedUserDetails()
    }, [])

    useEffect(() => {
        setAuth(!!authenticatedUserDetails)
    }, [authenticatedUserDetails])

    return (
        <Routes>
            <Route path="/" element={<Navigate to={auth ? '/dashboard' : '/login'} />} />

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
                        <Route index element={<Navigate to="/servicedesk/tickets/all" />} />
                        <Route path="/servicedesk/tickets/all" element={<AllTickets />} />
                        <Route path="/servicedesk/tickets/pending" element={<PendingTickets />} />
                        <Route path="/servicedesk/tickets/closed" element={<ClosedTickets />} />
                        <Route path="/servicedesk/tickets/open" element={<OpenTickets />} />
                        <Route
                            path="/servicedesk/tickets/inprogress"
                            element={<InProgressTickets />}
                        />
                        <Route path="/servicedesk/tickets/resolved" element={<ResolvedTickets />} />
                        <Route path="/servicedesk/tickets/failed" element={<FailedTickets />} />
                        <Route path="/servicedesk/tickets/rejected" element={<RejectedTickets />} />
                        {/* <Route path="/servicedesk/tickets/completed" element={<CompletedTickets />} /> */}
                    </Route>
                    {/* <Route path="/servicedesk/tickets/*" element={<ServiceDeskTicketLayout />} /> */}
                    <Route path="/servicedesk/reports" element={<MyReports />} />
                </Route>
                <Route path="/employees" element={<EmployeeLayout />}>
                    <Route index element={<Navigate to="/employees/all" />} />
                    <Route path="/employees/all" element={<AllEmployees />} />
                    <Route path="/employees/departments" element={<Department />} />
                    <Route path="/employees/roles" element={<RolesPermissions />} />
                    <Route path="/employees/logs" element={<ActivityLog />} />
                </Route>

                <Route path="/directory" element={<DirectoryLayout />}>
                    <Route index element={<Navigate to="/directory/departments" />} />
                    <Route path="/directory/telephones" element={<TelephoneDirectory />} />
                    <Route path="/directory/internet" element={<InternetDirectory />} />
                    <Route path="/directory/ipaddress" element={<IpAddressDirectory />} />
                    <Route path="/directory/anydesks" element={<AnydeskDirectory />} />
                    <Route path="/directory/printers" element={<PrinterDirectory />} />
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
