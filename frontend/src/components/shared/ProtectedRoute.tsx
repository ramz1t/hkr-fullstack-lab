import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'

export default function ProtectedRoute() {
    const { token } = useAuth()
    const location = useLocation()
    if (!token)
        return <Navigate to="/" replace state={{ from: location.pathname }} />
    return <Outlet />
}
