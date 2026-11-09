import React, { useState } from 'react';
import {
  Bus,
  RefreshCw,
  Clock,
  Filter,
  Users,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar
} from 'lucide-react';
import { ShuttleVehicle, ShuttleStatusType } from '../types/transport';
import { StatusBadge } from '../components/StatusBadge';
import { CrowdBadge } from '../components/CrowdBadge';
import { formatMinutes } from '../utils/helpers';

interface ShuttleStatusProps {
  shuttles: ShuttleVehicle[];
  onRefreshShuttles: () => void;
  lastRefreshedTime: string;
  isRefreshing: boolean;
  onViewShuttleDetails: (shuttle: ShuttleVehicle) => void;
}

export const ShuttleStatus: React.FC<ShuttleStatusProps> = ({
  shuttles,
  onRefreshShuttles,
  lastRefreshedTime,
  isRefreshing,
  onViewShuttleDetails,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | ShuttleStatusType>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredShuttles = shuttles.filter((s) => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const handleRefreshClick = () => {
    onRefreshShuttles();
    setToastMessage('Simulation status refreshed with latest arrival times.');
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const activeCount = shuttles.filter((s) => s.status === 'active').length;
  const delayedCount = shuttles.filter((s) => s.status === 'delayed').length;
  const unavailableCount = shuttles.filter((s) => s.status === 'unavailable').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#173B70] uppercase tracking-wider mb-1">
            <Bus className="w-3.5 h-3.5" />
            <span>Fleet Operations Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shuttle Status
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Check shuttle availability, approaching stops, and estimated arrival information.
          </p>
        </div>

        {/* Refresh Status Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-gray-400 block">Last Synced</span>
            <span className="text-xs font-semibold text-gray-700">{lastRefreshedTime}</span>
          </div>

          <button
            onClick={handleRefreshClick}
            disabled={isRefreshing}
            className="px-4 py-2 bg-[#173B70] hover:bg-[#2456A6] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Status'}</span>
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold uppercase">Prototype telemetry updated</span>
        </div>
      )}

      {/* Status Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All Shuttles ({shuttles.length})
        </button>

        <button
          onClick={() => setStatusFilter('active')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            statusFilter === 'active'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Active ({activeCount})</span>
        </button>

        <button
          onClick={() => setStatusFilter('delayed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            statusFilter === 'delayed'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Delayed ({delayedCount})</span>
        </button>

        <button
          onClick={() => setStatusFilter('unavailable')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            statusFilter === 'unavailable'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Unavailable ({unavailableCount})</span>
        </button>
      </div>

      {/* Shuttle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredShuttles.map((shuttle) => (
          <div
            key={shuttle.id}
            onClick={() => onViewShuttleDetails(shuttle)}
            className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#173B70] flex items-center justify-center font-bold text-sm">
                    <Bus className="w-5 h-5 text-[#173B70]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-gray-900">{shuttle.id}</h3>
                      <StatusBadge status={shuttle.status} size="sm" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{shuttle.routeName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Arrival</span>
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

              {/* Next Stop & Occupancy Box */}
              <div className="p-3.5 bg-slate-50 rounded-xl text-xs space-y-2 border border-slate-100 my-3">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-[#2456A6]" />
                    Approaching Stop:
                  </span>
                  <span className="font-bold text-gray-900">{shuttle.nextStop}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600 pt-1 border-t border-slate-200/60">
                  <span className="text-gray-400">Crowd Level:</span>
                  <CrowdBadge level={shuttle.crowdLevel} size="sm" />
                </div>
              </div>

              {/* Model & Amenities */}
              <div className="text-xs text-gray-500 space-y-1">
                <p className="truncate">
                  Vehicle: <span className="font-medium text-gray-700">{shuttle.vehicleModel}</span>
                </p>
                <p className="truncate text-[11px] text-gray-400">
                  Driver: {shuttle.driverDemoName}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                Updated {shuttle.lastUpdated}
              </span>
              <span className="text-[#173B70] font-semibold hover:underline">
                View Full Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Disclaimer */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-500 space-y-1">
        <p className="font-semibold text-gray-700">Prototype Disclaimer:</p>
        <p>
          Status information is simulated for this academic prototype (LPU INT335 Design Thinking Project). Refreshing updates demonstration intervals and simulated delays to illustrate real-time campus fleet tracking.
        </p>
      </div>
    </div>
  );
};
