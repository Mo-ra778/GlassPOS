export interface User {
    id: number;
    username: string;
    role: 'admin' | 'cashier';
}

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    barcode?: string;
}

export interface CartItem extends Product {
    quantity: number;
    discount: number; // as a percentage
}

export interface Order {
    id: string;
    date: Date;
    items: CartItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    paymentMethod: 'cash' | 'card' | 'multiple';
    userId: number;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

export interface Expense {
    id: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
}

export interface Settings {
    language: 'en' | 'ar';
    currency: string;
    taxRate: number; // as a percentage
    storeLogo: string;
    printMode: 'a4' | 'thermal';
    storeName: string;
    userAvatar: string;
}