import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useFetch } from '../hooks/useFetch';
import { rfqsApi, vendorsApi } from '../api';
import { Plus, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function CreateRFQ() {
  const navigate = useNavigate();
  const { data: vendors } = useFetch(() => vendorsApi.list(), []);

  const [form, setForm] = useState({ title: '', category: '', deadline: '', description: '' });
  const [items, setItems] = useState([{ item_name: '', quantity: '' }]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const updateItem = (idx, key, value) =>
    setItems((list) => list.map((it, i) => (i === idx ? { ...it, [key]: value } : it)));
  const addItem = () => setItems((list) => [...list, { item_name: '', quantity: '' }]);
  const removeItem = (idx) => setItems((list) => list.filter((_, i) => i !== idx));

  const toggleVendor = (id) =>
    setSelectedVendors((sel) => (sel.includes(id) ? sel.filter((v) => v !== id) : [...sel, id]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cleanItems = items
      .filter((it) => it.item_name.trim() && Number(it.quantity) > 0)
      .map((it) => ({ item_name: it.item_name.trim(), quantity: Number(it.quantity) }));

    if (cleanItems.length === 0) {
      setError('Add at least one line item with a quantity greater than zero.');
      return;
    }

    setSaving(true);
    try {
      const result = await rfqsApi.create({
        title: form.title,
        category: form.category,
        deadline: form.deadline,
        description: form.description,
        items: cleanItems,
      });
      if (selectedVendors.length > 0) {
        await rfqsApi.assignVendors(result.rfq_id, selectedVendors);
      }
      setSuccess(`RFQ ${result.rfq_number} created successfully.`);
      setTimeout(() => navigate('/quotations'), 1200);
    } catch (err) {
      setError(err.message || 'Could not create RFQ');
    } finally {
      setSaving(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Create RFQ</h2>
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mt-0.5">New request for quotation</p>
      </div>

      {error && (
        <div className="mb-5 text-xs font-mono text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3">{error}</div>
      )}
      {success && (
        <div className="mb-5 flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-4 py-3">
          <CheckCircle2 className="w-4 h-4" /> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: RFQ details */}
        <div className="space-y-5">
          <Labeled label="RFQ Title*">
            <input type="text" required value={form.title} onChange={update('title')} placeholder="Office furniture procurement Q2"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs" />
          </Labeled>
          <Labeled label="Category*">
            <input type="text" required value={form.category} onChange={update('category')} placeholder="Furniture"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs" />
          </Labeled>
          <Labeled label="Deadline* (future date)">
            <input type="date" required min={today} value={form.deadline} onChange={update('deadline')}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 shadow-xs" />
          </Labeled>
          <Labeled label="Description">
            <textarea rows="4" value={form.description} onChange={update('description')} placeholder="Ergonomic chairs and standing desks for 3rd floor"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none shadow-xs" />
          </Labeled>
        </div>

        {/* Right: items + vendors */}
        <div className="space-y-6">
          <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 bg-zinc-50/60 dark:bg-zinc-900/40">
              Line Items
            </div>
            <div className="p-3 space-y-2">
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text" placeholder="Item name" value={it.item_name}
                    onChange={(e) => updateItem(idx, 'item_name', e.target.value)}
                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50"
                  />
                  <input
                    type="number" min="1" placeholder="Qty" value={it.quantity}
                    onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                    className="w-20 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-center text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button type="button" onClick={() => removeItem(idx)} disabled={items.length === 1}
                    className="p-2 text-zinc-400 hover:text-red-500 disabled:opacity-30 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addItem}
              className="w-full text-center py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 transition-all text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4 text-emerald-500" /> Add Line Item
            </button>
          </div>

          <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-xs">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3">
              Assign Vendors (optional)
            </span>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {(vendors || []).length === 0 && (
                <p className="text-xs font-mono text-zinc-400">No vendors registered yet.</p>
              )}
              {(vendors || []).map((v) => (
                <label key={v.id} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 px-4 py-2.5 rounded-lg text-xs font-sans font-bold text-zinc-900 dark:text-zinc-200 cursor-pointer">
                  <input type="checkbox" checked={selectedVendors.includes(v.id)} onChange={() => toggleVendor(v.id)} className="accent-emerald-500" />
                  <span>{v.company_name}</span>
                  <span className="ml-auto font-mono text-[10px] text-zinc-400">{v.category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider font-mono px-6 py-4 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} Create RFQ
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}

function Labeled({ label, children }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-mono font-bold text-zinc-700 dark:text-zinc-400 mb-2">{label}</label>
      {children}
    </div>
  );
}
