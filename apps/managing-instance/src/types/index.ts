export type MemberRole = "admin" | "member" | "sponsor" | "developer";

export type EventStatus = "upcoming" | "past" | "cancelled";

export type FontOption = "inter" | "geist" | "lora" | "space-grotesk";

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
  bio?: string;
  avatarUrl?: string;
  location?: string;
}

export interface Member {
  user: User;
  role?: MemberRole;
  joinedAt?: Date;
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

export interface ThreadReply {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}

export interface Thread {
  id: string;
  headline?: string;
  author: User;
  content: string;
  createdAt: Date;
  replies: ThreadReply[];
}

export interface Conversation {
  threads: Thread[];
  unreadCount: number;
}

export interface EventLocation {
  label: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export type TicketFormField = "github" | "company";

export interface TicketType {
  id: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  availability: number;
  totalCapacity: number;
  perks: string[];
  formFields: TicketFormField[];
  badge?: string;
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
  attendees?: User[];
  maxAttendees?: number;
  ticketTypes?: TicketType[];
}
