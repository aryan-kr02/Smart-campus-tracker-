import test from 'node:test';
import assert from 'node:assert/strict';
import {
  findMatchingRoutes,
  findMatchingJourneys,
  getCrowdRecommendation,
  calculateAverageWaitTime,
  formatMinutes
} from './helpers';
import { verifyStudentCredentials } from './auth';
import { ShuttleRoute, ShuttleVehicle } from '../types/transport';


const mockRoutes: ShuttleRoute[] = [
  {
    id: 'R01',
    code: 'R01',
    name: 'Main Campus Route',
    stops: ['stop-b32', 'stop-b14', 'stop-academic'],
    stopNames: ['Block 32', 'Block 14', 'Academic Area'],
    estimatedDurationMinutes: 15,
    frequencyMinutes: 8,
    operatingHours: '07:30 AM – 09:30 PM',
    colorHex: '#173B70',
    description: 'Test Route 1',
    assignedShuttleIds: ['S01']
  },
  {
    id: 'R02',
    code: 'R02',
    name: 'Hostel Route',
    stops: ['stop-hostel', 'stop-b14', 'stop-gate'],
    stopNames: ['Hostel Area', 'Block 14', 'University Gate'],
    estimatedDurationMinutes: 18,
    frequencyMinutes: 10,
    operatingHours: '06:45 AM – 10:15 PM',
    colorHex: '#2456A6',
    description: 'Test Route 2',
    assignedShuttleIds: ['S03']
  }
];

const mockShuttles: ShuttleVehicle[] = [
  {
    id: 'S01',
    routeId: 'R01',
    routeName: 'Main Campus Route',
    status: 'active',
    estimatedArrivalMinutes: 5,
    nextStop: 'Block 14',
    crowdLevel: 'low',
    occupancyEstimatePercent: 30,
    vehicleModel: 'Eco Electric',
    driverDemoName: 'Demo Driver',
    lastUpdated: 'Just now',
    timestamp: Date.now(),
    features: ['AC']
  },
  {
    id: 'S03',
    routeId: 'R02',
    routeName: 'Hostel Route',
    status: 'delayed',
    estimatedArrivalMinutes: 15,
    nextStop: 'University Gate',
    crowdLevel: 'high',
    occupancyEstimatePercent: 85,
    vehicleModel: 'Bus',
    driverDemoName: 'Demo Driver 2',
    lastUpdated: '3 mins ago',
    timestamp: Date.now(),
    features: []
  },
  {
    id: 'S09',
    routeId: 'R01',
    routeName: 'Main Campus Route',
    status: 'unavailable',
    estimatedArrivalMinutes: null,
    nextStop: 'Depot',
    crowdLevel: 'low',
    occupancyEstimatePercent: 0,
    vehicleModel: 'Bus',
    driverDemoName: 'Demo Driver 3',
    lastUpdated: '10 mins ago',
    timestamp: Date.now(),
    features: []
  }
];

test('findMatchingRoutes finds route when both stops exist', () => {
  const matches = findMatchingRoutes('Block 32', 'Academic Area', mockRoutes);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].id, 'R01');
});

test('findMatchingRoutes returns empty if same start and destination', () => {
  const matches = findMatchingRoutes('Block 32', 'Block 32', mockRoutes);
  assert.equal(matches.length, 0);
});

test('findMatchingRoutes returns empty when no route connects stops', () => {
  const matches = findMatchingRoutes('Block 32', 'Hostel Area', mockRoutes);
  assert.equal(matches.length, 0);
});

test('findMatchingJourneys filters out unavailable shuttles', () => {
  const journeys = findMatchingJourneys('Block 32', 'Academic Area', mockRoutes, mockShuttles);
  assert.equal(journeys.length, 1);
  assert.equal(journeys[0].shuttles.length, 1);
  assert.equal(journeys[0].shuttles[0].id, 'S01');
});

test('getCrowdRecommendation provides correct advice for crowd levels', () => {
  const low = getCrowdRecommendation('low');
  assert.match(low.headline, /Good option/);

  const high = getCrowdRecommendation('high');
  assert.match(high.headline, /High crowd level/);
});

test('calculateAverageWaitTime computes mean of active shuttles correctly', () => {
  // S01 is 5 min, S03 is 15 min -> average 10 min
  const avg = calculateAverageWaitTime(mockShuttles);
  assert.equal(avg, 10);
});

test('formatMinutes formats minutes into readable labels', () => {
  assert.equal(formatMinutes(null), 'Temporarily unavailable');
  assert.equal(formatMinutes(0), 'Arriving now');
  assert.equal(formatMinutes(1), '1 minute');
  assert.equal(formatMinutes(7), '7 minutes');
});

test('verifyStudentCredentials rejects empty registration number', () => {
  const result = verifyStudentCredentials('');
  assert.equal(result.success, false);
  assert.match(result.error || '', /Please enter your/);
});

test('verifyStudentCredentials rejects non-numeric invalid registration number format', () => {
  const result = verifyStudentCredentials('ABC999');
  assert.equal(result.success, false);
  assert.match(result.error || '', /Invalid format/);
});

test('verifyStudentCredentials rejects unregistered student number', () => {
  const result = verifyStudentCredentials('99999999');
  assert.equal(result.success, false);
  assert.match(result.error || '', /not found in the LPU University Student Database/);
});

test('verifyStudentCredentials rejects inactive or unenrolled student', () => {
  const result = verifyStudentCredentials('11900123'); // Manpreet Sandhu (isEnrolled: false)
  assert.equal(result.success, false);
  assert.match(result.error || '', /inactive or alumni profile/);
});

test('verifyStudentCredentials approves enrolled student with correct profile', () => {
  const result = verifyStudentCredentials('12204581', '1234');
  assert.equal(result.success, true);
  assert.equal(result.student?.fullName, 'Aarav Sharma');
  assert.equal(result.student?.isEnrolled, true);
  assert.equal(result.student?.registrationNumber, '12204581');
});

