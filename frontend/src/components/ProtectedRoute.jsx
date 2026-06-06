import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContextValue';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  // 1. If not logged in at all, redirect straight to login portal
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If logged in but does not possess the correct role privileges
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Safely send back to main dashboard
  }

  // 3. Authorized -> Render the requested page component
  return children;
}
