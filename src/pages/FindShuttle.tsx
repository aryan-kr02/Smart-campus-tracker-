import React, { useState } from 'react';
import {
  Search,
  ArrowLeftRight,
  RotateCcw,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Bus,
  CheckCircle2,
  Info,
  Sparkles,
  ArrowRight,
  Route as RouteIcon,
  Navigation
} from 'lucide-react';
import { CampusStop, ShuttleRoute, ShuttleVehicle, PageId, ActiveSearchQuery } from '../types/transport';

interface FindShuttleProps {
  stops: CampusStop[];
  routes: ShuttleRoute[];
  shuttles: ShuttleVehicle[];
  onViewShuttleDetails: (shuttle: ShuttleVehicle) => void;
  onNavigate: (page: PageId) => void;
  onAddNotification: (title: string, message: string, type: 'info' | 'success' | 'warning') => void;
  searchQuery: ActiveSearchQuery;
  onSearchShuttle: (start: string, dest: string, prefTime: string, date?: string) => void;
}

export const FindShuttle: React.FC<FindShuttleProps> = ({
  stops,
  routes,
  shuttles,
  onViewShuttleDetails,
  onNavigate,
  onAddNotification,
  searchQuery,
  onSearchShuttle,
}) => {
  const [startStop, setStartStop] = useState<string>(searchQuery.startStop || 'Block 32');
  const [destStop, setDestStop] = useState<string>(searchQuery.destStop || 'Academic Area');
  const [travelDate, setTravelDate] = useState<string>(
    searchQuery.travelDate || new Date().toISOString().split('T')[0]
  );
  const [departureTime, setDepartureTime] = useState<string>(searchQuery.preferredTime || 'now');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Perform search -> Navigates to dedicated Available Routes page
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setValidationError(null);

    if (!startStop || !destStop) {
      setValidationError('Please select both a starting stop and a destination.');
      return;
    }

    if (startStop === destStop) {
      setValidationError('Starting stop and destination cannot be the same. Please choose different stops.');
      return;
    }

    onSearchShuttle(startStop, destStop, departureTime, travelDate);
  };

  // Swap locations button
  const handleSwap = () => {
    const temp = startStop;
    setStartStop(destStop);
    setDestStop(temp);
    setValidationError(null);
  };

  // Clear button
  const handleClear = () => {
    setStartStop('Block 32');
    setDestStop('Academic Area');
    setDepartureTime('now');
    setValidationError(null);
  };

  // Quick corridor selector
  const handleQuickCorridor = (origin: string, destination: string) => {
    setStartStop(origin);
    setDestStop(destination);
    onSearchShuttle(origin, destination, departureTime, travelDate);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#173B70] uppercase tracking-wider mb-1">
          <Search className="w-3.5 h-3.5" />
          <span>Campus Journey Planner</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Find Your Shuttle
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose your origin and destination. Clicking &quot;Search Shuttles&quot; opens the dedicated Available Routes page with real-time arrivals and crowd forecasts.
        </p>
      </div>

      {/* Journey Search Card */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center font-bold">
              <Bus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Trip Parameter Configuration</h2>
              <span className="text-xs text-gray-400">Lovely Professional University Shuttle Network</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            6 Campus Stops Mapped
          </span>
        </div>

        <form onSubmit={handleSearch} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* Origin Dropdown */}
            <div className="lg:col-span-4 space-y-1.5">
              <label htmlFor="find-origin" className="block text-xs font-bold text-gray-700">
                Starting Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="find-origin"
                  value={startStop}
                  onChange={(e) => {
                    setStartStop(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
                >
                  <option value="">-- Select Starting Stop --</option>
                  {stops.map((stop) => (
                    <option key={stop.id} value={stop.name}>
                      {stop.name} ({stop.shortCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex justify-center pb-0.5">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Starting Point and Destination"
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-[#173B70] hover:bg-blue-50/70 hover:border-blue-200 transition-colors cursor-pointer"
                aria-label="Swap starting stop and destination"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Dropdown */}
            <div className="lg:col-span-4 space-y-1.5">
              <label htmlFor="find-destination" className="block text-xs font-bold text-gray-700">
                Destination <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="find-destination"
                  value={destStop}
                  onChange={(e) => {
                    setDestStop(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
                >
                  <option value="">-- Select Destination Stop --</option>
                  {stops.map((stop) => (
                    <option key={stop.id} value={stop.name}>
                      {stop.name} ({stop.shortCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Date */}
            <div className="lg:col-span-3 space-y-1.5">
              <label htmlFor="find-date" className="block text-xs font-bold text-gray-700">
                Travel Date
              </label>
              <div className="relative">
                <input
                  id="find-date"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
                />
              </div>
            </div>
          </div>

          {/* Departure Time Filter & Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label htmlFor="find-dept-time" className="block text-xs font-bold text-gray-700">
                Preferred Departure Window
              </label>
              <select
                id="find-dept-time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
              >
                <option value="now">Immediate (Next active shuttle)</option>
                <option value="10min">Within 10 minutes</option>
                <option value="20min">Within 20 minutes</option>
                <option value="30min">Within 30 minutes</option>
                <option value="later">Evening Rush (05:00 PM)</option>
              </select>
            </div>

            <div className="flex items-end justify-end gap-2.5">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#2456A6] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search Shuttles & View Routes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
        </form>
      </div>

      {/* Quick Popular Campus Corridors (1-Click Navigates to Available Routes Page) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-gray-900">
              Popular Campus Corridors (1-Click Route Search)
            </h3>
          </div>
          <span className="text-xs text-gray-400">Frequent Student Journeys</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleQuickCorridor('Block 32', 'Academic Area')}
            className="p-3.5 rounded-xl border border-gray-200 hover:border-[#173B70] hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-gray-900 group-hover:text-[#173B70]">
                Block 32 → Academic Area
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#173B70] group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Served by Route R01 (Main Campus) • ~12 mins
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleQuickCorridor('Hostel Area', 'University Gate')}
            className="p-3.5 rounded-xl border border-gray-200 hover:border-[#173B70] hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-gray-900 group-hover:text-[#173B70]">
                Hostel Area → University Gate
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#173B70] group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Served by Route R02 (Hostel Line) • ~18 mins
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleQuickCorridor('Block 14', 'Uni-Mall & Sports Complex')}
            className="p-3.5 rounded-xl border border-gray-200 hover:border-[#173B70] hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-gray-900 group-hover:text-[#173B70]">
                Block 14 → Uni-Mall
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#173B70] group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Served by Route R04 (Perimeter Express) • ~10 mins
            </p>
          </button>
        </div>
      </div>

      {/* Campus Stop Network Directory */}
      <div className="bg-slate-50/70 rounded-2xl border border-gray-200/80 p-5 space-y-3 text-xs text-gray-600">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <Info className="w-4 h-4 text-[#173B70]" />
          <span>Campus Stop Directory & Interchange Notice</span>
        </div>
        <p className="leading-relaxed">
          <strong>Block 14</strong> and <strong>University Gate</strong> serve as central interchange stations connecting all 4 campus routes. If your journey does not have a direct route, boarding any shuttle to Block 14 allows an easy transfer to your destination.
        </p>
      </div>
    </div>
  );
};
