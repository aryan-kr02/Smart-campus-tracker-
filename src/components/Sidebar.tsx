import React from 'react';
import {
  LayoutDashboard,
  Search,
  Route as RouteIcon,
  Bus,
  Users,
  MessageSquare,
  Info,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PageId, StudentProfile } from '../types/transport';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  activeShuttlesCount: number;
  routesCount: number;
  currentUser?: StudentProfile | null;
}


interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
  activeShuttlesCount,
  routesCount,
  currentUser,
}) => {

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'find-shuttle', label: 'Find a Shuttle', icon: Search },
    { id: 'routes-stops', label: 'Routes & Stops', icon: RouteIcon, badge: routesCount },
    { id: 'shuttle-status', label: 'Shuttle Status', icon: Bus, badge: activeShuttlesCount },
    { id: 'crowd-info', label: 'Crowd Information', icon: Users },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'about-project', label: 'About Project', icon: Info },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200/90 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header / Branding */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#173B70] text-white flex items-center justify-center shadow-xs">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-[#173B70] tracking-tight">
                  LPU Shuttle
                </h1>
                <p className="text-[11px] text-gray-500 font-medium">Smart Campus Transit</p>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1" aria-label="Main Navigation">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Campus Transit Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentPage === item.id ||
                (item.id === 'find-shuttle' && currentPage === 'available-routes');

              return (

                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#173B70] text-white shadow-xs'
                      : 'text-gray-600 hover:text-[#173B70] hover:bg-blue-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2456A6]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Project Card */}
        <div className="p-4 border-t border-gray-100 bg-slate-50/60">
          <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Design Thinking P05</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Theme: <em>Waiting for the Shuttle</em>. Lovely Professional University academic prototype.
            </p>
            <button
              onClick={() => handleNavClick('about-project')}
              className="text-[11px] font-bold text-[#173B70] hover:text-[#2456A6] flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>Learn About the Project</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
