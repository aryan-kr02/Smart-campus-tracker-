import React from 'react';
import { Route, Clock, Calendar, Bus, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import { ShuttleRoute, ShuttleVehicle } from '../types/transport';
import { CAMPUS_STOPS } from '../data/stops';
import { StatusBadge } from './StatusBadge';
import { CrowdBadge } from './CrowdBadge';

interface RouteModalProps {
  route: ShuttleRoute | null;
  shuttles: ShuttleVehicle[];
  isOpen: boolean;
  onClose: () => void;
  onSelectShuttle?: (shuttle: ShuttleVehicle) => void;
}

export const RouteModal: React.FC<RouteModalProps> = ({
  route,
  shuttles,
  isOpen,
  onClose,
  onSelectShuttle,
}) => {
  if (!route) return null;

  const assignedShuttles = shuttles.filter((s) => s.routeId === route.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${route.code}: ${route.name}`}
      subtitle="Transit Corridor & Connected Campus Stop Diagram"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Route Key Metrics */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <div>
            <span className="text-[11px] text-gray-500 font-medium block">Duration</span>
            <span className="text-base font-bold text-[#173B70] flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#2456A6]" />
              ~{route.estimatedDurationMinutes} mins
            </span>
          </div>
          <div className="border-x border-gray-200">
            <span className="text-[11px] text-gray-500 font-medium block">Frequency</span>
            <span className="text-base font-bold text-gray-800 flex items-center justify-center gap-1 mt-0.5">
              Every {route.frequencyMinutes}m
            </span>
          </div>
          <div>
            <span className="text-[11px] text-gray-500 font-medium block">Total Stops</span>
            <span className="text-base font-bold text-gray-800 mt-0.5 block">
              {route.stopNames.length} Stops
            </span>
          </div>
        </div>

        {/* Route Description */}
        <p className="text-xs text-gray-600 leading-relaxed bg-blue-50/40 p-3 rounded-lg border border-blue-100">
          {route.description}
        </p>

        {/* Connected Stop Diagram (Visual Linear Flow Diagram) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <Route className="w-3.5 h-3.5 text-[#173B70]" />
              Sequential Stop Progression Diagram
            </h4>
            <span className="text-[11px] text-gray-400">Fixed campus route</span>
          </div>

          <div className="relative pl-6 py-2 space-y-6 before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-0.5 before:bg-[#2456A6]/30">
            {route.stopNames.map((stopName, idx) => {
              const stopData = CAMPUS_STOPS.find((s) => s.name === stopName);
              const isFirst = idx === 0;
              const isLast = idx === route.stopNames.length - 1;

              return (
                <div key={stopName} className="relative flex items-start gap-4">
                  {/* Connected Node Dot */}
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-2xs z-10 ${
                      isFirst
                        ? 'bg-[#173B70] ring-4 ring-blue-100'
                        : isLast
                        ? 'bg-emerald-600 ring-4 ring-emerald-100'
                        : 'bg-[#2456A6]'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 w-full shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">{stopName}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {isFirst ? 'Origin Stop' : isLast ? 'Destination Stop' : `Stop #${idx + 1}`}
                      </span>
                    </div>
                    {stopData && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        {stopData.landmark}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assigned Shuttles Active on this Route */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 flex items-center gap-1.5">
            <Bus className="w-3.5 h-3.5 text-[#173B70]" />
            Shuttles Operating on this Corridor
          </h4>

          {assignedShuttles.length === 0 ? (
            <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">No shuttles currently dispatched.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assignedShuttles.map((s) => (
                <div
                  key={s.id}
                  className="p-3 bg-white rounded-xl border border-gray-200/80 shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">{s.id}</span>
                    <StatusBadge status={s.status} size="sm" />
                  </div>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>
                      Next Stop: <strong className="text-gray-800">{s.nextStop}</strong>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <CrowdBadge level={s.crowdLevel} size="sm" />
                      <span className="font-bold text-[#173B70]">
                        {s.estimatedArrivalMinutes ? `${s.estimatedArrivalMinutes} min` : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {onSelectShuttle && s.status !== 'unavailable' && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectShuttle(s);
                        onClose();
                      }}
                      className="mt-3 w-full py-1.5 text-xs font-medium text-[#173B70] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Select Shuttle {s.id}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-[11px] text-gray-500">
          <strong>Note:</strong> Route schedules and duration metrics reflect prototype baseline simulations.
        </div>
      </div>
    </Modal>
  );
};
