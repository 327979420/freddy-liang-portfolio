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
  experience: [
    { role: 'Financial Account Manager', organisation: 'TMGM', period: 'Apr 2026 – Present · Melbourne', line: 'Manage 180+ retail clients; built a Power BI analysis of client trading behaviour.' },
    { role: 'Agile Project Manager (Internship)', organisation: 'Focus Bear', period: 'Feb 2025 – Jun 2025 · Melbourne', line: 'Requirements gathering, user stories with acceptance criteria, Scrum Master.' },
    { role: 'Solution Consultant (Internship)', organisation: 'SF Technology Group', period: 'Jun 2023 – Nov 2023 · Shenzhen', line: 'Validated Estée Lauder’s SAP data migration; scenario-tested orders and returns.' },
    { role: 'Product Analyst (Internship)', organisation: 'ByteDance', period: 'Aug 2021 – Nov 2021 · Beijing', line: 'Analysed creator and campaign data for campaigns reaching 1.5M+ views.' },
  ] as { role: string; organisation: string; period: string; line: string }[],
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

/* ---------- Business edition (freddyliang.com). All facts from Freddy's CV, 1 October 2026. ---------- */

export const business = {
  headline: 'Business & Data Analyst',
  location: 'Melbourne',
  positioning: 'I connect what people need with what the data shows, and build the proof.',
  credentials: ['Information Systems graduate', 'PL-300 Power BI', 'Currently at TMGM'],
  /* The three keywords as reasons to hire, each backed by facts from the CV. */
  pillars: [
    { keyword: 'CLARITY', claim: 'I understand the people.', proof: ['Psychology degree', '180+ clients', '800+ creators coordinated'] },
    { keyword: 'INSIGHT', claim: 'I work with real data.', proof: ['Power BI on live client trading data', '62,000+ signal events audited'] },
    { keyword: 'SYSTEMS', claim: 'I build what I recommend.', proof: ['A live research platform', 'Automations running daily'] },
  ],
};

/* What each city meant: study and roles, in order. */
export const careerByCity: Record<string, { org: string; role: string; period: string; line: string }[]> = {
  Seattle: [{ org: 'University of Washington', role: 'B.A. Psychology', period: '2017 – 2021', line: 'Major GPA 3.88 / 4.00 · Annual Dean’s List 2019–2021.' }],
  Beijing: [{ org: 'ByteDance', role: 'Product Analyst (Internship)', period: 'Aug – Nov 2021', line: 'Analysed creator and campaign data for campaigns reaching 1.5M+ views; coordinated 800+ creators.' }],
  Shenzhen: [{ org: 'SF Technology Group', role: 'Solution Consultant (Internship)', period: 'Jun – Nov 2023', line: 'Validated Estée Lauder’s data migration from SAP and scenario-tested orders and returns before Black Friday.' }],
  Melbourne: [
    { org: 'TMGM', role: 'Financial Account Manager', period: 'Apr 2026 – now', line: '180+ retail clients; Power BI analysis of client trading behaviour.' },
    { org: 'Focus Bear', role: 'Agile Project Manager (Internship)', period: 'Feb – Jun 2025', line: 'Requirements, user stories with acceptance criteria, Scrum Master in GitHub Projects.' },
    { org: 'University of Melbourne', role: 'Master of Information Systems', period: '2024 – 2025', line: 'H2A · first author of an EAPJ publication on AI-powered cloud systems.' },
  ],
};

/* Each project as a short case: the question, what Freddy did, tools, and what it shows. Draft wording from the CV. */
export const projectCases = [
  { id: 'trading-analytics', name: 'Trading Analytics', kind: 'Power BI dashboard · TMGM', image: '/images/powerbi/overview.webp',
    glance: 'What separates profitable clients from the rest?',
    problem: 'What separates profitable and unprofitable clients?',
    did: 'Cleaned several thousand trade records; built DAX measures and three dashboard pages.',
    tools: ['Power BI', 'Power Query', 'DAX', 'Excel'],
    result: 'Three dashboard pages that move from overview, to comparison, to the evidence behind each pattern.' },
  { id: 'sage-vista', name: 'Sage Vista', kind: 'Equity research platform', image: '/images/sage/opportunities.webp',
    glance: 'A screener that explains every pick and checks itself.',
    problem: 'Can a stock screener explain every pick, and check itself?',
    did: 'Built a bilingual platform; audited 62,000+ signal events across 39 factors.',
    tools: ['Python', 'TypeScript', 'React'],
    result: 'Results reported transparently, including where higher scores did not lead to better outcomes.' },
  { id: 'lab', name: 'Market Intelligence Automations', kind: 'Discord apps', image: '/images/lab-discord-apps.png',
    glance: 'Market attention, news and sentiment, delivered automatically.',
    problem: 'Can market attention, news and sentiment arrive automatically?',
    did: 'Built a Reddit attention radar, a 10-minute news feed and a daily sentiment card.',
    tools: ['Python', 'GitHub Actions', 'Docker'],
    result: 'Automations that run on schedule with duplicate checks, posting straight to Discord.' },
] as const;

export const skillGroups = [
  { keyword: 'CLARITY', title: 'Business analysis', items: ['Requirements gathering', 'User stories & acceptance criteria', 'Stakeholder management', 'Agile / Scrum'] },
  { keyword: 'INSIGHT', title: 'Data analysis', items: ['Data cleaning & validation', 'Metric definition', 'Dashboard design', 'Data quality checks'] },
  { keyword: 'SYSTEMS', title: 'Tools', items: ['SQL', 'Excel', 'Power BI (Power Query, DAX)', 'Python', 'Jira', 'GitHub Projects'] },
] as const;

export const education = [
  { title: 'Master of Information Systems', detail: 'University of Melbourne · 2024 – 2025 · H2A' },
  { title: 'B.A. Psychology', detail: 'University of Washington · 2017 – 2021 · GPA 3.88' },
  { title: 'Microsoft PL-300', detail: 'Power BI Data Analyst certification' },
  { title: 'CFA Level I', detail: 'CFA Institute' },
] as const;
