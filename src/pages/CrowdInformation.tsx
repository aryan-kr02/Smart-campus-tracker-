import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
  TrendingUp,
  MapPin,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ShuttleVehicle, CrowdLevel, PageId } from '../types/transport';
import { CrowdBadge } from '../components/CrowdBadge';
import { getCrowdRecommendation } from '../utils/helpers';

interface CrowdInformationProps {
  shuttles: ShuttleVehicle[];
  onViewShuttleDetails: (shuttle: ShuttleVehicle) => void;
  onNavigate: (page: PageId) => void;
}

export const CrowdInformation: React.FC<CrowdInformationProps> = ({
  shuttles,
  onViewShuttleDetails,
  onNavigate,
}) => {
  const [filterLevel, setFilterLevel] = useState<'all' | CrowdLevel>('all');

  const filteredShuttles = shuttles.filter((s) => {
    if (filterLevel === 'all') return true;
    return s.crowdLevel === filterLevel;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#173B70] uppercase tracking-wider mb-1">
          <Users className="w-3.5 h-3.5" />
          <span>Commuter Comfort & Safety</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Crowd Information
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Check crowd levels before choosing your shuttle to avoid long queues, overcrowding, and boarding delays.
        </p>
      </div>

      {/* Crowd Status Category Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Low Crowd */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-emerald-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              LOW CROWD
            </span>
            <CrowdBadge level="low" size="sm" showIcon={false} />
          </div>
          <p className="text-xs text-emerald-950 font-semibold">
            More comfortable boarding conditions.
          </p>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Seating readily available. Optimal for rapid boarding and peaceful campus transit.
          </p>
          <div className="pt-2 text-[11px] font-bold text-emerald-700 uppercase">
            Recommendation: Good option – lower crowd level.
          </div>
        </div>

        {/* Moderate Crowd */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-amber-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              MODERATE CROWD
            </span>
            <CrowdBadge level="moderate" size="sm" showIcon={false} />
          </div>
          <p className="text-xs text-amber-950 font-semibold">
            Some passengers are present.
          </p>
          <p className="text-xs text-amber-800 leading-relaxed">
            Limited seating and standard standing capacity. Normal turnaround times at intermediate stops.
          </p>
          <div className="pt-2 text-[11px] font-bold text-amber-700 uppercase">
            Recommendation: Allow some extra boarding time.
          </div>
        </div>

        {/* High Crowd */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-rose-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              HIGH CROWD
            </span>
            <CrowdBadge level="high" size="sm" showIcon={false} />
          </div>
          <p className="text-xs text-rose-950 font-semibold">
            Crowded conditions expected.
          </p>
          <p className="text-xs text-rose-800 leading-relaxed">
            High passenger volume during class transition or gate dispersal. Boarding may take longer.
          </p>
          <div className="pt-2 text-[11px] font-bold text-rose-700 uppercase">
            Recommendation: Consider another shuttle or departure time.
          </div>
        </div>
      </div>

      {/* Filter and Overview */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Active Fleet Crowd Conditions
            </h2>
            <p className="text-xs text-gray-500">
              Live simulation of vehicle density across active routes.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                filterLevel === 'all'
                  ? 'bg-[#173B70] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Levels ({shuttles.length})
            </button>
            <button
              onClick={() => setFilterLevel('low')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                filterLevel === 'low'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Low ({shuttles.filter((s) => s.crowdLevel === 'low').length})
            </button>
            <button
              onClick={() => setFilterLevel('moderate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                filterLevel === 'moderate'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Moderate ({shuttles.filter((s) => s.crowdLevel === 'moderate').length})
            </button>
            <button
              onClick={() => setFilterLevel('high')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                filterLevel === 'high'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              High ({shuttles.filter((s) => s.crowdLevel === 'high').length})
            </button>
          </div>
        </div>

        {/* Crowd Status Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-500 font-semibold uppercase tracking-wider text-[11px] border-y border-gray-200/70">
              <tr>
                <th className="py-3 px-4">Shuttle ID</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Next Stop</th>
                <th className="py-3 px-4">Crowd Status</th>
                <th className="py-3 px-4">Suggested Action</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredShuttles.map((shuttle) => {
                const rec = getCrowdRecommendation(shuttle.crowdLevel);

                return (
                  <tr key={shuttle.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      {shuttle.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {shuttle.routeName}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {shuttle.nextStop}
                    </td>
                    <td className="py-3 px-4">
                      <CrowdBadge level={shuttle.crowdLevel} size="sm" />
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      <span className="block text-gray-900 font-semibold">{rec.headline}</span>
                      <span className="text-[11px] text-gray-500">{rec.advice}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onViewShuttleDetails(shuttle)}
                        className="text-xs font-semibold text-[#173B70] hover:text-[#2456A6] hover:underline cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campus Typical Peak-Hour Crowd Advisory Schedule */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Campus Hourly Commuter Density Profile
            </h2>
            <p className="text-xs text-gray-500">
              Design Thinking pattern analysis of peak student movements across Lovely Professional University.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#173B70]">
            P05 Research Pattern
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/50 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#173B70]" />
                08:30 AM – 09:30 AM
              </span>
              <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                HIGH DENSITY
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Morning Lecture Rush: High influx from Hostel Area & Main Gate towards Blocks 32, 14, and 34.
            </p>
            <p className="text-[11px] text-gray-500">
              Tip: Catch shuttles departing before 08:35 AM for comfortable seating.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/50 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#173B70]" />
                12:30 PM – 01:45 PM
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                MODERATE
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Lunch & Recess Movement: Travel concentrated towards Uni-Mall food court and hostel mess halls.
            </p>
            <p className="text-[11px] text-gray-500">
              Tip: Perimeter shuttle (R04) offers faster transit to food arcades.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/50 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#173B70]" />
                04:45 PM – 05:45 PM
              </span>
              <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                HIGH DENSITY
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Evening Dispersal: Academic blocks emptying out towards University Gate and residential dorms.
            </p>
            <p className="text-[11px] text-gray-500">
              Tip: Allow 10 extra minutes or use sheltered walking corridors.
            </p>
          </div>
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-500 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#2456A6] shrink-0 mt-0.5" />
        <div>
          <strong className="text-gray-700 block">Demonstration Data Notice:</strong>
          <span>
            Crowd categories (Low, Moderate, High) are rule-based prototype indicators designed to test commuter decision interfaces. They do not represent verified camera passenger counts or live sensor telemetry.
          </span>
        </div>
      </div>
    </div>
  );
};
