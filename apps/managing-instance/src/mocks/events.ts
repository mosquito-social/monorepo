import type { Event } from '../types';

// berlin-js has 3 events (mix of upcoming and past)
// urban-gardeners-hamburg has 1 event (upcoming)
// climate-action-now has 0 events

export const MOCK_EVENTS: Event[] = [
  {
    id: 'c4a5e6f7-0001-4b8c-9d2e-1a3b5c7d9e0f',
    slug: 'berlin-js-april-meetup',
    communityId: 'berlin-js',
    title: 'Berlin JS – April Meetup',
    description:
      'Our monthly meetup. Two talks, open discussions, and plenty of time to hang out with fellow JS folks.',
    location: {
      label: 'Factory Berlin Mitte',
      address: 'Rheinsberger Str. 76/77, 10115 Berlin',
      lat: 52.534,
      lng: 13.402,
    },
    agenda:
      '18:30 – Doors open\n19:00 – Talk 1: React Server Components in practice\n19:40 – Talk 2: Building CLI tools with Node.js\n20:20 – Open discussions & networking\n22:00 – End',
    date: new Date('2026-04-24T18:30:00+02:00'),
    durationInMinutes: 210,
    status: 'upcoming',
  },
  {
    id: 'c4a5e6f7-0002-4b8c-9d2e-1a3b5c7d9e0f',
    slug: 'berlin-js-state-management-workshop',
    communityId: 'berlin-js',
    title: 'State Management Deep Dive',
    description:
      'A full evening workshop comparing Zustand, Jotai, and Redux Toolkit in a real-world app.',
    location: {
      label: 'Online (Zoom)',
      address: undefined,
    },
    agenda:
      '19:00 – Intro & setup\n19:15 – Zustand walkthrough\n19:50 – Jotai walkthrough\n20:25 – Redux Toolkit walkthrough\n21:00 – Live comparison & Q&A\n21:30 – End',
    date: new Date('2026-05-15T19:00:00+02:00'),
    durationInMinutes: 150,
    status: 'upcoming',
  },
  {
    id: 'c4a5e6f7-0003-4b8c-9d2e-1a3b5c7d9e0f',
    slug: 'berlin-js-march-meetup',
    communityId: 'berlin-js',
    title: 'Berlin JS – March Meetup',
    description:
      'Our March edition with talks on TypeScript 5.5 and building realtime apps with Bun.',
    location: {
      label: 'co.up Community Space',
      address: 'Adalbertstraße 8, 10999 Berlin',
      lat: 52.499,
      lng: 13.421,
    },
    agenda:
      '18:30 – Doors open\n19:00 – Talk 1: What\'s new in TypeScript 5.5\n19:40 – Talk 2: Realtime apps with Bun\n20:20 – Open discussions\n22:00 – End',
    date: new Date('2026-03-27T18:30:00+01:00'),
    durationInMinutes: 210,
    status: 'past',
  },
  {
    id: 'd5b6c7d8-0001-4c9d-ae3f-2b4c6d8e0f1a',
    slug: 'spring-planting-day',
    communityId: 'urban-gardeners-hamburg',
    title: 'Spring Planting Day',
    description:
      'Join us for our annual spring planting day. Bring gloves and your best plant suggestions.',
    location: {
      label: 'Wilhelmsburger Inselpark',
      address: 'Neuenfelder Str. 17, 21109 Hamburg',
      lat: 53.511,
      lng: 9.978,
    },
    agenda:
      '10:00 – Meet at the main gate\n10:15 – Plot assignments\n10:30 – Planting session\n12:30 – Shared lunch\n14:00 – End',
    date: new Date('2026-05-02T10:00:00+02:00'),
    durationInMinutes: 240,
    status: 'upcoming',
  },
];
