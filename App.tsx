import React, { Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AppProvider } from './contexts/AppContext';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import PageWrapper from './components/layout/PageWrapper';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Pos from './pages/Pos';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Customers from './pages/Customers';
import Expenses from './pages/Expenses';
import { useAuth } from './hooks/useAuth';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();
    const { i18n } = useTranslation();

    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            document.documentElement.lang = lng;
            if (lng === 'ar') {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = 'ltr';
            }
        };

        handleLanguageChange(i18n.language);
        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);


    if (!user) {
        return <Routes><Route path="*" element={<LoginPage />} /></Routes>;
    }

    return (
        <div className="flex h-screen bg-light-bg text-gray-800">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light-bg p-4 sm:p-6 lg:p-8 relative">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-white opacity-50"></div>
                     <div className="relative">
                        <AnimatePresence mode="wait">
                            <Routes>
                                <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
                                <Route path="/pos" element={<PageWrapper><Pos /></PageWrapper>} />
                                <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
                                <Route path="/customers" element={<PageWrapper><Customers /></PageWrapper>} />
                                <Route path="/expenses" element={<PageWrapper><Expenses /></PageWrapper>} />
                                <Route path="/reports" element={<PageWrapper><Reports /></PageWrapper>} />
                                <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <Suspense fallback="Loading...">
      <AppProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </AppProvider>
    </Suspense>
  );
};

export default App;