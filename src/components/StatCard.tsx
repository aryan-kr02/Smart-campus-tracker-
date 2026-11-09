import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'info' | 'primary';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = 'primary',
  onClick,
}) => {
  const badgeStyles = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  }[badgeType];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs transition-all duration-200 ${
        onClick ? 'hover:shadow-md hover:border-blue-300 cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#173B70]" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{value}</span>
        {badgeText && (
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeStyles}`}>
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1.5 text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
};
