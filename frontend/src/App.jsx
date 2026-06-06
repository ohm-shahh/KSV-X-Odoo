import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Import Pages
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import CreateRFQ from './pages/CreateRFQ';
import Quotations from './pages/Quotations';
import CompareQuotes from './pages/CompareQuotes';
import Approvals from './pages/Approvals';
import PurchaseOrders from './pages/PurchaseOrders'; // <--- Separate PO Import
import Invoices from './pages/Invoices';             // <--- Separate Invoice Import
import Reports from './pages/Reports';
import ActivityLogs from './pages/ActivityLogs';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/create-rfq" element={<CreateRFQ />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/compare-quotations" element={<CompareQuotes />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} /> {/* Maps to clean PO view */}
            <Route path="/invoices" element={<Invoices />} />             {/* Maps to clean Invoice view */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/activity" element={<ActivityLogs />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}