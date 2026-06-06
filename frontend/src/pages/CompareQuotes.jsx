import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { rfqsApi, quotationsApi } from '../api';
import { inr, titleCase } from '../utils/format';

export default function CompareQuotes() {
  const { data: rfqs, loading: rfqsLoading, error: rfqsError } = useFetch(() => rfqsApi.list(), []);

  const [rfqId, setRfqId] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default to the first RFQ once the list loads.
  useEffect(() => {
    if (!rfqId && rfqs && rfqs.length > 0) setRfqId(String(rfqs[0].id));
  }, [rfqs, rfqId]);

  useEffect(() => {
    if (!rfqId) return;
    let active = true;
    setLoading(true);
    setError('');
    quotationsApi
      .compare(rfqId)
      .then((data) => { if (active) setQuotes(data || []); })
      .catch((err) => { if (active) setError(err.message || 'Failed to load quotations'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [rfqId]);

  const lowest = quotes.reduce(
    (min, q) => (min === null || Number(q.grand_total) < Number(min.grand_total) ? q : min),
    null
  );

  return (
    <Layout>
      <div className="flex flex-col gap-0.5 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Quotation Comparison</h2>
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Side-by-side comparison of quotations received for an RFQ
        </p>
      </div>

      <DataState loading={rfqsLoading} error={rfqsError} empty={(rfqs || []).length === 0}>
        <div className="mb-5">
          <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-600 dark:text-zinc-400 mb-2">Select RFQ</label>
          <select
            value={rfqId}
            onChange={(e) => setRfqId(e.target.value)}
            className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs"
          >
            {(rfqs || []).map((r) => (
              <option key={r.id} value={r.id}>{r.rfq_number} — {r.title}</option>
            ))}
          </select>
        </div>

        <DataState loading={loading} error={error} empty={quotes.length === 0}>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-zinc-900/40 text-[11px] uppercase tracking-wider">
                  <th className="p-4 font-semibold">Quotation</th>
                  <th className="p-4 font-semibold text-right">Subtotal</th>
                  <th className="p-4 font-semibold text-right">GST</th>
                  <th className="p-4 font-semibold text-right">Grand Total</th>
                  <th className="p-4 font-semibold text-center">Delivery</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/30 font-medium text-zinc-700 dark:text-zinc-300 text-sm">
                {quotes.map((q) => {
                  const isLowest = lowest && q.id === lowest.id;
                  return (
                    <tr key={q.id} className={isLowest ? 'bg-emerald-500/5' : 'bg-white dark:bg-zinc-900'}>
                      <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">
                        {q.quotation_number}
                        {isLowest && <span className="ml-2 text-[9px] uppercase text-emerald-600 dark:text-emerald-400">Lowest</span>}
                      </td>
                      <td className="p-4 text-right">{inr(q.subtotal)}</td>
                      <td className="p-4 text-right">{inr(Number(q.cgst) + Number(q.sgst))}</td>
                      <td className={`p-4 text-right font-bold ${isLowest ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-100'}`}>{inr(q.grand_total)}</td>
                      <td className="p-4 text-center">{q.delivery_days} days</td>
                      <td className="p-4 text-center">{titleCase(q.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 mt-3">
            * The lowest grand total is highlighted. Approving a quotation happens via the Approvals workflow.
          </p>
        </DataState>
      </DataState>
    </Layout>
  );
}
