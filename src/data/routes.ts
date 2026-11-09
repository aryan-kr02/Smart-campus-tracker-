import { ShuttleRoute } from '../types/transport';

export const CAMPUS_ROUTES: ShuttleRoute[] = [
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
    description: 'Connects computer engineering and tech laboratories through administrative Block 14 to the Central Library and lecture theaters.',
    assignedShuttleIds: ['S01', 'S04']
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
    description: 'Dedicated residential loop connecting hostel clusters and campus clinic directly to Main Gate 1 and student services.',
    assignedShuttleIds: ['S03', 'S05']
  },
  {
    id: 'R03',
    code: 'R03',
    name: 'Academic Route',
    stops: ['stop-academic', 'stop-b32', 'stop-gate'],
    stopNames: ['Academic Area', 'Block 32', 'University Gate'],
    estimatedDurationMinutes: 12,
    frequencyMinutes: 7,
    operatingHours: '07:45 AM – 08:30 PM',
    colorHex: '#0891B2',
    description: 'High-speed corridor linking academic hubs directly to the main exit gate for morning rush and evening dispersal.',
    assignedShuttleIds: ['S02', 'S06']
  },
  {
    id: 'R04',
    code: 'R04',
    name: 'Perimeter Express',
    stops: ['stop-gate', 'stop-unimall', 'stop-b32', 'stop-hostel'],
    stopNames: ['University Gate', 'Uni-Mall & Sports Complex', 'Block 32', 'Hostel Area'],
    estimatedDurationMinutes: 20,
    frequencyMinutes: 15,
    operatingHours: '08:00 AM – 09:00 PM',
    colorHex: '#7C3AED',
    description: 'Perimeter ring route servicing sports facilities, Uni-Mall shopping arcade, and outer hostel dormitories.',
    assignedShuttleIds: ['S07']
  }
];
