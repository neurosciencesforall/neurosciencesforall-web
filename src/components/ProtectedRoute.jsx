import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Preserve the intended destination so LoginPage can redirect back after sign-in
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}