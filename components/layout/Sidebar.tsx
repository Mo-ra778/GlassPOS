import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import {
  DashboardIcon, PosIcon, ProductsIcon, CustomersIcon, ExpensesIcon,
  ReportsIcon, SettingsIcon, LogoutIcon
} from '../ui/Icon';

const navItems = [
  { to: '/', label: 'dashboard', icon: DashboardIcon },
  { to: '/pos', label: 'pos', icon: PosIcon },
  { to: '/products', label: 'products', icon: ProductsIcon },
  { to: '/customers', label: 'customers', icon: CustomersIcon },
  { to: '/expenses', label: 'expenses', icon: ExpensesIcon },
  { to: '/reports', label: 'reports', icon: ReportsIcon },
  { to: '/settings', label: 'settings', icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white/50 backdrop-blur-lg flex flex-col shadow-2xl p-4">
      <div className="text-2xl font-bold text-brand-dark text-center py-6">
        Glass POS
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg text-gray-600 hover:bg-brand-light hover:text-brand-dark transition-all duration-200 relative rtl:flex-row-reverse ${isActive ? 'bg-brand-light text-brand-dark font-bold shadow-inner' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <motion.div layoutId="active-pill" className="absolute inset-0 bg-brand-primary/10 rounded-lg" />}
                <Icon className="w-6 h-6 z-10" />
                <span className="z-10">{t(label)}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-4 w-full p-3 rounded-lg text-red-500 hover:bg-red-100 transition-all duration-200 rtl:flex-row-reverse"
        >
          <LogoutIcon className="w-6 h-6" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;