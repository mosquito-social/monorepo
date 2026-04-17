import type { CommunityType } from '../types';

export const COMMUNITY_TYPES: Record<string, CommunityType> = {
  professional: {
    name: 'Professional',
    description: 'Career-focused groups for industry peers and networking',
  },
  hobby: {
    name: 'Hobby',
    description: 'Enthusiast communities built around shared interests',
  },
  local: {
    name: 'Local',
    description: 'Neighborhood and city-level communities for people nearby',
  },
  learning: {
    name: 'Learning',
    description: 'Study groups, courses, and knowledge-sharing communities',
  },
  activist: {
    name: 'Activist',
    description: 'Communities organizing around social or political causes',
  },
};
