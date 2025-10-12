import React from 'react';

// Fix: Extended props with React.HTMLAttributes<HTMLDivElement> and spread remaining props to allow passing standard div props like onClick.
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-glass-light border border-white border-opacity-20 rounded-2xl shadow-lg backdrop-blur-md p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
