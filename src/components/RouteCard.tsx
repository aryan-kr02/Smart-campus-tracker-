import React from 'react';
import { Route, Clock, Calendar, ChevronRight, Bus } from 'lucide-react';
import { ShuttleRoute } from '../types/transport';

interface RouteCardProps {
  route: ShuttleRoute;
  onViewRoute: (route: ShuttleRoute) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onViewRoute }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-[#173B70] text-white font-extrabold text-xs tracking-wider">
              {route.code}
            </span>
            <h3 className="font-bold text-base text-gray-900 tracking-tight">{route.name}</h3>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#173B70] border border-blue-200">
            {route.stopNames.length} Stops
          </span>
        </div>

        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {route.description}
        </p>

        {/* Linear Stop Sequence Chips */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Stops Sequence:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {route.stopNames.map((stop, i) => (
              <React.Fragment key={stop}>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md font-medium text-[11px]">
                  {stop}
                </span>
                {i < route.stopNames.length - 1 && (
                  <span className="text-gray-300 text-xs font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Meta Stats */}
        <div className="grid grid-cols-2 gap-2 py-3 px-3.5 bg-slate-50 rounded-lg text-xs border border-slate-100 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-3.5 h-3.5 text-[#2456A6]" />
            <span>Est. ~{route.estimatedDurationMinutes} mins</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-3.5 h-3.5 text-[#2456A6]" />
            <span>Every {route.frequencyMinutes} mins</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={() => onViewRoute(route)}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#173B70] text-white text-xs font-semibold hover:bg-[#2456A6] transition-colors cursor-pointer"
      >
        <span>View Route Details & Diagram</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
