import React, { useState, useEffect, useRef } from 'react';
import {
  Bus,
  Bell,
  User,
  Menu,
  Clock,
  LogOut,
  GraduationCap,
  CheckCircle2,
  Building,
  ShieldCheck,
  ChevronDown,
  X
} from 'lucide-react';
import { PageId, NotificationItem, StudentProfile } from '../types/transport';
import { NotificationPanel } from './NotificationPanel';

interface TopbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleMobileMenu: () => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onClearNotifications: () => void;
  currentUser?: StudentProfile | null;
  onLogout?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onNavigate,
  onToggleMobileMenu,
  notifications,
  onMarkAllNotificationsRead,
  onClearNotifications,
  currentUser,
  onLogout,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setCurrentDate(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/90 shadow-2xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            aria-label="Navigate to LPU Shuttle Dashboard"
          >
            <div className="w-9 h-9 rounded-xl bg-[#173B70] text-white flex items-center justify-center shadow-xs group-hover:bg-[#2456A6] transition-colors">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-[#173B70] tracking-tight">
                  LPU Shuttle
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                  P05
                </span>
              </div>
              <span className="text-[11px] text-gray-500 font-medium hidden sm:block">
                Smart Campus Transit System
              </span>
            </div>
          </button>
        </div>

        {/* Center / Right: Live Date/Time + Notifications + User Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Live Date and Time Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-[#2456A6]" />
            <span>{currentDate}</span>
            <span className="text-gray-300">•</span>
            <span className="font-mono font-bold text-gray-900">{currentTime}</span>
          </div>

          {/* Prototype Badge */}
          <div className="hidden xl:flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Campus Transit Simulation</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Toggle notifications panel"
              className="p-2 rounded-lg text-gray-600 hover:text-[#173B70] hover:bg-gray-100 transition-colors relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationPanel
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
              notifications={notifications}
              onMarkAllRead={onMarkAllNotificationsRead}
              onClear={onClearNotifications}
            />
          </div>

          {/* User Profile / Student Registration Badge with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200 hover:opacity-90 transition-opacity cursor-pointer text-left"
              aria-label="Open student profile details"
            >
              <div className="w-8 h-8 rounded-full bg-[#173B70] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {currentUser?.avatarInitials || <User className="w-4 h-4" />}
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-gray-800 block leading-tight truncate max-w-[120px]">
                  {currentUser?.fullName || 'Student Pass'}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {currentUser ? `Reg: ${currentUser.registrationNumber}` : 'LPU Campus'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Card */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-gray-200/90 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#173B70] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                      {currentUser?.avatarInitials || 'LP'}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-gray-900 leading-tight">
                        {currentUser?.fullName || 'Verified University Student'}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-xs font-bold text-[#173B70]">
                          {currentUser?.registrationNumber}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Enrolled</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                    aria-label="Close profile menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="py-3 space-y-2 text-xs">
                  <div className="bg-slate-50 rounded-xl p-2.5 space-y-1.5 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-[#2456A6]" />
                      <span className="text-[11px] font-semibold text-gray-700">Programme & School:</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 pl-5">
                      {currentUser?.programme || 'Bachelor of Technology'}
                    </p>
                    <p className="text-[11px] text-gray-500 pl-5">
                      {currentUser?.school || 'Lovely Professional University'}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-2.5 space-y-1 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                      <Building className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-[11px] font-semibold text-gray-700">Campus Residence:</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 pl-5">
                      {currentUser?.residenceType}
                    </p>
                    {currentUser?.hostelBlock && (
                      <p className="text-[11px] text-gray-500 pl-5">
                        {currentUser.hostelBlock}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between px-2 pt-1">
                    <span className="text-[11px] text-gray-500">Transit Pass:</span>
                    <span className="text-[11px] font-bold text-[#173B70] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      {currentUser?.passType || 'Standard Student Pass'}
                    </span>
                  </div>
                </div>

                {/* Sign Out Button */}
                {onLogout && (
                  <div className="pt-3 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-rose-200"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Sign Out / Switch Student</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
