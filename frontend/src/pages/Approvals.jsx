import React, { useState } from 'react';
import Layout from '../components/Layout';
import DataState from '../components/DataState';
import { useFetch } from '../hooks/useFetch';
import { approvalsApi } from '../api';
import { formatDate, titleCase } from '../utils/format';
import { ThumbsUp, ThumbsDown, Clock, Loader2 } from 'lucide-react';

export default function Approvals() {
  const { data, loading, error, reload } = useFetch(() => approvalsApi.pending(), []);
  const approvals = data || [];

  const [remarks, setRemarks] = useState({});
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');

  const act = async (approval, type) => {
    setActionError('');
    setNotice('');
    const note = remarks[approval.id] || '';
    if (type === 'reject' && !note.trim()) {
      setActionError('Remarks are required when rejecting a quotation.');
      return;
    }
    setBusyId(approval.id);
    try {
      if (type === 'approve') {
        await approvalsApi.approve(approval.quotation_id, approval.level, note);
        setNotice(`Quotation #${approval.quotation_id} approved.`);
      } else {
        await approvalsApi.reject(approval.quotation_id, approval.level, note);
        setNotice(`Quotation #${approval.quotation_id} rejected.`);
      }
      await reload();
    } catch (err) {
      setActionError(err.message || 'Action failed');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-0.5 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Approval Workflow</h2>
        <p className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Quotations awaiting your decision
        </p>
      </div>

      {actionError && (
        <div className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3">{actionError}</div>
      )}
      {notice && (
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-4 py-3">{notice}</div>
      )}

      <DataState loading={loading} error={error} onRetry={reload} empty={approvals.length === 0}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-2">
          {approvals.map((a) => (
            <div key={a.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Quotation #{a.quotation_id}</p>
                  <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                    Level: {titleCase(a.level)}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20">
                  <Clock className="w-3 h-3" /> {titleCase(a.status)}
                </span>
              </div>

              <p className="text-[11px] font-mono text-zinc-400">Assigned {formatDate(a.created_at)}</p>

              <textarea
                rows="2"
                value={remarks[a.id] || ''}
                onChange={(e) => setRemarks((r) => ({ ...r, [a.id]: e.target.value }))}
                placeholder="Add your remarks (required to reject)…"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 resize-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => act(a, 'approve')}
                  disabled={busyId === a.id}
                  className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-mono font-bold text-xs uppercase py-3 rounded-lg cursor-pointer transition-all shadow-xs disabled:opacity-60"
                >
                  {busyId === a.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsUp className="w-4 h-4 text-emerald-500" />} Approve
                </button>
                <button
                  onClick={() => act(a, 'reject')}
                  disabled={busyId === a.id}
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 dark:bg-transparent border border-zinc-200 dark:border-zinc-800 text-red-500 font-mono font-bold text-xs uppercase py-3 rounded-lg cursor-pointer transition-all shadow-xs disabled:opacity-60"
                >
                  <ThumbsDown className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </Layout>
  );
}
