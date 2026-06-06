import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { reportsApi, purchaseOrdersApi } from '../api';
import { inr, titleCase } from '../utils/format';
import { Plus, UserPlus, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { data, loading, error, reload } = useFetch(async () => {
    const [stats, pos] = await Promise.all([
      reportsApi.dashboard(),
      purchaseOrdersApi.list(),
    ]);
    return { stats, pos };
  }, []);

  const stats = data?.stats || {};
  const recentOrders = (data?.pos || []).slice(0, 6);

  const metrics = [
    { label: 'Registered Vendors', count: stats.vendors ?? '—' },
    { label: 'RFQs Raised', count: stats.rfqs ?? '—' },
    { label: 'Quotations', count: stats.quotations ?? '—', highlight: true },
    { label: 'Open Invoices', count: stats.invoices ?? '—', danger: (stats.invoices ?? 0) > 0 },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Real-time metrics and central system tracking summary.
        </p>
      </div>

      <DataState loading={loading} error={error} onRetry={reload}>
        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#0c0c0e] border border-zinc-200/80 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs transition-transform duration-200 hover:-translate-y-0.5"
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5">
                {card.label}
              </p>
              <p className={`text-2xl font-bold tracking-tight ${
                card.danger ? 'text-red-500' : card.highlight ? 'text-emerald-500' : 'text-zinc-900 dark:text-zinc-100'
              }`}>
                {card.count}
              </p>
            </div>
          ))}
        </div>

        {/* Recent purchase orders */}
        <div className="bg-white dark:bg-[#0c0c0e] border border-zinc-200/80 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs mt-6">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
            Recent Purchase Orders
          </h3>
          {recentOrders.length === 0 ? (
            <p className="text-xs font-mono text-zinc-400 py-6 text-center">No purchase orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800/60 text-zinc-400 font-mono tracking-wider">
                    <th className="pb-3 font-medium">PO Number</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                    <th className="pb-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/30 text-zinc-600 dark:text-zinc-400 font-mono">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/30 transition-colors">
                      <td className="py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">{order.po_number}</td>
                      <td className="py-3.5">{order.po_date}</td>
                      <td className="py-3.5 text-right font-medium text-zinc-800 dark:text-zinc-200">{inr(order.grand_total)}</td>
                      <td className="py-3.5 text-center">
                        <span className="inline-flex px-2.5 py-0.5 rounded-sm text-[9px] font-medium tracking-wider uppercase bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20">
                          {titleCase(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 items-center pt-6">
          <Link to="/create-rfq" className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs uppercase tracking-wider font-mono px-4 py-3 rounded-lg transition-all shadow-xs cursor-pointer">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> New RFQ
          </Link>
          <Link to="/vendors" className="flex items-center gap-2 bg-white hover:bg-zinc-50 dark:bg-[#0c0c0e] dark:hover:bg-[#18181b] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-semibold text-xs uppercase tracking-wider font-mono px-4 py-3 rounded-lg transition-all shadow-xs cursor-pointer">
            <UserPlus className="w-3.5 h-3.5" /> Add Supplier
          </Link>
          <Link to="/invoices" className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-mono uppercase tracking-wider transition-colors ml-auto group cursor-pointer">
            View Invoices
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </DataState>
    </Layout>
  );
}
