import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../hooks/useAppContext';
import GlassCard from '../components/ui/GlassCard';
import NeuButton from '../components/ui/NeuButton';
import { Product } from '../types';
import { PlusCircleIcon, EditIcon, Trash2Icon, XIcon } from '../components/ui/Icon';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { products, addProduct, updateProduct, deleteProduct, settings } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Omit<Product, 'id'> | Product | null>(null);

  const formatCurrency = (amount: number) => new Intl.NumberFormat(settings.language, { style: 'currency', currency: settings.currency }).format(amount);

  const openAddModal = () => {
    setCurrentProduct({ name: '', price: 0, stock: 0, category: '', image: 'https://picsum.photos/seed/newproduct/200/200' });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSave = async () => {
    if (!currentProduct) return;
    if ('id' in currentProduct) {
      await updateProduct(currentProduct);
    } else {
      await addProduct(currentProduct);
    }
    closeModal();
  };
  
  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        await deleteProduct(productId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setCurrentProduct(prev => prev ? { ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value } : null);
  };

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <GlassCard className="w-full max-w-lg relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><XIcon/></button>
        <h2 className="text-2xl font-bold mb-4">{currentProduct && 'id' in currentProduct ? t('edit_product') : t('add_product')}</h2>
        {currentProduct && (
          <div className="space-y-4">
            <input name="name" value={currentProduct.name} onChange={handleChange} placeholder={t('product_name')} className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <input name="price" type="number" value={currentProduct.price} onChange={handleChange} placeholder={t('price')} className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
              <input name="stock" type="number" value={currentProduct.stock} onChange={handleChange} placeholder={t('stock')} className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            </div>
            <input name="category" value={currentProduct.category} onChange={handleChange} placeholder="Category" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
            <input name="image" value={currentProduct.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 bg-white/50 border border-white/30 rounded-lg" />
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
        <h1 className="text-3xl font-bold text-brand-dark">{t('products')}</h1>
        <NeuButton onClick={openAddModal} icon={<PlusCircleIcon />}>{t('add_product')}</NeuButton>
      </div>
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b-2 border-white/20">
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('product_name')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('price')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('stock')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('category')}</th>
                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right rtl:text-left">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 font-medium">
              {products.map(product => (
                <tr key={product.id} className="border-b border-white/10">
                  <td className="p-4 flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    {product.name}
                  </td>
                  <td className="p-4">{formatCurrency(product.price)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 text-right rtl:text-left">
                    <div className="flex justify-end rtl:justify-start gap-2">
                      <button onClick={() => openEditModal(product)} className="text-blue-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100"><EditIcon /></button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-100"><Trash2Icon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
      {isModalOpen && <ProductModal />}
    </div>
  );
};

export default Products;