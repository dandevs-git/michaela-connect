import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAPI } from './contexts/APIContext'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ProfileLayout from './layouts/ProfileLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ServiceDeskLayout from './layouts/ServiceDeskLayout'

import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ErrorPage from './pages/ErrorPage'

import OpenTickets from './pages/servicedesk/mytickets/OpenTickets'
import InProgressTickets from './pages/servicedesk/mytickets/InProgressTickets'
import ClosedTickets from './pages/servicedesk/mytickets/ClosedTickets'
import FailedTickets from './pages/servicedesk/mytickets/FailedTickets'
import AllTickets from './pages/servicedesk/mytickets/AllTickets'
import ServiceDeskTicketLayout from './layouts/ServiceDeskTicketLayout'

import MyOverview from './pages/servicedesk/MyOverview'
import MyReports from './pages/servicedesk/MyReports'
import EmployeeLayout from './layouts/EmployeeLayout'
import AllEmployees from './pages/employees/AllEmployees'
import RolesPermissions from './pages/employees/RolesPermissions'
import ActivityLog from './pages/employees/ActivityLog'
import DirectoryLayout from './layouts/DirectoryLayout'
import Department from './pages/directory/Department'
import TelephoneDirectory from './pages/directory/TelephoneDirectory'
import IpAddressDirectory from './pages/directory/IpAddressDirectory'
import AnydeskDirectory from './pages/directory/AnydeskDirectory'
import PrinterDirectory from './pages/directory/PrinterDirectory'
import InternetDirectory from './pages/directory/InternetDirectory'
import ResolvedTickets from './pages/servicedesk/mytickets/ResolvedTickets'
import PendingTickets from './pages/servicedesk/mytickets/PendingTickets'
import RejectedTickets from './pages/servicedesk/mytickets/RejectedTickets'

const PrivateRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, userRole } = useAPI();

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(userRole)) return <Navigate to="/login" replace />;
    return element;
};

function App() {
    const { isAuthenticated } = useAPI();

    return (
        <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute element={<MainLayout />} allowedRoles={['admin', 'manager', 'staff', 'head']} />}>
                <Route path="/dashboard" element={<DashboardLayout />} />

                <Route path="/servicedesk" element={<ServiceDeskLayout />}>
                    <Route index element={<MyOverview />} />
                    <Route path="tickets" element={<ServiceDeskTicketLayout />}>
                        <Route index element={<AllTickets />} />
                        <Route path="all" element={<AllTickets />} />
                        <Route path="pending" element={<PendingTickets />} />
                        <Route path="closed" element={<ClosedTickets />} />
                        <Route path="open" element={<OpenTickets />} />
                        <Route path="inprogress" element={<InProgressTickets />} />
                        <Route path="resolved" element={<ResolvedTickets />} />
                        <Route path="failed" element={<FailedTickets />} />
                        <Route path="rejected" element={<RejectedTickets />} />
                    </Route>
                    <Route path="reports" element={<MyReports />} />
                </Route>

                <Route path="/employees" element={<EmployeeLayout />}>
                    <Route index element={<AllEmployees />} />
                    <Route path="all" element={<AllEmployees />} />
                    <Route path="departments" element={<Department />} />
                    <Route path="roles" element={<RolesPermissions />} />
                    <Route path="logs" element={<ActivityLog />} />
                </Route>

                <Route path="/directory" element={<DirectoryLayout />}>
                    <Route index element={<Department />} />
                    <Route path="telephones" element={<TelephoneDirectory />} />
                    <Route path="internet" element={<InternetDirectory />} />
                    <Route path="ipaddress" element={<IpAddressDirectory />} />
                    <Route path="anydesks" element={<AnydeskDirectory />} />
                    <Route path="printers" element={<PrinterDirectory />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute element={<ProfileLayout />} allowedRoles={['admin', 'manager', 'staff', 'head']} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/403" element={<ErrorPage errorCode={403} />} />
            <Route path="/404" element={<ErrorPage errorCode={404} />} />
            <Route path="/500" element={<ErrorPage errorCode={500} />} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    );
}

export default App;
