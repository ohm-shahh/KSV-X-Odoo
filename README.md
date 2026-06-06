<div align="center">

# 🌉 KSV-X-ODOO

### _Enterprise Procurement Hub — from RFQ to Invoice, in one place._

A full-stack ERP for managing vendors, requests for quotation, quotations,
multi-level approvals, purchase orders, and invoices.

![PHP](https://img.shields.io/badge/PHP-8.1-777BB4?logo=php&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-MariaDB-4479A1?logo=mysql&logoColor=white)

</div>

---

## ✨ What's inside

| | Feature |
|---|---|
| 🔐 | **JWT auth** with role-based access — `admin`, `officer`, `manager`, `vendor` |
| 🏢 | **Vendors** — register suppliers (creates their login + profile in one flow) |
| 📄 | **RFQs** — raise requests for quotation with line items & vendor assignment |
| 💬 | **Quotations** — vendor submissions, side-by-side comparison |
| ✅ | **Approvals** — multi-level approve / reject workflow |
| 🧾 | **Purchase Orders & Invoices** — generated downstream, with mark-as-paid |
| 📊 | **Reports** — spend, vendor and dashboard analytics |
| 🪵 | **Audit log** — immutable trail of every privileged action |
| 🌗 | **Light / dark** theme, fully responsive |

---

## 🧱 Tech stack

- **Frontend:** React 19 · Vite · Tailwind CSS v4 · React Router · lucide-react
- **Backend:** plain PHP 8 (no framework) · PDO · hand-rolled JWT
- **Database:** MySQL(ships with XAMPP)

```
React (Vite :5173)  ──►  PHP API (Apache :80)  ──►  MySQL (:3307)
      fetch + Bearer token        /api/**.php          vendorbridge
```

---

## 📁 Project structure

```
vendorbridge-backend/
├── api/              # REST endpoints, grouped by module (login.php, list.php, …)
├── config/           # database, cors, constants
├── helpers/          # jwt, response, validator, logger, utils
├── middleware/       # auth, role, validation
├── repositories/     # SQL data access (one per table group)
├── services/         # business logic
├── database/
│   ├── schema.sql    # tables
│   └── seed.sql      # demo users + sample data
└── frontend/         # React app
    └── src/
        ├── api/      # fetch client + per-module calls
        ├── pages/    # Dashboard, Vendors, CreateRFQ, Approvals, …
        ├── components/  Layout, ProtectedRoute, DataState
        ├── context/  # Auth + Theme providers
        └── hooks/    # useFetch
```

---

## 🚀 Getting started

### Prerequisites

- [XAMPP](https://www.apachefriends.org/) (gives you **Apache** + **PHP 8.1+** + **MySQL** on port `3307`)
- [Node.js](https://nodejs.org/) 18+ and npm

> The whole project lives inside `C:\xampp\htdocs\vendorbridge-backend` so Apache serves it at `http://localhost/vendorbridge-backend/`.

### 1️⃣ Start the servers

Open the **XAMPP Control Panel** and start **Apache** and **MySQL**.

Verify the API is alive:
```
http://localhost/vendorbridge-backend/api/health/ping.php
```

### 2️⃣ Set up the database

From the project root (PowerShell):

```powershell
# create the tables
Get-Content database\schema.sql | C:\xampp\mysql\bin\mysql.exe -u root -P 3307

# load demo users + sample data (safe to re-run — it resets its own demo rows)
Get-Content database\seed.sql | C:\xampp\mysql\bin\mysql.exe -u root -P 3307 vendorbridge
```

### 3️⃣ Run the frontend

```powershell
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** 🎉

> The API base URL is configurable in `frontend/.env` (`VITE_API_BASE_URL`),
> defaulting to `http://localhost/vendorbridge-backend/api`.

---

## 🔑 Demo logins

After seeding, log in with any of these (password is the same for all):

| Email | Role | Can do |
|---|---|---|
| `admin@vendorbridge.test` | **admin** | everything |
| `officer@vendorbridge.test` | **officer** | vendors, RFQs, invoices |
| `manager@vendorbridge.test` | **manager** | approvals, reports |
| `vendor@vendorbridge.test` | **vendor** | submit quotations |

> 🔓 Password for all demo accounts: **`password123`**

---

## 🛠️ Useful commands

```powershell
# Frontend
npm run dev        # start dev server (hot reload)
npm run build      # production build into dist/
npm run preview    # preview the production build
npm run lint       # eslint

# Reset the demo data anytime
Get-Content database\seed.sql | C:\xampp\mysql\bin\mysql.exe -u root -P 3307 vendorbridge
```

---

## 📡 API at a glance

All endpoints return `{ success, message, data }` and live under
`/vendorbridge-backend/api`. Protected routes expect an `Authorization: Bearer <token>` header.

| Module | Examples |
|---|---|
| **Auth** | `auth/login.php` · `auth/register.php` · `auth/me.php` |
| **Vendors** | `vendors/list.php` · `vendors/create.php` |
| **RFQs** | `rfqs/list.php` · `rfqs/create.php` · `rfqs/assignVendors.php` |
| **Quotations** | `quotations/list.php` · `quotations/compare.php` |
| **Approvals** | `approvals/pending.php` · `approvals/approve.php` · `approvals/reject.php` |
| **Orders** | `purchaseOrders/list.php` · `invoices/list.php` · `invoices/markPaid.php` |
| **Reports** | `reports/dashboard.php` · `reports/spendingAnalytics.php` |

---

## ⚠️ Before deploying

This is configured for **local development**. Before shipping anywhere real:

- Set a strong `JWT_SECRET` in `config/constants.php` (it's a placeholder).
- Lock down CORS in `config/cors.php` (currently `Access-Control-Allow-Origin: *`).
- Use a dedicated DB user with a password instead of `root`.

---

<div align="center">
<sub>Built with ☕ and a lot of <code>console.log</code>.</sub>
</div>
