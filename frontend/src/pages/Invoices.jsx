import React from 'react';
import Layout from '../components/Layout';
import { Download, Printer, Mail, CheckCircle2 } from 'lucide-react';

export default function Invoices() {
  return (
    <Layout>
      {/* Top Action Command Workspace Block Layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/40">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Commercial Invoice</h2>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Financial Payment Request Voucher Framework
          </p>
        </div>
        
        {/* Print Layout Document Control Array Link Ribbons */}
        <div className="flex gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <button className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-50 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800 px-3 py-2 rounded-lg cursor-pointer shadow-xs transition-colors">
            <Download className="w-3.5 h-3.5 text-zinc-400" /> Download PDF
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-50 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800 px-3 py-2 rounded-lg cursor-pointer shadow-xs transition-colors">
            <Printer className="w-3.5 h-3.5 text-zinc-400" /> Print
          </button>
          <button className="flex items-center gap-1.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg cursor-pointer shadow-xs transition-all">
            <Mail className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-600" /> Email Invoice
          </button>
        </div>
      </div>

      {/* Clean Physical Voucher Invoice Shell Layout */}
      <div className="bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs space-y-8 text-xs font-mono text-zinc-600 dark:text-zinc-400">
        
        {/* Header Metadata Entity Block Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-zinc-100 dark:border-zinc-800/40 pb-6">
          <div>
            <span className="block text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 mb-1">Remit To / Seller Account:</span>
            <p className="font-sans font-bold text-sm text-zinc-900 dark:text-white">Infra Supplies Pvt Ltd</p>
            <p>456, Industrial Estate, Surat</p>
            <p className="mt-1 font-semibold text-zinc-800 dark:text-zinc-300">GSTIN: 343434DB4523</p>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 mb-1">Debtor / Bill To:</span>
            <p className="font-sans font-bold text-sm text-zinc-900 dark:text-white">VendorBridge Enterprise Corp</p>
            <p>123 Business Park, Ahmedabad</p>
            <p className="mt-1 font-semibold text-zinc-800 dark:text-zinc-300">GSTIN: 253834381FB</p>
          </div>
        </div>

        {/* Secondary Voucher Dates Line Item Tracker Blocks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-zinc-50 dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/30">
          <div>Linked PO Ref: <br /><span className="font-bold text-zinc-900 dark:text-zinc-200">PO-2025-0068</span></div>
          <div>Invoice Issue Date: <br /><span className="font-bold text-zinc-900 dark:text-zinc-200">22 May, 2026</span></div>
          <div>Terms: <br /><span className="font-bold text-zinc-900 dark:text-zinc-200">Net 30 Days</span></div>
          <div>Due Balance Date: <br /><span className="font-bold text-red-500 dark:text-red-400">21 June, 2026</span></div>
        </div>

        {/* Nested Line Pricing Matrix Box Details */}
        <div className="border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/40 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-3.5">Item Description</th>
                <th className="p-3.5 text-center">Billed Qty</th>
                <th className="p-3.5 text-right">Unit Rate</th>
                <th className="p-3.5 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/30 text-zinc-700 dark:text-zinc-300 font-medium bg-white dark:bg-zinc-900">
              <tr>
                <td className="p-3.5 font-sans font-bold text-zinc-950 dark:text-white text-sm">Ergonomic chair</td>
                <td className="p-3.5 text-center">25</td>
                <td className="p-3.5 text-right">₹3,500</td>
                <td className="p-3.5 text-right text-zinc-950 dark:text-zinc-100 font-bold">₹87,500</td>
              </tr>
              <tr>
                <td className="p-3.5 font-sans font-bold text-zinc-950 dark:text-white text-sm">Tech Core LTD</td>
                <td className="p-3.5 text-center">10</td>
                <td className="p-3.5 text-right">₹8,200</td>
                <td className="p-3.5 text-right text-zinc-950 dark:text-zinc-100 font-bold">₹82,000</td>
              </tr>
              
              {/* Detailed Financial Calculation Row Lines */}
              <tr className="bg-zinc-50/40 dark:bg-zinc-900/10 font-bold border-t border-zinc-200 dark:border-zinc-800">
                <td colSpan="2"></td>
                <td className="p-3 text-zinc-400 font-semibold">Subtotal Cost:</td>
                <td className="p-3 text-right text-zinc-900 dark:text-zinc-200">₹1,69,500</td>
              </tr>
              <tr className="bg-zinc-50/40 dark:bg-zinc-900/10 font-bold">
                <td colSpan="2"></td>
                <td className="p-3 text-zinc-400 font-semibold">Central Tax CGST (9%):</td>
                <td className="p-3 text-right text-zinc-900 dark:text-zinc-200">₹15,255</td>
              </tr>
              <tr className="bg-zinc-50/40 dark:bg-zinc-900/10 font-bold">
                <td colSpan="2"></td>
                <td className="p-3 text-zinc-400 font-semibold">State Tax SGST (9%):</td>
                <td className="p-3 text-right text-zinc-900 dark:text-zinc-200">₹15,255</td>
              </tr>
              <tr className="bg-zinc-50/40 dark:bg-zinc-900/10 font-bold text-sm text-zinc-950 dark:text-white">
                <td colSpan="2"></td>
                <td className="p-3 uppercase tracking-wider text-zinc-500 font-bold">Grand Total Due:</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold font-mono">₹2,00,010</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Ledger State Voucher Verification Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase text-zinc-400 font-bold">Invoice Status:</span>
            <span className="px-2.5 py-0.5 rounded-sm text-[10px] uppercase font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
              Pending Payment
            </span>
          </div>
          <button className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold uppercase text-xs tracking-wider cursor-pointer hover:underline">
            <CheckCircle2 className="w-4 h-4" /> Mark as Paid
          </button>
        </div>
      </div>
    </Layout>
  );
}