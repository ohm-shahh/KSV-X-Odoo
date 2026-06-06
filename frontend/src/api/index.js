// Domain-specific API calls, grouped by module. Paths map directly to the
// PHP files under /api (endpoints are accessed by file path, e.g. /auth/login.php).

import { apiGet, apiPost } from './client';

export const authApi = {
  login: (email, password) =>
    apiPost('/auth/login.php', { email, password }, { auth: false }),
  register: (payload) =>
    apiPost('/auth/register.php', payload, { auth: false }),
  me: () => apiGet('/auth/me.php'),
};

export const vendorsApi = {
  list: () => apiGet('/vendors/list.php'),
  details: (id) => apiGet(`/vendors/details.php?id=${id}`),
  create: (payload) => apiPost('/vendors/create.php', payload),
};

export const rfqsApi = {
  list: () => apiGet('/rfqs/list.php'),
  details: (id) => apiGet(`/rfqs/details.php?id=${id}`),
  create: (payload) => apiPost('/rfqs/create.php', payload),
  publish: (rfq_id) => apiPost('/rfqs/publish.php', { rfq_id }),
  assignVendors: (rfq_id, vendor_ids) =>
    apiPost('/rfqs/assignVendors.php', { rfq_id, vendor_ids }),
};

export const quotationsApi = {
  list: () => apiGet('/quotations/list.php'),
  compare: (rfqId) => apiGet(`/quotations/compare.php?rfq_id=${rfqId}`),
};

export const approvalsApi = {
  pending: () => apiGet('/approvals/pending.php'),
  approve: (quotation_id, level, remarks = '') =>
    apiPost('/approvals/approve.php', { quotation_id, level, remarks }),
  reject: (quotation_id, level, remarks) =>
    apiPost('/approvals/reject.php', { quotation_id, level, remarks }),
};

export const purchaseOrdersApi = {
  list: () => apiGet('/purchaseOrders/list.php'),
};

export const invoicesApi = {
  list: () => apiGet('/invoices/list.php'),
  markPaid: (invoice_id) => apiPost('/invoices/markPaid.php', { invoice_id }),
};

export const reportsApi = {
  dashboard: () => apiGet('/reports/dashboard.php'),
  spending: () => apiGet('/reports/spendingAnalytics.php'),
  vendor: () => apiGet('/reports/vendorAnalytics.php'),
};

export const logsApi = {
  fetch: () => apiGet('/logs/fetch.php'),
};
