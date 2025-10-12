import { User, Product, Order, Customer, Expense, Settings, CartItem } from '../types';

// Mock Data
let users: User[] = [
  { id: 1, username: 'medreesi123', role: 'admin' },
  { id: 2, username: 'cashier1', role: 'cashier' },
];

let products: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: `prod_${i + 1}`,
  name: `Product ${i + 1}`,
  price: parseFloat((Math.random() * 50 + 5).toFixed(2)),
  stock: Math.floor(Math.random() * 100),
  category: ['Groceries', 'Electronics', 'Apparel', 'Books'][i % 4],
  image: `https://picsum.photos/seed/product${i+1}/200/200`,
  barcode: `123456789${i.toString().padStart(3, '0')}`,
}));

let orders: Order[] = [];
let customers: Customer[] = Array.from({ length: 15 }, (_, i) => ({
    id: `cust_${i + 1}`,
    name: `Customer ${i + 1}`,
    phone: `555-010${i}`,
    email: `customer${i+1}@example.com`,
    address: `${i+1} Main St, Anytown, USA`
}));

let expenses: Expense[] = Array.from({ length: 10 }, (_, i) => ({
    id: `exp_${i+1}`,
    date: new Date(new Date().setDate(new Date().getDate() - i*2)),
    description: `Expense item ${i+1}`,
    amount: parseFloat((Math.random() * 100 + 10).toFixed(2)),
    category: ['Utilities', 'Rent', 'Supplies'][i % 3]
}));

let settings: Settings = {
  language: 'en',
  currency: 'USD',
  taxRate: 8.5,
  storeLogo: 'https://i.imgur.com/J3c2p42.png',
  printMode: 'thermal',
  storeName: 'medreesi',
  userAvatar: 'https://i.pravatar.cc/150?u=1',
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockApi = {
  // Auth
  login: async (username: string): Promise<User | null> => {
    await delay(500);
    const user = users.find(u => u.username === username);
    return user || null;
  },

  // Products
  getProducts: async (): Promise<Product[]> => { await delay(200); return [...products]; },
  addProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await delay(300);
    const newProduct: Product = { ...productData, id: `prod_${Date.now()}` };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: async (productData: Product): Promise<Product> => {
    await delay(300);
    products = products.map(p => p.id === productData.id ? productData : p);
    return productData;
  },
  deleteProduct: async (productId: string): Promise<void> => {
    await delay(300);
    products = products.filter(p => p.id !== productId);
  },

  // Customers
  getCustomers: async (): Promise<Customer[]> => { await delay(200); return [...customers]; },
  addCustomer: async (customerData: Omit<Customer, 'id'>): Promise<Customer> => {
    await delay(300);
    const newCustomer: Customer = { ...customerData, id: `cust_${Date.now()}` };
    customers.push(newCustomer);
    return newCustomer;
  },
  updateCustomer: async (customerData: Customer): Promise<Customer> => {
    await delay(300);
    customers = customers.map(c => c.id === customerData.id ? customerData : c);
    return customerData;
  },
  deleteCustomer: async (customerId: string): Promise<void> => {
    await delay(300);
    customers = customers.filter(c => c.id !== customerId);
  },

  // Expenses
  getExpenses: async (): Promise<Expense[]> => { await delay(200); return [...expenses]; },
  addExpense: async (expenseData: Omit<Expense, 'id'|'date'>): Promise<Expense> => {
    await delay(300);
    const newExpense: Expense = { ...expenseData, id: `exp_${Date.now()}`, date: new Date() };
    expenses.push(newExpense);
    return newExpense;
  },

  // Orders
  getOrders: async (): Promise<Order[]> => { await delay(200); return [...orders]; },
  createOrder: async (orderData: Omit<Order, 'id' | 'date' | 'userId'>, userId: number): Promise<Order> => {
    await delay(500);
    const newOrder: Order = { ...orderData, id: `ord_${Date.now()}`, date: new Date(), userId };
    orders.push(newOrder);
    // update stock
    newOrder.items.forEach((item: CartItem) => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    return newOrder;
  },

  // Settings
  getSettings: async (): Promise<Settings> => { await delay(100); return settings; },
  updateSettings: async (newSettings: Settings): Promise<Settings> => {
    await delay(300);
    settings = newSettings;
    return settings;
  },
};