# LPU Shuttle – Smart Campus Transportation System

> **INT335 Design Thinking Academic Prototype**  
> **Project Theme:** P05 – Waiting for the Shuttle  
> **Institution:** Lovely Professional University (LPU), Punjab, India

---

## 🚌 Project Overview

Students who depend on university shuttle services frequently face long and uncertain waiting times, shuttle bunching, peak-hour overcrowding, and confusion about active routes.

**LPU Shuttle** is an interactive, responsive digital prototype designed through the five stages of Design Thinking to address these core challenges:
1. **Predictability:** Providing arrival time estimates and scheduled corridor intervals.
2. **Safety:** Providing crowd level warnings (Low, Moderate, High) to reduce boarding rushes and queue congestion.
3. **Convenience:** Instant route search with location swap, connected transit diagrams, and direct student feedback loops.

---

## 🎨 Visual Identity & Color System

- **Primary Blue:** `#173B70` – Main buttons, navigation highlights, headings
- **Secondary Blue:** `#2456A6` – Sub-navigation, active corridor indicators
- **Accent Gold:** `#F4B400` – Action buttons, quick badges
- **Background:** `#F5F7FB` – Clean, soft canvas
- **Card Background:** `#FFFFFF` – Rounded cards with subtle shadows
- **Crowd Indicators:**
  - 🟢 **LOW:** `#16A34A` (Comfortable boarding conditions)
  - 🟡 **MODERATE:** `#F59E0B` (Some passengers present; allow extra time)
  - 🔴 **HIGH:** `#DC2626` (Crowded conditions; consider alternate departure)

---

## 📱 Navigation & Key Pages

1. **Dashboard:**
   - Active Shuttles, Available Routes, Avg Wait Time, and Crowd Status metric cards.
   - Interactive "Find Your Shuttle" journey planner with instant validation.
   - Live demonstration shuttle activity table.
   - Quick action shortcuts.

2. **Find a Shuttle:**
   - Dedicated trip search with Origin, Destination, Travel Date, and Departure Window.
   - Location swap button (`⇄`).
   - Matching shuttle cards with estimated trip duration, crowd badge, and "Select Shuttle".
   - Selected journey summary view.

3. **Routes & Stops:**
   - Multi-filter search (search by route name/landmark, filter by Route ID, filter by starting stop).
   - Route cards displaying stop sequences and frequencies.
   - Connected visual stop progression diagram modal with stop landmarks.
   - Campus Stop Directory detailing all 6 campus hubs.

4. **Shuttle Status:**
   - Fleet cards with Active (green), Delayed (yellow), and Unavailable (red) status badges.
   - Working "Refresh Status" button updating arrival telematics and logging notification events.
   - Status category filter chips.

5. **Crowd Information:**
   - Visual breakdown of Low, Moderate, and High crowd categories.
   - Rule-based recommendation engine for commuter decision-making.
   - Fleet crowd density table.
   - Campus Hourly Commuter Density Profile (Morning rush, Lunch rush, Evening dispersal).

6. **Feedback:**
   - Complete feedback form with User Type, Shuttle ID, Route, Category, 5-Star interactive rating, and comments.
   - Full validation (rating, category, and minimum description required).
   - LocalStorage persistence and dynamic Feedback History table.

7. **About Project:**
   - Explanation of the 5 Design Thinking stages (Empathize, Define, Ideate, Prototype, Test).
   - Problem statement and objectives (Predictability + Safety + Convenience).
   - Target personas (students, shuttle drivers, transport office, gate-side operators).
   - Future scope roadmap (GPS telematics, ML prediction, computer vision).

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Storage:** Browser LocalStorage
- **Testing:** `node:test` + `node:assert/strict` (Fast-feedback unit tests)

---

## 🔒 Academic Prototype Notice

This application is an educational prototype built for coursework demonstration in Design Thinking. All shuttle numbers, GPS locations, and arrival minutes are simulated demonstration data.
