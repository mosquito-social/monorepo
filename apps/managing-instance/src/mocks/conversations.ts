import type { Conversation, Thread, User } from '../types';

// ── Sidebar metadata ─────────────────────────────────────────────────────

/** DM user IDs with unread messages (mock preset) */
const UNREAD_DM_USERS = new Set([
  'bob-martinez',
  'elena-fischer',
  'jordi-puig',
  'marcus-webb',
  'iain-macleod',
]);

/** DM user IDs with no conversation history yet (empty state) */
const EMPTY_DM_USERS = new Set([
  'uma-schreiber',
  'wilma-stenzel',
  'nadia-petrov',
  'quincy-addo',
  'victor-molina',
  'zoe-dempsey',
]);

/** Event channel slugs that have conversation content */
const POPULATED_EVENT_SLUGS = new Set([
  'frankfurt-js-april-meetup',
  'spring-planting-day',
  'spring-policy-roundtable-2026',
  'gracia-assembly-may-2026',
  'bpc-spring-exhibition',
  'el-born-market-tour',
  'ecg-typography-workshop',
  'cfc-vs-leith-athletic-may',
]);

export function getDmMeta(otherUserId: string): { hasContent: boolean; unreadCount: number } {
  if (EMPTY_DM_USERS.has(otherUserId)) return { hasContent: false, unreadCount: 0 };
  return { hasContent: true, unreadCount: UNREAD_DM_USERS.has(otherUserId) ? 2 : 0 };
}

export function getChannelMeta(channelId: string): { hasContent: boolean; unreadCount: number } {
  if (channelId === 'general') return { hasContent: true, unreadCount: 1 };
  if (channelId === 'organizers') return { hasContent: true, unreadCount: 0 };
  if (POPULATED_EVENT_SLUGS.has(channelId)) return { hasContent: true, unreadCount: 0 };
  return { hasContent: false, unreadCount: 0 };
}

// ── Helpers ───────────────────────────────────────────────────────────────

function d(daysAgo: number, hour = 10, minute = 0): Date {
  const date = new Date('2026-04-21T00:00:00Z');
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);
  return date;
}

// ── 1:1 DM factory ────────────────────────────────────────────────────────

export function createDmConversation(currentUser: User, otherUser: User): Conversation {
  const a = currentUser.firstName;
  const b = otherUser.firstName;
  const unreadCount = UNREAD_DM_USERS.has(otherUser.id) ? 2 : 0;

  const threads: Thread[] = [
    {
      id: `dm-${otherUser.id}-1`,
      author: otherUser,
      content: `Hey ${a}! Good to finally have a direct channel here. Wanted to reach out — I had a question about something you mentioned in the group.`,
      createdAt: d(4, 11, 5),
      replies: [
        {
          id: `dm-${otherUser.id}-1-r1`,
          author: currentUser,
          content: `${b}! Of course, happy to chat. What's on your mind?`,
          createdAt: d(4, 11, 22),
        },
        {
          id: `dm-${otherUser.id}-1-r2`,
          author: otherUser,
          content: `I was thinking about the last discussion — do you reckon it's worth pursuing further, or are we overthinking it?`,
          createdAt: d(4, 11, 45),
        },
        {
          id: `dm-${otherUser.id}-1-r3`,
          author: currentUser,
          content: `Honestly, I think there's something there. My instinct is to prototype it small and see what comes out. Less risk that way.`,
          createdAt: d(4, 12, 3),
        },
        {
          id: `dm-${otherUser.id}-1-r4`,
          author: otherUser,
          content: `That's a good call. I'll draft something rough and share it with you before putting it to the group. Fresh eyes help.`,
          createdAt: d(4, 12, 18),
        },
      ],
    },
    {
      id: `dm-${otherUser.id}-2`,
      author: currentUser,
      content: `By the way — are you coming to the next event? Would be good to catch up in person.`,
      createdAt: d(2, 9, 30),
      replies: [
        {
          id: `dm-${otherUser.id}-2-r1`,
          author: otherUser,
          content: `Yes, planning to! Already have it in the calendar. See you there, ${a}.`,
          createdAt: d(2, 9, 52),
        },
      ],
    },
    ...(unreadCount > 0
      ? [
          {
            id: `dm-${otherUser.id}-3`,
            author: otherUser,
            content: `Quick update on that thing I mentioned — turns out it's moving faster than expected. Might need to loop you in sooner. Let me know when you have 20 mins?`,
            createdAt: d(0, 8, 14),
            replies: [
              {
                id: `dm-${otherUser.id}-3-r1`,
                author: otherUser,
                content: `No rush today, but this week would be great if you can swing it.`,
                createdAt: d(0, 8, 31),
              },
            ],
          } satisfies Thread,
        ]
      : []),
  ];

  return { threads, unreadCount };
}

// ── 1:n group channel factory ─────────────────────────────────────────────

export function createGroupConversation(params: {
  organizer: User;
  currentUser: User;
  others: User[];
  communityName: string;
  channelType?: 'general' | 'organizers';
}): Conversation {
  const { organizer, currentUser, others, communityName, channelType = 'general' } = params;
  const o1 = others[0];
  const o2 = others[1];

  if (channelType === 'organizers') {
    const threads: Thread[] = [
      {
        id: 'org-1',
        headline: '#organizers',
        author: organizer,
        content: `This channel is for the organisers of ${communityName}. Use it for planning, logistics, and anything that shouldn't go to the full group yet.`,
        createdAt: d(14, 10, 0),
        replies: [
          {
            id: 'org-1-r1',
            author: currentUser,
            content: `Good to have this space. I'll use it to share the prep notes before each event.`,
            createdAt: d(14, 10, 18),
          },
        ],
      },
      {
        id: 'org-2',
        author: currentUser,
        content: `Heads up — I've had a few members ask about the onboarding flow. Might be worth pinning a welcome message in #all-members so new joiners know what to do first.`,
        createdAt: d(3, 14, 22),
        replies: [
          {
            id: 'org-2-r1',
            author: organizer,
            content: `Good shout. I'll draft something and post it today. Can you review it before I hit send?`,
            createdAt: d(3, 14, 45),
          },
          {
            id: 'org-2-r2',
            author: currentUser,
            content: `Of course — just ping me when it's ready.`,
            createdAt: d(3, 15, 0),
          },
        ],
      },
    ];
    return { threads, unreadCount: 0 };
  }

  // General channel
  const threads: Thread[] = [
    {
      id: 'gen-1',
      headline: 'Welcome to #all-members 👋',
      author: organizer,
      content: `Welcome everyone to ${communityName}! This is the main space for announcements, questions, and general chat. Feel free to introduce yourself or share anything you think the group would enjoy.`,
      createdAt: d(14, 9, 0),
      replies: [
        {
          id: 'gen-1-r1',
          author: currentUser,
          content: `Thanks for putting this together! Really glad we have a proper home now. Looking forward to getting more involved.`,
          createdAt: d(14, 9, 20),
        },
        ...(o1
          ? [
              {
                id: 'gen-1-r2',
                author: o1,
                content: `Excited to be here! Been waiting for something like this for a while.`,
                createdAt: d(14, 9, 42),
              } satisfies (typeof threads)[0]['replies'][0],
            ]
          : []),
        ...(o2
          ? [
              {
                id: 'gen-1-r3',
                author: o2,
                content: `Same here. Already have the next event in my calendar!`,
                createdAt: d(14, 10, 5),
              } satisfies (typeof threads)[0]['replies'][0],
            ]
          : []),
      ],
    },
    ...(o1
      ? [
          {
            id: 'gen-2',
            author: o1,
            content: `Quick question for the group — has anyone found a good way to stay on top of all the different things happening? I keep missing things even when I mean to show up.`,
            createdAt: d(6, 15, 10),
            replies: [
              {
                id: 'gen-2-r1',
                author: organizer,
                content: `The Events tab is the most reliable — everything goes there first. We're also trying to post a short weekly summary in here on Fridays.`,
                createdAt: d(6, 15, 28),
              },
              {
                id: 'gen-2-r2',
                author: currentUser,
                content: `I just turned on notifications for this channel and it's been good. Might be worth doing the same.`,
                createdAt: d(6, 15, 45),
              },
            ],
          } satisfies Thread,
        ]
      : []),
    {
      id: 'gen-3',
      author: organizer,
      content: `Reminder: our next session is coming up — check the Events tab for the full details. Really looking forward to seeing everyone.`,
      createdAt: d(2, 11, 0),
      replies: [
        {
          id: 'gen-3-r1',
          author: currentUser,
          content: `Already in the calendar! Can I help with anything for the setup?`,
          createdAt: d(2, 11, 22),
        },
        {
          id: 'gen-3-r2',
          author: organizer,
          content: `That'd be great — I'll ping you the day before with a short list. Thank you!`,
          createdAt: d(2, 11, 38),
        },
      ],
    },
    // Unread thread for the general channel
    {
      id: 'gen-4',
      author: o1 ?? organizer,
      content: `Bit of a long shot but — anyone here have experience with [topic related to the community]? Trying to figure out the best approach and could use some input from people who've done it before.`,
      createdAt: d(0, 8, 44),
      replies: [],
    },
  ];

  return { threads, unreadCount: 1 };
}

// ── Event channel factory ─────────────────────────────────────────────────

export function createEventChannelConversation(params: {
  eventTitle: string;
  eventSlug: string;
  organizer: User;
  currentUser: User;
  others: User[];
}): Conversation | null {
  const { eventTitle, eventSlug, organizer, currentUser, others } = params;

  if (!POPULATED_EVENT_SLUGS.has(eventSlug)) return null;

  const o1 = others[0];

  const threads: Thread[] = [
    {
      id: `ev-${eventSlug}-1`,
      author: organizer,
      content: `Thread for ${eventTitle}. Post questions, practical info, and anything useful for attendees here.`,
      createdAt: d(7, 10, 0),
      replies: [
        {
          id: `ev-${eventSlug}-1-r1`,
          author: currentUser,
          content: `Looking forward to it! Is there anything specific to prepare or bring?`,
          createdAt: d(7, 10, 18),
        },
        {
          id: `ev-${eventSlug}-1-r2`,
          author: organizer,
          content: `Nothing special — just come with questions and an open mind. We'll handle the rest.`,
          createdAt: d(7, 10, 35),
        },
        ...(o1
          ? [
              {
                id: `ev-${eventSlug}-1-r3`,
                author: o1,
                content: `Count me in! Will there be a recording for anyone who can't make it?`,
                createdAt: d(5, 14, 20),
              } satisfies Thread['replies'][0],
            ]
          : []),
        ...(o1
          ? [
              {
                id: `ev-${eventSlug}-1-r4`,
                author: organizer,
                content: `We're planning to, yes — will share it here afterwards.`,
                createdAt: d(5, 14, 42),
              } satisfies Thread['replies'][0],
            ]
          : []),
      ],
    },
  ];

  return { threads, unreadCount: 0 };
}
