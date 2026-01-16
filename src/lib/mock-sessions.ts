// Mock session data for Sesh feature

import type { Session } from "./types";
import { mockProfiles } from "./mock-data";

export const mockSessions: Session[] = [
  {
    id: "sesh-1",
    host: mockProfiles[0]!, // Jasmine
    type: "hosting",
    status: "live",
    details: {
      title: "Wake and bake at the beach!",
      description: "Bring your own, I got papers. Good vibes only - let's watch the sunrise together.",
      strain: "Any Sativa",
      strainType: "sativa",
    },
    timing: {
      scheduledFor: "now",
      startedAt: new Date(Date.now() - 1000 * 60 * 15), // Started 15 mins ago
    },
    capacity: {
      min: 1,
      max: 4,
      current: 3,
    },
    location: {
      type: "area",
      distance: "2.1 km",
      areaName: "Santa Monica Beach",
    },
    participants: {
      accepted: [mockProfiles[2]!, mockProfiles[4]!],
      pending: [],
    },
    visibility: "public",
  },
  {
    id: "sesh-2",
    host: mockProfiles[3]!, // Willow
    type: "hosting",
    status: "scheduled",
    details: {
      title: "Rolling up some Wedding Cake",
      description: "Got snacks and good music. Chill vibes only. My place has a rooftop with city views.",
      strain: "Wedding Cake",
      strainType: "hybrid",
    },
    timing: {
      scheduledFor: new Date(Date.now() + 1000 * 60 * 20), // In 20 mins
    },
    capacity: {
      min: 1,
      max: 2,
      current: 0,
    },
    location: {
      type: "area",
      distance: "0.8 km",
      areaName: "Venice Beach",
    },
    participants: {
      accepted: [],
      pending: [],
    },
    visibility: "public",
  },
  {
    id: "sesh-3",
    host: mockProfiles[4]!, // Aurora
    type: "virtual",
    status: "live",
    details: {
      title: "Movie night sesh - watching Interstellar",
      description: "Join the call! We're starting the movie in 10. BYOW (bring your own weed) 🎬",
      strainType: "hybrid",
    },
    timing: {
      scheduledFor: "now",
      startedAt: new Date(Date.now() - 1000 * 60 * 5),
      duration: 180, // 3 hours for the movie
    },
    capacity: {
      min: 2,
      max: 6,
      current: 4,
    },
    participants: {
      accepted: [mockProfiles[1]!, mockProfiles[5]!, mockProfiles[6]!],
      pending: [mockProfiles[7]!],
    },
    visibility: "public",
    videoRoom: {
      provider: "daily",
      roomId: "stonelyfans-sesh-3",
      joinUrl: "https://stonelyfans.daily.co/sesh-3",
    },
  },
  {
    id: "sesh-4",
    host: mockProfiles[1]!, // Luna
    type: "mobile",
    status: "scheduled",
    details: {
      title: "Sunset hike & smoke",
      description: "Meeting at Griffith Observatory parking lot. Bringing my vape pen - let's find a nice spot!",
      strain: "Blue Dream",
      strainType: "hybrid",
    },
    timing: {
      scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 2), // In 2 hours
    },
    capacity: {
      min: 1,
      max: 3,
      current: 1,
    },
    location: {
      type: "area",
      distance: "5.2 km",
      areaName: "Griffith Park",
    },
    participants: {
      accepted: [mockProfiles[5]!],
      pending: [],
    },
    visibility: "public",
  },
  {
    id: "sesh-5",
    host: mockProfiles[6]!, // Rose
    type: "hosting",
    status: "scheduled",
    details: {
      title: "Morning coffee & sativa",
      description: "Starting my day right. I've got the best pour-over setup and some amazing Lemon Haze.",
      strain: "Lemon Haze",
      strainType: "sativa",
    },
    timing: {
      scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 14), // Tomorrow morning
    },
    capacity: {
      min: 1,
      max: 2,
      current: 0,
    },
    location: {
      type: "area",
      distance: "1.5 km",
      areaName: "Arts District",
    },
    participants: {
      accepted: [],
      pending: [],
    },
    visibility: "friends_of_friends",
  },
];

// Helper functions
export function getNearbySessions(): Session[] {
  return mockSessions.filter(s => s.status !== "ended" && s.status !== "cancelled");
}

export function getLiveSessions(): Session[] {
  return mockSessions.filter(s => s.status === "live");
}

export function getSessionById(id: string): Session | undefined {
  return mockSessions.find(s => s.id === id);
}

export function getSessionsCount(): number {
  return getNearbySessions().length;
}

// Format timing for display
export function formatSessionTiming(session: Session): string {
  if (session.timing.scheduledFor === "now" || session.status === "live") {
    return "Now";
  }

  const scheduledFor = session.timing.scheduledFor as Date;
  const now = new Date();
  const diffMs = scheduledFor.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 60) {
    return `In ${diffMins}min`;
  }
  if (diffHours < 24) {
    return `In ${diffHours}h`;
  }
  return scheduledFor.toLocaleDateString();
}
