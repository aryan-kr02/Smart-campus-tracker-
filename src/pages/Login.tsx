import React, { useState } from 'react';
import {
  Bus,
  Lock,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  GraduationCap,
  Building,
  School,
  KeyRound,
  IdCard,
  Info
} from 'lucide-react';
import { StudentProfile } from '../types/transport';
import { UNIVERSITY_STUDENT_DATABASE } from '../data/students';
import { verifyStudentCredentials, setStoredAuthUser } from '../utils/auth';

interface LoginProps {
  onLoginSuccess: (student: StudentProfile) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [regNo, setRegNo] = useState('');
  const [pin, setPin] = useState('1234');
  const [rememberMe, setRememberMe] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifiedStudent, setVerifiedStudent] = useState<StudentProfile | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(regNo, pin);
  };

  const handleVerify = (inputReg: string, inputPin: string) => {
    setErrorMessage(null);
    setVerifiedStudent(null);
    setIsVerifying(true);

    // Simulate realistic database query latency (350ms)
    setTimeout(() => {
      const result = verifyStudentCredentials(inputReg, inputPin);

      if (!result.success || !result.student) {
        setErrorMessage(result.error || 'Authentication failed. Please check credentials.');
        setIsVerifying(false);
        return;
      }

      setVerifiedStudent(result.student);
      setIsVerifying(false);

      if (rememberMe) {
        setStoredAuthUser(result.student);
      }

      // Small success animation before proceeding
      setTimeout(() => {
        onLoginSuccess(result.student!);
      }, 450);
    }, 350);
  };

  const handleQuickSelect = (regNumber: string, defaultPinCode = '1234') => {
    setRegNo(regNumber);
    setPin(defaultPinCode);
    setErrorMessage(null);
    handleVerify(regNumber, defaultPinCode);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col justify-between selection:bg-blue-100 selection:text-[#173B70]">
      {/* Top Academic Banner */}
      <div className="bg-[#173B70] text-white text-xs py-2 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold bg-amber-400 text-amber-950 text-[10px] uppercase px-1.5 py-0.5 rounded tracking-wide">
              INT335 Design Thinking
            </span>
            <span>Lovely Professional University • Theme P05: Waiting for the Shuttle</span>
          </div>
          <span className="text-blue-200 text-[11px]">
            University Student Registry Verification Prototype
          </span>
        </div>
      </div>

      {/* Main Login Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl w-full space-y-6">
          {/* Logo & Platform Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#173B70] text-white shadow-md shadow-blue-950/20 mb-2">
              <Bus className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              LPU Shuttle Access
            </h1>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Smart Campus Transportation System • Student Portal Verification
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <IdCard className="w-5 h-5 text-[#173B70]" />
                <span>Verify University Student Registration</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter your 8-digit LPU Registration Number to verify active university enrollment and unlock campus shuttle services.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                data-testid="login-error-banner"
                className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-1"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block">Verification Failed</span>
                  <p className="text-rose-800 leading-relaxed text-xs">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Success Feedback Alert */}
            {verifiedStudent && (
              <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Student Verified Successfully!</span>
                  <p className="text-emerald-800 text-xs">
                    Welcome, {verifiedStudent.fullName} ({verifiedStudent.registrationNumber}). Loading campus transport dashboard...
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Registration Number Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="reg-no" className="block text-xs font-bold text-gray-700">
                    Student Registration Number <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400">8 Digits (e.g. 12204581)</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-no"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 8-digit LPU Registration Number"
                    value={regNo}
                    onChange={(e) => {
                      setRegNo(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    required
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173B70] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password / Transit PIN Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="student-pin" className="block text-xs font-bold text-gray-700">
                    Security PIN / Password
                  </label>
                  <span className="text-[11px] text-[#2456A6] font-medium">Demo PIN: 1234</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="student-pin"
                    type="password"
                    placeholder="Enter PIN (Default: 1234)"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Remember checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#173B70] focus:ring-[#173B70]"
                  />
                  <span className="text-xs text-gray-600">Keep me logged in on this browser</span>
                </label>
                <span className="text-xs text-gray-400">Offline-first prototype</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full mt-2 py-3 px-4 bg-[#173B70] hover:bg-[#2456A6] active:bg-[#122e57] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying with LPU Student Database...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Verify University Student & Enter</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Student Accounts for Viva / Evaluator Testing */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick Demo Student Profiles (1-Click Login)</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  For Evaluation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {UNIVERSITY_STUDENT_DATABASE.filter((s) => s.isEnrolled).slice(0, 4).map((student) => (
                  <button
                    key={student.registrationNumber}
                    type="button"
                    onClick={() => handleQuickSelect(student.registrationNumber, student.defaultPin)}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-[#173B70] hover:bg-blue-50/50 transition-all text-left flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#173B70] flex items-center justify-center font-bold text-[11px] shrink-0 group-hover:bg-[#173B70] group-hover:text-white transition-colors">
                      {student.avatarInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 group-hover:text-[#173B70] truncate">
                        {student.fullName}
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        Reg: {student.registrationNumber}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate mt-0.5">
                        {student.residenceType} • {student.programme.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Edge Case / Error Verification Buttons */}
              <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickSelect('11900123')}
                  className="flex-1 text-left p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-[11px] text-gray-600 transition-colors cursor-pointer"
                  title="Test account for an inactive/alumni student"
                >
                  <span className="font-bold text-gray-800 block text-[11px]">
                    🧪 Test Inactive / Alumni (11900123)
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Tests denial of unenrolled registration
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickSelect('99999999')}
                  className="flex-1 text-left p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-[11px] text-gray-600 transition-colors cursor-pointer"
                  title="Test account for non-existent registration"
                >
                  <span className="font-bold text-gray-800 block text-[11px]">
                    🧪 Test Unregistered ID (99999999)
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Tests rejection of non-university students
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Academic Prototype Notice */}
          <div className="bg-white/80 backdrop-blur-xs rounded-xl border border-gray-200/80 p-4 text-xs text-gray-500 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-gray-700">
              <Info className="w-4 h-4 text-[#173B70]" />
              <span>Academic Prototype & Database Information</span>
            </div>
            <p className="leading-relaxed">
              This system is part of Lovely Professional University Course Project INT335 (Design Thinking) addressing student transport wait times. The student registry is simulated for demonstration and privacy purposes without connecting to live university administrative servers.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>LPU Shuttle – Smart Campus Transportation System</span>
          <span className="text-gray-400">Design Thinking Project P05 • Academic Year 2024–2025</span>
        </div>
      </footer>
    </div>
  );
};
