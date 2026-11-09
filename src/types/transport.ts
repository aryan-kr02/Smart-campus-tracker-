export type CrowdLevel = 'low' | 'moderate' | 'high';

export type ShuttleStatusType = 'active' | 'delayed' | 'unavailable';

export interface CampusStop {
  id: string;
  name: string;
  shortCode: string;
  landmark: string;
  areaType: 'academic' | 'hostel' | 'gate' | 'recreation' | 'admin';
  description: string;
}

export interface ShuttleRoute {
  id: string;
  name: string;
  code: string;
  stops: string[]; // Stop IDs or Names
  stopNames: string[];
  estimatedDurationMinutes: number;
  frequencyMinutes: number;
  operatingHours: string;
  colorHex: string;
  description: string;
  assignedShuttleIds: string[];
}

export interface ShuttleVehicle {
  id: string;
  routeId: string;
  routeName: string;
  status: ShuttleStatusType;
  estimatedArrivalMinutes: number | null;
  nextStop: string;
  currentStopIndex?: number;
  crowdLevel: CrowdLevel;
  occupancyEstimatePercent: number;
  vehicleModel: string;
  driverDemoName: string;
  lastUpdated: string;
  timestamp: number;
  features: string[];
  notes?: string;
}

export interface FeedbackEntry {
  id: string;
  date: string;
  timestamp: number;
  fullName?: string;
  userType: 'Student' | 'Shuttle Driver' | 'Transport Staff' | 'Other';
  shuttleId?: string;
  routeId?: string;
  category: 'Waiting Time' | 'Shuttle Availability' | 'Overcrowding' | 'Route Information' | 'Safety' | 'Other';
  rating: number; // 1-5
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

export interface StudentProfile {
  registrationNumber: string;
  fullName: string;
  programme: string;
  school: string;
  academicYear: string;
  email: string;
  residenceType: 'Hostel Resident' | 'Day Scholar';
  hostelBlock?: string;
  passType: 'Standard Student Pass' | 'Priority Campus Transit';
  avatarInitials: string;
  isEnrolled: boolean;
}

export interface ActiveSearchQuery {
  startStop: string;
  destStop: string;
  preferredTime: string;
  travelDate?: string;
}

export type PageId =
  | 'dashboard'
  | 'find-shuttle'
  | 'available-routes'
  | 'routes-stops'
  | 'shuttle-status'
  | 'crowd-info'
  | 'feedback'
  | 'about-project';

