import React, { useState, useMemo } from 'react';
import {
  Route as RouteIcon,
  Search,
  Filter,
  MapPin,
  Clock,
  RotateCcw,
  Sparkles,
  Building,
  GraduationCap,
  Shield,
  Layers
} from 'lucide-react';
import { CampusStop, ShuttleRoute, ShuttleVehicle } from '../types/transport';
import { RouteCard } from '../components/RouteCard';

interface RoutesStopsProps {
  routes: ShuttleRoute[];
  stops: CampusStop[];
  shuttles: ShuttleVehicle[];
  onViewRoute: (route: ShuttleRoute) => void;
}

export const RoutesStops: React.FC<RoutesStopsProps> = ({
  routes,
  stops,
  shuttles,
  onViewRoute,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState('all');
  const [selectedStartStop, setSelectedStartStop] = useState('all');

  // Filter routes based on search term, route ID, and starting stop
  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      // 1. Text search
      const matchesSearch =
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.stopNames.some((stop) => stop.toLowerCase().includes(searchTerm.toLowerCase()));

      // 2. Filter by Route ID
      const matchesRouteId = selectedRouteId === 'all' || route.id === selectedRouteId;

      // 3. Filter by Starting stop (first stop of the route)
      const matchesStartStop =
        selectedStartStop === 'all' || route.stopNames[0] === selectedStartStop;

      return matchesSearch && matchesRouteId && matchesStartStop;
    });
  }, [routes, searchTerm, selectedRouteId, selectedStartStop]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRouteId('all');
    setSelectedStartStop('all');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#173B70] uppercase tracking-wider mb-1">
          <RouteIcon className="w-3.5 h-3.5" />
          <span>Transit Network Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Routes & Stops
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore available demonstration shuttle routes, sequential stops, transit intervals, and campus landmarks.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search by Name */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by route name or landmark..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
            />
          </div>

          {/* Filter by Route ID */}
          <div className="lg:col-span-3">
            <select
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
            >
              <option value="all">All Route IDs</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.code} - {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Starting Stop */}
          <div className="lg:col-span-3">
            <select
              value={selectedStartStop}
              onChange={(e) => setSelectedStartStop(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
            >
              <option value="all">All Starting Stops</option>
              {stops.map((s) => (
                <option key={s.id} value={s.name}>
                  Starts at: {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="lg:col-span-1 flex justify-end">
            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="w-full lg:w-auto p-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="lg:hidden">Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Badges Status */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Showing <strong>{filteredRoutes.length}</strong> of {routes.length} demonstration routes
          </span>
          <span className="text-[11px] text-gray-400">
            * All route schedules and durations are academic simulation data
          </span>
        </div>
      </div>

      {/* Routes Grid */}
      {filteredRoutes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoutes.map((route) => (
            <RouteCard key={route.id} route={route} onViewRoute={onViewRoute} />
          ))}
        </div>
      ) : (
        <div className="p-10 bg-white rounded-2xl border border-gray-200/90 text-center space-y-3">
          <RouteIcon className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="font-bold text-base text-gray-800">No matching routes found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting the filters to view all campus routes.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#173B70] text-white text-xs font-semibold rounded-xl hover:bg-[#2456A6] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Campus Stops Directory */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Campus Stop Directory
            </h2>
            <p className="text-xs text-gray-500">
              Key passenger pickup points, sheltered boarding sheds, and landmark references.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {stops.length} Campus Hubs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {stops.map((stop) => {
            const connectedRoutes = routes.filter((r) => r.stopNames.includes(stop.name));

            return (
              <div
                key={stop.id}
                className="p-4 rounded-xl border border-gray-100 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#173B70] flex items-center justify-center font-bold text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-sm text-gray-900">{stop.name}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200">
                    {stop.shortCode}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {stop.landmark}
                </p>

                <p className="text-[11px] text-gray-400 leading-normal">
                  {stop.description}
                </p>

                <div className="pt-2 border-t border-gray-200/50 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">Routes:</span>
                  {connectedRoutes.map((cr) => (
                    <span
                      key={cr.id}
                      className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100/70 text-[#173B70] rounded"
                    >
                      {cr.code}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
