import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { invoicesApi } from '../api';
import { AuthContext } from '../context/authContextValue';
import { formatDate, titleCase } from '../utils/format';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function Invoices() {
  const { user } = useContext(AuthContext);
  const canMarkPaid = user && ['admin', 'officer'].includes(user.role);

  const { data, loading, error, reload } = useFetch(() => invoicesApi.list(), []);
  const invoices = data || [];

  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState('');

  const markPaid = async (id) => {
    setActionError('');
    setBusyId(id);
    try {
      await invoicesApi.markPaid(id);
      await reload();
    } catch (err) {
      setActionError(err.message || 'Could not update invoice');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Layout>
      <div className="border-b border-zinc-200/60 dark:border-zinc-800/40 pb-4 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Invoices</h2>
        <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Payment requests against purchase orders</p>
      </div>

      {actionError && (
        <div className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3">{actionError}</div>
      )}

      <DataState loading={loading} error={error} onRetry={reload} empty={invoices.length === 0}>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs mt-4">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-zinc-900/40">
                <th className="py-4 px-6 font-semibold">Invoice #</th>
                <th className="py-4 px-6 font-semibold text-center">PO</th>
                <th className="py-4 px-6 font-semibold">Issued</th>
                <th className="py-4 px-6 font-semibold">Due</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/30 text-zinc-700 dark:text-zinc-300">
              {invoices.map((inv) => {
                const paid = inv.payment_status === 'paid';
                return (
                  <tr key={inv.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors bg-white dark:bg-zinc-900">
                    <td className="py-4 px-6 font-semibold text-emerald-600 dark:text-emerald-400">{inv.invoice_number}</td>
                    <td className="py-4 px-6 text-center">#{inv.po_id}</td>
                    <td className="py-4 px-6">{formatDate(inv.invoice_date)}</td>
                    <td className="py-4 px-6">{formatDate(inv.due_date)}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${
                        paid
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20'
                      }`}>
                        {titleCase(inv.payment_status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {!paid && canMarkPaid ? (
                        <button
                          onClick={() => markPaid(inv.id)}
                          disabled={busyId === inv.id}
                          className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px] tracking-wider cursor-pointer hover:underline disabled:opacity-60"
                        >
                          {busyId === inv.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />} Mark Paid
                        </button>
                      ) : (
                        <span className="text-zinc-400 text-[10px]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DataState>
    </Layout>
  );
}
