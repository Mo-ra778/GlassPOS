import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../hooks/useAppContext';
import GlassCard from '../components/ui/GlassCard';
import NeuButton from '../components/ui/NeuButton';
import { SearchIcon, Trash2Icon, XIcon } from '../components/ui/Icon';

const Pos: React.FC = () => {
  const { t } = useTranslation();
  const { products, cart, addToCart, updateCartItem, removeFromCart, completeOrder, settings } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, searchTerm]);

  const { subtotal, totalDiscount, tax, total } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscount = cart.reduce((sum, item) => sum + (item.price * item.quantity * item.discount / 100), 0);
    const taxableAmount = subtotal - totalDiscount;
    const taxAmount = taxableAmount * (settings.taxRate / 100);
    const totalAmount = taxableAmount + taxAmount;
    return { subtotal, totalDiscount, tax: taxAmount, total: totalAmount };
  }, [cart, settings.taxRate]);
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat(settings.language, { style: 'currency', currency: settings.currency }).format(amount);

  const handleCompleteOrder = async (paymentMethod: 'cash' | 'card' | 'multiple') => {
    await completeOrder(paymentMethod);
    setIsPaymentModalOpen(false);
  };

  const ProductGrid = () => (
    <GlassCard className="flex-[3] h-[calc(100vh-14rem)] overflow-y-auto">
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t('search_products')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <GlassCard key={product.id} className="p-2 cursor-pointer transition-transform hover:scale-105" onClick={() => addToCart(product)}>
            <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-2" />
            <p className="text-sm font-semibold truncate">{product.name}</p>
            <p className="text-xs text-brand-dark font-bold">{formatCurrency(product.price)}</p>
          </GlassCard>
        ))}
      </div>
    </GlassCard>
  );

  const Cart = () => (
    <GlassCard className="flex-[2] h-[calc(100vh-14rem)] flex flex-col">
      <h2 className="text-xl font-bold mb-4">{t('cart')}</h2>
      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">{t('empty_cart')}</div>
      ) : (
        <div className="flex-1 overflow-y-auto -mr-4 pr-4">
            {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 mb-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg"/>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">{formatCurrency(item.price)}</p>
                    </div>
                    <input type="number" min="1" value={item.quantity} onChange={e => updateCartItem(item.id, parseInt(e.target.value) || 1, item.discount)} className="w-14 p-1 text-center bg-white/50 border border-white/30 rounded-lg" />
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600"><Trash2Icon className="w-5 h-5"/></button>
                </div>
            ))}
        </div>
      )}
      <div className="mt-auto border-t-2 border-white/20 pt-4 space-y-2 text-sm">
        <div className="flex justify-between"><span>{t('subtotal')}</span><span>{formatCurrency(subtotal)}</span></div>
        <div className="flex justify-between"><span>{t('tax')} ({settings.taxRate}%)</span><span>{formatCurrency(tax)}</span></div>
        <div className="flex justify-between"><span>{t('discount')}</span><span className="text-green-600">-{formatCurrency(totalDiscount)}</span></div>
        <div className="flex justify-between font-bold text-lg text-brand-dark pt-2 border-t border-white/20 mt-2"><span>{t('total')}</span><span>{formatCurrency(total)}</span></div>
        <NeuButton disabled={cart.length === 0} onClick={() => setIsPaymentModalOpen(true)} className="w-full mt-4 bg-brand-dark text-white hover:bg-brand-primary">{t('checkout')}</NeuButton>
      </div>
    </GlassCard>
  );
  
  const PaymentModal = () => (
     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <GlassCard className="w-full max-w-md relative">
            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><XIcon/></button>
            <h2 className="text-2xl font-bold mb-4 text-center">{t('payment')}</h2>
            <div className="text-center mb-6">
                <p className="text-gray-600">{t('total')}</p>
                <p className="text-4xl font-bold text-brand-dark">{formatCurrency(total)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <NeuButton onClick={() => handleCompleteOrder('cash')} className="py-6">{t('cash')}</NeuButton>
                <NeuButton onClick={() => handleCompleteOrder('card')} className="py-6">{t('card')}</NeuButton>
                <NeuButton onClick={() => handleCompleteOrder('multiple')} className="py-6">{t('multiple')}</NeuButton>
            </div>
        </GlassCard>
    </div>
  );

  return (
    <div className="flex gap-6">
      <ProductGrid />
      <Cart />
      {isPaymentModalOpen && <PaymentModal />}
    </div>
  );
};

export default Pos;