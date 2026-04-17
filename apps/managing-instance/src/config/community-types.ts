import type { CommunityType } from '../types';

export const COMMUNITY_TYPES: Record<string, CommunityType> = {
  family: {
    name: 'Family',
    description: 'Your people. Share photos, plan gatherings, keep everyone in the loop — no group chat chaos required.',
  },
  neighbourhood: {
    name: 'Neighbourhood',
    description: 'The building, the block, the street. A quiet place to coordinate the things that make living together work.',
  },
  friends: {
    name: 'Friends',
    description: "A space that keeps up with you — shared memories, spontaneous plans, and the group chat that actually matters.",
  },
  hobby: {
    name: 'Hobby',
    description: 'Gather around what you love. Whether it\'s four players or forty, every shared passion deserves its own home.',
  },
  club: {
    name: 'Club',
    description: 'Built for the long haul — memberships, events, documents, and the history of a community that sticks together.',
  },
  'fan-community': {
    name: 'Fan Community',
    description: 'Your fandom, your rules. Bring together the people who care as much as you do — and never miss a moment.',
  },
  workplace: {
    name: 'Workplace',
    description: 'The human layer of work. Connect colleagues around culture, interests, and everything beyond the job description.',
  },
  professional: {
    name: 'Professional',
    description: 'Peers in the same craft, building knowledge together. Meetups, shared resources, and a network that gets what you do.',
  },
  alumni: {
    name: 'Alumni',
    description: 'Reunion without the awkwardness. Stay in touch with the people and places that shaped you.',
  },
};
