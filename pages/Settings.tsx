import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../hooks/useAppContext';
import GlassCard from '../components/ui/GlassCard';
import NeuButton from '../components/ui/NeuButton';
import { Settings as SettingsType } from '../types';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { settings, updateSettings } = useAppContext();
  const [localSettings, setLocalSettings] = useState<SettingsType>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (localSettings.language !== i18n.language) {
      i18n.changeLanguage(localSettings.language);
    }
  }, [localSettings.language, i18n]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setLocalSettings(prev => ({ ...prev, [name]: val }));
  };
  
  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-dark mb-6">{t('settings')}</h1>
      <GlassCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('store_name')}</label>
              <input
                type="text"
                name="storeName"
                value={localSettings.storeName}
                onChange={handleChange}
                className="w-full p-2 bg-white/50 border border-white/30 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('language')}</label>
              <select
                name="language"
                value={localSettings.language}
                onChange={handleChange}
                className="w-full p-2 bg-white/50 border border-white/30 rounded-lg"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('currency')}</label>
              <input
                type="text"
                name="currency"
                value={localSettings.currency}
                onChange={handleChange}
                className="w-full p-2 bg-white/50 border border-white/30 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('tax_rate')}</label>
              <input
                type="number"
                name="taxRate"
                value={localSettings.taxRate}
                onChange={handleChange}
                className="w-full p-2 bg-white/50 border border-white/30 rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t('user_avatar')}</label>
                <input
                    type="text"
                    name="userAvatar"
                    value={localSettings.userAvatar}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 bg-white/50 border border-white/30 rounded-lg"
                />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('store_logo')}</label>
              <input
                type="text"
                name="storeLogo"
                value={localSettings.storeLogo}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 bg-white/50 border border-white/30 rounded-lg"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('print_mode')}</label>
              <select
                name="printMode"
                value={localSettings.printMode}
                onChange={handleChange}
                className="w-full p-2 bg-white/50 border border-white/30 rounded-lg"
              >
                <option value="a4">{t('a4_invoice')}</option>
                <option value="thermal">{t('thermal_receipt')}</option>
              </select>
            </div>
             <div className="flex items-center justify-center gap-4 pt-4">
                {localSettings.userAvatar && <img src={localSettings.userAvatar} alt="User Avatar" className="w-24 h-24 rounded-full object-cover" />}
                {localSettings.storeLogo && <img src={localSettings.storeLogo} alt="Store Logo" className="w-24 h-24 rounded-lg object-contain" />}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <NeuButton onClick={handleSave} className={`${saved ? 'bg-green-200' : ''}`}>
            {saved ? 'Saved!' : t('save')}
          </NeuButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default Settings;