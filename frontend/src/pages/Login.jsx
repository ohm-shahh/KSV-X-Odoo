import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/authContextValue';
import { authApi } from '../api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authApi.login(email.trim(), password);
      login(data.user, data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f8f4] dark:bg-zinc-950 px-4 transition-colors">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-bold tracking-[0.12em] uppercase text-zinc-900 dark:text-white">
            VENDOR<span className="text-emerald-500 font-normal text-xl">/</span>BRIDGE
          </h1>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono mt-1">
            Enterprise Procurement Hub
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-7 shadow-sm space-y-5"
        >
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Sign in</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Access your procurement workspace</p>
          </div>

          {error && (
            <div className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-600 dark:text-zinc-400 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vendorbridge.test"
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-600 dark:text-zinc-400 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs uppercase tracking-wider font-mono py-3.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4 text-emerald-500" />}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-center text-xs text-zinc-400">
            No account?{' '}
            <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </form>

        <p className="mt-5 text-center text-[10px] font-mono text-zinc-400 leading-relaxed">
          Demo: admin@vendorbridge.test / password123
        </p>
      </div>
    </div>
  );
}
