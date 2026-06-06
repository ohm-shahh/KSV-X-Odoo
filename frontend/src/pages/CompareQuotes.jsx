import React from 'react';
import Layout from '../components/Layout';
import { ClipboardCheck } from 'lucide-react';

export default function CompareQuotes() {
  return (
    <Layout>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Quotation Comparison</h2>
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          RFQ: office furniture procurement q2 – 3 quotations received
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-zinc-900/40 text-[11px] uppercase tracking-wider">
              <th className="p-4 font-semibold">Criteria</th>
              <th className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/5 border-x border-zinc-200 dark:border-zinc-800">
                Infra Supplies (Lowest)
              </th>
              <th className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">TechCore LTD</th>
              <th className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">Office Need Co.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/30 font-medium text-zinc-700 dark:text-zinc-300 text-sm">
            <tr className="bg-white dark:bg-zinc-900">
              <td className="p-4 text-zinc-400 font-medium text-xs">Grand Total</td>
              <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border-x border-zinc-200 dark:border-zinc-800">1,85,000</td>
              <td className="p-4">2,00,010</td>
              <td className="p-4">2,14,800</td>
            </tr>
            <tr className="bg-white dark:bg-zinc-900">
              <td className="p-4 text-zinc-400 font-medium text-xs">GST %</td>
              <td className="p-4 bg-emerald-500/5 border-x border-zinc-200 dark:border-zinc-800">18%</td>
              <td className="p-4">18%</td>
              <td className="p-4">18%</td>
            </tr>
            <tr className="bg-white dark:bg-zinc-900">
              <td className="p-4 text-zinc-400 font-medium text-xs">Delivery (days)</td>
              <td className="p-4 font-bold text-zinc-950 dark:text-white bg-emerald-500/5 border-x border-zinc-200 dark:border-zinc-800">10</td>
              <td className="p-4">14</td>
              <td className="p-4 text-amber-600 dark:text-amber-500 font-bold">7</td>
            </tr>
            <tr className="bg-white dark:bg-zinc-900">
              <td className="p-4 text-zinc-400 font-medium text-xs">Vendor rating</td>
              <td className="p-4 text-emerald-500 font-bold bg-emerald-500/5 border-x border-zinc-200 dark:border-zinc-800">4.5/5</td>
              <td className="p-4">4.2/5</td>
              <td className="p-4 text-red-500">3.8/5</td>
            </tr>
            <tr className="bg-white dark:bg-zinc-900">
              <td className="p-4 text-zinc-400 font-medium text-xs">Payment terms</td>
              <td className="p-4 bg-emerald-500/5 border-x border-zinc-200 dark:border-zinc-800">30 days</td>
              <td className="p-4">30 days</td>
              <td className="p-4">15 days</td>
            </tr>
            <tr className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10">
              <td className="p-4"></td>
              <td className="p-4 bg-emerald-500/5 border-x border-zinc-200 dark:border-zinc-800 text-center">
                <button className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-black font-mono font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-xs cursor-pointer transition-all">
                  <ClipboardCheck className="w-3.5 h-3.5" /> Select & Approve
                </button>
              </td>
              <td className="p-4 text-center">
                <button className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 px-4 py-2 rounded-lg font-mono text-xs cursor-pointer">Select</button>
              </td>
              <td className="p-4 text-center">
                <button className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 px-4 py-2 rounded-lg font-mono text-xs cursor-pointer">Select</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[11px] font-mono font-medium text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2 max-w-xl">
        * Green = lowest price, selecting vendor initiates the approval workflow.
      </p>
    </Layout>
  );
}