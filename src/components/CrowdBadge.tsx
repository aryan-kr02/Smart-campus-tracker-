import React from 'react';
import { Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { CrowdLevel } from '../types/transport';

interface CrowdBadgeProps {
  level: CrowdLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const CrowdBadge: React.FC<CrowdBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const config = {
    low: {
      label: 'LOW CROWD',
      bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotClass: 'bg-emerald-500',
      icon: CheckCircle2,
      subtext: 'Comfortable boarding',
    },
    moderate: {
      label: 'MODERATE',
      bgClass: 'bg-amber-50 text-amber-700 border-amber-200',
      dotClass: 'bg-amber-500',
      icon: Users,
      subtext: 'Normal passenger volume',
    },
    high: {
      label: 'HIGH CROWD',
      bgClass: 'bg-rose-50 text-rose-700 border-rose-200',
      dotClass: 'bg-rose-500',
      icon: AlertTriangle,
      subtext: 'High density / delay possible',
    },
  }[level] || {
    label: 'NORMAL',
    bgClass: 'bg-gray-50 text-gray-700 border-gray-200',
    dotClass: 'bg-gray-400',
    icon: Users,
    subtext: 'Standard',
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  }[size];

  const IconComp = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bgClass} ${sizeClasses}`}
      title={`Simulated Crowd: ${config.label} - ${config.subtext}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass} animate-pulse`} />
      {showIcon && <IconComp className="w-3.5 h-3.5 shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
};
