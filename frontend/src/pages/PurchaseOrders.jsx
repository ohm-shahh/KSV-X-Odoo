import React from 'react';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { purchaseOrdersApi } from '../api';
import { inr, formatDate, titleCase } from '../utils/format';

export default function PurchaseOrders() {
  const { data, loading, error, reload } = useFetch(() => purchaseOrdersApi.list(), []);
  const orders = data || [];

  return (
    <Layout>
      <div className="border-b border-zinc-200/60 dark:border-zinc-800/40 pb-4 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Purchase Orders</h2>
        <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Official supply orders generated from approved quotations
        </p>
      </div>

      <DataState loading={loading} error={error} onRetry={reload} empty={orders.length === 0}>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs mt-4">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-zinc-900/40">
                <th className="py-4 px-6 font-semibold">PO Number</th>
                <th className="py-4 px-6 font-semibold text-center">Quotation</th>
                <th className="py-4 px-6 font-semibold">PO Date</th>
                <th className="py-4 px-6 font-semibold text-right">Subtotal</th>
                <th className="py-4 px-6 font-semibold text-right">Grand Total</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/30 text-zinc-700 dark:text-zinc-300">
              {orders.map((po) => (
                <tr key={po.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors bg-white dark:bg-zinc-900">
                  <td className="py-4 px-6 font-semibold text-emerald-600 dark:text-emerald-400">{po.po_number}</td>
                  <td className="py-4 px-6 text-center">#{po.quotation_id}</td>
                  <td className="py-4 px-6">{formatDate(po.po_date)}</td>
                  <td className="py-4 px-6 text-right">{inr(po.subtotal)}</td>
                  <td className="py-4 px-6 text-right font-bold text-zinc-900 dark:text-zinc-100">{inr(po.grand_total)}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20">
                      {titleCase(po.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </Layout>
  );
}
