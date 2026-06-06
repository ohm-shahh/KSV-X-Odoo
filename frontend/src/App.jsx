import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';

// App pages (each renders inside <Layout/>)
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import CreateRFQ from './pages/CreateRFQ';
import Quotations from './pages/Quotations';
import CompareQuotes from './pages/CompareQuotes';
import Approvals from './pages/Approvals';
import PurchaseOrders from './pages/PurchaseOrders';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import ActivityLogs from './pages/ActivityLogs';

function Protected({ children, allowedRoles }) {
  return <ProtectedRoute allowedRoles={allowedRoles}>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route path="/" element={<Protected><Dashboard /></Protected>} />
            <Route path="/vendors" element={<Protected><Vendors /></Protected>} />
            <Route path="/create-rfq" element={<Protected allowedRoles={['admin', 'officer']}><CreateRFQ /></Protected>} />
            <Route path="/quotations" element={<Protected><Quotations /></Protected>} />
            <Route path="/compare-quotations" element={<Protected><CompareQuotes /></Protected>} />
            <Route path="/approvals" element={<Protected allowedRoles={['admin', 'manager']}><Approvals /></Protected>} />
            <Route path="/purchase-orders" element={<Protected><PurchaseOrders /></Protected>} />
            <Route path="/invoices" element={<Protected><Invoices /></Protected>} />
            <Route path="/reports" element={<Protected><Reports /></Protected>} />
            <Route path="/activity" element={<Protected allowedRoles={['admin']}><ActivityLogs /></Protected>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
