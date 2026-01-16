// Extended types for StonelyFans

import type { Profile } from "./mock-data";

// ============================================
// SESSION TYPES (Sesh Feature)
// ============================================

export type SessionType = "hosting" | "mobile" | "virtual";
export type SessionStatus = "scheduled" | "live" | "full" | "ended" | "cancelled";
export type StrainType = "sativa" | "indica" | "hybrid" | "edibles" | "any";
export type SessionVisibility = "public" | "friends" | "friends_of_friends";

export interface Session {
  id: string;
  host: Profile;
  type: SessionType;
  status: SessionStatus;

  details: {
    title?: string;
    description: string;
    strain?: string;
    strainType: StrainType;
  };

  timing: {
    scheduledFor: Date | "now";
    duration?: number; // minutes
    startedAt?: Date;
    endedAt?: Date;
  };

  capacity: {
    min: number;
    max: number;
    current: number;
  };

  location?: {
    type: "exact" | "area";
    distance: string;
    areaName: string;
  };

  participants: {
    accepted: Profile[];
    pending: Profile[];
  };

  visibility: SessionVisibility;

  // For virtual sessions
  videoRoom?: {
    provider: "daily" | "twilio";
    roomId: string;
    joinUrl: string;
  };
}

// ============================================
// VIBE TYPES (Video Chat Feature)
// ============================================

export type VibeStatus = "matching" | "connected" | "ended";
export type VibeOutcome = "mutual_vibe" | "skipped" | "timeout" | "reported";
export type VibeStyle = "chill" | "chatty" | "party";
export type SmokingStatus = "any" | "smoking" | "not_now";
export type GenderPref = "anyone" | "same_gender" | "different_gender";

export interface VibePreferences {
  smokingStatus: SmokingStatus;
  lookingFor: GenderPref;
  vibeStyle: VibeStyle;
}

export interface VibeSession {
  id: string;
  participants: [Profile, Profile];
  status: VibeStatus;

  startedAt: Date;
  endedAt?: Date;
  duration: number; // seconds

  outcome?: VibeOutcome;

  connectionMade?: {
    addedAsFriends: boolean;
    continuedCall: boolean;
  };
}

// ============================================
// MATCH TYPES (Romantic Connections)
// ============================================

export interface MatchPreferences {
  ageRange: [number, number];
  maxDistance: number;
  lookingFor: ("friends" | "dating" | "hookups" | "smoke_buddies")[];
  genderPreference: string[];
}

export interface SmokeCompatibility {
  score: number; // 0-100
  matches: string[];
  differences: string[];
}

// ============================================
// APP STATS
// ============================================

export interface AppStats {
  onlineCount: number;
  vibeUsersOnline: number;
  activeSessions: number;
  newLikes: number;
  newMatches: number;
}
