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
      { user: alice, role: 'admin' },
      { user: bob, role: 'member' },
      { user: clara, role: 'member' },
      { user: david, role: 'member' },
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
      { user: elena, role: 'admin' },
      { user: farid, role: 'member' },
      { user: grace, role: 'member' },
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
      { user: clara, role: 'admin' },
      { user: alice, role: 'member' },
      { user: farid, role: 'member' },
      { user: bob, role: 'member' },
    ],
  },
];
