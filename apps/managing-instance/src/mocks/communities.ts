import type { Community } from '../types';
import { MOCK_USERS } from './users';

const [alice, bob, clara, david, elena, farid, grace] = MOCK_USERS;

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'frankfurt-js',
    slug: 'frankfurt-js',
    name: 'Frankfurt JS',
    bgImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    logoUrl: '/logos/frankfurt-js.svg',
    description:
      'The JavaScript community in Frankfurt — meetups, workshops, and job boards for frontend and fullstack developers.',
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
      { user: clara, role: 'member', joinedAt: new Date('2023-05-21') },
      { user: david, role: 'member', joinedAt: new Date('2024-02-11') },
    ],
  },
  {
    id: 'urban-gardeners-hamburg',
    slug: 'urban-gardeners-hamburg',
    name: 'Urban Gardeners Hamburg',
    bgImageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
    logoUrl: '/logos/urban-gardeners-hamburg.svg',
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
      { user: farid, role: 'member', joinedAt: new Date('2022-11-14') },
      { user: grace, role: 'member', joinedAt: new Date('2023-04-03') },
    ],
  },
  {
    id: 'climate-action-now',
    slug: 'climate-action-now',
    name: 'Climate Action Now',
    bgImageUrl: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1200',
    logoUrl: '/logos/climate-action-now.svg',
    description:
      'Organizing citizens, researchers, and policy folks around concrete climate action. Local chapters across DACH.',
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
      { user: bob, role: 'member', joinedAt: new Date('2023-07-30') },
    ],
  },
];
