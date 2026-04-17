export type MemberRole = 'admin' | 'member';

export type EventStatus = 'upcoming' | 'past' | 'cancelled';

export type FontOption = 'inter' | 'geist' | 'lora' | 'space-grotesk';

export interface ThemeBaseStyle {
  name: string;
  description: string;
}

export interface CommunityTheme {
  style: string;
  primaryHue: number;
  font: FontOption;
  spacing: number;
}

export interface CommunityType {
  name: string;
  description: string;
}

export interface User {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export interface Member {
  user: User;
  role?: MemberRole;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  bgImageUrl: string;
  logoUrl: string;
  description: string;
  type: string;
  theme: CommunityTheme;
  members: Member[];
}

export interface EventLocation {
  label: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export interface Event {
  id: string;
  slug: string;
  communityId: string;
  title: string;
  description: string;
  location: EventLocation;
  agenda: string;
  date: Date;
  durationInMinutes: number;
  status: EventStatus;
}
