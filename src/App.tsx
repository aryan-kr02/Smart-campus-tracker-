import React, { useState, useEffect } from 'react';
import {
  PageId,
  ShuttleVehicle,
  ShuttleRoute,
  CampusStop,
  FeedbackEntry,
  NotificationItem,
  StudentProfile,
  ActiveSearchQuery
} from './types/transport';
import { CAMPUS_STOPS } from './data/stops';
import { CAMPUS_ROUTES } from './data/routes';
import { INITIAL_SHUTTLES } from './data/shuttles';
import {
  getStoredFeedback,
  saveFeedbackToStorage,
  clearFeedbackStorage,
  getStoredNotifications,
  addNotificationToStorage,
  markNotificationsAsRead
} from './utils/localStorage';
import { getStoredAuthUser, clearStoredAuthUser } from './utils/auth';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { ShuttleModal } from './components/ShuttleModal';
import { RouteModal } from './components/RouteModal';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { FindShuttle } from './pages/FindShuttle';
import { AvailableRoutes } from './pages/AvailableRoutes';
import { RoutesStops } from './pages/RoutesStops';
import { ShuttleStatus } from './pages/ShuttleStatus';
import { CrowdInformation } from './pages/CrowdInformation';
import { Feedback } from './pages/Feedback';
import { AboutProject } from './pages/AboutProject';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(() => getStoredAuthUser());

  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Journey Search Query (for passing parameters between search and available routes page)
  const [searchQuery, setSearchQuery] = useState<ActiveSearchQuery>({
    startStop: 'Block 32',
    destStop: 'Academic Area',
    preferredTime: 'now',
    travelDate: new Date().toISOString().split('T')[0],
  });

  // Core Data State
  const [shuttles, setShuttles] = useState<ShuttleVehicle[]>(INITIAL_SHUTTLES);
  const [routes] = useState<ShuttleRoute[]>(CAMPUS_ROUTES);
  const [stops] = useState<CampusStop[]>(CAMPUS_STOPS);

  // LocalStorage Driven State
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Refresh & Telemetry State
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals
  const [inspectingShuttle, setInspectingShuttle] = useState<ShuttleVehicle | null>(null);
  const [inspectingRoute, setInspectingRoute] = useState<ShuttleRoute | null>(null);

  // Load persisted feedback and notifications on initial mount
  useEffect(() => {
    const savedFeedback = getStoredFeedback();
    setFeedbackList(savedFeedback);

    const savedNotifications = getStoredNotifications();
    setNotifications(savedNotifications);
  }, []);

  // Notification triggers helper
  const handleAddNotification = (
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' = 'info'
  ) => {
    const updated = addNotificationToStorage({ title, message, type });
    setNotifications(updated);
  };

  const handleMarkAllNotificationsRead = () => {
    const updated = markNotificationsAsRead();
    setNotifications(updated);
  };

  const handleClearNotifications = () => {
    try {
      localStorage.removeItem('lpu_shuttle_notifications_v1');
      setNotifications([]);
    } catch (e) {
      console.error(e);
    }
  };

  // Feedback Submission Handler
  const handleSubmitFeedback = (entry: FeedbackEntry) => {
    const updated = saveFeedbackToStorage(entry);
    setFeedbackList(updated);

    handleAddNotification(
      'Feedback Stored',
      `Your feedback for category "${entry.category}" with ${entry.rating} stars has been recorded locally.`,
      'success'
    );
  };

  const handleClearFeedbackHistory = () => {
    clearFeedbackStorage();
    setFeedbackList([]);
    handleAddNotification('Feedback Cleared', 'All stored local feedback history was cleared.', 'info');
  };

  // Search Action: Switches to the dedicated "Available Routes" page
  const handleSearchShuttle = (
    start: string,
    dest: string,
    prefTime: string = 'now',
    date?: string
  ) => {
    setSearchQuery({
      startStop: start,
      destStop: dest,
      preferredTime: prefTime,
      travelDate: date || new Date().toISOString().split('T')[0],
    });
    setCurrentPage('available-routes');
    handleAddNotification(
      'Available Routes Identified',
      `Showing matching campus routes and live shuttles from ${start} to ${dest}.`,
      'info'
    );
  };

  // Refresh simulation action
  const handleRefreshShuttles = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Slightly jitter arrival minutes to simulate active GPS progression
      setShuttles((prev) =>
        prev.map((s) => {
          if (s.status === 'unavailable') return s;
          const currentEstimate = s.estimatedArrivalMinutes ?? 6;
          // Step down or cycle back
          let newEstimate = currentEstimate > 2 ? currentEstimate - 1 : 12;
          return {
            ...s,
            estimatedArrivalMinutes: newEstimate,
            lastUpdated: 'Just now',
            timestamp: Date.now(),
          };
        })
      );

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastRefreshedTime(timeStr);
      setIsRefreshing(false);

      handleAddNotification(
        'Shuttle Status Refreshed',
        `Telemetry updated at ${timeStr}. Arrival estimates synchronized.`,
        'success'
      );
    }, 400);
  };

  const handleSelectShuttleForJourney = (
    shuttle: ShuttleVehicle,
    start: string,
    dest: string
  ) => {
    handleAddNotification(
      'Shuttle Selected',
      `Selected ${shuttle.id} (${shuttle.routeName}) from ${start} to ${dest}.`,
      'success'
    );
  };

  const handleLogout = () => {
    clearStoredAuthUser();
    setCurrentUser(null);
  };

  const handleLoginSuccess = (student: StudentProfile) => {
    setCurrentUser(student);
    handleAddNotification(
      'Enrolled Student Verified',
      `Welcome, ${student.fullName}. Verified LPU Student (${student.registrationNumber}).`,
      'success'
    );
  };

  // Gated Access: Require verified university student login first
  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const activeShuttlesCount = shuttles.filter((s) => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#172033] flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-[#173B70]">
      {/* Top Academic Prototype Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Fixed Desktop / Mobile Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(p) => setCurrentPage(p)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          activeShuttlesCount={activeShuttlesCount}
          routesCount={routes.length}
          currentUser={currentUser}
        />

        {/* Topbar with live time, notifications, profile */}
        <Topbar
          currentPage={currentPage}
          onNavigate={(p) => setCurrentPage(p)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onClearNotifications={handleClearNotifications}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Content View Router */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {currentPage === 'dashboard' && (
            <Dashboard
              stops={stops}
              routes={routes}
              shuttles={shuttles}
              onNavigate={(p) => setCurrentPage(p)}
              onViewShuttleDetails={(s) => setInspectingShuttle(s)}
              onViewRouteDetails={(r) => setInspectingRoute(r)}
              onSelectShuttleForJourney={handleSelectShuttleForJourney}
              onSearchShuttle={handleSearchShuttle}
            />
          )}

          {currentPage === 'find-shuttle' && (
            <FindShuttle
              stops={stops}
              routes={routes}
              shuttles={shuttles}
              onViewShuttleDetails={(s) => setInspectingShuttle(s)}
              onNavigate={(p) => setCurrentPage(p)}
              onAddNotification={handleAddNotification}
              searchQuery={searchQuery}
              onSearchShuttle={handleSearchShuttle}
            />
          )}

          {currentPage === 'available-routes' && (
            <AvailableRoutes
              searchQuery={searchQuery}
              onUpdateSearchQuery={(q) => setSearchQuery(q)}
              stops={stops}
              routes={routes}
              shuttles={shuttles}
              onNavigate={(p) => setCurrentPage(p)}
              onViewShuttleDetails={(s) => setInspectingShuttle(s)}
              onSelectShuttleForJourney={handleSelectShuttleForJourney}
            />
          )}

          {currentPage === 'routes-stops' && (
            <RoutesStops
              routes={routes}
              stops={stops}
              shuttles={shuttles}
              onViewRoute={(r) => setInspectingRoute(r)}
            />
          )}

          {currentPage === 'shuttle-status' && (
            <ShuttleStatus
              shuttles={shuttles}
              onRefreshShuttles={handleRefreshShuttles}
              lastRefreshedTime={lastRefreshedTime}
              isRefreshing={isRefreshing}
              onViewShuttleDetails={(s) => setInspectingShuttle(s)}
            />
          )}

          {currentPage === 'crowd-info' && (
            <CrowdInformation
              shuttles={shuttles}
              onViewShuttleDetails={(s) => setInspectingShuttle(s)}
              onNavigate={(p) => setCurrentPage(p)}
            />
          )}

          {currentPage === 'feedback' && (
            <Feedback
              feedbackList={feedbackList}
              onSubmitFeedback={handleSubmitFeedback}
              onClearFeedbackHistory={handleClearFeedbackHistory}
              routes={routes}
              shuttles={shuttles}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'about-project' && <AboutProject />}
        </main>

        {/* Universal Footer */}
        <footer className="mt-auto border-t border-gray-200/80 bg-white py-5 px-4 sm:px-6 lg:px-8 text-xs text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-bold text-gray-800">LPU Shuttle</span> – Smart Campus Transportation System
              <span className="block text-[11px] text-gray-400 mt-0.5">
                INT335 Design Thinking Project • Theme P05: Waiting for the Shuttle
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <button
                onClick={() => setCurrentPage('about-project')}
                className="hover:text-[#173B70] hover:underline cursor-pointer"
              >
                Project Methodology
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentPage('feedback')}
                className="hover:text-[#173B70] hover:underline cursor-pointer"
              >
                Student Feedback
              </button>
              <span>•</span>
              <span className="text-gray-400">Academic Prototype</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Reusable Modals */}
      <ShuttleModal
        shuttle={inspectingShuttle}
        isOpen={!!inspectingShuttle}
        onClose={() => setInspectingShuttle(null)}
        onSelect={(s) => {
          handleAddNotification(
            'Shuttle Selected',
            `Selected Shuttle ${s.id} (${s.routeName}).`,
            'success'
          );
          setInspectingShuttle(null);
          setCurrentPage('available-routes');
        }}
      />

      <RouteModal
        route={inspectingRoute}
        shuttles={shuttles}
        isOpen={!!inspectingRoute}
        onClose={() => setInspectingRoute(null)}
        onSelectShuttle={(s) => {
          setInspectingRoute(null);
          setInspectingShuttle(s);
        }}
      />
    </div>
  );
}
