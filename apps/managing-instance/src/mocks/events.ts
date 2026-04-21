import type { Event } from '../types';

// frankfurt-js has 3 events (mix of upcoming and past)
// urban-gardeners-hamburg has 1 event (upcoming)
// climate-action-now has 0 events

export const MOCK_EVENTS: Event[] = [
  {
    id: 'c4a5e6f7-0001-4b8c-9d2e-1a3b5c7d9e0f',
    slug: 'frankfurt-js-april-meetup',
    communityId: 'frankfurt-js',
    title: 'Frankfurt JS – April Meetup',
    description:
      'Our monthly meetup. Two talks, open discussions, and plenty of time to hang out with fellow JS folks.',
    location: {
      label: 'Design Offices Frankfurt Westend',
      address: 'Feuerbachstraße 26–32, 60325 Frankfurt am Main',
      lat: 50.116,
      lng: 8.666,
    },
    agenda:
      '18:30 – Doors open\n19:00 – Talk 1: React Server Components in practice\n19:40 – Talk 2: Building CLI tools with Node.js\n20:20 – Open discussions & networking\n22:00 – End',
    date: new Date('2026-04-24T18:30:00+02:00'),
    durationInMinutes: 210,
    status: 'upcoming',
  },
  {
    id: 'c4a5e6f7-0002-4b8c-9d2e-1a3b5c7d9e0f',
    slug: 'frankfurt-js-state-management-workshop',
    communityId: 'frankfurt-js',
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
    slug: 'frankfurt-js-march-meetup',
    communityId: 'frankfurt-js',
    title: 'Frankfurt JS – March Meetup',
    description:
      'Our March edition with talks on TypeScript 5.5 and building realtime apps with Bun.',
    location: {
      label: 'Impact Hub Frankfurt',
      address: 'Hanauer Landstraße 126–128, 60314 Frankfurt am Main',
      lat: 50.112,
      lng: 8.713,
    },
    agenda:
      "18:30 – Doors open\n19:00 – Talk 1: What's new in TypeScript 5.5\n19:40 – Talk 2: Realtime apps with Bun\n20:20 – Open discussions\n22:00 – End",
    date: new Date('2026-03-27T18:30:00+01:00'),
    durationInMinutes: 210,
    status: 'past',
  },
  {
    id: 'c4a5e6f7-0005-4b8c-9d2e-1a3b5c7d9e0f',
    slug: 'events-platform-hackathon',
    communityId: 'frankfurt-js',
    title: 'Events Platform Hackathon',
    description:
      'Build the future of community event management in 48 hours. Hack on open-source event tooling, explore new approaches to scheduling, ticketing, and community coordination — all powered by JavaScript. Best projects win cash prizes and get featured in the Frankfurt JS community.',
    location: {
      label: 'Hafen 2',
      address: 'Nordring 129, 63067 Offenbach am Main',
      lat: 50.1075,
      lng: 8.7744,
    },
    agenda:
      'Day 1 – May 15\n10:00 – Check-in & breakfast\n11:00 – Opening ceremony & challenge briefing\n12:00 – Team formation & hacking begins\n19:00 – Dinner & evening talks\nDay 2 – May 16\n09:00 – Morning standup\n09:30 – Hacking continues\n13:00 – Midpoint check-ins\n22:00 – Midnight snacks & surprise talk\nDay 3 – May 17\n09:00 – Final sprint\n14:00 – Submission deadline\n15:00 – Project demos\n17:00 – Judging & awards ceremony\n18:30 – Closing drinks',
    date: new Date('2026-05-15T10:00:00+02:00'),
    durationInMinutes: 2430,
    status: 'upcoming',
    ticketTypes: [
      {
        id: 'hacker-early',
        name: 'Hacker – Early Bird',
        tagline: 'Grab it while it lasts',
        price: 3900,
        currency: 'EUR',
        availability: 30,
        totalCapacity: 100,
        perks: [
          '48h access to the hacking space',
          'All meals & snacks included',
          'Hackathon swag bag',
          'Early Bird discount – save €20',
        ],
        formFields: ['github'],
        badge: 'Limited',
      },
      {
        id: 'hacker-regular',
        name: 'Hacker – Regular',
        tagline: 'Join the build',
        price: 5900,
        currency: 'EUR',
        availability: 70,
        totalCapacity: 100,
        perks: [
          '48h access to the hacking space',
          'All meals & snacks included',
          'Hackathon swag bag',
          'Access to mentor sessions',
        ],
        formFields: ['github'],
        badge: 'Most Popular',
      },
      {
        id: 'mentor-judge',
        name: 'Mentor / Judge',
        tagline: 'Share your expertise',
        price: 0,
        currency: 'EUR',
        availability: 8,
        totalCapacity: 20,
        perks: [
          'Free entry',
          'Meals & drinks included',
          'Listed on the event page',
          'Invitation to awards dinner',
        ],
        formFields: ['github'],
      },
      {
        id: 'spectator',
        name: 'Spectator – Demo Day',
        tagline: 'Watch the final demos',
        price: 1200,
        currency: 'EUR',
        availability: 45,
        totalCapacity: 80,
        perks: [
          'Attend final project demos (Day 3)',
          "Vote for People's Choice award",
          'Networking with hackers & judges',
          'Light refreshments',
        ],
        formFields: ['company'],
      },
    ],
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
