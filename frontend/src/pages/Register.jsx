import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';
import { authApi } from '../api';

const ROLES = [
  { value: 'officer', label: 'Procurement Officer' },
  { value: 'manager', label: 'Approval Manager' },
  { value: 'admin', label: 'Administrator' },
  { value: 'vendor', label: 'Vendor' },
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    role: 'officer',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authApi.register(form);
      setSuccess('Account created. Redirecting to sign in…');
      setTimeout(() => navigate('/login', { replace: true }), 1200);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f8f4] dark:bg-zinc-950 px-4 py-10 transition-colors">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-bold tracking-[0.12em] uppercase text-zinc-900 dark:text-white">
            VENDOR<span className="text-emerald-500 font-normal text-xl">/</span>BRIDGE
          </h1>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono mt-1">
            Create your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-7 shadow-sm space-y-4"
        >
          {error && (
            <div className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {success && (
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-3 py-2">
              {success}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" value={form.first_name} onChange={update('first_name')} required />
            <Field label="Last name" value={form.last_name} onChange={update('last_name')} required />
          </div>

          <Field label="Email" type="email" value={form.email} onChange={update('email')} required />
          <Field label="Password" type="password" value={form.password} onChange={update('password')} required />
          <Field label="Phone (optional)" value={form.phone_number} onChange={update('phone_number')} />

          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-600 dark:text-zinc-400 mb-2">
              Role
            </label>
            <select
              value={form.role}
              onChange={update('role')}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs uppercase tracking-wider font-mono py-3.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4 text-emerald-500" />}
            {loading ? 'Creating…' : 'Create account'}
          </button>

          <p className="text-center text-xs text-zinc-400">
            Already registered?{' '}
            <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-600 dark:text-zinc-400 mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs"
      />
    </div>
  );
}
