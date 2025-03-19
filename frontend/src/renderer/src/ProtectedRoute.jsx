import { Navigate } from 'react-router-dom'

function ProtectedRoute({ role, children }) {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role')

    if (!token || (role && userRole !== role)) {
        return <Navigate to="/login" />
    }

    return children
}
export default ProtectedRoute
