import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Save, CheckCircle } from 'lucide-react';

export default function Quotations() {
  const [deliveryDays, setDeliveryDays] = useState({ item1: 7, item2: 14 });

  return (
    <Layout>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Submit Quotations</h2>
        <p className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          RFQ: office furniture procurement q2 – deadline 15 june 2025
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 shadow-xs">
        <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
          RFQ Summary
        </span>
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Ergonomic chair × 25, standing desk × 10 – category furniture
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs">
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-50/60 dark:bg-zinc-900/40">
          Your Quotation Matrix
        </div>
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-zinc-400 dark:text-zinc-500">
              <th className="p-4 font-semibold">Item</th>
              <th className="p-4 font-semibold text-center">Qty</th>
              <th className="p-4 font-semibold text-right">Unit Price (₹)</th>
              <th className="p-4 font-semibold text-right">Total (₹)</th>
              <th className="p-4 font-semibold text-center">Delivery (Days)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/30 text-zinc-700 dark:text-zinc-300 font-medium">
            <tr className="bg-white dark:bg-zinc-900">
              <td className="p-4 font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm">Ergonomic chair</td>
              <td className="p-4 text-center text-zinc-900 dark:text-zinc-100">25</td>
              <td className="p-4 text-right text-zinc-900 dark:text-zinc-100">3,500</td>
              <td className="p-4 text-right text-zinc-900 dark:text-zinc-100">87,500</td>
              <td className="p-4 text-center">
                <input 
                  type="number" 
                  value={deliveryDays.item1} 
                  onChange={(e) => setDeliveryDays({...deliveryDays, item1: parseInt(e.target.value) || 0})}
                  className="w-16 text-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded py-1 text-xs focus:outline-none focus:border-emerald-500/50 text-zinc-900 dark:text-zinc-100"
                />
              </td>
            </tr>
            <tr className="bg-white dark:bg-zinc-900">
              <td className="p-4 font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm">Standing desks</td>
              <td className="p-4 text-center text-zinc-900 dark:text-zinc-100">10</td>
              <td className="p-4 text-right text-zinc-900 dark:text-zinc-100">8,200</td>
              <td className="p-4 text-right text-zinc-900 dark:text-zinc-100">82,000</td>
              <td className="p-4 text-center">
                <input 
                  type="number" 
                  value={deliveryDays.item2} 
                  onChange={(e) => setDeliveryDays({...deliveryDays, item2: parseInt(e.target.value) || 0})}
                  className="w-16 text-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded py-1 text-xs focus:outline-none focus:border-emerald-500/50 text-zinc-900 dark:text-zinc-100"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-700 dark:text-zinc-400 mb-2">Tax / GST %</label>
            <input type="text" defaultValue="18 %" disabled className="w-full max-w-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 rounded-lg px-4 py-3" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-700 dark:text-zinc-400 mb-2">Note / Terms</label>
            <textarea rows="3" defaultValue="Payment terms: 20 days net..." className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl p-4 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none shadow-xs" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 shadow-xs space-y-3 font-mono text-sm max-w-md ml-auto w-full">
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Subtotal</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">1,69,500</span>
          </div>
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
            <span>GST (18%)</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">30,510</span>
          </div>
          <div className="flex justify-between text-base font-sans font-bold text-zinc-950 dark:white pt-1">
            <span>Grand Total</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">2,00,010</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs uppercase tracking-wider font-mono px-6 py-3.5 rounded-xl transition-all shadow-sm cursor-pointer">
          <CheckCircle className="w-4 h-4 text-emerald-500" /> Submit Quotation
        </button>
        <button className="bg-white hover:bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-800 px-6 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer">
          Save Draft
        </button>
      </div>
    </Layout>
  );
}