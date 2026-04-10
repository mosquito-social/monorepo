export const en = {
  nav: {
    brand: "MOSQUITO.social",
    cta: "Join the waitlist",
  },
  hero: {
    tagOpenSource: "Open Source",
    tagFederated: "Federated",
    tagPersonal: "Personal",
    headline: "For Thriving Communities",
    sub: "We give you the social in social network back.",
    ctaPrimary: "Join the waitlist",
    ctaSecondary: "Get in touch",
  },
  problem: {
    label: "The problem",
    headline: "Why current solutions fail.",
    intro:
      "The internet has millions of communities — but finding your place in them has never felt harder.",
    bullet1: "Private platforms are hard to navigate and even harder to leave",
    bullet2: "Public networks offer no boundaries or safe spaces",
    bullet3: "Your data is monetised, not protected",
  },
  solution: {
    label: "Our answer",
    headline: "A home for your community — open to the world.",
    body: "mosquito.social gives communities a private space to organize, communicate, and connect — while still letting them exist on the open social web.",
    tile1: "Safe spaces",
    tile2: "Your hobby is welcome",
    tile3: "Your friends are close",
    tile4: "Likeminded people — one click away",
    tile5: "Your data belongs to you",
  },
  useCases: {
    label: "Use cases",
    headline: "Communities like yours.",
    sub: "Six imagined communities — six real reasons to build this.",
    card1Name: "Agentic Hamburg",
    card1Desc:
      "Coders using AI. Talks, demos, networking — once a month, every month.",
    card2Name: "Heide Photographers",
    card2Desc:
      "Sharing shots of the Lüneburger Heide, meeting at dawn for the perfect fog photo.",
    card3Name: "Brettspieltreff Ottensen",
    card3Desc:
      "Finding the next board game night, planning who brings what — and actually showing up.",
    card4Name: "The Mosquitoes",
    card4Desc:
      "Desert rock from Spain. 1,000 fans across Europe. Gigs as events, community as family.",
    card5Name: "221B Baker Street",
    card5Desc:
      "Neighbours sharing shopping runs, a spare Guinness, and one legendary annual street party.",
    card6Name: "Red Star F.C.",
    card6Desc:
      "Community-run football club. Games as events. Even the bad-pass comments have a home.",
    card7Name: "The Garcias",
    card7Desc:
      "Family across three countries — updates, photos, and the annual reunion near Madrid.",
  },
  howItWorks: {
    label: "Under the hood",
    headline: "Built different. Designed for trust.",
    concept1Title: "Open source",
    concept1Body: "Take the code and run it on your own servers",
    concept2Title: "Federated",
    concept2Body: "Join the global network even from your own server",
    concept3Title: "One account",
    concept3Body: "Access all communities anywhere with a single login",
    concept4Title: "AT Protocol",
    concept4Body: "Part of the ATmosphere — works with Bluesky",
    concept5Title: "Built-in chat",
    concept5Body: "Matrix-powered messaging, groups auto-created",
    concept6Title: "Free to move",
    concept6Body: "Migrate your community anytime — no lock-in",
    featuresHeadline: "Planned features",
    feature1: "Create communities and invite people",
    feature2: "Join as many communities as you want",
    feature3: "Post for members, promote publicly if you choose",
    feature4: "Shared files, images, and videos",
    feature5: "Organize and join events",
    feature6: "Real-time chat within communities",
    feature7: "Cross-server community discovery",
    feature8: "Full data export and migration",
  },
  cta: {
    headline: "Get involved",
    card1Title: "Funding & Partners",
    card1Body: "Support us to build something worth believing in.",
    card1Cta: "Request our pitch deck",
    card2Title: "Experts & Advisors",
    card2Body: "Your expertise could shape the future of online communities.",
    card2Cta: "Let's talk",
    card3Title: "Interested Users",
    card3Body: "Be the first to know when we launch.",
    card3Cta: "Join the waitlist",
  },
  roadmap: {
    label: "The plan",
    headline: "Where we're headed",
    currentLabel: "We are here",
    step1Title: "Start",
    step1Body: "Early stage: architecture, design language, and funding",
    step2Title: "Alpha",
    step2Body: "A handful of communities, hand-picked",
    step3Title: "Beta",
    step3Body: "Invite links open",
    step4Title: "V1",
    step4Body: "Open for everyone",
    step5Title: "Discovery",
    step5Body: "The network of communities",
  },
  contributors: {
    label: "Team",
    headline: "The people behind mosquito",
    joinCta: "Want to join? Get in touch.",
  },
  contact: {
    headline: "Get in touch",
    tagline: "We're building this in public. Follow along.",
    bluesky: "Bluesky",
    linkedin: "LinkedIn",
    email: "Email",
  },
} as const;

// Replace all string literal types with string so translations in other languages can satisfy this type
type DeepString<T> = T extends string
  ? string
  : { [K in keyof T]: DeepString<T[K]> };
export type Translations = DeepString<typeof en>;
