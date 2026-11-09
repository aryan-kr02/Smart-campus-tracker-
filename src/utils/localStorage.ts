import { FeedbackEntry, NotificationItem } from '../types/transport';

const FEEDBACK_STORAGE_KEY = 'lpu_shuttle_feedback_v1';
const NOTIFICATIONS_STORAGE_KEY = 'lpu_shuttle_notifications_v1';

export function getStoredFeedback(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load feedback from LocalStorage', e);
    return [];
  }
}

export function saveFeedbackToStorage(feedback: FeedbackEntry): FeedbackEntry[] {
  try {
    const current = getStoredFeedback();
    const updated = [feedback, ...current];
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save feedback to LocalStorage', e);
    return getStoredFeedback();
  }
}

export function clearFeedbackStorage(): void {
  try {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear feedback in LocalStorage', e);
  }
}

const DEFAULT_INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-welcome',
    title: 'Prototype System Ready',
    message: 'Welcome to the LPU Shuttle Design Thinking prototype (P05). All data is simulated for demonstration.',
    timestamp: 'Just now',
    type: 'info',
    read: false,
  },
  {
    id: 'notif-peak-hour',
    title: 'Peak Travel Advisory',
    message: 'High demand anticipated between 4:30 PM - 5:30 PM around Main Gate and Hostel loop.',
    timestamp: '10 mins ago',
    type: 'warning',
    read: true,
  }
];

export function getStoredNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_NOTIFICATIONS));
      return DEFAULT_INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to get notifications', e);
    return DEFAULT_INITIAL_NOTIFICATIONS;
  }
}

export function addNotificationToStorage(item: Omit<NotificationItem, 'id' | 'read' | 'timestamp'> & { timestamp?: string }): NotificationItem[] {
  try {
    const current = getStoredNotifications();
    const newItem: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: item.title,
      message: item.message,
      timestamp: item.timestamp || 'Just now',
      type: item.type,
      read: false,
    };
    const updated = [newItem, ...current.slice(0, 19)]; // Keep up to 20
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to add notification', e);
    return getStoredNotifications();
  }
}

export function markNotificationsAsRead(): NotificationItem[] {
  try {
    const current = getStoredNotifications();
    const updated = current.map((n) => ({ ...n, read: true }));
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}
