import React, { useState } from 'react';
import {
  Bus,
  Route as RouteIcon,
  Clock,
  Users,
  Search,
  RotateCcw,
  ArrowRight,
  MapPin,
  AlertCircle,
  Sparkles,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  CampusStop,
  ShuttleRoute,
  ShuttleVehicle,
  PageId,
  CrowdLevel
} from '../types/transport';
import { StatCard } from '../components/StatCard';
import { CrowdBadge } from '../components/CrowdBadge';
import { StatusBadge } from '../components/StatusBadge';
import {
  calculateAverageWaitTime,
  formatMinutes
} from '../utils/helpers';


interface DashboardProps {
  stops: CampusStop[];
  routes: ShuttleRoute[];
  shuttles: ShuttleVehicle[];
  onNavigate: (page: PageId) => void;
  onViewShuttleDetails: (shuttle: ShuttleVehicle) => void;
  onViewRouteDetails: (route: ShuttleRoute) => void;
  onSelectShuttleForJourney: (shuttle: ShuttleVehicle, start: string, dest: string) => void;
  onSearchShuttle: (start: string, dest: string, prefTime: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stops,
  routes,
  shuttles,
  onNavigate,
  onViewShuttleDetails,
  onViewRouteDetails,
  onSelectShuttleForJourney,
  onSearchShuttle,
}) => {
  // Journey planner form state
  const [startStop, setStartStop] = useState<string>('Block 32');
  const [destStop, setDestStop] = useState<string>('Academic Area');
  const [preferredTime, setPreferredTime] = useState<string>('now');
  const [searchError, setSearchError] = useState<string | null>(null);

  // Compute stats
  const activeShuttlesCount = shuttles.filter((s) => s.status === 'active').length;
  const availableRoutesCount = routes.length;
  const avgWaitTime = calculateAverageWaitTime(shuttles);

  // Aggregate crowd status: majority or highest
  const highCrowdCount = shuttles.filter((s) => s.crowdLevel === 'high').length;
  const overallCrowd: CrowdLevel = highCrowdCount >= 2 ? 'high' : 'moderate';

  const handleFindShuttle = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);

    if (!startStop || !destStop) {
      setSearchError('Please select both a Starting Point and a Destination.');
      return;
    }

    if (startStop === destStop) {
      setSearchError('Starting Point and Destination cannot be the same. Please choose different locations.');
      return;
    }

    // Direct user to the dedicated Available Routes page with their selected query
    onSearchShuttle(startStop, destStop, preferredTime);
  };

  const handleReset = () => {
    setStartStop('Block 32');
    setDestStop('Academic Area');
    setPreferredTime('now');
    setSearchError(null);
  };


  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#173B70] via-[#1d4687] to-[#2456A6] text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:flex items-center justify-center">
          <Bus className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>P05: Waiting for the Shuttle Prototype</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to LPU Shuttle
          </h1>

          <p className="text-sm sm:text-base text-blue-100 font-medium">
            Your smarter way to travel across campus.
          </p>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Check shuttle availability, estimate arrival times, explore connected campus routes, and avoid peak waiting queues with simulated crowd awareness.
          </p>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('find-shuttle')}
              className="px-4 py-2 bg-[#F4B400] text-gray-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              Find a Shuttle
            </button>
            <button
              onClick={() => onNavigate('routes-stops')}
              className="px-4 py-2 bg-white/15 text-white font-semibold text-xs rounded-xl hover:bg-white/25 transition-colors border border-white/20 flex items-center gap-1.5 cursor-pointer"
            >
              <RouteIcon className="w-3.5 h-3.5" />
              View Campus Routes
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Demonstration Fleet Overview
          </h2>
          <span className="text-[11px] text-gray-400">Updated automatically</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Active Shuttles */}
          <StatCard
            title="Active Shuttles"
            value={activeShuttlesCount}
            subtitle={`${shuttles.length} total prototype vehicles`}
            icon={Bus}
            badgeText="En Route"
            badgeType="success"
            onClick={() => onNavigate('shuttle-status')}
          />

          {/* Card 2: Available Routes */}
          <StatCard
            title="Available Routes"
            value={availableRoutesCount}
            subtitle="Campus corridors mapped"
            icon={RouteIcon}
            badgeText="Active"
            badgeType="primary"
            onClick={() => onNavigate('routes-stops')}
          />

          {/* Card 3: Average Waiting Time */}
          <StatCard
            title="Avg Waiting Time"
            value={`~${avgWaitTime} min`}
            subtitle="Current estimated stop interval"
            icon={Clock}
            badgeText="Simulated"
            badgeType="info"
            onClick={() => onNavigate('find-shuttle')}
          />

          {/* Card 4: Current Crowd Status */}
          <StatCard
            title="Current Crowd Status"
            value={overallCrowd.toUpperCase()}
            subtitle="Peak dispersal conditions"
            icon={Users}
            badgeText={overallCrowd === 'high' ? 'Dense' : 'Moderate'}
            badgeType={overallCrowd === 'high' ? 'warning' : 'success'}
            onClick={() => onNavigate('crowd-info')}
          />
        </div>
      </div>

      {/* Find Your Shuttle Section (Journey Planning Card) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center">
                <Search className="w-4 h-4 text-[#173B70]" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                Find Your Shuttle
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select your origin and destination to identify active shuttle corridors and arrival times.
            </p>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-auto">
            Interactive Search
          </span>
        </div>

        <form onSubmit={handleFindShuttle} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Starting Point */}
            <div className="space-y-1.5">
              <label htmlFor="start-stop" className="block text-xs font-bold text-gray-700">
                1. Starting Point
              </label>
              <div className="relative">
                <select
                  id="start-stop"
                  value={startStop}
                  onChange={(e) => setStartStop(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70] transition-colors"
                >
                  <option value="">-- Choose Origin --</option>
                  {stops.map((stop) => (
                    <option key={stop.id} value={stop.name}>
                      {stop.name} ({stop.shortCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label htmlFor="dest-stop" className="block text-xs font-bold text-gray-700">
                2. Destination
              </label>
              <div className="relative">
                <select
                  id="dest-stop"
                  value={destStop}
                  onChange={(e) => setDestStop(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70] transition-colors"
                >
                  <option value="">-- Choose Destination --</option>
                  {stops.map((stop) => (
                    <option key={stop.id} value={stop.name}>
                      {stop.name} ({stop.shortCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Travel Time */}
            <div className="space-y-1.5">
              <label htmlFor="pref-time" className="block text-xs font-bold text-gray-700">
                3. Preferred Departure Time
              </label>
              <select
                id="pref-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/80 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70] transition-colors"
              >
                <option value="now">Depart Immediately (Next Available)</option>
                <option value="15min">In ~15 Minutes</option>
                <option value="30min">In ~30 Minutes</option>
                <option value="evening">Evening Rush (05:00 PM)</option>
              </select>
            </div>
          </div>

          {searchError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Buttons: Find Shuttle and Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#173B70] hover:bg-[#2456A6] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Find Shuttle & View Available Routes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>


      {/* Recent Shuttle Activity Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Recent Demonstration Shuttle Activity
            </h2>
            <p className="text-xs text-gray-500">
              Live status and arrival estimates across campus corridors (illustrative prototype data).
            </p>
          </div>

          <button
            onClick={() => onNavigate('shuttle-status')}
            className="text-xs font-bold text-[#173B70] hover:text-[#2456A6] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Shuttles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-500 font-semibold uppercase tracking-wider text-[11px] border-y border-gray-200/70">
              <tr>
                <th className="py-3 px-4">Shuttle ID</th>
                <th className="py-3 px-4">Assigned Route</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Estimated Arrival</th>
                <th className="py-3 px-4">Next Stop</th>
                <th className="py-3 px-4">Crowd Level</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shuttles.map((shuttle) => (
                <tr key={shuttle.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-50 text-[#173B70] flex items-center justify-center font-bold text-[11px]">
                      {shuttle.id.replace('S', '')}
                    </div>
                    <span>{shuttle.id}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {shuttle.routeName}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={shuttle.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {formatMinutes(shuttle.estimatedArrivalMinutes)}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {shuttle.nextStop}
                  </td>
                  <td className="py-3 px-4">
                    <CrowdBadge level={shuttle.crowdLevel} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onViewShuttleDetails(shuttle)}
                      className="text-xs font-semibold text-[#173B70] hover:text-[#2456A6] hover:underline cursor-pointer"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-gray-500 flex items-center justify-between">
          <span>* All arrival times, stop positions, and crowd numbers are generated for academic demonstration.</span>
          <span className="font-semibold text-gray-600">LPU Design Thinking P05</span>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
          Quick Actions & Tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('find-shuttle')}
            className="p-4 bg-white rounded-xl border border-gray-200/90 hover:border-blue-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center mb-2 group-hover:bg-[#173B70] group-hover:text-white transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-gray-900 block">Find Shuttle</span>
            <span className="text-[11px] text-gray-500">Plan campus journey</span>
          </button>

          <button
            onClick={() => onNavigate('routes-stops')}
            className="p-4 bg-white rounded-xl border border-gray-200/90 hover:border-blue-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center mb-2 group-hover:bg-[#173B70] group-hover:text-white transition-colors">
              <RouteIcon className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-gray-900 block">View Routes</span>
            <span className="text-[11px] text-gray-500">Explore stops & lines</span>
          </button>

          <button
            onClick={() => onNavigate('crowd-info')}
            className="p-4 bg-white rounded-xl border border-gray-200/90 hover:border-blue-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center mb-2 group-hover:bg-[#173B70] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-gray-900 block">Check Crowd</span>
            <span className="text-[11px] text-gray-500">Avoid waiting rushes</span>
          </button>

          <button
            onClick={() => onNavigate('feedback')}
            className="p-4 bg-white rounded-xl border border-gray-200/90 hover:border-blue-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center mb-2 group-hover:bg-[#173B70] group-hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-gray-900 block">Give Feedback</span>
            <span className="text-[11px] text-gray-500">Share your experience</span>
          </button>
        </div>
      </div>
    </div>
  );
};
