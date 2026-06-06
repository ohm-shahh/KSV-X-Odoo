import React from 'react';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { reportsApi } from '../api';
import { inr } from '../utils/format';

export default function Reports() {
  const { data, loading, error, reload } = useFetch(async () => {
    // Some analytics are admin/officer-only; tolerate 403 for managers.
    const [dashboard, spending, vendor] = await Promise.allSettled([
      reportsApi.dashboard(),
      reportsApi.spending(),
      reportsApi.vendor(),
    ]);
    return {
      dashboard: dashboard.status === 'fulfilled' ? dashboard.value : {},
      spending: spending.status === 'fulfilled' ? spending.value : null,
      vendor: vendor.status === 'fulfilled' ? vendor.value : [],
    };
  }, []);

  const d = data?.dashboard || {};
  const spend = data?.spending;
  const vendorRows = data?.vendor || [];

  const cards = [
    { label: 'Total Spend', value: spend ? inr(spend.total_spend || 0) : '—', color: 'text-zinc-900 dark:text-zinc-100' },
    { label: 'Registered Vendors', value: d.vendors ?? '—', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Purchase Orders', value: spend?.total_purchase_orders ?? d.purchase_orders ?? '—', color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Open Invoices', value: d.invoices ?? '—', color: 'text-red-500' },
  ];

  return (
    <Layout>
      <div className="border-b border-zinc-200/60 dark:border-zinc-800/40 pb-4 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Reports & Analytics</h2>
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">Procurement insights</p>
      </div>

      <DataState loading={loading} error={error} onRetry={reload}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {cards.map((c, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs">
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 font-semibold">{c.label}</p>
              <p className={`text-2xl font-bold tracking-tight ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-6">
          {spend && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800/40 pb-2 font-bold">
                Spend Summary
              </h3>
              <Row label="Total purchase orders" value={spend.total_purchase_orders ?? 0} />
              <Row label="Total spend" value={inr(spend.total_spend || 0)} />
              <Row label="Average per PO" value={inr(spend.average_spend || 0)} />
            </div>
          )}

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 font-bold">
              Vendors by Quotation Volume
            </h3>
            {vendorRows.length === 0 ? (
              <p className="text-xs font-mono text-zinc-400">No vendor analytics available.</p>
            ) : (
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800/40 text-zinc-400 tracking-wider">
                    <th className="pb-2 font-semibold">Vendor</th>
                    <th className="pb-2 font-semibold text-center">Quotations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/20 text-zinc-600 dark:text-zinc-400 font-medium">
                  {vendorRows.map((row) => (
                    <tr key={row.id}>
                      <td className="py-2.5 font-sans font-bold text-zinc-800 dark:text-zinc-200 text-sm">{row.company_name}</td>
                      <td className="py-2.5 text-center text-emerald-500 font-bold">{row.quotations_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </DataState>
    </Layout>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between font-mono text-xs">
      <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="font-bold text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  );
}
