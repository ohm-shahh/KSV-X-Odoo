import React, { useContext, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { vendorsApi, authApi } from '../api';
import { AuthContext } from '../context/authContextValue';
import { formatDate } from '../utils/format';
import { Search, Plus, X, Loader2 } from 'lucide-react';

const EMPTY_FORM = {
  company_name: '',
  gstin: '',
  category: '',
  contact_details: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

export default function Vendors() {
  const { user } = useContext(AuthContext);
  const canCreate = user && ['admin', 'officer'].includes(user.role);

  const { data, loading, error, reload } = useFetch(() => vendorsApi.list(), []);
  const vendors = data || [];

  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vendors;
    return vendors.filter((v) =>
      [v.company_name, v.gstin, v.category, v.contact_details]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [vendors, query]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Vendors</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">Manage supplier profiles and registrations</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-500" /> Add Vendor
          </button>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-4 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, gstin, or category..."
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors shadow-xs"
        />
      </div>

      <DataState loading={loading} error={error} onRetry={reload} empty={vendors.length === 0}>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-[11px] uppercase font-mono tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-zinc-900/40">
                <th className="py-4 px-6 font-semibold">Company</th>
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold">GSTIN</th>
                <th className="py-4 px-6 font-semibold">Contact</th>
                <th className="py-4 px-6 font-semibold text-center">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/30 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              {filtered.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors bg-white dark:bg-zinc-900">
                  <td className="py-4 px-6 font-sans font-bold text-zinc-950 dark:text-zinc-100 text-sm">{vendor.company_name}</td>
                  <td className="py-4 px-6 text-zinc-800 dark:text-zinc-400 font-medium">{vendor.category}</td>
                  <td className="py-4 px-6 text-zinc-800 dark:text-zinc-400 font-medium">{vendor.gstin}</td>
                  <td className="py-4 px-6 text-zinc-800 dark:text-zinc-400 font-sans font-medium max-w-xs truncate">{vendor.contact_details}</td>
                  <td className="py-4 px-6 text-center text-zinc-500">{formatDate(vendor.created_at)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="5" className="py-10 text-center text-zinc-400 font-mono text-xs">No vendors match "{query}".</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </DataState>

      {modalOpen && (
        <AddVendorModal
          onClose={() => setModalOpen(false)}
          onCreated={() => { setModalOpen(false); reload(); }}
        />
      )}
    </Layout>
  );
}

function AddVendorModal({ onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      // 1. Create the vendor's login account, 2. create the vendor profile.
      const account = await authApi.register({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        role: 'vendor',
      });
      await vendorsApi.create({
        user_id: account.user_id,
        company_name: form.company_name,
        gstin: form.gstin.toUpperCase(),
        category: form.category,
        contact_details: form.contact_details,
      });
      onCreated();
    } catch (err) {
      setError(err.message || 'Could not create vendor');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Register Vendor</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>
          )}

          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Company</p>
          <ModalField label="Company name" value={form.company_name} onChange={update('company_name')} required />
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="GSTIN" value={form.gstin} onChange={update('gstin')} placeholder="27AABCS1429B1Z0" required />
            <ModalField label="Category" value={form.category} onChange={update('category')} placeholder="IT / Furniture" required />
          </div>
          <ModalField label="Contact details" value={form.contact_details} onChange={update('contact_details')} placeholder="Phone / address" required />

          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 pt-2">Login Account</p>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="First name" value={form.first_name} onChange={update('first_name')} required />
            <ModalField label="Last name" value={form.last_name} onChange={update('last_name')} required />
          </div>
          <ModalField label="Email" type="email" value={form.email} onChange={update('email')} required />
          <ModalField label="Password" type="password" value={form.password} onChange={update('password')} required />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider font-mono px-5 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-60"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} Create vendor
            </button>
            <button type="button" onClick={onClose} className="px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalField({ label, type = 'text', value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-600 dark:text-zinc-400 mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50"
      />
    </div>
  );
}
