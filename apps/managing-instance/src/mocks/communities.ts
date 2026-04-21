import type { Community } from '../types';
import { MOCK_USERS } from './users';

const [
  alice, bob, clara, david, elena, farid, grace,
  hanna, iain, jordi, katja, laura, marcus, nadia,
  omar, paula, quincy, rosa, sven, tara, uma, victor,
  wilma, xavier, yasmin, zoe,
] = MOCK_USERS;

export const MOCK_COMMUNITIES: Community[] = [
  // ── Hamburg ─────────────────────────────────────────────────────────────
  {
    id: 'frankfurt-js',
    slug: 'frankfurt-js',
    name: 'Frankfurt JS',
    bgImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    logoUrl: '/mock-assets/crests/frankfurt-js.svg',
    description:
      'The JavaScript community in Hamburg — meetups, workshops, and job boards for frontend and fullstack developers.',
    type: 'professional',
    theme: {
      style: 'bold',
      primaryHue: 38,
      font: 'geist',
      spacing: 1,
    },
    members: [
      { user: alice, role: 'admin', joinedAt: new Date('2023-01-15') },
      { user: bob, role: 'member', joinedAt: new Date('2023-03-08') },
      { user: david, role: 'member', joinedAt: new Date('2023-05-21') },
      { user: hanna, role: 'member', joinedAt: new Date('2024-01-10') },
      { user: sven, role: 'member', joinedAt: new Date('2024-02-11') },
    ],
  },
  {
    id: 'urban-gardeners-hamburg',
    slug: 'urban-gardeners-hamburg',
    name: 'Urban Gardeners Hamburg',
    bgImageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
    logoUrl: '/mock-assets/crests/urban-gardeners-hamburg.svg',
    description:
      'Growing food and community in Hamburg. We share plots, seeds, and knowledge across the city.',
    type: 'hobby',
    theme: {
      style: 'warm',
      primaryHue: 130,
      font: 'lora',
      spacing: 1.2,
    },
    members: [
      { user: elena, role: 'admin', joinedAt: new Date('2022-09-01') },
      { user: katja, role: 'member', joinedAt: new Date('2022-11-14') },
      { user: nadia, role: 'member', joinedAt: new Date('2023-03-20') },
      { user: wilma, role: 'member', joinedAt: new Date('2023-04-03') },
      { user: uma, role: 'member', joinedAt: new Date('2023-05-11') },
      { user: farid, role: 'member', joinedAt: new Date('2023-06-15') },
    ],
  },
  {
    id: 'die-reinhardts',
    slug: 'die-reinhardts',
    name: 'Die Reinhardts',
    bgImageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=1200',
    logoUrl: '/mock-assets/crests/die-reinhardts.svg',
    description:
      'Our family group — photos, plans, and everything in between. No group chat chaos.',
    type: 'family',
    theme: {
      style: 'warm',
      primaryHue: 28,
      font: 'lora',
      spacing: 1.2,
    },
    members: [
      { user: katja, role: 'admin', joinedAt: new Date('2024-03-01') },
      { user: sven, role: 'member', joinedAt: new Date('2024-03-01') },
      { user: wilma, role: 'member', joinedAt: new Date('2024-03-02') },
      { user: nadia, role: 'member', joinedAt: new Date('2024-03-05') },
    ],
  },
  // ── Barcelona ───────────────────────────────────────────────────────────
  {
    id: 'climate-action-now',
    slug: 'climate-action-now',
    name: 'Climate Action Now',
    bgImageUrl: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1200',
    logoUrl: '/mock-assets/crests/climate-action-now.svg',
    description:
      'Organising citizens, researchers, and policy folks around concrete climate action. Local chapters across DACH.',
    type: 'club',
    theme: {
      style: 'minimal',
      primaryHue: 200,
      font: 'inter',
      spacing: 1,
    },
    members: [
      { user: clara, role: 'admin', joinedAt: new Date('2021-06-20') },
      { user: alice, role: 'member', joinedAt: new Date('2021-08-05') },
      { user: farid, role: 'member', joinedAt: new Date('2022-01-19') },
      { user: yasmin, role: 'member', joinedAt: new Date('2022-09-10') },
      { user: tara, role: 'member', joinedAt: new Date('2023-02-28') },
    ],
  },
  {
    id: 'gracia-neighbours',
    slug: 'gracia-neighbours',
    name: 'Gràcia Neighbours',
    bgImageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200',
    logoUrl: '/mock-assets/crests/gracia-neighbours.svg',
    description:
      'The residents\' assembly for the Gràcia neighbourhood in Barcelona — local issues, events, and mutual aid.',
    type: 'neighbourhood',
    theme: {
      style: 'warm',
      primaryHue: 45,
      font: 'space-grotesk',
      spacing: 1.1,
    },
    members: [
      { user: jordi, role: 'admin', joinedAt: new Date('2022-04-15') },
      { user: rosa, role: 'member', joinedAt: new Date('2022-05-01') },
      { user: laura, role: 'member', joinedAt: new Date('2022-06-08') },
      { user: omar, role: 'member', joinedAt: new Date('2022-08-19') },
      { user: paula, role: 'member', joinedAt: new Date('2023-01-11') },
      { user: victor, role: 'member', joinedAt: new Date('2023-03-22') },
    ],
  },
  {
    id: 'barcelona-photo-collective',
    slug: 'barcelona-photo-collective',
    name: 'Barcelona Photo Collective',
    bgImageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200',
    logoUrl: '/mock-assets/crests/barcelona-photo-collective.svg',
    description:
      'Photographers in and around Barcelona sharing work, organising exhibitions, and running workshops.',
    type: 'professional',
    theme: {
      style: 'minimal',
      primaryHue: 220,
      font: 'inter',
      spacing: 1,
    },
    members: [
      { user: xavier, role: 'admin', joinedAt: new Date('2023-02-01') },
      { user: bob, role: 'member', joinedAt: new Date('2023-02-14') },
      { user: rosa, role: 'member', joinedAt: new Date('2023-03-05') },
      { user: victor, role: 'member', joinedAt: new Date('2023-04-18') },
      { user: laura, role: 'member', joinedAt: new Date('2023-07-22') },
    ],
  },
  {
    id: 'el-born-foodies',
    slug: 'el-born-foodies',
    name: 'El Born Foodies',
    bgImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
    logoUrl: '/mock-assets/crests/el-born-foodies.svg',
    description:
      'Food lovers based in and around El Born, Barcelona. Pop-up dinners, market trips, and recipe swaps.',
    type: 'hobby',
    theme: {
      style: 'warm',
      primaryHue: 18,
      font: 'lora',
      spacing: 1.2,
    },
    members: [
      { user: omar, role: 'admin', joinedAt: new Date('2023-05-10') },
      { user: laura, role: 'member', joinedAt: new Date('2023-05-18') },
      { user: jordi, role: 'member', joinedAt: new Date('2023-06-01') },
      { user: paula, role: 'member', joinedAt: new Date('2023-06-20') },
      { user: xavier, role: 'member', joinedAt: new Date('2023-08-03') },
      { user: rosa, role: 'member', joinedAt: new Date('2023-09-12') },
    ],
  },
  // ── Edinburgh ───────────────────────────────────────────────────────────
  {
    id: 'edinburgh-creative-guild',
    slug: 'edinburgh-creative-guild',
    name: 'Edinburgh Creative Guild',
    bgImageUrl: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=1200',
    logoUrl: '/mock-assets/crests/edinburgh-creative-guild.svg',
    description:
      'Designers, illustrators, and art directors in Edinburgh. Portfolio crits, industry talks, and studio visits.',
    type: 'professional',
    theme: {
      style: 'bold',
      primaryHue: 270,
      font: 'geist',
      spacing: 1,
    },
    members: [
      { user: marcus, role: 'admin', joinedAt: new Date('2022-10-01') },
      { user: grace, role: 'member', joinedAt: new Date('2022-11-08') },
      { user: tara, role: 'member', joinedAt: new Date('2023-01-17') },
      { user: yasmin, role: 'member', joinedAt: new Date('2023-03-05') },
      { user: zoe, role: 'member', joinedAt: new Date('2023-05-29') },
      { user: iain, role: 'member', joinedAt: new Date('2023-08-14') },
    ],
  },
  {
    id: 'caledonian-fc',
    slug: 'caledonian-fc',
    name: 'Caledonian FC',
    bgImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200',
    logoUrl: '/mock-assets/crests/caledonian-fc.svg',
    description:
      'Edinburgh-based football club. Training twice a week, league games on Saturdays. All levels welcome.',
    type: 'club',
    theme: {
      style: 'bold',
      primaryHue: 215,
      font: 'geist',
      spacing: 1,
    },
    members: [
      { user: iain, role: 'admin', joinedAt: new Date('2021-08-01') },
      { user: quincy, role: 'member', joinedAt: new Date('2021-09-15') },
      { user: marcus, role: 'member', joinedAt: new Date('2022-01-10') },
      { user: clara, role: 'member', joinedAt: new Date('2022-03-05') },
      { user: tara, role: 'member', joinedAt: new Date('2022-06-18') },
      { user: zoe, role: 'member', joinedAt: new Date('2023-01-22') },
    ],
  },
];
