import React from 'react';
import { Bus, Clock, MapPin, Eye, Check } from 'lucide-react';
import { ShuttleVehicle } from '../types/transport';
import { CrowdBadge } from './CrowdBadge';
import { StatusBadge } from './StatusBadge';
import { formatMinutes } from '../utils/helpers';

interface ShuttleCardProps {
  shuttle: ShuttleVehicle;
  startingStop?: string;
  destinationStop?: string;
  estimatedDurationMin?: number;
  isSelected?: boolean;
  onViewDetails: (shuttle: ShuttleVehicle) => void;
  onSelect?: (shuttle: ShuttleVehicle) => void;
}

export const ShuttleCard: React.FC<ShuttleCardProps> = ({
  shuttle,
  startingStop,
  destinationStop,
  estimatedDurationMin,
  isSelected = false,
  onViewDetails,
  onSelect,
}) => {
  const isUnavailable = shuttle.status === 'unavailable';

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 p-5 shadow-xs flex flex-col justify-between ${
        isSelected
          ? 'border-[#173B70] ring-2 ring-blue-100 bg-blue-50/20'
          : 'border-gray-200/90 hover:border-blue-300 hover:shadow-md'
      }`}
    >
      <div>
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center font-bold text-sm shrink-0">
              <Bus className="w-5 h-5 text-[#173B70]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-gray-900 tracking-tight">{shuttle.id}</h3>
                <StatusBadge status={shuttle.status} size="sm" />
              </div>
              <p className="text-xs text-gray-500 font-medium">{shuttle.routeName}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-gray-400 block font-medium">Estimated Arrival</span>
            <span
              className={`text-sm font-extrabold ${
                shuttle.status === 'delayed'
                  ? 'text-amber-600'
                  : shuttle.status === 'unavailable'
                  ? 'text-gray-400'
                  : 'text-[#173B70]'
              }`}
            >
              {formatMinutes(shuttle.estimatedArrivalMinutes)}
            </span>
          </div>
        </div>

        {/* Route / Stops Information */}
        <div className="my-3 py-3 px-3.5 bg-slate-50/80 rounded-lg text-xs space-y-2 border border-slate-100">
          {startingStop && destinationStop ? (
            <div className="flex items-center justify-between text-gray-700">
              <div className="flex items-center gap-1 font-semibold truncate">
                <MapPin className="w-3.5 h-3.5 text-[#173B70] shrink-0" />
                <span className="truncate">{startingStop}</span>
              </div>
              <span className="text-gray-400 text-xs px-1">→</span>
              <div className="flex items-center gap-1 font-semibold text-gray-800 truncate">
                <span className="truncate">{destinationStop}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-gray-600">
              <span className="text-gray-400">Approaching Stop:</span>
              <span className="font-semibold text-gray-800">{shuttle.nextStop}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              Trip Duration
            </span>
            <span className="font-bold text-gray-800">
              {estimatedDurationMin ? `~${estimatedDurationMin} mins` : '~10-15 mins'}
            </span>
          </div>
        </div>

        {/* Crowd Status Pill */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="text-gray-500 text-[11px]">Crowd Condition:</span>
          <CrowdBadge level={shuttle.crowdLevel} size="sm" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onViewDetails(shuttle)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200/80 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-gray-500" />
          View Details
        </button>

        {onSelect && (
          <button
            type="button"
            disabled={isUnavailable}
            onClick={() => onSelect(shuttle)}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              isSelected
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : isUnavailable
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#173B70] text-white hover:bg-[#2456A6]'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Selected
              </>
            ) : (
              'Select Shuttle'
            )}
          </button>
        )}
      </div>
    </div>
  );
};
