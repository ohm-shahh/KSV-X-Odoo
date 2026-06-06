import React, { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { logsApi } from '../api';
import { formatDateTime } from '../utils/format';
import { ShieldCheck, FileCheck2, UserCheck2, ClipboardPlus, Activity } from 'lucide-react';

const ICONS = {
  RFQ: { icon: FileCheck2, color: 'text-emerald-500' },
  Approvals: { icon: ShieldCheck, color: 'text-indigo-500' },
  Invoices: { icon: ClipboardPlus, color: 'text-amber-500' },
  Vendors: { icon: UserCheck2, color: 'text-blue-400' },
  AUTH: { icon: Activity, color: 'text-zinc-400' },
};

export default function ActivityLogs() {
  const { data, loading, error, reload } = useFetch(() => logsApi.fetch(), []);
  const logs = data || [];
  const [filter, setFilter] = useState('All');

  const tabs = useMemo(() => {
    const types = Array.from(new Set(logs.map((l) => l.action_type)));
    return ['All', ...types];
  }, [logs]);

  const visible = filter === 'All' ? logs : logs.filter((l) => l.action_type === filter);

  return (
    <Layout>
      <div className="flex flex-col gap-0.5 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Activity & Logs</h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase font-mono tracking-wider">Procurement audit trail</p>
      </div>

      <DataState loading={loading} error={error} onRetry={reload} empty={logs.length === 0}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-2">
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap gap-1.5 border-b border-zinc-100 dark:border-zinc-800/40 pb-4">
              {tabs.map((tab) => {
                const isSel = filter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase border cursor-pointer transition-all ${
                      isSel
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="space-y-6 font-mono text-xs text-zinc-600 dark:text-zinc-400 relative pl-4 border-l border-zinc-200 dark:border-zinc-800 ml-3">
              {visible.map((log) => {
                const meta = ICONS[log.action_type] || { icon: Activity, color: 'text-zinc-400' };
                const Icon = meta.icon;
                return (
                  <div key={log.id} className="relative space-y-1">
                    <div className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center ${meta.color}`}>
                      <Icon className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <p className="text-zinc-900 dark:text-zinc-200 font-sans font-semibold text-sm leading-tight">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 mr-2">[{log.action_type}]</span>
                      {log.details}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-medium tracking-wide">{formatDateTime(log.created_at)}</p>
                  </div>
                );
              })}
              {visible.length === 0 && (
                <p className="text-xs text-zinc-400">No entries for this filter.</p>
              )}
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 font-mono text-xs text-red-600 dark:text-red-400 space-y-3 shadow-xs">
            <p className="font-bold uppercase tracking-wider text-[10px]">Security Framework Protocol:</p>
            <p className="text-justify leading-relaxed">
              Audit logs are immutable — write-once entries with no edit or delete. Every privileged action
              in the system appends a record here.
            </p>
          </div>
        </div>
      </DataState>
    </Layout>
  );
}
