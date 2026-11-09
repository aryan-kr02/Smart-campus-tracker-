import React from 'react';
import { Bus, Clock, Users, MapPin, ShieldCheck, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { ShuttleVehicle } from '../types/transport';
import { CrowdBadge } from './CrowdBadge';
import { StatusBadge } from './StatusBadge';
import { formatMinutes, getCrowdRecommendation } from '../utils/helpers';

interface ShuttleModalProps {
  shuttle: ShuttleVehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (shuttle: ShuttleVehicle) => void;
}

export const ShuttleModal: React.FC<ShuttleModalProps> = ({
  shuttle,
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!shuttle) return null;

  const crowdAdvice = getCrowdRecommendation(shuttle.crowdLevel);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Shuttle ${shuttle.id} Details`}
      subtitle={`${shuttle.routeName} • Prototype Telematics View`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Status Header Overview */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#173B70] text-white flex items-center justify-center shadow-xs">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">{shuttle.id}</span>
                <StatusBadge status={shuttle.status} />
              </div>
              <p className="text-xs text-gray-500">{shuttle.vehicleModel}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-400 block">Estimated Arrival</span>
            <span className="text-xl font-extrabold text-[#173B70]">
              {formatMinutes(shuttle.estimatedArrivalMinutes)}
            </span>
          </div>
        </div>

        {/* Current Location & Crowd Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#2456A6]" />
              <span>Next Approaching Stop</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{shuttle.nextStop}</div>
            <p className="text-xs text-gray-500">
              Assigned corridor: <span className="font-medium text-gray-700">{shuttle.routeName}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <Users className="w-4 h-4 text-[#2456A6]" />
                <span>Crowd Density</span>
              </div>
              <CrowdBadge level={shuttle.crowdLevel} size="sm" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">~{shuttle.occupancyEstimatePercent}%</span>
              <span className="text-xs text-gray-500">estimated occupancy</span>
            </div>
            {/* Occupancy Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  shuttle.crowdLevel === 'low'
                    ? 'bg-emerald-500'
                    : shuttle.crowdLevel === 'moderate'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${shuttle.occupancyEstimatePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Crowd Recommendation Box */}
        <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl flex items-start gap-3 text-xs">
          <Info className="w-4 h-4 text-[#2456A6] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-950 block">{crowdAdvice.headline}</span>
            <span className="text-blue-800">{crowdAdvice.advice}</span>
          </div>
        </div>

        {/* Operational & Crew Details */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Operational Metadata (Demonstration)
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-gray-400 block text-[11px]">Assigned Driver</span>
              <span className="font-medium text-gray-800">{shuttle.driverDemoName}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-gray-400 block text-[11px]">Last Telemetry Update</span>
              <span className="font-medium text-gray-800">{shuttle.lastUpdated}</span>
            </div>
          </div>

          {shuttle.features && shuttle.features.length > 0 && (
            <div className="pt-2">
              <span className="text-gray-400 block text-[11px] mb-2 font-medium">On-Board Amenities:</span>
              <div className="flex flex-wrap gap-1.5">
                {shuttle.features.map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1 text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {shuttle.notes && (
            <div className="p-3 bg-amber-50/60 border border-amber-200/50 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Route Note: </strong>
                <span>{shuttle.notes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Prototype Disclaimer */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-[11px] text-gray-500">
          <strong>Notice:</strong> Status information and arrival timings are simulated for this academic prototype (LPU INT335). Selecting a shuttle does not reserve an actual physical seat.
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          {onSelect && shuttle.status !== 'unavailable' && (
            <button
              type="button"
              onClick={() => {
                onSelect(shuttle);
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#173B70] hover:bg-[#2456A6] rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Bus className="w-3.5 h-3.5" />
              Select This Shuttle
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
