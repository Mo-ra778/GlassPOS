
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../hooks/useAppContext';
import GlassCard from '../components/ui/GlassCard';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { orders, settings, expenses } = useAppContext();

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const todaysOrders = orders.filter(o => new Date(o.date) >= startOfToday);
  const monthlyOrders = orders.filter(o => new Date(o.date) >= startOfMonth);

  const todaysRevenue = todaysOrders.reduce((sum, o) => sum + o.total, 0);
  const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + o.total, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(settings.language, { style: 'currency', currency: settings.currency }).format(amount);
  };
    
  const salesData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(today.getFullYear(), i, 1);
    const monthlySales = orders
      .filter(o => {
        const orderDate = new Date(o.date);
        return orderDate.getFullYear() === today.getFullYear() && orderDate.getMonth() === i;
      })
      .reduce((sum, o) => sum + o.total, 0);

    return {
      name: month.toLocaleString(settings.language, { month: 'short' }),
      sales: monthlySales,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <GlassCard className="lg:col-span-1">
        <h3 className="text-lg font-semibold text-gray-600">{t('total_revenue')} ({t('today')})</h3>
        <p className="text-3xl font-bold text-brand-dark mt-2">{formatCurrency(todaysRevenue)}</p>
      </GlassCard>
      <GlassCard className="lg:col-span-1">
        <h3 className="text-lg font-semibold text-gray-600">{t('total_revenue')} ({t('this_month')})</h3>
        <p className="text-3xl font-bold text-brand-dark mt-2">{formatCurrency(monthlyRevenue)}</p>
      </GlassCard>
       <GlassCard className="lg:col-span-1">
        <h3 className="text-lg font-semibold text-gray-600">{t('total_orders')} ({t('today')})</h3>
        <p className="text-3xl font-bold text-brand-dark mt-2">{todaysOrders.length}</p>
      </GlassCard>
      <GlassCard className="lg:col-span-1">
        <h3 className="text-lg font-semibold text-gray-600">{t('total_orders')} ({t('this_month')})</h3>
        <p className="text-3xl font-bold text-brand-dark mt-2">{monthlyOrders.length}</p>
      </GlassCard>

      <GlassCard className="md:col-span-2 lg:col-span-4 h-96">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{t('monthly_sales')}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
            <Bar dataKey="sales" fill="#00BCD4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
