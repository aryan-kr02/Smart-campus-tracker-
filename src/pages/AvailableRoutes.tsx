import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  Bus,
  Clock,
  Route as RouteIcon,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Navigation,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  CampusStop,
  ShuttleRoute,
  ShuttleVehicle,
  PageId,
  ActiveSearchQuery
} from '../types/transport';
import { findMatchingJourneys, getCrowdRecommendation, formatMinutes } from '../utils/helpers';
import { ShuttleCard } from '../components/ShuttleCard';

interface AvailableRoutesProps {
  searchQuery: ActiveSearchQuery;
  onUpdateSearchQuery: (query: ActiveSearchQuery) => void;
  stops: CampusStop[];
  routes: ShuttleRoute[];
  shuttles: ShuttleVehicle[];
  onNavigate: (page: PageId) => void;
  onViewShuttleDetails: (shuttle: ShuttleVehicle) => void;
  onSelectShuttleForJourney: (shuttle: ShuttleVehicle, start: string, dest: string) => void;
}

export const AvailableRoutes: React.FC<AvailableRoutesProps> = ({
  searchQuery,
  onUpdateSearchQuery,
  stops,
  routes,
  shuttles,
  onNavigate,
  onViewShuttleDetails,
  onSelectShuttleForJourney,
}) => {
  const [selectedShuttleId, setSelectedShuttleId] = useState<string | null>(null);

  const { startStop, destStop, preferredTime, travelDate } = searchQuery;

  // Calculate matching routes & active shuttles
  const matchingJourneys = findMatchingJourneys(startStop, destStop, routes, shuttles);

  // All active shuttles across these matching routes
  const allAvailableShuttles = matchingJourneys.flatMap((j) => j.shuttles);

  // Nearest arrival time
  const nearestArrival = allAvailableShuttles.reduce<number | null>((min, s) => {
    if (s.estimatedArrivalMinutes === null) return min;
    if (min === null) return s.estimatedArrivalMinutes;
    return Math.min(min, s.estimatedArrivalMinutes);
  }, null);

  const handleSwapStops = () => {
    onUpdateSearchQuery({
      ...searchQuery,
      startStop: destStop,
      destStop: startStop,
    });
  };

  const selectedShuttleObj = shuttles.find((s) => s.id === selectedShuttleId);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:text-[#173B70] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Dashboard</span>
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('find-shuttle')}
            className="hover:text-[#173B70] hover:underline cursor-pointer"
          >
            Search
          </button>
          <span>/</span>
          <span className="text-[#173B70] font-bold">Available Routes</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('find-shuttle')}
            className="px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Search</span>
          </button>

          <button
            onClick={handleSwapStops}
            className="px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Swap origin and destination"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#173B70]" />
            <span>Swap Direction</span>
          </button>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="bg-gradient-to-r from-[#173B70] via-[#1d4687] to-[#2456A6] text-white rounded-2xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-white/20">
            <RouteIcon className="w-3.5 h-3.5" />
            <span>Search Results Page</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center flex-wrap gap-2">
                <span>Available Routes:</span>
                <span className="text-amber-300 bg-black/20 px-2.5 py-0.5 rounded-lg border border-white/10">
                  {startStop}
                </span>
                <ArrowRight className="w-5 h-5 text-blue-200 shrink-0" />
                <span className="text-amber-300 bg-black/20 px-2.5 py-0.5 rounded-lg border border-white/10">
                  {destStop}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl">
                Displaying all direct campus transit corridors, scheduled frequencies, and real-time arriving shuttles for your selected route.
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="bg-white/15 backdrop-blur-xs rounded-xl p-3 border border-white/20 shrink-0 flex items-center gap-4 text-xs">
              <div>
                <span className="text-[11px] text-blue-200 block">Corridors Found</span>
                <span className="text-lg font-black text-white">{matchingJourneys.length}</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <span className="text-[11px] text-blue-200 block">Next Arrival</span>
                <span className="text-base font-black text-amber-300">
                  {nearestArrival !== null ? `~${nearestArrival} min` : 'Arriving soon'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Journey Notification (if user clicked Select) */}
      {selectedShuttleObj && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-emerald-950">
                  Active Selected Journey: Shuttle {selectedShuttleObj.id} ({selectedShuttleObj.routeName})
                </h3>
                <p className="text-xs text-emerald-800">
                  Boarding at <strong>{startStop}</strong> towards <strong>{destStop}</strong>. Estimated arrival at stop in {formatMinutes(selectedShuttleObj.estimatedArrivalMinutes)}.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedShuttleId(null)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Route Cards List */}
      {matchingJourneys.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Bus className="w-4 h-4 text-[#173B70]" />
              <span>Matching Route Corridors ({matchingJourneys.length})</span>
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              Click a shuttle to inspect telemetry or select for your journey
            </span>
          </div>

          <div className="space-y-6">
            {matchingJourneys.map((match, idx) => {
              const { route, shuttles: routeShuttles } = match;

              // Find stop sequence between startStop and destStop
              const startIndex = route.stopNames.indexOf(startStop);
              const destIndex = route.stopNames.indexOf(destStop);
              const stopsBetween =
                startIndex !== -1 && destIndex !== -1
                  ? Math.abs(destIndex - startIndex)
                  : 1;

              return (
                <div
                  key={route.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden transition-all hover:shadow-md"
                >
                  {/* Route Header Banner */}
                  <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="px-3 py-1 rounded-xl font-black text-sm text-white shadow-xs"
                          style={{ backgroundColor: route.colorHex || '#173B70' }}
                        >
                          {route.code}
                        </span>
                        <div>
                          <h3 className="text-lg font-extrabold text-gray-900">
                            {route.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {route.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-600">
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                          <Clock className="w-3.5 h-3.5 text-[#2456A6]" />
                          <span>~{route.estimatedDurationMinutes} min trip</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                          <RouteIcon className="w-3.5 h-3.5 text-[#173B70]" />
                          <span>Every {route.frequencyMinutes} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Visual Stop Progression */}
                    <div className="mt-5 pt-4 border-t border-gray-200/60">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Route Stop Corridor Progression:
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {route.stopNames.map((stopName, sIdx) => {
                          const isOrigin = stopName === startStop;
                          const isTarget = stopName === destStop;
                          const isBetween =
                            startIndex !== -1 &&
                            destIndex !== -1 &&
                            sIdx > Math.min(startIndex, destIndex) &&
                            sIdx < Math.max(startIndex, destIndex);

                          return (
                            <React.Fragment key={stopName}>
                              <div
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border ${
                                  isOrigin
                                    ? 'bg-[#173B70] text-white border-[#173B70] shadow-xs'
                                    : isTarget
                                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                                    : isBetween
                                    ? 'bg-blue-50 text-[#173B70] border-blue-200'
                                    : 'bg-white text-gray-500 border-gray-200'
                                }`}
                              >
                                {isOrigin && <MapPin className="w-3 h-3 text-emerald-300" />}
                                {isTarget && <CheckCircle2 className="w-3 h-3 text-amber-950" />}
                                <span>{stopName}</span>
                                {isOrigin && <span className="text-[10px] opacity-80">(Origin)</span>}
                                {isTarget && <span className="text-[10px] opacity-80">(Destination)</span>}
                              </div>
                              {sIdx < route.stopNames.length - 1 && (
                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Active Shuttles on this Route */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                        <Bus className="w-3.5 h-3.5 text-[#173B70]" />
                        <span>Live Operating Shuttles on {route.code} ({routeShuttles.length})</span>
                      </h4>
                      <span className="text-xs text-gray-400">
                        Operating Hours: {route.operatingHours}
                      </span>
                    </div>

                    {routeShuttles.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {routeShuttles.map((shuttle) => (
                          <div
                            key={shuttle.id}
                            className={`rounded-xl border p-4 transition-all relative ${
                              selectedShuttleId === shuttle.id
                                ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-200'
                                : 'border-gray-200 hover:border-[#173B70] bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <span className="font-mono text-xs font-bold text-gray-500">
                                  Vehicle
                                </span>
                                <h5 className="text-base font-extrabold text-gray-900 leading-tight">
                                  {shuttle.id}
                                </h5>
                                <span className="text-[11px] text-gray-500">
                                  {shuttle.vehicleModel}
                                </span>
                              </div>

                              <div className="text-right">
                                <span className="text-[10px] text-gray-400 block">Arrival ETA</span>
                                <span className="text-sm font-black text-[#173B70]">
                                  {formatMinutes(shuttle.estimatedArrivalMinutes)}
                                </span>
                              </div>
                            </div>

                            {/* Next Stop & Crowd */}
                            <div className="space-y-2 py-2 border-t border-gray-100 text-xs">
                              <div className="flex items-center justify-between text-gray-600">
                                <span className="text-gray-400">Current Next Stop:</span>
                                <span className="font-semibold text-gray-900 truncate max-w-[130px]">
                                  {shuttle.nextStop}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-gray-600">
                                <span className="text-gray-400">Crowd Level:</span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                    shuttle.crowdLevel === 'low'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : shuttle.crowdLevel === 'moderate'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-rose-100 text-rose-800'
                                  }`}
                                >
                                  {shuttle.crowdLevel}
                                </span>
                              </div>

                              {/* Mini Occupancy Bar */}
                              <div className="space-y-1 pt-1">
                                <div className="flex justify-between text-[10px] text-gray-400">
                                  <span>Occupancy</span>
                                  <span>{shuttle.occupancyEstimatePercent}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
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

                            {/* Shuttle Action Buttons */}
                            <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onViewShuttleDetails(shuttle)}
                                className="flex-1 py-1.5 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer text-center"
                              >
                                Telemetry
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedShuttleId(shuttle.id);
                                  onSelectShuttleForJourney(shuttle, startStop, destStop);
                                }}
                                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center ${
                                  selectedShuttleId === shuttle.id
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    : 'bg-[#173B70] hover:bg-[#2456A6] text-white shadow-2xs'
                                }`}
                              >
                                {selectedShuttleId === shuttle.id ? 'Selected' : 'Select'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-500">
                        No active shuttles currently broadcasting on this route corridor.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State: No direct route found */
        <div className="bg-white rounded-2xl border border-gray-200/90 p-8 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-gray-900">
              No Direct Route Connecting These Stops
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              No single campus shuttle connects <strong>{startStop}</strong> directly to{' '}
              <strong>{destStop}</strong>. In the LPU campus network, please transfer via central transit hubs such as <strong>Block 14</strong> or <strong>University Gate</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('find-shuttle')}
              className="px-4 py-2 bg-[#173B70] text-white text-xs font-bold rounded-xl hover:bg-[#2456A6] transition-colors cursor-pointer"
            >
              Choose Different Stops
            </button>
            <button
              onClick={() => onNavigate('routes-stops')}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              View All Campus Routes
            </button>
          </div>
        </div>
      )}

      {/* Helpful Campus Commute Notes */}
      <div className="bg-slate-50 rounded-2xl border border-gray-200/80 p-5 text-xs text-gray-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <Info className="w-4 h-4 text-[#173B70]" />
          <span>Campus Transit Decision Advice (Design Thinking P05)</span>
        </div>
        <p className="leading-relaxed">
          Estimated travel time across central campus stops averages 10–18 minutes. If walking takes under 10 minutes and crowd levels are high during period changes (e.g. 05:00 PM rush), walking may be faster than queueing for peak shuttles.
        </p>
      </div>
    </div>
  );
};
