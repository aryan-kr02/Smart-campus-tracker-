import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded text-xs shrink-0">
            <Sparkles className="w-3 h-3 text-amber-700" />
            LPU Academic Prototype
          </span>
          <p className="text-amber-800">
            <strong>Design Thinking Project P05:</strong> Waiting for the Shuttle. All arrival estimates, crowd levels, and status metrics are simulated demonstration data.
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 hover:text-amber-950 underline cursor-pointer shrink-0"
        >
          {isExpanded ? 'Hide Details' : 'Prototype Context'}
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-amber-200/60 text-xs text-amber-800 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <strong>Course Focus:</strong> INT335 Design Thinking (Lovely Professional University)
          </div>
          <div>
            <strong>Key Objective:</strong> Predictability, Safety, and Waiting Convenience for campus commuters.
          </div>
          <div>
            <strong>Integration Status:</strong> Client-side simulation ready for future IoT / GPS telematics APIs.
          </div>
        </div>
      )}
    </div>
  );
};
