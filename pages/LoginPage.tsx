import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import GlassCard from '../components/ui/GlassCard';
import NeuButton from '../components/ui/NeuButton';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (!success) {
      setError(t('invalid_credentials'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-light to-white">
      <GlassCard className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-brand-dark mb-6">{t('login_to_pos')}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">{t('username')}</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">{t('password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <NeuButton type="submit" className="w-full bg-brand-dark text-white hover:bg-brand-primary">
            {t('login')}
          </NeuButton>
        </form>
      </GlassCard>
    </div>
  );
};

export default LoginPage;