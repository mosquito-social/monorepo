// tuple of 36 numbers
type Counts = number[];

type Results = {
  communityCount: Counts;
  communityCountHostedServers: Counts;
  storageCount: Counts;
  storagePerCommunity: Counts;
  egressCount: Counts;
  postsCount: Counts;
  eventCount: Counts;
  paidEventCount: Counts;
  moneyFlowThroughPaidEvents: Counts;
  costs: Counts;
  revenueBigGroups: Counts;
  revenueBigStorage: Counts;
  revenueEventTransactions: Counts;
  revenuePremium: Counts;
};

type UseCase = {
  name: string;
  perPerson: number;
  size: number;
  needForATool: number;
  wouldUseOurTool: number;
  wouldUseOwnServer: number;
  documentsPerMonth: number;
  postsPerMonth: number;
  eventsPerMonth: number;
  paidEventsPerMonth: number;
  egressGBPerMonth: number;
  attendeesPerPaidEvent: number;
  pricePerPaidEvent: number;
  premiumRate: number; // 0 to 1
} & Results;

const createEmptyResults = (): Results => ({
  communityCount: [],
  communityCountHostedServers: [],
  storageCount: [],
  storagePerCommunity: [],
  egressCount: [],
  postsCount: [],
  eventCount: [],
  paidEventCount: [],
  moneyFlowThroughPaidEvents: [],
  costs: [],
  revenueBigGroups: [],
  revenueBigStorage: [],
  revenueEventTransactions: [],
  revenuePremium: [],
});

const useCases: UseCase[] = [
  {
    name: "family",
    perPerson: 2,
    size: 7, // seven people in a family is moderate
    needForATool: 0.7, // 70% use a tool like whatsapppp or signal and other exchange tools like google photos
    wouldUseOurTool: 0.1,
    wouldUseOwnServer: 0.05,
    documentsPerMonth: 30,
    postsPerMonth: 8,
    eventsPerMonth: 0.1,
    paidEventsPerMonth: 0,
    egressGBPerMonth: 1,
    attendeesPerPaidEvent: 7,
    pricePerPaidEvent: 0,
    premiumRate: 0.05,
    ...createEmptyResults(),
  },
  {
    name: "neighbourhood",
    perPerson: 1,
    size: 14, // some flats are significantly bigger, 7 couples is realistic
    needForATool: 0.4, // many find other ways to align
    wouldUseOurTool: 0.15, // our tool would be a good fit
    wouldUseOwnServer: 0.02,
    documentsPerMonth: 1,
    postsPerMonth: 1,
    eventsPerMonth: 0.1,
    paidEventsPerMonth: 0,
    egressGBPerMonth: 0.2,
    attendeesPerPaidEvent: 14,
    pricePerPaidEvent: 0,
    premiumRate: 0,
    ...createEmptyResults(),
  },
  {
    name: "friends",
    perPerson: 2, // usualay there's one from eac side of a couple
    size: 6,
    needForATool: 0.9, // i guess that's the home of instant messaging
    wouldUseOurTool: 0.1, // same as in a family
    wouldUseOwnServer: 0.02,
    documentsPerMonth: 20,
    postsPerMonth: 4,
    eventsPerMonth: 1,
    paidEventsPerMonth: 0,
    egressGBPerMonth: 1.5,
    attendeesPerPaidEvent: 6,
    pricePerPaidEvent: 0,
    premiumRate: 0,
    ...createEmptyResults(),
  },
  {
    name: "hobby",
    perPerson: 2, // two is realistic (sports clubs and fan bases are separate)
    size: 20, // range is wide could be a schafkopf group of four or a choir of 40
    needForATool: 0.3, // low number but some of them with extensive use cases
    wouldUseOurTool: 0.2, // we would shine here
    wouldUseOwnServer: 0.15,
    documentsPerMonth: 10,
    postsPerMonth: 20,
    eventsPerMonth: 2,
    paidEventsPerMonth: 0,
    egressGBPerMonth: 1,
    attendeesPerPaidEvent: 20,
    pricePerPaidEvent: 0,
    premiumRate: 0.07,
    ...createEmptyResults(),
  },
  {
    name: "club",
    perPerson: 0.5,
    size: 200, // thinking of footbal clubs, gardeners clubs etc.
    needForATool: 0.4, // there's a lot of classic communication
    wouldUseOurTool: 0.1,
    wouldUseOwnServer: 0.2,
    documentsPerMonth: 20,
    postsPerMonth: 4,
    eventsPerMonth: 4,
    paidEventsPerMonth: 0.1,
    egressGBPerMonth: 4,
    attendeesPerPaidEvent: 50,
    pricePerPaidEvent: 5,
    premiumRate: 0.15,
    ...createEmptyResults(),
  },
  {
    name: "fan communities",
    perPerson: 10, // your favourite bands, teams, film franchises, etc.
    size: 1000, //
    needForATool: 0.8, // there's a lot of classic communication
    wouldUseOurTool: 0.001, // our tool would fit well, but there are so many, so it might be a rare case
    wouldUseOwnServer: 0.4,
    documentsPerMonth: 100,
    postsPerMonth: 2000,
    eventsPerMonth: 5,
    paidEventsPerMonth: 1, // if you want to escape eventim
    egressGBPerMonth: 100,
    attendeesPerPaidEvent: 100,
    pricePerPaidEvent: 20,
    premiumRate: 0.2,
    ...createEmptyResults(),
  },
  {
    name: "workplace", // non work related
    perPerson: 0.7, // only the current. alumni groups will follow. Not every employee fosters private exchange
    size: 80,
    needForATool: 0.9, // there's a lot of classic communication
    wouldUseOurTool: 0.005, // also here, we have a lot of competition
    wouldUseOwnServer: 0.7,
    documentsPerMonth: 240,
    postsPerMonth: 100,
    eventsPerMonth: 1,
    paidEventsPerMonth: 0,
    egressGBPerMonth: 4,
    attendeesPerPaidEvent: 80,
    pricePerPaidEvent: 0,
    premiumRate: 0.3,
    ...createEmptyResults(),
  },

  {
    name: "professional", // skill related user groups
    perPerson: 0.5, // not everyone has one
    size: 80,
    needForATool: 1,
    wouldUseOurTool: 0.1,
    wouldUseOwnServer: 0.2,
    documentsPerMonth: 20,
    postsPerMonth: 20,
    eventsPerMonth: 1,
    paidEventsPerMonth: 0.15, // some have paid meetups, some have annual conferences
    egressGBPerMonth: 2,
    attendeesPerPaidEvent: 30,
    pricePerPaidEvent: 50,
    premiumRate: 0.5,
    ...createEmptyResults(),
  },
  {
    name: "alumni", // school, uni or work
    perPerson: 3,
    size: 60, // not everyone might be active in an alumni group
    needForATool: 0.9, // often there's mail and chats, some have linkedin groups
    wouldUseOurTool: 0.008, // need for a tool beyond chat is lower
    wouldUseOwnServer: 0.1,
    documentsPerMonth: 2,
    postsPerMonth: 6,
    eventsPerMonth: 0.1,
    paidEventsPerMonth: 0,
    egressGBPerMonth: 0.3,
    attendeesPerPaidEvent: 60,
    pricePerPaidEvent: 0,
    premiumRate: 0,
    ...createEmptyResults(),
  },
];

const MONTHLY_CONVERSION_RATE = 0.003; // use cases with a fit for our tool actually convert to it every month

const START_MARKET_SIZE = 2_000_000; // we start in the hamburg region
const MONTHLY_MARKET_SIZE_INCREASE = 1.01; // we increase the market size by 1% each month
const DOCUMENT_SIZE_KB = 100; // 100kb per document
const POST_TO_DOCUMENT_RATIO = 0.3; // one document per post

// outbound
const HOSTING_COSTS_PER_GB_STORAGE = 0.01; // in euro
const EGRESS_COSTS_PER_GB = 0.001; // in euro
const MONTHLY_COSTS_PER_COMMUNITY = 0.1; // in euro

//inbound
const TRANSACTION_CHARGE_PER_EUR = 0.1; //10% of every event sale goes to us
const STORAGE_CHARGE_PER_GB = 0.015; // in euro
const FREE_STORAGE = 10; // GB
const FREE_MEMBERS = 100; // we charge groups above 100
const PER_MEMBER_CHARGE = 0.2; // in euro per member above the limit
const PREMIUM_CHARGE = 2.99; // per community

// iterate over months
for (let month = 0; month < 48; month++) {
  const marketSize =
    START_MARKET_SIZE * Math.pow(MONTHLY_MARKET_SIZE_INCREASE, month);
  for (const useCase of useCases) {
    const potentialCommunities =
      (marketSize * useCase.perPerson) / useCase.size;
    const newCommunities =
      potentialCommunities *
      useCase.needForATool *
      useCase.wouldUseOurTool *
      MONTHLY_CONVERSION_RATE;
    useCase.communityCount[month] =
      (useCase.communityCount[month - 1] ?? 0) + newCommunities;
    useCase.communityCountHostedServers[month] =
      useCase.communityCount[month] * (1 - useCase.wouldUseOwnServer);

    const newPosts =
      useCase.postsPerMonth * useCase.communityCountHostedServers[month];
    useCase.postsCount[month] = (useCase.postsCount[month - 1] ?? 0) + newPosts;

    const newDocuments =
      useCase.documentsPerMonth + newPosts * POST_TO_DOCUMENT_RATIO; // People create docs, but we also assume there's one attachment per post
    const newStorageCount =
      (useCase.communityCountHostedServers[month] *
        newDocuments *
        DOCUMENT_SIZE_KB) /
      1024 /
      1024; //GB
    useCase.storageCount[month] =
      (useCase.storageCount[month - 1] ?? 0) + newStorageCount;

    useCase.storagePerCommunity[month] =
      useCase.storageCount[month] / useCase.communityCountHostedServers[month];

    useCase.egressCount[month] =
      useCase.communityCountHostedServers[month] * useCase.egressGBPerMonth;

    useCase.eventCount[month] =
      useCase.communityCount[month] * useCase.eventsPerMonth;
    useCase.paidEventCount[month] =
      useCase.communityCount[month] * useCase.paidEventsPerMonth;

    useCase.moneyFlowThroughPaidEvents[month] =
      useCase.paidEventCount[month] *
      useCase.attendeesPerPaidEvent *
      useCase.pricePerPaidEvent;

    // egress & storage & community flat
    useCase.costs[month] =
      useCase.communityCountHostedServers[month] * MONTHLY_COSTS_PER_COMMUNITY +
      useCase.storageCount[month] * HOSTING_COSTS_PER_GB_STORAGE +
      useCase.egressCount[month] * EGRESS_COSTS_PER_GB;

    // revenueBigGroups: We assume that we charge for headcounts above a threshold
    if (useCase.size > FREE_MEMBERS) {
      useCase.revenueBigGroups[month] =
        (useCase.size - FREE_MEMBERS) *
        PER_MEMBER_CHARGE *
        useCase.communityCount[month];
    } else {
      useCase.revenueBigGroups[month] = 0;
    }

    // revenueBigStorage: We charge a community based on their storage size
    if (useCase.storagePerCommunity[month] > FREE_STORAGE) {
      useCase.revenueBigStorage[month] =
        (useCase.storagePerCommunity[month] - FREE_STORAGE) *
        STORAGE_CHARGE_PER_GB *
        useCase.communityCount[month];
    } else {
      useCase.revenueBigStorage[month] = 0;
    }

    // revenueEventTransactions: We charge for every Payment that goes through our plugin
    useCase.revenueEventTransactions[month] =
      useCase.paidEventCount[month] *
      useCase.attendeesPerPaidEvent *
      useCase.pricePerPaidEvent *
      TRANSACTION_CHARGE_PER_EUR;

    useCase.revenuePremium[month] =
      useCase.communityCount[month] * useCase.premiumRate * PREMIUM_CHARGE;
  }
}

// generates the sum of a result for all use cases
const pickSum = (result: keyof Results): Counts => {
  const l = useCases[0][result].length;
  return Array.from({ length: l }, (_, i) => {
    const monthlies = useCases.map((useCase) => useCase[result][i]);
    return monthlies.reduce((acc, value) => acc + value, 0);
  });
};

const sums = {
  communities: pickSum("communityCount"),
  "communities on our Servers": pickSum("communityCountHostedServers"),
  "storage in GB": pickSum("storageCount"),
  "storage per community in GB": pickSum("storagePerCommunity"),
  "posts per month": pickSum("postsCount"),
  "egress in GB per month": pickSum("egressCount"),
  "events held per month": pickSum("eventCount"),
  "paid events per month": pickSum("paidEventCount"),
  "cash flow. through paid events": pickSum("moneyFlowThroughPaidEvents"),
  costs: pickSum("costs"),
  "revenue from big groups": pickSum("revenueBigGroups"),
  "revenue from big storage": pickSum("revenueBigStorage"),
  "revenue from paid event": pickSum("revenueEventTransactions"),
  "revenue from premium": pickSum("revenuePremium"),
};

console.table(sums, [0, 1, 2, 5, 11, 23, 35]);

[11, 23, 35, 47].map((n) => {
  console.log("month", n + 1);
  console.table(
    useCases.map((useCase) => ({
      name: useCase.name,
      communities: useCase.communityCount[n].toFixed(2),
      posts: useCase.postsCount[n].toFixed(),
      revenueBigStorage: useCase.revenueBigStorage[n].toFixed(1),
      revenueEventTransactions: useCase.revenueEventTransactions[n].toFixed(1),
      revenueBigGroups: useCase.revenueBigGroups[n].toFixed(1),
      revenuePremium: useCase.revenuePremium[n].toFixed(1),
      costs: useCase.costs[n].toFixed(1),
    })),
  );
});

console.log(
  "market size",
  (
    START_MARKET_SIZE * Math.pow(MONTHLY_MARKET_SIZE_INCREASE, 35)
  ).toLocaleString("de"),
);
