
import React from 'react';
import { useTranslation } from 'react-i18next';
import GlassCard from '../components/ui/GlassCard';

const Reports: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-dark mb-6">{t('reports')}</h1>
      <GlassCard>
        <p>Reports page is under construction.</p>
      </GlassCard>
    </div>
  );
};

export default Reports;
