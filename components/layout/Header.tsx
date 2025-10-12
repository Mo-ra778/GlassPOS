import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../hooks/useAppContext';

const Header: React.FC = () => {
    const { user } = useAuth();
    const { settings } = useAppContext();
    const location = useLocation();
    const { t } = useTranslation();

    const getPageTitle = () => {
        const path = location.pathname.split('/')[1] || 'dashboard';
        return t(path as any);
    };

    return (
        <header className="bg-white/30 backdrop-blur-sm p-4 flex justify-between items-center shadow-md z-10">
            <h1 className="text-2xl font-bold text-brand-dark">{getPageTitle()}</h1>
            {user && (
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="text-right rtl:text-left">
                        <p className="font-semibold text-gray-700">{settings.storeName || user.username}</p>
                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={settings.userAvatar || `https://i.pravatar.cc/150?u=${user.id}`}
                        alt="User Avatar"
                    />
                </div>
            )}
        </header>
    );
};

export default Header;