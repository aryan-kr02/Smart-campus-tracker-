import { StudentProfile } from '../types/transport';
import { UNIVERSITY_STUDENT_DATABASE } from '../data/students';

const AUTH_STORAGE_KEY = 'lpu_shuttle_auth_user_v1';

export interface AuthVerificationResult {
  success: boolean;
  student?: StudentProfile;
  error?: string;
}

/**
 * Searches the university student registry database by registration number.
 */
export function findStudentByRegistration(regNo: string) {
  const cleanRegNo = regNo.trim();
  if (!cleanRegNo) return undefined;
  return UNIVERSITY_STUDENT_DATABASE.find(
    (s) => s.registrationNumber.toLowerCase() === cleanRegNo.toLowerCase()
  );
}

/**
 * Verifies student credentials against the official University Student Database:
 * 1. Checks that registration number is provided.
 * 2. Checks if the student exists in the university database.
 * 3. Validates that the student is an actively enrolled university student (isEnrolled: true).
 * 4. Validates optional PIN/password if provided.
 */
export function verifyStudentCredentials(
  regNo: string,
  pin?: string
): AuthVerificationResult {
  const cleanRegNo = regNo.trim();

  if (!cleanRegNo) {
    return {
      success: false,
      error: 'Please enter your 8-digit Student Registration Number.',
    };
  }

  // Ensure reasonable registration format (must be digits or alphanumeric without special symbols)
  if (!/^[0-9]{5,10}$/.test(cleanRegNo)) {
    return {
      success: false,
      error: 'Invalid format. LPU Registration Numbers are numeric (e.g., 12204581).',
    };
  }

  const studentRecord = findStudentByRegistration(cleanRegNo);

  // If student is not present in university database
  if (!studentRecord) {
    return {
      success: false,
      error: `Registration Number "${cleanRegNo}" is not found in the LPU University Student Database. Please verify with University Management System (UMS) records.`,
    };
  }

  // Check enrollment status (is student actively enrolled vs alumni/withdrawn)
  if (!studentRecord.isEnrolled) {
    return {
      success: false,
      error: `Access Denied: Registration Number "${cleanRegNo}" belongs to an inactive or alumni profile (${studentRecord.programme}). Active student enrollment is required for campus transit passes.`,
    };
  }

  // Validate PIN if provided (demo supports defaultPin '1234' or any 4+ char password)
  if (pin && pin.trim().length > 0 && pin.trim() !== studentRecord.defaultPin && pin.trim() !== 'lpu123') {
    return {
      success: false,
      error: 'Invalid password or PIN. Use default demo PIN "1234" or "lpu123".',
    };
  }

  // Return clean student profile (without defaultPin)
  const { defaultPin, ...profile } = studentRecord;
  return {
    success: true,
    student: profile,
  };
}

/**
 * Retrieves the currently logged-in student from LocalStorage
 */
export function getStoredAuthUser(): StudentProfile | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StudentProfile;
  } catch (err) {
    console.error('Failed to parse auth user from LocalStorage:', err);
    return null;
  }
}

/**
 * Saves current student session to LocalStorage
 */
export function setStoredAuthUser(student: StudentProfile): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(student));
  } catch (err) {
    console.error('Failed to save auth user to LocalStorage:', err);
  }
}

/**
 * Clears student session from LocalStorage
 */
export function clearStoredAuthUser(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear auth user from LocalStorage:', err);
  }
}
