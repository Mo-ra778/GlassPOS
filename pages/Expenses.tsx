import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlassCard from '../components/ui/GlassCard';
import { useAppContext } from '../hooks/useAppContext';
import NeuButton from '../components/ui/NeuButton';
import { Expense } from '../types';
import { PlusCircleIcon, XIcon } from '../components/ui/Icon';

const Expenses: React.FC = () => {
  const { t } = useTranslation();
  const { expenses, settings, addExpense } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Omit<Expense, 'id' | 'date'> | null>(null);

  const formatCurrency = (amount: number) => new Intl.NumberFormat(settings.language, { style: 'currency', currency: settings.currency }).format(amount);

  const openAddModal = () => {
    setCurrentExpense({ description: '', amount: 0, category: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
  };

  const handleSave = async () => {
    if (!currentExpense) return;
    if (currentExpense.description && currentExpense.amount > 0 && currentExpense.category) {
        await addExpense(currentExpense);
        closeModal();
    } else {
        alert("Please fill all fields and ensure amount is greater than 0.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setCurrentExpense(prev => prev ? { ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value } : null);
  };

  const ExpenseModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <GlassCard className="w-full max-w-lg relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><XIcon/></button>
        <h2 className="text-2xl font-bold mb-4">{t('add_expense')}</h2>
        {currentExpense && (
          <div className="space-y-4">
            <input name="description" value={currentExpense.description} onChange={handleChange} placeholder="Description" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <input name="amount" type="number" value={currentExpense.amount} onChange={handleChange} placeholder="Amount" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
              <input name="category" value={currentExpense.category} onChange={handleChange} placeholder="Category" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <NeuButton onClick={closeModal} className="bg-gray-200">{t('cancel')}</NeuButton>
              <NeuButton onClick={handleSave} className="bg-brand-dark text-white hover:bg-brand-primary">{t('save')}</NeuButton>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );

  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-dark">{t('expenses')}</h1>
        <NeuButton onClick={openAddModal} icon={<PlusCircleIcon />} className="bg-brand-dark text-white hover:bg-brand-primary">
            {t('add_expense')}
        </NeuButton>
      </div>
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b-2 border-white/20">
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('date')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('description')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('category')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right rtl:text-left">{t('amount')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 font-medium">
              {expenses.map(expense => (
                <tr key={expense.id} className="border-b border-white/10">
                  <td className="p-4">{new Date(expense.date).toLocaleDateString(settings.language)}</td>
                  <td className="p-4">{expense.description}</td>
                  <td className="p-4">{expense.category}</td>
                  <td className="p-4 text-right rtl:text-left">{formatCurrency(expense.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
      {isModalOpen && <ExpenseModal />}
    </div>
  );
};

export default Expenses;