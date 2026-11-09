import { CampusStop } from '../types/transport';

export const CAMPUS_STOPS: CampusStop[] = [
  {
    id: 'stop-b32',
    name: 'Block 32',
    shortCode: 'B32',
    landmark: 'School of Computer Science & Engineering',
    areaType: 'academic',
    description: 'Central engineering hub, near Uni-Mall underpass and robotics laboratories.'
  },
  {
    id: 'stop-b14',
    name: 'Block 14',
    shortCode: 'B14',
    landmark: 'Division of Student Welfare (DSW) & Central Registrar',
    areaType: 'admin',
    description: 'Key administrative corridor, financial aid desk, and central student amenities.'
  },
  {
    id: 'stop-gate',
    name: 'University Gate',
    shortCode: 'GATE',
    landmark: 'Main Highway Gate 1 (NH-1 / GT Road Entrance)',
    areaType: 'gate',
    description: 'Primary campus entrance connector for external autorickshaws, cabs, and transit links.'
  },
  {
    id: 'stop-academic',
    name: 'Academic Area',
    shortCode: 'ACAD',
    landmark: 'Central Library, Law Block 28 & Auditorium 34',
    areaType: 'academic',
    description: 'Major humanities, law, and central library transit junction with wide sheltered walkways.'
  },
  {
    id: 'stop-hostel',
    name: 'Hostel Area',
    shortCode: 'HOSTEL',
    landmark: 'Boys Hostel Complex (BH-1 to BH-5) & Uni-Hospital',
    areaType: 'hostel',
    description: 'Residential core with dining halls, campus 24x7 clinic, and laundry hub.'
  },
  {
    id: 'stop-unimall',
    name: 'Uni-Mall & Sports Complex',
    shortCode: 'MALL',
    landmark: 'Shanti Devi Mittal Indoor Stadium & Shopping Plaza',
    areaType: 'recreation',
    description: 'Commercial amenities, stationery stores, Olympic-size pool, and indoor sports arena.'
  }
];

export const STOP_NAMES = CAMPUS_STOPS.map(s => s.name);
