import React from 'react';
import Layout from '../components/Layout';
import { Plus, UserPlus, ArrowUpRight, ArrowRight } from 'lucide-react';

const metrics = [
  { label: "Active Requests", count: "12", trend: "04 tracking open" },
  { label: "Pending Approvals", count: "05", trend: "Awaiting review" },
  { label: "Monthly PO Volume", count: "₹2.3L", trend: "+14.2% velocity", highlight: true },
  { label: "Overdue Invoices", count: "03", trend: "Requires action", danger: true }
];

const recentOrders = [
  { id: "PO-2026-001", vendor: "Infra Supplies Pvt Ltd", amount: "₹87,000", status: "Approved" },
  { id: "PO-2026-002", vendor: "TechCore Solutions", amount: "₹1,40,000", status: "Pending" },
  { id: "PO-2026-003", vendor: "OfficeNeed Corporate", amount: "₹34,900", status: "Draft" }
];

export default function Dashboard() {
  return (
    <Layout>
      {/* Workspace Header Module */}
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Real-time metrics and central system tracking summary.
        </p>
      </div>

      {/* Grid Analytics Metrics Frame */}
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
            <div className="mt-1 text-[9px] text-zinc-400 dark:text-zinc-500 font-mono tracking-wide">{card.trend}</div>
          </div>
        ))}
      </div>

      {/* Main Document Log / Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Document Repository Data Grid Table Container */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0e] border border-zinc-200/80 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
            Recent Purchase Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/60 text-zinc-400 font-mono tracking-wider">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Vendor</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/30 text-zinc-600 dark:text-zinc-400 font-mono">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/30 transition-colors">
                    <td className="py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">{order.id}</td>
                    <td className="py-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100 text-sm">{order.vendor}</td>
                    <td className="py-3.5 text-right font-medium text-zinc-800 dark:text-zinc-200">{order.amount}</td>
                    <td className="py-3.5 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-sm text-[9px] font-medium tracking-wider uppercase ${
                        order.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20' :
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20' :
                        'bg-zinc-100 text-zinc-500 dark:bg-[#18181b] dark:text-zinc-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Minimal Analytics Visualization Box */}
        <div className="bg-white dark:bg-[#0c0c0e] border border-zinc-200/80 dark:border-zinc-800/50 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[260px]">
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
              Spending Trends
            </h3>
            
            {/* Elegant Architectural Minimal Chart */}
            <div className="h-28 flex items-end gap-3 border-b border-zinc-100 dark:border-zinc-800/60 pb-3 mb-3 px-1">
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1/4 rounded-xs hover:bg-emerald-500/30 dark:hover:bg-emerald-500/30 transition-colors duration-200" />
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2/5 rounded-xs hover:bg-emerald-500/30 dark:hover:bg-emerald-500/30 transition-colors duration-200" />
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3/5 rounded-xs hover:bg-emerald-500/30 dark:hover:bg-emerald-500/30 transition-colors duration-200" />
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1/2 rounded-xs hover:bg-emerald-500/30 dark:hover:bg-emerald-500/30 transition-colors duration-200" />
              <div className="w-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 h-full rounded-xs" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-400">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% Delta
            </span>
            <span>6-Month Scale</span>
          </div>
        </div>

      </div>

      {/* Control Operational Action Triggers Row Panel */}
      <div className="flex flex-wrap gap-3 items-center pt-2">
        <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs uppercase tracking-wider font-mono px-4 py-3 rounded-lg transition-all shadow-xs cursor-pointer">
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          New Request Block
        </button>
        
        <button className="flex items-center gap-2 bg-white hover:bg-zinc-50 dark:bg-[#0c0c0e] dark:hover:bg-[#18181b] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-semibold text-xs uppercase tracking-wider font-mono px-4 py-3 rounded-lg transition-all shadow-xs cursor-pointer">
          <UserPlus className="w-3.5 h-3.5" />
          Add Supplier
        </button>

        <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-mono uppercase tracking-wider transition-colors ml-auto group cursor-pointer">
          View Invoices
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </Layout>
  );
}