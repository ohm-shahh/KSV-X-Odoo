import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ShieldCheck, FileCheck2, UserCheck2, ClipboardPlus } from 'lucide-react';

const mockLogs = [
  { type: 'RFQ', detail: "Quotation selected - Infra supplies pvt ltd selected for office furniture Q2", date: "23 may 2025, 9:15 PM", icon: FileCheck2, color: 'text-emerald-500' },
  { type: 'Approvals', detail: "Approval pending - PO-2024 awaiting L2 approval by priya shah", date: "22 may 2025, 09:15 AM", icon: ShieldCheck, color: 'text-indigo-500' },
  { type: 'Invoices', detail: "RFQ published - office furniture Q2 sent to 3 vendors", date: "19 may 2025", icon: ClipboardPlus, color: 'text-amber-500' },
  { type: 'Vendors', detail: "Vendor added - FastLog transport registered and pending verifications", date: "18 may, 2025 , 3:20 PM", icon: UserCheck2, color: 'text-zinc-400' }
];

export default function ActivityLogs() {
  const [filter, setFilter] = useState('All');

  return (
    <Layout>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Activity & Logs</h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase font-mono tracking-wider">
          Procurement audit trail
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Dynamic Stream List Core Container */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 shadow-xs space-y-6">
          
          {/* Audit Stream Context Sorting Ribbon */}
          <div className="flex flex-wrap gap-1.5 border-b border-zinc-100 dark:border-zinc-800/40 pb-4">
            {['All', 'RFQ', 'Approvals', 'Invoices', 'Vendors'].map((tab) => {
              const tabVal = tab.split(' ')[0];
              const isSel = filter === tabVal;
              return (
                <button
                  key={tabVal}
                  onClick={() => setFilter(tabVal)}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase border cursor-pointer transition-all ${
                    isSel ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent shadow-xs' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Sequential Timeline Data Stream */}
          <div className="space-y-6 font-mono text-xs text-zinc-600 dark:text-zinc-400 relative pl-4 border-l border-zinc-200 dark:border-zinc-800 ml-3">
            {mockLogs.map((log, i) => {
              const Icon = log.icon;
              return (
                <div key={i} className="relative space-y-1">
                  <div className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center ${log.color}`}>
                    <Icon className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <p className="text-zinc-900 dark:text-zinc-200 font-sans font-semibold text-sm leading-tight">
                    {log.detail}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                    {log.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Immutable Security Architecture Callout Box */}
        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 font-mono text-xs text-red-600 dark:text-red-400 space-y-3 shadow-xs">
          <p className="font-bold uppercase tracking-wider text-[10px]">Security Framework Protocol:</p>
          <p className="text-justify leading-relaxed">
            Audit logs must be immutable. These entries must be write-once, no edit or delete. Make sure your DB schema reflects this (no soft-delete on log records).
          </p>
        </div>
      </div>
    </Layout>
  );
}