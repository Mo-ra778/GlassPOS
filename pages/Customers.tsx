import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../hooks/useAppContext';
import GlassCard from '../components/ui/GlassCard';
import NeuButton from '../components/ui/NeuButton';
import { Customer } from '../types';
import { PlusCircleIcon, EditIcon, Trash2Icon, XIcon } from '../components/ui/Icon';

const Customers: React.FC = () => {
  const { t } = useTranslation();
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Omit<Customer, 'id'> | Customer | null>(null);

  const openAddModal = () => {
    setCurrentCustomer({ name: '', phone: '', email: '', address: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCustomer(null);
  };

  const handleSave = async () => {
    if (!currentCustomer) return;
    if ('id' in currentCustomer) {
      await updateCustomer(currentCustomer);
    } else {
      await addCustomer(currentCustomer);
    }
    closeModal();
  };
  
  const handleDelete = async (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
        await deleteCustomer(customerId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCustomer(prev => prev ? { ...prev, [name]: value } : null);
  };

  const CustomerModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <GlassCard className="w-full max-w-lg relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><XIcon/></button>
        <h2 className="text-2xl font-bold mb-4">{currentCustomer && 'id' in currentCustomer ? t('edit_customer') : t('add_customer')}</h2>
        {currentCustomer && (
          <div className="space-y-4">
            <input name="name" value={currentCustomer.name} onChange={handleChange} placeholder="Name" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            <input name="phone" value={currentCustomer.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            <input name="email" type="email" value={currentCustomer.email} onChange={handleChange} placeholder="Email" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            <input name="address" value={currentCustomer.address} onChange={handleChange} placeholder="Address" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            <div className="flex justify-end gap-4 mt-6">
              <NeuButton onClick={closeModal} className="bg-gray-200">{t('cancel')}</NeuButton>
              <NeuButton onClick={handleSave}>{t('save')}</NeuButton>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-dark">{t('customers')}</h1>
        <NeuButton onClick={openAddModal} icon={<PlusCircleIcon />}>{t('add_customer')}</NeuButton>
      </div>
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b-2 border-white/20">
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('name')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('phone')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('email')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right rtl:text-left">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 font-medium">
              {customers.map(customer => (
                <tr key={customer.id} className="border-b border-white/10">
                  <td className="p-4">{customer.name}</td>
                  <td className="p-4">{customer.phone}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4 text-right rtl:text-left">
                    <div className="flex justify-end rtl:justify-start gap-2">
                      <button onClick={() => openEditModal(customer)} className="text-blue-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100"><EditIcon /></button>
                      <button onClick={() => handleDelete(customer.id)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-100"><Trash2Icon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
      {isModalOpen && <CustomerModal />}
    </div>
  );
};

export default Customers;