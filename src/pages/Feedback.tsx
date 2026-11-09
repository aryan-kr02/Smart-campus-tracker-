import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  Send,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Users,
  Bus,
  Shield,
  Sparkles
} from 'lucide-react';
import { FeedbackEntry, ShuttleRoute, ShuttleVehicle, StudentProfile } from '../types/transport';

interface FeedbackProps {
  feedbackList: FeedbackEntry[];
  onSubmitFeedback: (entry: FeedbackEntry) => void;
  onClearFeedbackHistory: () => void;
  routes: ShuttleRoute[];
  shuttles: ShuttleVehicle[];
  currentUser?: StudentProfile | null;
}

export const Feedback: React.FC<FeedbackProps> = ({
  feedbackList,
  onSubmitFeedback,
  onClearFeedbackHistory,
  routes,
  shuttles,
  currentUser,
}) => {
  // Form state
  const [fullName, setFullName] = useState(currentUser ? `${currentUser.fullName} (${currentUser.registrationNumber})` : '');
  const [userType, setUserType] = useState<FeedbackEntry['userType']>('Student');

  const [shuttleId, setShuttleId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [category, setCategory] = useState<FeedbackEntry['category'] | ''>('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [description, setDescription] = useState('');

  // Validation & status state
  const [errors, setErrors] = useState<{ category?: string; rating?: string; description?: string }>({});
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { category?: string; rating?: string; description?: string } = {};

    if (!rating || rating < 1) {
      newErrors.rating = 'Please provide a star rating (1 to 5).';
    }

    if (!category) {
      newErrors.category = 'Please choose a feedback category.';
    }

    if (!description.trim() || description.trim().length < 5) {
      newErrors.description = 'Please describe your experience (at least 5 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare new feedback object
    const now = new Date();
    const newEntry: FeedbackEntry = {
      id: `fb-${Date.now()}`,
      date: now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) +
        ' ' +
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      fullName: fullName.trim() || undefined,
      userType,
      shuttleId: shuttleId || undefined,
      routeId: routeId || undefined,
      category: category as FeedbackEntry['category'],
      rating,
      description: description.trim(),
    };

    onSubmitFeedback(newEntry);

    // Reset form
    setFullName('');
    setUserType('Student');
    setShuttleId('');
    setRouteId('');
    setCategory('');
    setRating(0);
    setDescription('');
    setErrors({});

    setSuccessToast('Thank you! Your feedback has been saved to LocalStorage.');
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  const handleReset = () => {
    setFullName('');
    setUserType('Student');
    setShuttleId('');
    setRouteId('');
    setCategory('');
    setRating(0);
    setDescription('');
    setErrors({});
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#173B70] uppercase tracking-wider mb-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Continuous Improvement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Share Your Feedback
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Help improve campus transportation services, schedule reliability, and boarding convenience.
        </p>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between shadow-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <span className="text-xs text-emerald-700">Stored in browser</span>
        </div>
      )}

      {/* Feedback Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="fb-name" className="block text-xs font-bold text-gray-700">
                Full Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                id="fb-name"
                type="text"
                placeholder="e.g. Navjot Kaur"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
              />
            </div>

            {/* User Type Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="fb-usertype" className="block text-xs font-bold text-gray-700">
                User Type <span className="text-rose-500">*</span>
              </label>
              <select
                id="fb-usertype"
                value={userType}
                onChange={(e) => setUserType(e.target.value as FeedbackEntry['userType'])}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
              >
                <option value="Student">Student</option>
                <option value="Shuttle Driver">Shuttle Driver</option>
                <option value="Transport Staff">Transport Staff</option>
                <option value="Other">Other (Visitor / Faculty)</option>
              </select>
            </div>

            {/* Shuttle ID (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="fb-shuttle" className="block text-xs font-bold text-gray-700">
                Shuttle ID <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <select
                id="fb-shuttle"
                value={shuttleId}
                onChange={(e) => setShuttleId(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
              >
                <option value="">-- Any / Not Specified --</option>
                {shuttles.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id} ({s.routeName})
                  </option>
                ))}
              </select>
            </div>

            {/* Route (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="fb-route" className="block text-xs font-bold text-gray-700">
                Route Corridor <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <select
                id="fb-route"
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70]"
              >
                <option value="">-- Any / Not Specified --</option>
                {routes.map((r) => (
                  <option key={r.id} value={r.code}>
                    {r.code} - {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Feedback Category & Star Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Feedback Category */}
            <div className="space-y-1.5">
              <label htmlFor="fb-category" className="block text-xs font-bold text-gray-700">
                Feedback Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="fb-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as FeedbackEntry['category']);
                  if (errors.category) setErrors({ ...errors, category: undefined });
                }}
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70] ${
                  errors.category ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200'
                }`}
              >
                <option value="">-- Select Category --</option>
                <option value="Waiting Time">Waiting Time & Arrival Uncertainty</option>
                <option value="Shuttle Availability">Shuttle Availability & Frequency</option>
                <option value="Overcrowding">Overcrowding & Boarding Rush</option>
                <option value="Route Information">Route Information & Stop Clarity</option>
                <option value="Safety">Safety & Driver Courteousness</option>
                <option value="Other">Other Campus Transit Experience</option>
              </select>
              {errors.category && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Rating Stars */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Experience Rating <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setRating(star);
                        if (errors.rating) setErrors({ ...errors, rating: undefined });
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-gray-300 hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                      aria-label={`${star} Star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          isFilled
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300 hover:text-amber-200'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-bold text-gray-600 ml-2">
                  {rating > 0 ? `${rating} of 5 Stars` : 'Tap to rate'}
                </span>
              </div>
              {errors.rating && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.rating}
                </p>
              )}
            </div>
          </div>

          {/* Experience Description */}
          <div className="space-y-1.5">
            <label htmlFor="fb-description" className="block text-xs font-bold text-gray-700">
              Description / Comments <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="fb-description"
              rows={4}
              placeholder="Describe what happened: arrival delays, crowded stops, driver assistance, or suggestions for the university transit committee..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: undefined });
              }}
              className={`w-full bg-slate-50 border rounded-xl p-3.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#173B70] ${
                errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Form
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#173B70] hover:bg-[#2456A6] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Feedback History Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Feedback History (LocalStorage)
            </h2>
            <p className="text-xs text-gray-500">
              Previously submitted records stored locally in your browser.
            </p>
          </div>

          {feedbackList.length > 0 && (
            <button
              onClick={onClearFeedbackHistory}
              className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Clear all stored feedback entries"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {feedbackList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-slate-50 text-gray-500 font-semibold uppercase tracking-wider text-[11px] border-y border-gray-200/70">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">User Type</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Feedback Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {feedbackList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-500 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900 block">{item.userType}</span>
                      {item.fullName && (
                        <span className="text-[10px] text-gray-400">{item.fullName}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {item.category}
                      </span>
                      {item.shuttleId && (
                        <span className="block text-[10px] text-gray-400 mt-0.5">
                          Shuttle {item.shuttleId}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs text-gray-800 leading-relaxed font-normal">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty state */
          <div className="p-8 bg-slate-50/60 rounded-xl border border-dashed border-gray-200 text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-gray-300 mx-auto" />
            <h4 className="text-sm font-bold text-gray-700">No feedback submitted yet</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Submit your experience using the form above. Valid submissions will automatically persist here in your browser LocalStorage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
