import type { Event } from "../types";
import { FRANKFURT_USERS } from "./frankfurt-users";
import { MOCK_USERS } from "./users";

const [
  alice,
  bob,
  clara,
  david,
  elena,
  farid,
  grace,
  hanna,
  iain,
  jordi,
  katja,
  laura,
  marcus,
  nadia,
  omar,
  paula,
  quincy,
  rosa,
  sven,
  tara,
  uma,
  victor,
  wilma,
  xavier,
  yasmin,
  zoe,
] = MOCK_USERS;

export const MOCK_EVENTS: Event[] = [
  // ── Frankfurt JS (professional/devs, Hamburg area) ──────────────────────
  // 2 future, 1 past
  {
    id: "c4a5e6f7-0001-4b8c-9d2e-1a3b5c7d9e0f",
    slug: "frankfurt-js-april-meetup",
    communityId: "frankfurt-js",
    title: "Frankfurt JS – April Meetup",
    description:
      "Our monthly meetup. Two talks, open discussions, and plenty of time to hang out with fellow JS folks.",
    location: {
      label: "Design Offices Frankfurt Westend",
      address: "Feuerbachstraße 26–32, 60325 Frankfurt am Main",
      lat: 50.116,
      lng: 8.666,
    },
    agenda:
      "18:30 – Doors open\n19:00 – Talk 1: React Server Components in practice\n19:40 – Talk 2: Building CLI tools with Node.js\n20:20 – Open discussions & networking\n22:00 – End",
    date: new Date("2026-04-24T18:30:00+02:00"),
    durationInMinutes: 210,
    status: "upcoming",
    attendees: [alice, bob, david, hanna, sven, ...FRANKFURT_USERS],
  },
  {
    id: "c4a5e6f7-0002-4b8c-9d2e-1a3b5c7d9e0f",
    slug: "frankfurt-js-state-management-workshop",
    communityId: "frankfurt-js",
    title: "State Management Deep Dive",
    description:
      "A full evening workshop comparing Zustand, Jotai, and Redux Toolkit in a real-world app.",
    location: {
      label: "Online (Zoom)",
      address: undefined,
    },
    agenda:
      "19:00 – Intro & setup\n19:15 – Zustand walkthrough\n19:50 – Jotai walkthrough\n20:25 – Redux Toolkit walkthrough\n21:00 – Live comparison & Q&A\n21:30 – End",
    date: new Date("2026-05-15T19:00:00+02:00"),
    durationInMinutes: 150,
    status: "upcoming",
    maxAttendees: 80,
    attendees: [alice, david, hanna, sven],
  },
  {
    id: "c4a5e6f7-0003-4b8c-9d2e-1a3b5c7d9e0f",
    slug: "frankfurt-js-march-meetup",
    communityId: "frankfurt-js",
    title: "Frankfurt JS – March Meetup",
    description:
      "Our March edition with talks on TypeScript 5.5 and building realtime apps with Bun.",
    location: {
      label: "Impact Hub Frankfurt",
      address: "Hanauer Landstraße 126–128, 60314 Frankfurt am Main",
      lat: 50.112,
      lng: 8.713,
    },
    agenda:
      "18:30 – Doors open\n19:00 – Talk 1: What's new in TypeScript 5.5\n19:40 – Talk 2: Realtime apps with Bun\n20:20 – Open discussions\n22:00 – End",
    date: new Date("2026-03-27T18:30:00+01:00"),
    durationInMinutes: 210,
    status: "past",
    attendees: [alice, bob, david, hanna, sven],
    maxAttendees: 100,
  },

  // ── Urban Gardeners Hamburg (hobby, Hamburg) ────────────────────────────
  // 1 future, 1 past
  {
    id: "c4a5e6f7-0005-4b8c-9d2e-1a3b5c7d9e0f",
    slug: "events-platform-hackathon",
    communityId: "frankfurt-js",
    title: "Events Platform Hackathon",
    description:
      "Build the future of community event management in 48 hours. Hack on open-source event tooling, explore new approaches to scheduling, ticketing, and community coordination — all powered by JavaScript. Best projects win cash prizes and get featured in the Frankfurt JS community.",
    location: {
      label: "Hafen 2",
      address: "Nordring 129, 63067 Offenbach am Main",
      lat: 50.1075,
      lng: 8.7744,
    },
    agenda:
      "Day 1 – May 15\n10:00 – Check-in & breakfast\n11:00 – Opening ceremony & challenge briefing\n12:00 – Team formation & hacking begins\n19:00 – Dinner & evening talks\nDay 2 – May 16\n09:00 – Morning standup\n09:30 – Hacking continues\n13:00 – Midpoint check-ins\n22:00 – Midnight snacks & surprise talk\nDay 3 – May 17\n09:00 – Final sprint\n14:00 – Submission deadline\n15:00 – Project demos\n17:00 – Judging & awards ceremony\n18:30 – Closing drinks",
    date: new Date("2026-05-15T10:00:00+02:00"),
    durationInMinutes: 2430,
    status: "upcoming",
    ticketTypes: [
      {
        id: "hacker-early",
        name: "Hacker – Early Bird",
        tagline: "Grab it while it lasts",
        price: 3900,
        currency: "EUR",
        availability: 30,
        totalCapacity: 100,
        perks: [
          "48h access to the hacking space",
          "All meals & snacks included",
          "Hackathon swag bag",
          "Early Bird discount – save €20",
        ],
        formFields: ["github"],
        badge: "Limited",
      },
      {
        id: "hacker-regular",
        name: "Hacker – Regular",
        tagline: "Join the build",
        price: 5900,
        currency: "EUR",
        availability: 70,
        totalCapacity: 100,
        perks: [
          "48h access to the hacking space",
          "All meals & snacks included",
          "Hackathon swag bag",
          "Access to mentor sessions",
        ],
        formFields: ["github"],
        badge: "Most Popular",
      },
      {
        id: "mentor-judge",
        name: "Mentor / Judge",
        tagline: "Share your expertise",
        price: 0,
        currency: "EUR",
        availability: 8,
        totalCapacity: 20,
        perks: [
          "Free entry",
          "Meals & drinks included",
          "Listed on the event page",
          "Invitation to awards dinner",
        ],
        formFields: ["github"],
      },
      {
        id: "spectator",
        name: "Spectator – Demo Day",
        tagline: "Watch the final demos",
        price: 1200,
        currency: "EUR",
        availability: 45,
        totalCapacity: 80,
        perks: [
          "Attend final project demos (Day 3)",
          "Vote for People's Choice award",
          "Networking with hackers & judges",
          "Light refreshments",
        ],
        formFields: ["company"],
      },
    ],
  },

  // ── Urban Gardeners Hamburg (hobby, Hamburg) ────────────────────────────
  // 1 future, 1 past
  {
    id: "d5b6c7d8-0001-4c9d-ae3f-2b4c6d8e0f1a",
    slug: "spring-planting-day",
    communityId: "urban-gardeners-hamburg",
    title: "Spring Planting Day",
    description:
      "Join us for our annual spring planting day. Bring gloves and your best plant suggestions.",
    location: {
      label: "Wilhelmsburger Inselpark",
      address: "Neuenfelder Str. 17, 21109 Hamburg",
      lat: 53.511,
      lng: 9.978,
    },
    agenda:
      "10:00 – Meet at the main gate\n10:15 – Plot assignments\n10:30 – Planting session\n12:30 – Shared lunch\n14:00 – End",
    date: new Date("2026-05-02T10:00:00+02:00"),
    durationInMinutes: 240,
    status: "upcoming",
    maxAttendees: 30,
    attendees: [elena, katja, nadia, wilma, uma],
  },
  {
    id: "d5b6c7d8-0002-4c9d-ae3f-2b4c6d8e0f1a",
    slug: "seed-swap-and-winter-planning",
    communityId: "urban-gardeners-hamburg",
    title: "Seed Swap & Winter Planning",
    description:
      "Wrap up the season with a seed swap and a look ahead at what we want to grow next year.",
    location: {
      label: "Kulturhaus Eppendorf",
      address: "Eppendorfer Landstraße 13, 20249 Hamburg",
      lat: 53.583,
      lng: 9.992,
    },
    agenda:
      "15:00 – Seed swap tables open\n15:30 – Group discussion: what to plant in 2027\n16:30 – Tea and cake\n17:30 – End",
    date: new Date("2025-10-18T15:00:00+02:00"),
    durationInMinutes: 150,
    status: "past",
    attendees: [elena, katja, wilma, uma, farid],
  },

  // ── Climate Action Now (club, DACH) ─────────────────────────────────────
  // 1 future, 2 past
  {
    id: "e6c7d8e9-0001-4d0e-bf4g-3c5d7e9f0g2b",
    slug: "climate-action-hamburg-summit-2025",
    communityId: "climate-action-now",
    title: "Hamburg Climate Summit 2025",
    description:
      "A full-day gathering of local chapters from Hamburg, Berlin, and Vienna — policy updates, working groups, and next year's action plan.",
    location: {
      label: "Universität Hamburg, Edmund-Siemers-Allee",
      address: "Edmund-Siemers-Allee 1, 20146 Hamburg",
      lat: 53.568,
      lng: 9.987,
    },
    agenda:
      "09:30 – Registration\n10:00 – Opening keynote\n11:00 – Regional chapter reports\n13:00 – Lunch break\n14:00 – Working groups\n16:30 – Plenary & commitments\n17:30 – End",
    date: new Date("2025-11-08T09:30:00+01:00"),
    durationInMinutes: 480,
    status: "past",
    attendees: [clara, alice, farid, yasmin, tara],
    maxAttendees: 200,
  },
  {
    id: "e6c7d8e9-0002-4d0e-bf4g-3c5d7e9f0g2b",
    slug: "carbon-budget-workshop",
    communityId: "climate-action-now",
    title: "Carbon Budget Workshop",
    description:
      "Deep dive into the remaining carbon budget and what it means for local policy. Open to all members.",
    location: {
      label: "Online (Zoom)",
      address: undefined,
    },
    agenda:
      "18:30 – Welcome\n18:45 – Presentation: Carbon budgets explained\n19:30 – Breakout discussions\n20:15 – Plenary summary\n20:45 – End",
    date: new Date("2026-02-19T18:30:00+01:00"),
    durationInMinutes: 90,
    status: "past",
    attendees: [clara, farid, yasmin, alice, tara],
  },
  {
    id: "e6c7d8e9-0003-4d0e-bf4g-3c5d7e9f0g2b",
    slug: "spring-policy-roundtable-2026",
    communityId: "climate-action-now",
    title: "Spring Policy Roundtable",
    description:
      "Quarterly roundtable on EU climate legislation and how local chapters can respond. Hybrid event.",
    location: {
      label: "Edinburgh Centre for Carbon Innovation",
      address: "High School Yards, Edinburgh EH1 1LZ",
      lat: 55.948,
      lng: -3.186,
    },
    agenda:
      "10:00 – Welcome & introductions\n10:20 – Policy briefing\n11:00 – Q&A panel\n12:00 – Working lunch & networking\n13:00 – End",
    date: new Date("2026-05-28T10:00:00+01:00"),
    durationInMinutes: 180,
    status: "upcoming",
    maxAttendees: 60,
    attendees: [clara, yasmin, tara, alice, farid],
  },

  // ── Die Reinhardts (family, Hamburg) ────────────────────────────────────
  // 1 future, 1 past
  {
    id: "f7d8e9f0-0001-4e1f-cg5h-4d6e8f0g1h3c",
    slug: "reinhardts-christmas-2025",
    communityId: "die-reinhardts",
    title: "Christmas Gathering 2025",
    description:
      "Annual Christmas dinner at Katja's. Bring a dish and a story.",
    location: {
      label: "Katja's place, Eimsbüttel",
      address: "Hamburg, Germany",
      lat: 53.573,
      lng: 9.956,
    },
    agenda:
      "15:00 – Arrive & catch up\n16:00 – Dinner\n18:00 – Presents\n20:00 – Games & music\n23:00 – End (whenever)",
    date: new Date("2025-12-27T15:00:00+01:00"),
    durationInMinutes: 480,
    status: "past",
    attendees: [katja, sven, wilma, nadia],
  },
  {
    id: "f7d8e9f0-0002-4e1f-cg5h-4d6e8f0g1h3c",
    slug: "reinhardts-summer-bbq-2026",
    communityId: "die-reinhardts",
    title: "Summer BBQ 2026",
    description:
      "Garden BBQ at Sven's. Sun, sausages, and way too much potato salad.",
    location: {
      label: "Sven's garden, Altona",
      address: "Hamburg, Germany",
      lat: 53.548,
      lng: 9.934,
    },
    agenda:
      "13:00 – Arrive\n14:00 – BBQ lit\n17:00 – Kids' games\n19:00 – Evening wind-down\n21:00 – End",
    date: new Date("2026-06-20T13:00:00+02:00"),
    durationInMinutes: 480,
    status: "upcoming",
    attendees: [katja, sven, wilma, nadia],
  },

  // ── Gràcia Neighbours (neighbourhood, Barcelona) ─────────────────────────
  // 2 future, 2 past
  {
    id: "a1b2c3d4-0001-4a0b-8c1d-0e2f4a6b8c0d",
    slug: "gracia-assembly-january-2026",
    communityId: "gracia-neighbours",
    title: "Neighbourhood Assembly – January",
    description:
      "Monthly residents' assembly. Agenda: pavement resurfacing update, new cycle lane consultation, and community garden proposal.",
    location: {
      label: "Ateneu de Gràcia",
      address: "C/ de Cardener, 45, 08024 Barcelona",
      lat: 41.403,
      lng: 2.158,
    },
    agenda:
      "19:00 – Welcome & quorum\n19:10 – Minutes of last meeting\n19:20 – Pavement resurfacing update\n19:45 – Cycle lane consultation\n20:15 – Community garden proposal\n20:45 – Any other business\n21:00 – End",
    date: new Date("2026-01-20T19:00:00+01:00"),
    durationInMinutes: 120,
    status: "past",
    attendees: [jordi, rosa, laura, omar, paula, victor],
  },
  {
    id: "a1b2c3d4-0002-4a0b-8c1d-0e2f4a6b8c0d",
    slug: "gracia-street-clean-march",
    communityId: "gracia-neighbours",
    title: "Street Clean & Planting Day",
    description:
      "Brooms, gloves, and plants — we're tidying up Plaça del Diamant and adding some greenery.",
    location: {
      label: "Plaça del Diamant",
      address: "Plaça del Diamant, 08012 Barcelona",
      lat: 41.401,
      lng: 2.156,
    },
    agenda:
      "10:00 – Meet at the fountain\n10:15 – Clean-up teams split up\n11:30 – Planting the new beds\n13:00 – Shared lunch (bring something!)\n14:00 – End",
    date: new Date("2026-03-14T10:00:00+01:00"),
    durationInMinutes: 240,
    status: "past",
    attendees: [jordi, laura, omar, paula, rosa],
  },
  {
    id: "a1b2c3d4-0003-4a0b-8c1d-0e2f4a6b8c0d",
    slug: "gracia-assembly-may-2026",
    communityId: "gracia-neighbours",
    title: "Neighbourhood Assembly – May",
    description:
      "Monthly assembly. Agenda: tourism impact report, Festes de Gràcia preparations, and budget review.",
    location: {
      label: "Ateneu de Gràcia",
      address: "C/ de Cardener, 45, 08024 Barcelona",
      lat: 41.403,
      lng: 2.158,
    },
    agenda:
      "19:00 – Welcome & quorum\n19:10 – Tourism impact report\n19:50 – Festes de Gràcia preparations\n20:20 – Budget review\n20:50 – Any other business\n21:00 – End",
    date: new Date("2026-05-19T19:00:00+02:00"),
    durationInMinutes: 120,
    status: "upcoming",
    attendees: [jordi, rosa, laura, omar, paula, victor],
  },
  {
    id: "a1b2c3d4-0004-4a0b-8c1d-0e2f4a6b8c0d",
    slug: "gracia-festes-kickoff",
    communityId: "gracia-neighbours",
    title: "Festes de Gràcia – Planning Kick-off",
    description:
      "First coordination meeting for this year's Festes de Gràcia street decoration. All volunteers welcome.",
    location: {
      label: "Bar Cafè del Sol, Plaça del Sol",
      address: "Plaça del Sol, 08012 Barcelona",
      lat: 41.399,
      lng: 2.157,
    },
    agenda:
      "18:30 – Introductions & new volunteers\n19:00 – Theme selection vote\n19:30 – Street assignments\n20:00 – Materials budget discussion\n20:30 – End",
    date: new Date("2026-06-10T18:30:00+02:00"),
    durationInMinutes: 120,
    status: "upcoming",
    maxAttendees: 40,
    attendees: [jordi, rosa, laura, omar, paula],
  },

  // ── Barcelona Photo Collective (professional, Barcelona) ─────────────────
  // 1 future, 2 past
  {
    id: "b2c3d4e5-0001-4b1c-9d2e-1f3g5h7i9j1k",
    slug: "bpc-street-walk-raval",
    communityId: "barcelona-photo-collective",
    title: "Street Photography Walk – El Raval",
    description:
      "Two hours shooting in El Raval followed by a quick edit review at a nearby bar.",
    location: {
      label: "MACBA Esplanade",
      address: "Plaça dels Àngels, 1, 08001 Barcelona",
      lat: 41.383,
      lng: 2.166,
    },
    agenda:
      "09:30 – Meet at MACBA esplanade\n09:45 – Walk briefing\n10:00 – Shoot (self-guided through Raval)\n12:00 – Edit review at Bar Marsella\n13:00 – End",
    date: new Date("2026-01-18T09:30:00+01:00"),
    durationInMinutes: 210,
    status: "past",
    attendees: [xavier, bob, rosa, victor, laura],
  },
  {
    id: "b2c3d4e5-0002-4b1c-9d2e-1f3g5h7i9j1k",
    slug: "bpc-portfolio-review-march",
    communityId: "barcelona-photo-collective",
    title: "Portfolio Review Evening",
    description:
      "Bring five prints or a curated edit of 10 images. Constructive crits in a relaxed setting.",
    location: {
      label: "Espai Fotogràfic Can Basté",
      address: "Pg. de Fabra i Puig, 274, 08031 Barcelona",
      lat: 41.431,
      lng: 2.172,
    },
    agenda:
      "19:00 – Doors open, hang work\n19:30 – Crits begin (5 min per photographer)\n21:00 – Open discussion\n21:30 – Drinks & networking\n22:30 – End",
    date: new Date("2026-03-12T19:00:00+01:00"),
    durationInMinutes: 210,
    status: "past",
    attendees: [xavier, bob, rosa, victor],
    maxAttendees: 20,
  },
  {
    id: "b2c3d4e5-0003-4b1c-9d2e-1f3g5h7i9j1k",
    slug: "bpc-spring-exhibition",
    communityId: "barcelona-photo-collective",
    title: "Spring Group Exhibition",
    description:
      "Our annual group show at a Poblenou gallery. Opening night with drinks and artist talks.",
    location: {
      label: "Palo Alto Market Gallery, Poblenou",
      address: "C/ dels Pellaires, 30–38, 08005 Barcelona",
      lat: 41.404,
      lng: 2.204,
    },
    agenda:
      "19:00 – Opening doors\n19:30 – Welcome & brief artist talks\n20:30 – Drinks & viewing\n22:00 – End",
    date: new Date("2026-05-29T19:00:00+02:00"),
    durationInMinutes: 180,
    status: "upcoming",
    maxAttendees: 120,
    attendees: [xavier, bob, rosa, victor, laura],
  },

  // ── El Born Foodies (hobby, Barcelona) ──────────────────────────────────
  // 2 future, 1 past
  {
    id: "c3d4e5f6-0001-4c2d-ae3f-2g4h6i8j0k2l",
    slug: "el-born-tapas-night",
    communityId: "el-born-foodies",
    title: "Catalan Tapas Night",
    description:
      "A six-hand dinner at Omar's restaurant — escalivada, croquetes, and lots of cava.",
    location: {
      label: "El Xampanyet, El Born",
      address: "C/ de Montcada, 22, 08003 Barcelona",
      lat: 41.384,
      lng: 2.181,
    },
    agenda:
      "20:00 – Arrive & aperitifs\n20:30 – Dinner service begins\n22:30 – Dessert & digestifs\n23:30 – End",
    date: new Date("2026-03-28T20:00:00+01:00"),
    durationInMinutes: 210,
    status: "past",
    attendees: [omar, laura, jordi, paula, xavier, rosa],
    maxAttendees: 20,
  },
  {
    id: "c3d4e5f6-0002-4c2d-ae3f-2g4h6i8j0k2l",
    slug: "el-born-market-tour",
    communityId: "el-born-foodies",
    title: "Santa Caterina Market Tour & Brunch",
    description:
      "Guided tour of Mercat de Santa Caterina with Laura, followed by a group brunch with whatever we buy.",
    location: {
      label: "Mercat de Santa Caterina",
      address: "Av. de Francesc Cambó, 16, 08003 Barcelona",
      lat: 41.385,
      lng: 2.178,
    },
    agenda:
      "10:00 – Meet at the main entrance\n10:15 – Market tour with Laura\n11:15 – Cook together in the shared kitchen\n12:30 – Brunch\n14:00 – End",
    date: new Date("2026-05-16T10:00:00+02:00"),
    durationInMinutes: 240,
    status: "upcoming",
    maxAttendees: 12,
    attendees: [omar, laura, jordi, paula, xavier],
  },
  {
    id: "c3d4e5f6-0003-4c2d-ae3f-2g4h6i8j0k2l",
    slug: "el-born-summer-popup",
    communityId: "el-born-foodies",
    title: "Summer Pop-Up Dinner",
    description:
      "Rooftop pop-up with a Mediterranean summer menu. Tickets limited — RSVP essential.",
    location: {
      label: "Rooftop at Princesa 23",
      address: "C/ de la Princesa, 23, 08003 Barcelona",
      lat: 41.385,
      lng: 2.18,
    },
    agenda: "19:30 – Welcome drinks\n20:30 – Five-course dinner\n23:00 – End",
    date: new Date("2026-07-04T19:30:00+02:00"),
    durationInMinutes: 210,
    status: "upcoming",
    maxAttendees: 18,
    attendees: [omar, laura, jordi, paula, xavier, rosa],
  },

  // ── Edinburgh Creative Guild (professional, Edinburgh) ───────────────────
  // 2 future, 2 past
  {
    id: "d4e5f6a7-0001-4d3e-bf4f-3h5i7j9k1l3m",
    slug: "ecg-portfolio-crits-winter",
    communityId: "edinburgh-creative-guild",
    title: "Portfolio Crits – Winter Round",
    description:
      "Structured portfolio reviews with peer feedback. Bring your latest work — print or screen.",
    location: {
      label: "Summerhall, Edinburgh",
      address: "1 Summerhall, Edinburgh EH9 1PL",
      lat: 55.94,
      lng: -3.183,
    },
    agenda:
      "18:30 – Doors open\n19:00 – Crits begin (10 min per person + 5 min feedback)\n21:00 – Drinks & open discussion\n22:00 – End",
    date: new Date("2026-02-05T18:30:00+00:00"),
    durationInMinutes: 210,
    status: "past",
    attendees: [marcus, grace, tara, yasmin, zoe, iain],
    maxAttendees: 16,
  },
  {
    id: "d4e5f6a7-0002-4d3e-bf4f-3h5i7j9k1l3m",
    slug: "ecg-studio-visit-printmakers",
    communityId: "edinburgh-creative-guild",
    title: "Studio Visit: Edinburgh Printmakers",
    description:
      "A behind-the-scenes visit to Edinburgh Printmakers — watch artists at the press, ask questions.",
    location: {
      label: "Edinburgh Printmakers",
      address: "1 Union St, Edinburgh EH1 3LR",
      lat: 55.957,
      lng: -3.193,
    },
    agenda:
      "14:00 – Meet at the entrance\n14:15 – Studio tour with resident artist\n15:30 – Q&A\n16:00 – Coffee at the gallery café\n17:00 – End",
    date: new Date("2026-03-19T14:00:00+00:00"),
    durationInMinutes: 180,
    status: "past",
    attendees: [marcus, grace, tara, yasmin, zoe],
  },
  {
    id: "d4e5f6a7-0003-4d3e-bf4f-3h5i7j9k1l3m",
    slug: "ecg-typography-workshop",
    communityId: "edinburgh-creative-guild",
    title: "Typography & Lettering Workshop",
    description:
      "Hands-on workshop exploring type pairing, hierarchy, and custom lettering with Zoë Dempsey.",
    location: {
      label: "Summerhall, Edinburgh",
      address: "1 Summerhall, Edinburgh EH9 1PL",
      lat: 55.94,
      lng: -3.183,
    },
    agenda:
      "18:30 – Intro & warm-up exercises\n19:00 – Type pairing deep dive\n19:45 – Custom lettering session\n20:45 – Share & critique\n21:15 – End",
    date: new Date("2026-05-21T18:30:00+01:00"),
    durationInMinutes: 165,
    status: "upcoming",
    maxAttendees: 20,
    attendees: [marcus, grace, tara, yasmin, zoe, iain],
  },
  {
    id: "d4e5f6a7-0004-4d3e-bf4f-3h5i7j9k1l3m",
    slug: "ecg-summer-exhibition",
    communityId: "edinburgh-creative-guild",
    title: "Annual Summer Exhibition",
    description:
      "Our flagship group show at Collective Gallery on Calton Hill. Member work across all disciplines.",
    location: {
      label: "Collective Gallery, Calton Hill",
      address: "Calton Hill, Edinburgh EH7 5AA",
      lat: 55.955,
      lng: -3.177,
    },
    agenda:
      "18:00 – Private view opens\n18:30 – Director's welcome\n19:00 – Artist talks (3 × 10 min)\n20:00 – Open viewing & drinks\n21:30 – End",
    date: new Date("2026-07-09T18:00:00+01:00"),
    durationInMinutes: 210,
    status: "upcoming",
    maxAttendees: 200,
    attendees: [marcus, grace, tara, yasmin, zoe, iain],
  },

  // ── Caledonian FC (club, Edinburgh) ─────────────────────────────────────
  // 2 future, 3 past
  {
    id: "e5f6a7b8-0001-4e4f-cg5g-4i6j8k0l2m4n",
    slug: "cfc-vs-portobello-march",
    communityId: "caledonian-fc",
    title: "Home Match vs Portobello FC",
    description:
      "League match at Meadowbank. Portobello are in good form — should be a tough one.",
    location: {
      label: "Meadowbank Sports Centre",
      address: "139 London Rd, Edinburgh EH7 6AE",
      lat: 55.958,
      lng: -3.157,
    },
    agenda:
      "13:00 – Arrive & warm-up\n14:00 – Kick-off\n15:45 – Full time\n16:00 – Post-match debrief",
    date: new Date("2026-03-21T14:00:00+00:00"),
    durationInMinutes: 105,
    status: "past",
    attendees: [iain, quincy, marcus, clara, tara, zoe],
  },
  {
    id: "e5f6a7b8-0002-4e4f-cg5g-4i6j8k0l2m4n",
    slug: "cfc-vs-meadowbank-april",
    communityId: "caledonian-fc",
    title: "Home Match vs Meadowbank Thistle",
    description:
      "Derby day. Meadowbank Thistle are our local rivals — always a full crowd.",
    location: {
      label: "Meadowbank Sports Centre",
      address: "139 London Rd, Edinburgh EH7 6AE",
      lat: 55.958,
      lng: -3.157,
    },
    agenda:
      "13:00 – Arrive & warm-up\n14:00 – Kick-off\n15:45 – Full time\n16:00 – Post-match drinks at The Picardy Place",
    date: new Date("2026-04-04T14:00:00+01:00"),
    durationInMinutes: 105,
    status: "past",
    attendees: [iain, quincy, marcus, clara, tara, zoe],
  },
  {
    id: "e5f6a7b8-0003-4e4f-cg5g-4i6j8k0l2m4n",
    slug: "cfc-training-april-16",
    communityId: "caledonian-fc",
    title: "Pre-match Training Session",
    description:
      "Set-piece practice and formation drills before the Leith Athletic fixture.",
    location: {
      label: "Meadowbank Sports Centre",
      address: "139 London Rd, Edinburgh EH7 6AE",
      lat: 55.958,
      lng: -3.157,
    },
    agenda:
      "18:30 – Warm-up\n18:50 – Defensive shape drills\n19:20 – Set pieces\n19:50 – 8 v 8 scrimmage\n20:30 – Cool-down & debrief",
    date: new Date("2026-04-16T18:30:00+01:00"),
    durationInMinutes: 120,
    status: "past",
    attendees: [iain, quincy, marcus, tara, zoe],
  },
  {
    id: "e5f6a7b8-0004-4e4f-cg5g-4i6j8k0l2m4n",
    slug: "cfc-vs-leith-athletic-may",
    communityId: "caledonian-fc",
    title: "Home Match vs Leith Athletic",
    description:
      "Crucial league match — a win keeps us in contention for the top three.",
    location: {
      label: "Meadowbank Sports Centre",
      address: "139 London Rd, Edinburgh EH7 6AE",
      lat: 55.958,
      lng: -3.157,
    },
    agenda:
      "13:00 – Arrive & warm-up\n14:00 – Kick-off\n15:45 – Full time\n16:00 – Post-match debrief",
    date: new Date("2026-05-09T14:00:00+01:00"),
    durationInMinutes: 105,
    status: "upcoming",
    attendees: [iain, quincy, marcus, clara, tara, zoe],
  },
  {
    id: "e5f6a7b8-0005-4e4f-cg5g-4i6j8k0l2m4n",
    slug: "cfc-end-of-season-dinner",
    communityId: "caledonian-fc",
    title: "End of Season Dinner",
    description:
      "Annual dinner and awards night. Players' player, golden boot, and the infamous wooden spoon.",
    location: {
      label: "The Scotsman Hotel",
      address: "20 N Bridge, Edinburgh EH1 1TR",
      lat: 55.949,
      lng: -3.189,
    },
    agenda:
      "19:00 – Drinks reception\n20:00 – Dinner\n21:30 – Awards ceremony\n23:00 – Dancing & late bar\n01:00 – End",
    date: new Date("2026-06-06T19:00:00+01:00"),
    durationInMinutes: 360,
    status: "upcoming",
    maxAttendees: 60,
    attendees: [iain, quincy, marcus, clara, tara, zoe],
  },
];
