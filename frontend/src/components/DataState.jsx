import React from 'react';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

// Renders loading / error / empty placeholders. Returns null when there is
// content to show so the caller can render its real UI.
export default function DataState({ loading, error, empty, onRetry, children }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-zinc-400 font-mono text-xs uppercase tracking-wider">
        <Loader2 className="w-4 h-4 animate-spin text-emerald-500" /> Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <p className="text-sm text-red-600 dark:text-red-400 font-medium max-w-md">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-2 cursor-pointer"
          >
            Retry
          </button>
        )}
      </div>
    );
  }
  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-zinc-400 font-mono text-xs uppercase tracking-wider">
        <Inbox className="w-6 h-6" /> No records yet
      </div>
    );
  }
  return children;
}
