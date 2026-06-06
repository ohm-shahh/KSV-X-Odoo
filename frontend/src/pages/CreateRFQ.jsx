import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Plus, X, UploadCloud } from 'lucide-react';

export default function CreateRFQ() {
  const [items, setItems] = useState([
    { name: 'Ergonomic chair', qty: 25, unit: 'NOS' },
    { name: 'Standing desks', qty: 10, unit: 'NOS' }
  ]);

  const [vendors, setVendors] = useState(['Infra Supplies Pvt Ltd', 'Techcore LTD']);

  return (
    <Layout>
      {/* Top Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Create RFQ's
        </h2>
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mt-0.5">
          New request for quotation
        </p>
      </div>

      {/* High-Contrast Multi-Step Pipeline Navigation Bar */}
      <div className="flex items-center w-full max-w-xl mb-10 relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-zinc-300 dark:bg-zinc-800 z-0" />
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex-1 flex flex-col items-center relative z-10">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all ${
              step === 1 
                ? 'bg-emerald-500 text-black border-emerald-600' 
                : 'bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-800'
            }`}>
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Main Multi-Column Split Framework Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Hand Inputs - High Contrast Form Controls */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-700 dark:text-zinc-400 mb-2">
              RFQ's Title*
            </label>
            <input 
              type="text" 
              defaultValue="Office Furniture procurement Q2" 
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500/50 shadow-xs" 
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-700 dark:text-zinc-400 mb-2">
              Category
            </label>
            <input 
              type="text" 
              defaultValue="Furniture" 
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none shadow-xs" 
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-700 dark:text-zinc-400 mb-2">
              Deadline*
            </label>
            <input 
              type="text" 
              defaultValue="15 June 2025" 
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none shadow-xs" 
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-700 dark:text-zinc-400 mb-2">
              Description
            </label>
            <textarea 
              rows="4" 
              defaultValue="Ergonomic chairs and standing desks for 3rd floor" 
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none shadow-xs" 
            />
          </div>
        </div>

        {/* Right Hand Interactive Functional Lists */}
        <div className="space-y-6">
          
          {/* High-Contrast Line Items Data Table Block */}
          <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 bg-zinc-50/60 dark:bg-zinc-900/40">
              Line Items
            </div>
            <table className="w-full text-left border-collapse text-xs font-mono text-zinc-800 dark:text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-zinc-400 dark:text-zinc-500">
                  <th className="p-3 font-semibold">Item</th>
                  <th className="p-3 font-semibold text-center">Qty</th>
                  <th className="p-3 font-semibold text-right">Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/30 font-medium">
                {items.map((it, idx) => (
                  <tr key={idx} className="bg-white dark:bg-zinc-900">
                    <td className="p-3 font-sans text-zinc-900 dark:text-zinc-100 font-semibold">{it.name}</td>
                    <td className="p-3 text-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">{it.qty}</td>
                    <td className="p-3 text-right text-zinc-500 dark:text-zinc-500">{it.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="w-full text-center py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4 text-emerald-500" /> Add Line Item
            </button>
          </div>

          {/* Assigned Corporate Vendors Section */}
          <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-xs">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3">
              Assign Vendors
            </span>
            <div className="space-y-2">
              {vendors.map((v) => (
                <div key={v} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 px-4 py-2.5 rounded-lg text-xs font-sans font-bold text-zinc-900 dark:text-zinc-200">
                  <span>{v}</span>
                  <X className="w-4 h-4 text-zinc-400 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              ))}
              <button className="w-full text-left px-4 py-3 border border-dashed border-zinc-300 dark:border-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-400 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer">
                + Add Vendor
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800/60 my-8" />

      {/* Operational Actions Panel & File Drag Zone */}
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        <div className="flex gap-4">
          <button className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider font-mono px-6 py-4 rounded-xl transition-all shadow-sm cursor-pointer">
            Save & Send to Vendors
          </button>
          <button className="bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-300 dark:border-zinc-800 px-6 py-4 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all shadow-sm cursor-pointer">
            Save as Draft
          </button>
        </div>

        {/* Drag and Drop Area */}
        <div className="w-full md:w-80 bg-white dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 rounded-xl p-6 text-center cursor-pointer transition-colors group shadow-xs">
          <UploadCloud className="w-7 h-7 text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 transition-colors mx-auto mb-2" />
          <p className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-300">
            Drag & drop files or click to upload
          </p>
        </div>
      </div>
    </Layout>
  );
}