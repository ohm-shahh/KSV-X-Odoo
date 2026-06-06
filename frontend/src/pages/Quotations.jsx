import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { quotationsApi } from '../api';
import { inr, formatDate, titleCase } from '../utils/format';
import { ClipboardCheck } from 'lucide-react';

const STATUS_STYLES = {
  approved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/20',
  submitted: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-500/20',
  under_review: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20',
  rejected: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-500/20',
  draft: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-300/40',
};

export default function Quotations() {
  const { data, loading, error, reload } = useFetch(() => quotationsApi.list(), []);
  const quotations = data || [];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Quotations</h2>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">All vendor submissions across RFQs</p>
        </div>
        <Link to="/compare-quotations" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 cursor-pointer">
          <ClipboardCheck className="w-3.5 h-3.5 text-emerald-500" /> Compare
        </Link>
      </div>

      <DataState loading={loading} error={error} onRetry={reload} empty={quotations.length === 0}>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs mt-4">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-zinc-900/40">
                <th className="py-4 px-6 font-semibold">Quotation #</th>
                <th className="py-4 px-6 font-semibold text-center">RFQ</th>
                <th className="py-4 px-6 font-semibold text-center">Delivery</th>
                <th className="py-4 px-6 font-semibold text-right">Subtotal</th>
                <th className="py-4 px-6 font-semibold text-right">Grand Total</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/30 text-zinc-700 dark:text-zinc-300">
              {quotations.map((q) => (
                <tr key={q.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors bg-white dark:bg-zinc-900">
                  <td className="py-4 px-6 font-semibold text-emerald-600 dark:text-emerald-400">{q.quotation_number}</td>
                  <td className="py-4 px-6 text-center">#{q.rfq_id}</td>
                  <td className="py-4 px-6 text-center">{q.delivery_days} days</td>
                  <td className="py-4 px-6 text-right">{inr(q.subtotal)}</td>
                  <td className="py-4 px-6 text-right font-bold text-zinc-900 dark:text-zinc-100">{inr(q.grand_total)}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${STATUS_STYLES[q.status] || STATUS_STYLES.draft}`}>
                      {titleCase(q.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-zinc-500">{formatDate(q.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </Layout>
  );
}
