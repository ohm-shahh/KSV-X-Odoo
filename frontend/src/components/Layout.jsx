import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/authContextValue';
import {
  LayoutDashboard, Users, FileText, ClipboardList,
  CheckSquare, ShoppingBag, Receipt, BarChart3, Activity, Sun, Moon, LogOut
} from 'lucide-react';

// `roles` omitted = visible to everyone. Otherwise only those roles see the link.
const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Vendors', icon: Users, path: '/vendors', roles: ['admin', 'officer', 'manager'] },
  { name: "RFQ's", icon: FileText, path: '/create-rfq', roles: ['admin', 'officer'] },
  { name: 'Quotations', icon: ClipboardList, path: '/quotations' },
  { name: 'Approvals', icon: CheckSquare, path: '/approvals', roles: ['admin', 'manager'] },
  { name: 'Purchase orders', icon: ShoppingBag, path: '/purchase-orders' },
  { name: 'Invoices', icon: Receipt, path: '/invoices' },
  { name: 'Reports', icon: BarChart3, path: '/reports', roles: ['admin', 'officer', 'manager'] },
  { name: 'Activity', icon: Activity, path: '/activity', roles: ['admin'] }
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const initials = (user?.email || 'VB').slice(0, 2).toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#f9f8f4] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased transition-colors duration-300">
      
      {/* High-End Architectural Sidebar (Clean, un-crowded w-72) */}
      <aside className="w-72 bg-white dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800/60 flex flex-col fixed h-full z-50 justify-between px-5 py-8 transition-colors duration-300">
        <div>
          {/* Technical Brand Signature Header - Fixed wrapping */}
          <div className="pb-6 px-3 border-b border-zinc-200/80 dark:border-zinc-800/40 flex items-center justify-between whitespace-nowrap">
            <div>
              <h1 className="text-sm font-bold tracking-[0.12em] uppercase text-zinc-900 dark:text-white">
                VENDOR<span className="text-emerald-500 font-normal text-base">/</span>BRIDGE
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">Enterprise Hub</p>
            </div>
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          
          {/* Clean Navigation Tree */}
          <nav className="py-8 space-y-1.5">
            {sidebarItems
              .filter((item) => !item.roles || (user && item.roles.includes(user.role)))
              .map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[13px] font-medium tracking-wide transition-all duration-200 ${
                    isActive 
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm font-semibold border border-zinc-800 dark:border-zinc-200' 
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] stroke-[2] ${isActive ? 'text-emerald-500' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* User Profile Footer Workspace */}
        <div className="pt-5 border-t border-zinc-200/80 dark:border-zinc-800/40 flex items-center gap-3.5 px-2">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-sm border border-zinc-200 dark:border-zinc-700">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200 truncate">{user?.email || 'Guest'}</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono truncate capitalize">{user?.role || 'unknown'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Framework Layout Container */}
      <div className="flex-1 pl-72">
        <header className="h-16 border-b border-zinc-200/60 dark:border-zinc-800/40 flex items-center justify-between px-8 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-40 transition-colors duration-300">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono">
            Network Status: <span className="text-emerald-500 font-bold">Secure</span>
          </div>

          {/* Polished Theme Toggle Controller */}
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-xs cursor-pointer group"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-500 transition-colors" />
            )}
          </button>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}