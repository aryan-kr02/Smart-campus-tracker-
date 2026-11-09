import { CrowdLevel, ShuttleRoute, ShuttleVehicle, ShuttleStatusType } from '../types/transport';

export interface RouteMatchResult {
  route: ShuttleRoute;
  shuttles: ShuttleVehicle[];
  startStopIndex: number;
  destStopIndex: number;
  stopsCount: number;
  isDirect: boolean;
  estimatedTravelTimeMin: number;
}

/**
 * Checks if a route contains both the start and destination stops in forward direction
 */
export function findMatchingRoutes(
  startStop: string,
  destStop: string,
  routes: ShuttleRoute[]
): ShuttleRoute[] {
  if (!startStop || !destStop || startStop === destStop) {
    return [];
  }

  return routes.filter((route) => {
    const sIndex = route.stopNames.indexOf(startStop);
    const dIndex = route.stopNames.indexOf(destStop);
    // Allow either direct sequence or valid route stops
    return sIndex !== -1 && dIndex !== -1 && sIndex !== dIndex;
  });
}

/**
 * Finds matching journeys with relevant shuttles and arrival estimates
 */
export function findMatchingJourneys(
  startStop: string,
  destStop: string,
  routes: ShuttleRoute[],
  shuttles: ShuttleVehicle[]
): RouteMatchResult[] {
  const matchingRoutes = findMatchingRoutes(startStop, destStop, routes);

  return matchingRoutes.map((route) => {
    const sIdx = route.stopNames.indexOf(startStop);
    const dIdx = route.stopNames.indexOf(destStop);
    const forwardDirection = dIdx > sIdx;
    const stopsBetween = Math.abs(dIdx - sIdx);

    // Calculate realistic travel time based on stops
    const estimatedTravelTimeMin = Math.max(
      4,
      Math.round((route.estimatedDurationMinutes / (route.stopNames.length || 1)) * stopsBetween)
    );

    // Find active or delayed shuttles for this route
    const routeShuttles = shuttles
      .filter((s) => s.routeId === route.id && s.status !== 'unavailable')
      .sort((a, b) => (a.estimatedArrivalMinutes ?? 99) - (b.estimatedArrivalMinutes ?? 99));

    return {
      route,
      shuttles: routeShuttles,
      startStopIndex: sIdx,
      destStopIndex: dIdx,
      stopsCount: stopsBetween,
      isDirect: forwardDirection,
      estimatedTravelTimeMin,
    };
  });
}

/**
 * Returns rule-based recommendation based on crowd status
 */
export function getCrowdRecommendation(level: CrowdLevel): {
  headline: string;
  advice: string;
  badgeClass: string;
} {
  switch (level) {
    case 'low':
      return {
        headline: 'Good option – lower crowd level',
        advice: 'Comfortable seating available. Boarding is swift with minimal queue.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      };
    case 'moderate':
      return {
        headline: 'Moderate crowd – allow some extra boarding time',
        advice: 'Standing space and partial seats available. Expect brief boarding stops.',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      };
    case 'high':
      return {
        headline: 'High crowd level – consider another shuttle or departure time',
        advice: 'Heavy passenger volume. For optimal comfort, consider departing 10 minutes later or choosing an alternate route.',
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
      };
    default:
      return {
        headline: 'Normal Operations',
        advice: 'Please follow driver guidance when boarding.',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      };
  }
}

/**
 * Computes average waiting time of active shuttles
 */
export function calculateAverageWaitTime(shuttles: ShuttleVehicle[]): number {
  const activeWithEstimates = shuttles.filter(
    (s) => (s.status === 'active' || s.status === 'delayed') && s.estimatedArrivalMinutes !== null
  );

  if (activeWithEstimates.length === 0) return 8;

  const sum = activeWithEstimates.reduce((acc, curr) => acc + (curr.estimatedArrivalMinutes || 0), 0);
  return Math.round(sum / activeWithEstimates.length);
}

/**
 * Formats arrival minutes into human readable text
 */
export function formatMinutes(mins: number | null): string {
  if (mins === null || mins === undefined) return 'Temporarily unavailable';
  if (mins <= 0) return 'Arriving now';
  if (mins === 1) return '1 minute';
  return `${mins} minutes`;
}

/**
 * Status badge color helper
 */
export function getStatusBadgeInfo(status: ShuttleStatusType): {
  label: string;
  bgClass: string;
  textClass: string;
  dotClass: string;
} {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        bgClass: 'bg-emerald-50 border-emerald-200',
        textClass: 'text-emerald-700',
        dotClass: 'bg-emerald-500',
      };
    case 'delayed':
      return {
        label: 'Delayed',
        bgClass: 'bg-amber-50 border-amber-200',
        textClass: 'text-amber-700',
        dotClass: 'bg-amber-500',
      };
    case 'unavailable':
      return {
        label: 'Unavailable',
        bgClass: 'bg-rose-50 border-rose-200',
        textClass: 'text-rose-700',
        dotClass: 'bg-rose-500',
      };
  }
}
