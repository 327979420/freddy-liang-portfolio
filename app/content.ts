export const contact = {
  github: 'https://github.com/327979420',
  linkedin: 'https://www.linkedin.com/in/freddy-l-938749248',
  email: 'liangfreddy164@gmail.com',
};
export const projects = {
  sage: {
    name: 'Sage Vista', category: 'Quantitative trading research platform',
    keywords: ['SYSTEMS', 'INSIGHT'],
    url: 'https://sage.freddyliang.com',
    image: '/images/sage-vista-candidates.png',
  },
};
/* Sage Vista screens. caption = what the visitor is looking at and what Freddy built (draft copy, review with Freddy).
   focus/scale zoom into a detail; position sets the crop. */
export const sageFrames = [
  { label: 'Opportunities', image: '/images/sage/opportunities.webp', width: 1665, height: 1279, position: '50% 20%', focus: '50% 50%', scale: 1,
    caption: 'The daily ranked watchlist. I built a multi-factor score that combines monthly, weekly and daily signals, so research starts from a short, ordered list.' },
  { label: 'Decision logic', image: '/images/sage-vista-candidates.png', width: 1948, height: 1971, position: '50% 34%', focus: '95% 72%', scale: 2.2,
    caption: 'Every selection carries its reason. The rules explain why a stock is kept, flagged or excluded, so each decision can be checked rather than trusted.' },
  { label: 'Daily patterns', image: '/images/sage/daily-pattern.webp', width: 1800, height: 1248, position: '50% 30%', focus: '50% 50%', scale: 1,
    caption: 'Pattern detection on real price data: pivots, trendlines and support levels are marked and dated when confirmed. An observation, not a buy signal.' },
  { label: 'Sectors', image: '/images/sage/sectors.webp', width: 1775, height: 1279, position: '50% 20%', focus: '50% 50%', scale: 1,
    caption: 'Sector rotation at a glance. Industries are grouped by trend state, uptrend, pulling back or weak, to show where strength is building or fading.' },
] as const;

/* Power BI pages, in reading order. caption is draft copy, review with Freddy. */
export const dashboardPages = [
  { title: 'Client performance', note: 'Overview', image: '/images/powerbi/overview.webp', width: 1280, height: 785,
    caption: 'The overview. I modelled 3,322 trades from 10 anonymised clients into one view of profit, win rate, holding time and activity by symbol.' },
  { title: 'What separates client outcomes?', note: 'Client behaviour', image: '/images/powerbi/outcomes.webp', width: 648, height: 370,
    caption: 'The analysis. Profitable and unprofitable clients are compared by strategy, holding time, exit orders and instrument to find what actually differs.' },
  { title: 'The evidence behind the patterns', note: 'Client detail', image: '/images/powerbi/evidence.webp', width: 1280, height: 776,
    caption: 'The evidence. A client scorecard and group comparison put the underlying numbers behind every pattern, so conclusions can be checked.' },
] as const;

export const profile = {
  portrait: '/images/profile-headshot.webp',
  portraitAlt: 'Portrait of Freddy Liang.',
  portraitWidth: 1254,
  portraitHeight: 1254,
  lead: 'I’m Freddy. I bring experience across financial services, systems, data and project delivery, backed by an Information Systems degree. Based in Melbourne.',
  facts: [
    { label: 'Based in', value: 'Melbourne' },
    { label: 'Experience', value: 'Financial services · Data · Systems · Software' },
    { label: 'Looking for', value: 'Business Analyst roles' },
  ],
  /* Work history for the Profile panel: add real entries here (role, organisation, period, one line). Empty = section hidden. */
  experience: [] as { role: string; organisation: string; period: string; line: string }[],
  lines: [
    'I’m targeting Business Analyst roles, especially where customer needs, data and systems come together.',
    'I like turning messy problems and raw data into something practical: clearer requirements, better processes, useful insights, or a better customer experience.',
    'Long term, I want to grow into the kind of BA who can understand both the people using a system and the teams building it.',
  ],
};

export const labItems = [
  { id: 'radar', caption: 'Ranks the tickers Reddit is discussing most by heat, mentions and 24-hour change, and posts the list to Discord.', number: '01', title: 'Reddit Stock Radar', kind: 'Market attention / Discord app', url: 'https://github.com/327979420/reddit-stock-radar', crop: 'radar', alt: 'Reddit stock discussion ranking posted by the Stock Radar Discord app.' },
  { id: 'sentiment', caption: 'Posts the CNN Fear & Greed reading to Discord every trading day, so market mood is read in seconds.', number: '02', title: 'Fear & Greed Tracker', kind: 'Daily sentiment / Discord app', url: 'https://github.com/327979420/fear-greed-tracker-discord', crop: 'sentiment', alt: 'Fear and Greed Tracker daily market sentiment report in Discord.' },
  { id: 'history', caption: 'The same report adds last week’s reading and a 30-day trend, so today’s number has context.', number: '02 / DETAIL', title: 'The longer view', kind: 'Fear & Greed Tracker / report detail', url: 'https://github.com/327979420/fear-greed-tracker-discord', crop: 'history', alt: 'The historical comparison and 30-day chart in the same Fear and Greed Tracker report.' },
] as const;

export const cities = [
  {
    "name": "Seattle",
    "memory": { "image": "/images/journey/memories/seattle.webp", "width": 1440, "height": 960, "position": "70% 40%" },
    "image": "/images/journey/seattle.jpg",
    "position": "50% 55%",
    "author": "CommunistSquared",
    "source": "https://commons.wikimedia.org/wiki/File:Seattle_Kerry_Park_Skyline.jpg",
    "license": "CC0 1.0 Universal",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "width": 1920,
    "height": 960
  },
  {
    "name": "Beijing",
    "memory": { "image": "/images/journey/memories/beijing.webp", "width": 1198, "height": 1400, "position": "30% 50%" },
    "image": "/images/journey/beijing.jpg",
    "position": "50% 62%",
    "author": "poeloq",
    "source": "https://commons.wikimedia.org/wiki/File:Beijingskyscraperpic3.jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "width": 1920,
    "height": 1280
  },
  {
    "name": "Shenzhen",
    "memory": { "image": "/images/journey/memories/shenzhen.webp", "width": 1067, "height": 1329, "position": "45% 40%" },
    "image": "/images/journey/shenzhen.jpg",
    "position": "50% 78%",
    "author": "Huangdan2060",
    "source": "https://commons.wikimedia.org/wiki/File:Shenzhen_Skyline_from_Futian_District5.jpg",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/",
    "width": 1920,
    "height": 1280
  },
  {
    "name": "Melbourne",
    "memory": { "image": "/images/journey/memories/melbourne.webp", "width": 933, "height": 1400, "position": "50% 30%" },
    "image": "/images/journey/melbourne.jpg",
    "position": "50% 65%",
    "author": "Rob Deutscher",
    "source": "https://commons.wikimedia.org/wiki/File:Melbourne_Skyline_at_night.jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "width": 1920,
    "height": 1282
  }
] as const;
