import React from 'react';
import Layout from '../components/Layout';
import { CheckCircle2, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function Approvals() {
  return (
    <Layout>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Approval Workflow</h2>
        <p className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          RFQ: office furniture Q2 – Vendor: Infra Supplies – 185400
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 shadow-xs flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-11 left-16 right-16 h-0.5 bg-zinc-200 dark:bg-zinc-800 z-0" />
        {[
          { step: 1, name: "Submitted", done: true },
          { step: 2, name: "L1 Review", done: true },
          { step: 3, name: "L2 Approval", current: true },
          { step: 4, name: "Generate PO" }
        ].map((node, i) => (
          <div key={i} className="flex flex-col items-center relative z-10 flex-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all ${
              node.done ? 'bg-emerald-500 text-black border-emerald-600' :
              node.current ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-800 dark:border-zinc-200' :
              'bg-white dark:bg-zinc-950 text-zinc-400 border-zinc-200 dark:border-zinc-800'
            }`}>
              {node.step}
            </div>
            <span className={`text-[10px] font-mono uppercase mt-2 tracking-wide font-semibold ${
              node.current ? 'text-zinc-900 dark:text-zinc-200' : 'text-zinc-400'
            }`}>{node.name}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 space-y-6 shadow-xs">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Approval Chain</h3>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200">Rahul Mehta (Procurement head)</p>
                <p className="text-[11px] font-mono text-zinc-400">Approved on may 20, 10:32 Am</p>
              </div>
            </div>
            <div className="flex gap-3 items-start opacity-75">
              <Clock className="w-5 h-5 text-zinc-400 dark:text-zinc-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200">Priya Shah (finance manager)</p>
                <p className="text-[11px] font-mono text-zinc-500 dark:text-emerald-400 font-semibold">Awaiting • Assigned may 21</p>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-400 mb-2">Approval Remarks</label>
            <textarea rows="2" placeholder="Add your comments or conditions...." className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 space-y-6 shadow-xs flex flex-col justify-between h-full">
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">Quotations Summary</h3>
            <div className="space-y-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/30">
                <span>Vendor:</span>
                <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100">Infra Supplies PVT LTD</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/30">
                <span>Total:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">1,85,400</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/30">
                <span>Delivery:</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-semibold">10 days</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Rating:</span>
                <span className="text-emerald-500 font-bold">4.5/5</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-mono font-bold text-xs uppercase py-3 rounded-lg cursor-pointer transition-all shadow-xs">
              <ThumbsUp className="w-4 h-4 text-emerald-500" /> Approve
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 dark:bg-transparent border border-zinc-200 dark:border-zinc-800 text-red-500 font-mono font-bold text-xs uppercase py-3 rounded-lg cursor-pointer transition-all shadow-xs">
              <ThumbsDown className="w-4 h-4" /> Reject
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}