import React from 'react';
import { ShuttleStatusType } from '../types/transport';
import { getStatusBadgeInfo } from '../utils/helpers';

interface StatusBadgeProps {
  status: ShuttleStatusType;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const info = getStatusBadgeInfo(status);

  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${info.bgClass} ${info.textClass} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${info.dotClass}`} />
      <span>{info.label}</span>
    </span>
  );
};
