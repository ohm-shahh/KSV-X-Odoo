import React from 'react';
import Layout from '../components/Layout';
import { FileText, Truck, Send, CheckCircle2 } from 'lucide-react';

const poData = {
  poNumber: "PO-2026-0068",
  date: "21 May, 2026",
  deliveryDeadline: "05 June, 2026",
  status: "Issued",
  buyer: {
    name: "VendorBridge Corp Hub",
    address: "123 Business Park, Ahmedabad",
    contact: "procurement@vendorbridge.com"
  },
  vendor: {
    name: "Infra Supplies Pvt Ltd",
    address: "456, Industrial Estate, Surat",
    contact: "sales@infrasupplies.com"
  },
  items: [
    { name: 'Ergonomic chair', qty: 25, unit: 'NOS', price: 3500, total: 87500 },
    { name: 'Standing desks', qty: 10, unit: 'NOS', price: 8200, total: 82000 }
  ],
  totalAmount: 169500
};

export default function PurchaseOrders() {
  return (
    <Layout>
      {/* Page Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200/60 dark:border-zinc-800/40 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Purchase Order</h2>
          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Official Supply Order Matrix
          </p>
        </div>
        <div className="flex gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <button className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-50 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800 px-3 py-2 rounded-lg cursor-pointer shadow-xs transition-colors">
            <Truck className="w-3.5 h-3.5 text-zinc-400" /> Track Shipment
          </button>
          <button className="flex items-center gap-1.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg cursor-pointer shadow-xs transition-all">
            <Send className="w-3.5 h-3.5 text-emerald-500" /> Dispatch to Vendor
          </button>
        </div>
      </div>

      {/* Corporate PO Document Canvas Shell */}
      <div className="bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs space-y-8 text-xs font-mono text-zinc-600 dark:text-zinc-400">
        
        {/* Entity Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-zinc-200/50 dark:border-zinc-800/40 pb-6">
          <div>
            <span className="block text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 mb-1">Issued By (Buyer):</span>
            <p className="font-sans font-bold text-sm text-zinc-900 dark:text-white">{poData.buyer.name}</p>
            <p>{poData.buyer.address}</p>
            <p className="text-zinc-400">{poData.buyer.contact}</p>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 mb-1">Target Vendor:</span>
            <p className="font-sans font-bold text-sm text-zinc-900 dark:text-white">{poData.vendor.name}</p>
            <p>{poData.vendor.address}</p>
            <p className="text-zinc-400">{poData.vendor.contact}</p>
          </div>
        </div>

        {/* Core Metadata Reference Block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-[#f9f8f4]/50 dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/40">
          <div>PO ID Number: <br /><span className="font-bold text-emerald-600 dark:text-emerald-400">{poData.poNumber}</span></div>
          <div>Order Date: <br /><span className="font-bold text-zinc-900 dark:text-zinc-200">{poData.date}</span></div>
          <div>Expected Delivery: <br /><span className="font-bold text-zinc-900 dark:text-zinc-200">{poData.deliveryDeadline}</span></div>
        </div>

        {/* Ordered Item Specifications Table */}
        <div className="border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/40 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-3.5">Line Item Specifications</th>
                <th className="p-3.5 text-center">Quantity</th>
                <th className="p-3.5 text-right">Contract Unit Rate</th>
                <th className="p-3.5 text-right">Extended Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/30 text-zinc-700 dark:text-zinc-300 font-medium bg-white dark:bg-zinc-900">
              {poData.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-3.5 font-sans font-bold text-zinc-950 dark:text-white text-sm">{item.name}</td>
                  <td className="p-3.5 text-center font-bold text-zinc-900 dark:text-white">{item.qty} {item.unit}</td>
                  <td className="p-3.5 text-right">₹{item.price.toLocaleString()}</td>
                  <td className="p-3.5 text-right text-zinc-950 dark:text-zinc-100 font-bold">₹{item.total.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-zinc-50/40 dark:bg-zinc-900/10 font-bold text-sm border-t border-zinc-200 dark:border-zinc-800">
                <td colSpan="2"></td>
                <td className="p-3.5 uppercase tracking-wider text-zinc-400 dark:text-zinc-500 text-xs font-semibold">Total Authorized Val:</td>
                <td className="p-3.5 text-right text-emerald-600 dark:text-emerald-400 font-bold font-mono">₹{poData.totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PO Status Enforcement Block Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase text-zinc-400 font-bold">PO Lifecycle State:</span>
            <span className="px-2.5 py-0.5 rounded-sm text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              {poData.status}
            </span>
          </div>
          <div className="text-zinc-400 text-[10px] font-mono">
            * Generated automatically via authorized management signature workflows.
          </div>
        </div>
      </div>
    </Layout>
  );
}