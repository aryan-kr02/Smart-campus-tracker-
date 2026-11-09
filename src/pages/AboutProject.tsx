import React from 'react';
import {
  Info,
  Lightbulb,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  Layers,
  Clock,
  HelpCircle
} from 'lucide-react';
import { FAQ } from '../components/FAQ';

export const AboutProject: React.FC = () => {
  const dtStages = [
    {
      num: '01',
      title: 'Empathize',
      summary: 'Observed student waiting queues across campus stops',
      description:
        'Engaged with students, hostel residents, and day scholars enduring 20-30 minute idle waits at Block 32, Block 14, and Main Gate. Identified recurring commuter anxiety around unannounced schedule gaps and peak-hour crowding.',
      icon: Users,
      color: 'bg-blue-50 text-[#173B70] border-blue-200',
    },
    {
      num: '02',
      title: 'Define',
      summary: 'Framed Theme P05: Waiting for the Shuttle',
      description:
        'Formulated the core challenge: "How might we empower university commuters with predictable arrival estimates and crowd visibility so they can optimize their campus travel with confidence, safety, and dignity?"',
      icon: Target,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      num: '03',
      title: 'Ideate',
      summary: 'Brainstormed unified digital transit interface',
      description:
        'Explored digital route corridors, stop-to-stop arrival forecasting, low/moderate/high crowd indicators, and bilateral feedback loops between passengers and transport coordinators without requiring heavy upfront hardware.',
      icon: Lightbulb,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      num: '04',
      title: 'Prototype',
      summary: 'Built interactive LPU Shuttle web application',
      description:
        'Engineered this responsive prototype featuring multi-corridor route exploration, simulated shuttle telematics, journey search with location swapping, crowd recommendations, and local feedback persistence.',
      icon: Zap,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      num: '05',
      title: 'Test',
      summary: 'Usability evaluation & viva demonstration',
      description:
        'Conducting simulated walkthroughs with university peers to validate cognitive clarity, ease of route selection, feedback responsiveness, and readiness for future IoT / hardware integration.',
      icon: CheckCircle2,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#173B70] to-[#2456A6] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Lovely Professional University • INT335 Design Thinking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            About LPU Shuttle
          </h1>
          <p className="text-sm sm:text-base text-blue-100 font-medium">
            Project Theme: P05 – Waiting for the Shuttle
          </p>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            LPU Shuttle is a student-designed transportation assistance prototype intended to improve the campus shuttle experience through digital predictability, crowd awareness, and informed commuting.
          </p>
        </div>
      </div>

      {/* Triad of Major Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-blue-200/80 p-5 shadow-xs text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#173B70] flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Predictability</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Eliminates guessing games by providing transparent estimated arrival times and route corridor schedules.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200/80 p-5 shadow-xs text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Safety</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Mitigates stampedes and chaotic boarding through proactive crowd level advisories (Low, Moderate, High).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Convenience</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Intuitive stop-to-stop search, connected linear stop maps, and straightforward feedback submission.
          </p>
        </div>
      </div>

      {/* Problem We Are Addressing & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problems */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              !
            </div>
            <h2 className="text-base font-bold text-gray-900">
              Problems We Are Addressing
            </h2>
          </div>

          <ul className="space-y-3 text-xs text-gray-600">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>
                <strong>Uncertain Arrival Times:</strong> Students have no visibility into when the next shuttle will reach their block, causing chronic anxiety.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>
                <strong>Long & Uncertain Waiting Periods:</strong> Commuters waste 15-30 productive minutes standing under sun or rain at unsheltered stops.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>
                <strong>Shuttle Bunching:</strong> Multiple shuttles arrive within minutes of each other, followed by prolonged operational vacuums.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>
                <strong>Peak-Hour Overcrowding:</strong> Extreme boarding rushes during morning class bells and evening dismissal.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>
                <strong>Unpredictable Last-Mile Mobility:</strong> Inconsistent pricing and availability of external e-rickshaws outside Main Gate 1.
              </span>
            </li>
          </ul>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#173B70] flex items-center justify-center">
              <Target className="w-4 h-4 text-[#173B70]" />
            </div>
            <h2 className="text-base font-bold text-gray-900">
              Our Project Objectives
            </h2>
          </div>

          <ul className="space-y-3 text-xs text-gray-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Improve Transportation Predictability:</strong> Enable students to check expected arrival windows before heading to a stop.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Informed Travel Decisions:</strong> Suggest alternative corridors or walking paths when direct vehicles are delayed.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Heighten Crowd Awareness:</strong> Provide clear Low, Moderate, and High density indicators to prevent rush jams.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Safe & Dignified Boarding:</strong> Encourage orderly queues and safer boarding environments across all campus clusters.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Direct Student Feedback:</strong> Channel user-reported wait times and issues directly to transport managers.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 5 Stages of Design Thinking */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-amber-600" />
            </div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Design Thinking Process (5 Stages)
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Methodology applied in developing the LPU Smart Campus Transportation prototype.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dtStages.map((stage, idx) => {
            const Icon = stage.icon;

            return (
              <div
                key={stage.num}
                className="p-4 rounded-xl border border-gray-200/80 bg-slate-50/50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-400">{stage.num}</span>
                    <div className={`p-1.5 rounded-lg border ${stage.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-sm text-gray-900 mt-2">
                    {stage.title}
                  </h3>

                  <p className="text-[11px] font-semibold text-[#173B70] mt-0.5">
                    {stage.summary}
                  </p>

                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200/50 text-[10px] text-gray-400 font-bold uppercase">
                  Stage {idx + 1} Complete
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Users */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Target Stakeholders & User Personas
          </h2>
          <p className="text-xs text-gray-500">
            Who benefits from a transparent campus shuttle management platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="p-4 rounded-xl border border-gray-100 bg-slate-50/60 space-y-2">
            <span className="text-xs font-extrabold text-[#173B70] uppercase tracking-wide block">
              1. Campus Students
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Hostelers traveling to morning classes, day-scholars arriving via Gate 1, and commuters moving between library, labs, and cafeteria.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-slate-50/60 space-y-2">
            <span className="text-xs font-extrabold text-[#173B70] uppercase tracking-wide block">
              2. Shuttle Drivers
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Drivers navigating dense pedestrian campus roads who benefit from schedule pacing and reduced passenger friction during boarding.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-slate-50/60 space-y-2">
            <span className="text-xs font-extrabold text-[#173B70] uppercase tracking-wide block">
              3. Transport Office Staff
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              University fleet administrators seeking passenger volume feedback, route demand hotspots, and data-backed dispatch frequencies.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-slate-50/60 space-y-2">
            <span className="text-xs font-extrabold text-[#173B70] uppercase tracking-wide block">
              4. Gate Mobility Drivers
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Gate-side e-rickshaw and auto operators who can coordinate better with student arrival waves rather than idling during dead hours.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <FAQ />

      {/* Future Scope */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Future Scope & Scalability Roadmap
          </h2>
          <p className="text-xs text-gray-500">
            Planned technological enhancements for future phases (academic research roadmapping).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-blue-100 text-[#173B70] flex items-center justify-center shrink-0 font-bold text-[10px]">
              1
            </div>
            <div>
              <strong className="block text-gray-900">Real-Time GPS Telematics:</strong>
              <span>Integration with authorized on-bus GPS OBD-II tracking units for continuous telemetry.</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-blue-100 text-[#173B70] flex items-center justify-center shrink-0 font-bold text-[10px]">
              2
            </div>
            <div>
              <strong className="block text-gray-900">Predictive ML Arrival Times:</strong>
              <span>Machine learning models factoring campus pedestrian signals, weather, and class dispersal bell times.</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-blue-100 text-[#173B70] flex items-center justify-center shrink-0 font-bold text-[10px]">
              3
            </div>
            <div>
              <strong className="block text-gray-900">Driver-Side Status App:</strong>
              <span>Simple tablet interface for drivers to mark departures, delays, and passenger capacity alerts.</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-blue-100 text-[#173B70] flex items-center justify-center shrink-0 font-bold text-[10px]">
              4
            </div>
            <div>
              <strong className="block text-gray-900">Transport Committee Dispatch Portal:</strong>
              <span>Centralized university command center for fleet dynamic re-routing during events and convocations.</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-blue-100 text-[#173B70] flex items-center justify-center shrink-0 font-bold text-[10px]">
              5
            </div>
            <div>
              <strong className="block text-gray-900">Computer Vision Passenger Density:</strong>
              <span>Doorway infrared or vision counters for automated, non-invasive crowd classification.</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-blue-100 text-[#173B70] flex items-center justify-center shrink-0 font-bold text-[10px]">
              6
            </div>
            <div>
              <strong className="block text-gray-900">Fair-Fare Last-Mile Integration:</strong>
              <span>Transparent fare display and standard price index for gate-side e-rickshaws and external transit.</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-[11px] text-[#173B70]">
          * Note: These future scope items represent conceptual progression pathways under academic evaluation; they are not active in this frontend prototype.
        </div>
      </div>
    </div>
  );
};
