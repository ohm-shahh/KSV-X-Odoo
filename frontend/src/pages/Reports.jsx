import React from 'react';
import Layout from '../components/Layout';
import { Calendar, DownloadCloud, ArrowUpRight } from 'lucide-react';

export default function Reports() {
  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200/60 dark:border-zinc-800/40 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Reports & Analytics</h2>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">Procurement Insights - May 2025</p>
        </div>
        <div className="flex gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <button className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 shadow-xs">
            <Calendar className="w-3.5 h-3.5" /> May 2025
          </button>
          <button className="flex items-center gap-1.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg shadow-sm cursor-pointer">
            <DownloadCloud className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Spend", count: "12.4 L", color: 'text-zinc-900 dark:text-zinc-100' },
          { label: "Active Vendors", count: "28", color: 'text-emerald-600 dark:text-emerald-400' },
          { label: "PO Fulfillment", count: "94%", color: 'text-amber-600 dark:text-amber-400' },
          { label: "Overdue Invoices", count: "3", color: 'text-red-500' }
        ].map((c, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs">
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 font-semibold">{c.label}</p>
            <p className={`text-2xl font-bold tracking-tight ${c.color}`}>{c.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs space-y-5">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800/40 pb-2 font-bold">
            Spend By Category
          </h3>
          <div className="space-y-4 font-mono text-xs">
            {[
              { label: "IT Hardware", val: "₹4.8L", w: 'w-[80%]', c: 'bg-zinc-800 dark:bg-zinc-200' },
              { label: "Furniture", val: "₹3.2L", w: 'w-[60%]', c: 'bg-emerald-500' },
              { label: "Stationery", val: "₹2.1L", w: 'w-[45%]', c: 'bg-amber-500' },
              { label: "Logistics", val: "₹2.3L", w: 'w-[50%]', c: 'bg-orange-500' }
            ].map((bar, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
                  <span>{bar.label}</span>
                  <span>{bar.val}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${bar.c} ${bar.w}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 font-bold">
              Top Vendors by Spend
            </h3>
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/40 text-zinc-400 tracking-wider">
                  <th className="pb-2 font-semibold">Vendor</th>
                  <th className="pb-2 font-semibold text-right">Spend (₹)</th>
                  <th className="pb-2 font-semibold text-center">POs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/20 text-zinc-600 dark:text-zinc-400 font-medium">
                {[
                  { name: "TechCore Ltd", spend: "4,20,000", po: "6" },
                  { name: "Infra Supplies", spend: "3,10,000", po: "4" },
                  { name: "FastLog", spend: "1,90,000", po: "3" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-sans font-bold text-zinc-800 dark:text-zinc-200 text-sm">{row.name}</td>
                    <td className="py-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{row.spend}</td>
                    <td className="py-2.5 text-center text-emerald-500 font-bold">{row.po}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 font-bold">
              Monthly Trend
            </h3>
            <div className="h-24 flex items-end gap-3.5 border-b border-zinc-100 dark:border-zinc-800/60 pb-3 mb-2 px-1">
              {[
                { m: 'Dec', h: 'h-1/3' },
                { m: 'Jan', h: 'h-1/2' },
                { m: 'Feb', h: 'h-2/5' },
                { m: 'Mar', h: 'h-3/4' },
                { m: 'Apr', h: 'h-3/5' },
                { m: 'May', h: 'h-full bg-zinc-900/10 dark:bg-zinc-100/20 border border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-white' }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className={`w-full bg-zinc-200 dark:bg-zinc-800 rounded-xs hover:bg-emerald-500/30 transition-all ${bar.h}`} />
                  <span className="text-[9px] font-mono text-zinc-400 tracking-tighter uppercase">{bar.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}