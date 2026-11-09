import React from 'react';
import { Bell, CheckCheck, Trash2, Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { NotificationItem } from '../types/transport';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClear: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClear,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#173B70]" />
          <h4 className="text-sm font-bold text-gray-900">Prototype Notifications</h4>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              title="Mark all as read"
              className="p-1 text-xs text-gray-500 hover:text-[#173B70] rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClear}
              title="Clear all"
              className="p-1 text-xs text-gray-500 hover:text-rose-600 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-xs">
            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2 opacity-50" />
            <p>No new notifications at this time.</p>
            <p className="text-[11px] text-gray-400 mt-1">Actions in the prototype generate events here.</p>
          </div>
        ) : (
          notifications.map((item) => {
            const Icon =
              item.type === 'success'
                ? CheckCircle2
                : item.type === 'warning'
                ? AlertTriangle
                : Info;

            const iconColor =
              item.type === 'success'
                ? 'text-emerald-500 bg-emerald-50'
                : item.type === 'warning'
                ? 'text-amber-500 bg-amber-50'
                : 'text-blue-500 bg-blue-50';

            return (
              <div
                key={item.id}
                className={`p-3.5 transition-colors ${
                  item.read ? 'bg-white hover:bg-slate-50/50' : 'bg-blue-50/30 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${iconColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-xs font-bold text-gray-900 truncate">{item.title}</span>
                      <span className="text-[10px] text-gray-400 shrink-0">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center text-[11px] text-gray-500">
        Simulated prototype notification log
      </div>
    </div>
  );
};
