import { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { AuthContext } from '../context/authContextValue';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  // 1. Not logged in -> go to the login portal.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in but lacking the role -> show a clear message (no silent bounce).
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f8f4] dark:bg-zinc-950 px-4">
        <div className="max-w-md text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-8 shadow-sm">
          <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Access Restricted</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            This area is limited to <span className="font-mono">{allowedRoles.join(', ')}</span> roles.
            You are signed in as <span className="font-mono capitalize">{user.role}</span>.
          </p>
          <Link
            to="/"
            className="inline-block mt-5 text-xs font-mono uppercase tracking-wider bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-3 rounded-xl"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // 3. Authorized.
  return children;
}
