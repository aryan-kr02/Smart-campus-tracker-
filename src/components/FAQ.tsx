import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Sparkles,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'Routes & Boarding' | 'Timings & Frequency' | 'Crowd & Comfort' | 'Prototype & Safety';
  question: string;
  answer: string;
  badge?: string;
  keywords: string[];
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Routes & Boarding',
    question: 'How do I know which shuttle goes to my block or hostel?',
    answer:
      'Campus shuttles follow four designated corridors: R01 (Main Campus Route connecting Block 32, Block 14, and Academic Area), R02 (Hostel Route connecting Hostel Area, Block 14, and University Gate), R03 (Academic Route connecting Academic Area, Block 32, and Gate), and R04 (Perimeter Express). You can use the "Find a Shuttle" journey planner to instantly view which routes link your starting point and destination.',
    badge: 'Popular',
    keywords: ['route', 'corridor', 'block 32', 'block 14', 'hostel', 'academic area', 'r01', 'r02', 'r03', 'r04', 'find shuttle'],
  },
  {
    id: 'faq-2',
    category: 'Timings & Frequency',
    question: 'How accurate are the arrival time estimates in this application?',
    answer:
      'In this INT335 Design Thinking prototype, all arrival minutes, stop progression updates, and delay indicators are simulated demonstration data designed to test commuter decision interfaces. Typical campus service frequencies average 7–12 minutes during peak academic hours.',
    badge: 'Prototype Note',
    keywords: ['accuracy', 'arrival time', 'estimate', 'simulation', 'prototype', 'frequency', 'minutes'],
  },
  {
    id: 'faq-3',
    category: 'Routes & Boarding',
    question: 'Does selecting a shuttle reserve an actual physical seat on the bus?',
    answer:
      'No. Selecting a shuttle in this prototype highlights your intended trip and helps evaluate passenger decision-making. Campus shuttles operate on an open first-come, first-board basis with valid student or staff ID cards.',
    badge: 'Important',
    keywords: ['reserve', 'reservation', 'seat', 'booking', 'physical seat', 'id card'],
  },
  {
    id: 'faq-4',
    category: 'Crowd & Comfort',
    question: 'What should I do when a shuttle shows "HIGH CROWD" density?',
    answer:
      'When high passenger density is flagged, we recommend either catching the subsequent shuttle departing 8–10 minutes later, choosing an alternate route corridor (e.g. taking R03 instead of R01), or using sheltered campus walkways between adjacent blocks to avoid uncomfortable crowding.',
    badge: 'Safety Tip',
    keywords: ['high crowd', 'crowded', 'density', 'rush', 'full', 'standing', 'alternate route'],
  },
  {
    id: 'faq-5',
    category: 'Timings & Frequency',
    question: 'What are the standard operational hours for LPU campus shuttles?',
    answer:
      'Campus shuttles operate between 06:45 AM and 10:15 PM on weekdays. Highest dispatch frequencies (every 7–8 minutes) run during morning class transition (08:30 AM – 09:30 AM), lunch break (12:30 PM – 01:45 PM), and evening dispersal (04:45 PM – 05:45 PM).',
    keywords: ['hours', 'timings', 'schedule', 'morning', 'evening', 'night', 'operating hours', 'frequency'],
  },
  {
    id: 'faq-6',
    category: 'Prototype & Safety',
    question: 'How can I report a prolonged wait time or overcrowded stop?',
    answer:
      'Navigate to the "Feedback" page in the left sidebar menu. You can rate your experience from 1 to 5 stars, choose a category such as Waiting Time or Overcrowding, tag the specific Shuttle ID or Route, and describe what happened. Submissions persist locally and model how transit authorities collect commuter reports.',
    keywords: ['feedback', 'report', 'complaint', 'delay', 'overcrowded', 'driver', 'stars', 'wait time'],
  },
  {
    id: 'faq-7',
    category: 'Routes & Boarding',
    question: 'Are gate-side e-rickshaws and auto-rickshaws covered by this platform?',
    answer:
      'The University Gate stop connects campus corridors directly to Gate 1 (GT Road). While external vehicles are not currently tracked, our Design Thinking Future Scope includes fair-fare pricing indices and departure frequency coordination with gate-side operators.',
    keywords: ['gate 1', 'gate', 'e-rickshaw', 'auto', 'external', 'gt road', 'nh-1', 'fare'],
  },
];

const POPULAR_SEARCH_SUGGESTIONS = [
  'seat reservation',
  'high crowd',
  'operating hours',
  'Block 32',
  'arrival estimates',
];

/**
 * Text highlighter helper that highlights search terms
 */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-200 text-amber-950 font-semibold px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Routes & Boarding', 'Timings & Frequency', 'Crowd & Comfort', 'Prototype & Safety'];

  // Filter questions based on search query and category
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      const inQuestion = item.question.toLowerCase().includes(q);
      const inAnswer = item.answer.toLowerCase().includes(q);
      const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      const inCategory = item.category.toLowerCase().includes(q);

      return inQuestion || inAnswer || inKeywords || inCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleApplySuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4 text-[#173B70]" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Search and filter common questions regarding campus shuttle schedules, boarding policies, and wait times.
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#173B70] self-start sm:self-auto">
          Student Guide
        </span>
      </div>

      {/* Prominent Search Bar Section */}
      <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
        <div className="space-y-1.5">
          <label htmlFor="faq-search-input" className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span>Search Operational FAQ</span>
            {searchQuery && (
              <span className="text-[11px] font-semibold text-[#173B70]">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'match' : 'matches'} found
              </span>
            )}
          </label>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              aria-label="Search shuttle questions"
              placeholder="Type to search (e.g., seat reservation, operating hours, high crowd, block 32)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173B70] focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search input"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Search Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1">
            Quick Searches:
          </span>
          {POPULAR_SEARCH_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => handleApplySuggestion(sug)}
              className={`text-[11px] px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                searchQuery.toLowerCase() === sug.toLowerCase()
                  ? 'bg-[#173B70] text-white font-semibold'
                  : 'bg-white text-gray-700 border border-gray-200/90 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#173B70] text-white'
                  : 'bg-white text-slate-700 border border-gray-200/90 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List with Highlighted Matches */}
      <div className="divide-y divide-gray-100">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            // If user has entered a search query, default to expanded so they see the matching answer immediately
            const isAutoExpanded = !!searchQuery.trim();
            const isOpen = isAutoExpanded || openIds.includes(faq.id);

            return (
              <div key={faq.id} className="py-3.5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-3 text-left group cursor-pointer"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {faq.category}
                      </span>
                      {faq.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          {faq.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#173B70] transition-colors block">
                      <HighlightMatch text={faq.question} query={searchQuery} />
                    </span>
                  </div>

                  <div className="p-1 text-gray-400 group-hover:text-gray-700 rounded-lg shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-2.5 pl-1 pr-4 text-xs text-gray-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                    <p>
                      <HighlightMatch text={faq.answer} query={searchQuery} />
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-gray-400 text-xs space-y-2 bg-slate-50/50 rounded-xl border border-dashed border-gray-200">
            <Search className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="font-semibold text-gray-700">No operational questions match "{searchQuery}"</p>
            <p className="text-[11px] text-gray-500">
              Try searching with broader terms like <em>route</em>, <em>hours</em>, <em>crowd</em>, or <em>stop</em>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-3.5 py-1.5 bg-[#173B70] text-white rounded-lg text-xs font-semibold hover:bg-[#2456A6] cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Reset Search & Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Assistance Note */}
      <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-blue-900">
        <span className="font-medium">Have an unaddressed question or transit suggestion?</span>
        <span className="font-bold underline cursor-pointer">Submit via Feedback Form →</span>
      </div>
    </div>
  );
};
