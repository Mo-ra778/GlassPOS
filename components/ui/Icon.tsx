
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({ children, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};

export const DashboardIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></Icon>;
export const PosIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M2 6h12"/><path d="M14 6l4 .88V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v2Z"/><path d="M18 10h4v4h-4v-4Z"/><path d="M6 18h.01"/></Icon>;
export const ProductsIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></Icon>;
export const CustomersIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
export const ExpensesIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M15 6.5A2.5 2.5 0 0 1 17.5 9V11a2 2 0 0 1-2 2h-2.5a2 2 0 0 1-2-2V6.5a2.5 2.5 0 0 1 2.5-2.5Z"/><path d="M12 13V2"/><path d="M8 2v11"/><path d="M5 2v4"/><path d="M2 2v20h20V2Z"/><path d="m20 15-5-5"/></Icon>;
export const ReportsIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></Icon>;
export const SettingsIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></Icon>;
export const LogoutIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></Icon>;
export const SearchIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Icon>;
export const PlusCircleIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></Icon>;
export const Trash2Icon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></Icon>;
export const EditIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></Icon>;
export const XIcon: React.FC<{className?: string}> = ({className}) => <Icon className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon>;

