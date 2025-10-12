import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Product, CartItem, Order, Customer, Expense, Settings } from '../types';
import { mockApi } from '../services/mockApi';

interface AppContextType {
  // Auth
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  // State
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  customers: Customer[];
  expenses: Expense[];
  settings: Settings;
  // Actions
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  addToCart: (product: Product) => void;
  updateCartItem: (productId: string, quantity: number, discount: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  completeOrder: (paymentMethod: 'cash' | 'card' | 'multiple') => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  updateCustomer: (customer: Customer) => Promise<void>;
  deleteCustomer: (customerId: string) => Promise<void>;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => Promise<void>;
  updateSettings: (settings: Settings) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<Settings>({ language: 'en', currency: 'USD', taxRate: 0, storeLogo: '', printMode: 'thermal', storeName: '', userAvatar: '' });
  const [loading, setLoading] = useState(true);
  
  // Initial Data Fetch
  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        const [productsData, ordersData, customersData, expensesData, settingsData] = await Promise.all([
            mockApi.getProducts(),
            mockApi.getOrders(),
            mockApi.getCustomers(),
            mockApi.getExpenses(),
            mockApi.getSettings()
        ]);
        setProducts(productsData);
        setOrders(ordersData);
        setCustomers(customersData);
        setExpenses(expensesData);
        setSettings(settingsData);
        setLoading(false);
    };
    loadData();
  }, []);

  // Auth Actions
  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock password check
    if (password === 'medreesi123') {
        const loggedInUser = await mockApi.login(username);
        if (loggedInUser) {
            setUser(loggedInUser);
            return true;
        }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  // Product Actions
  const addProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = await mockApi.addProduct(product);
    setProducts(prev => [...prev, newProduct]);
  };
  const updateProduct = async (product: Product) => {
    const updatedProduct = await mockApi.updateProduct(product);
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  const deleteProduct = async (productId: string) => {
    await mockApi.deleteProduct(productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Cart Actions
  const addToCart = (product: Product) => {
    setCart(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1, discount: 0 }];
    });
  };
  const updateCartItem = (productId: string, quantity: number, discount: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity, discount } : item));
  };
  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };
  const clearCart = () => setCart([]);
  
  const completeOrder = async (paymentMethod: 'cash' | 'card' | 'multiple') => {
    if (!user || cart.length === 0) return;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscount = cart.reduce((sum, item) => sum + (item.price * item.quantity * item.discount / 100), 0);
    const taxableAmount = subtotal - totalDiscount;
    const taxAmount = taxableAmount * (settings.taxRate / 100);
    const totalAmount = taxableAmount + taxAmount;
    
    const orderData = {
        items: cart,
        subtotal,
        tax: taxAmount,
        discount: totalDiscount,
        total: totalAmount,
        paymentMethod,
    };

    const newOrder = await mockApi.createOrder(orderData, user.id);
    setOrders(prev => [...prev, newOrder]);
    // Refetch products to update stock
    const productsData = await mockApi.getProducts();
    setProducts(productsData);
    clearCart();
  };

  // Customer Actions
  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    const newCustomer = await mockApi.addCustomer(customer);
    setCustomers(prev => [...prev, newCustomer]);
  };
  const updateCustomer = async (customer: Customer) => {
    const updatedCustomer = await mockApi.updateCustomer(customer);
    setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };
  const deleteCustomer = async (customerId: string) => {
    await mockApi.deleteCustomer(customerId);
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  };
  
  // Expense Actions
  const addExpense = async (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense = await mockApi.addExpense(expense);
    setExpenses(prev => [...prev, newExpense]);
  };

  // Settings Actions
  const updateSettings = async (newSettings: Settings) => {
    const updatedSettings = await mockApi.updateSettings(newSettings);
    setSettings(updatedSettings);
  };

  const contextValue: AppContextType = {
    user, login, logout,
    products, cart, orders, customers, expenses, settings,
    addProduct, updateProduct, deleteProduct,
    addToCart, updateCartItem, removeFromCart, clearCart, completeOrder,
    addCustomer, updateCustomer, deleteCustomer,
    addExpense,
    updateSettings
  };
  
  if (loading) {
    return <div>Loading application...</div>;
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};