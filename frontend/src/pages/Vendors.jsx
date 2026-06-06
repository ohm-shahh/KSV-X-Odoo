import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Plus, Eye } from 'lucide-react';

const mockVendors = [
  { name: "Infra Supplies Pvt Ltd", category: "Constructions", gst: "27AABCS1429B1Z0", contact: "+91 98765 43210", status: "Active" },
  { name: "Tech Core LTD", category: "IT", gst: "24AABCS9811M1Z2", contact: "+91 99123 45678", status: "Active" },
  { name: "FastLog Transport", category: "Logistics", gst: "07AAACF4114A2Z5", contact: "+91 95555 12345", status: "Blocked" }
];

export default function Vendors() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <Layout>
      {/* Top Header Block */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Vendors
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            Manage supplier profiles and registrations
          </p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all shadow-sm cursor-pointer">
          <Plus className="w-4 h-4 text-emerald-500" />
          Add Vendor
        </button>
      </div>

      {/* High-Contrast Search Input Bar Element */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-4 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <input 
          type="text" 
          placeholder="Search by name, gstin, or marketplace category..." 
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-500 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors shadow-xs"
        />
      </div>

      {/* Dynamic Status Filter Badges Block */}
      <div className="flex gap-2 mb-6">
        {[
          { label: 'All (28)', value: 'All' },
          { label: 'Active (21)', value: 'Active' },
          { label: 'Pending (4)', value: 'Pending' },
          { label: 'Blocked (3)', value: 'Blocked' }
        ].map((tab) => {
          const isSelected = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* High-Contrast Table Layout */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800/60 text-[11px] uppercase font-mono tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-zinc-900/40">
              <th className="py-4 px-6 font-semibold">Vendor Name</th>
              <th className="py-4 px-6 font-semibold">Category</th>
              <th className="py-4 px-6 font-semibold">GST No.</th>
              <th className="py-4 px-6 font-semibold">Contact No.</th>
              <th className="py-4 px-6 font-semibold text-center">Status</th>
              <th className="py-4 px-6 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/30 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            {mockVendors.map((vendor, i) => (
              <tr key={i} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors bg-white dark:bg-zinc-900">
                <td className="py-4 px-6 font-sans font-bold text-zinc-950 dark:text-zinc-100 text-sm">
                  {vendor.name}
                </td>
                <td className="py-4 px-6 text-zinc-800 dark:text-zinc-400 font-medium">
                  {vendor.category}
                </td>
                <td className="py-4 px-6 text-zinc-800 dark:text-zinc-400 font-medium">
                  {vendor.gst}
                </td>
                <td className="py-4 px-6 text-zinc-800 dark:text-zinc-400 font-sans font-medium">
                  {vendor.contact}
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`inline-flex px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${
                    vendor.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20' 
                      : 'bg-red-500/10 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-500/20'
                  }`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-[#0c0c0e] dark:hover:bg-zinc-800 border border-zinc-800 text-white dark:text-zinc-300 text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans font-medium">
                    <Eye className="w-3.5 h-3.5 text-zinc-400" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}