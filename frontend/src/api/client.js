// Thin fetch wrapper around the VendorBridge PHP API.
// Every endpoint returns { success, message, data } (or { success:false, message, errors }).

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost/vendorbridge-backend/api';

const TOKEN_KEY = 'vb_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body != null ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      'Cannot reach the API. Is Apache (XAMPP) running on http://localhost?',
      0
    );
  }

  let json = null;
  const text = await res.text();
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      throw new ApiError(`Unexpected server response (${res.status})`, res.status);
    }
  }

  if (!res.ok || (json && json.success === false)) {
    const message = json?.message || `Request failed (${res.status})`;
    // Token rejected — clear local session so the UI can bounce to /login.
    if (res.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('vb_user');
    }
    throw new ApiError(message, res.status, json?.errors);
  }

  return json ? json.data : null;
}

export const apiGet = (path, opts) => request(path, { ...opts, method: 'GET' });
export const apiPost = (path, body, opts) =>
  request(path, { ...opts, method: 'POST', body });
export const apiPut = (path, body, opts) =>
  request(path, { ...opts, method: 'PUT', body });
