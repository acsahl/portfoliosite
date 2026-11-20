// Everything the site says lives in this file. Facts come from Acsah's resume
// and the project repos; edit here and every section updates.

export const site = {
  name: 'Acsah Lukose',
  first: 'Acsah',
  last: 'Lukose',
  role: 'Software Engineer',
  email: 'lukoseacsah@gmail.com',
  location: 'Orlando, FL',
  timeZone: 'America/New_York',
  github: 'https://github.com/acsahl',
  githubHandle: 'acsahl',
  linkedin: 'https://www.linkedin.com/in/acsah-lukose',
  linkedinHandle: 'acsah-lukose',
  status: 'Open to new-grad SWE roles · 2027',
  graduation: 'May 2027',
}

// Section ids double as nav targets and command-palette entries.
export const sections = [
  { id: 'experience', label: 'Experience', theme: 'light' },
  { id: 'work', label: 'Work', theme: 'dark' },
  { id: 'about', label: 'About', theme: 'light' },
  { id: 'contact', label: 'Contact', theme: 'dark' },
]

// "In this issue": magazine-style cover lines beside the nameplate.
export const coverLines = [
  { id: 'experience', line: 'The agent behind the 50%' },
  { id: 'work', line: 'Watch four projects run' },
  { id: 'about', line: 'Honors, coursework, toolbox' },
]

export const ledger = [
  {
    value: 50,
    suffix: '%',
    label: 'less time to process redemption requests, with the generative-AI agent I owned end to end',
    source: 'BNY · 2026',
  },
  {
    value: 30,
    prefix: '~',
    suffix: '%',
    label: 'less manual document retrieval, from the Spring Boot API I built to extend DocVault',
    source: 'BNY · 2026',
  },
  {
    value: 12,
    suffix: ' hrs',
    label: 'to ship Knight’s Pantry on iOS, Android and web, and win Gemiknights',
    source: 'Hackathon · 2025',
  },
  {
    value: 60,
    suffix: '+',
    label: 'students in my weekly CS I problem-solving sessions and 1-on-1 debugging',
    source: 'UCF · 2025 – now',
  },
]

export const experience = [
  {
    id: 'bny-2026',
    org: 'BNY',
    orgFull: 'Bank of New York Mellon',
    role: 'Software Engineering Intern',
    location: 'Lake Mary, FL',
    start: 'Jun 2026',
    end: 'Aug 2026',
    metric: '−50% processing time',
    headline:
      'Owned a generative-AI agent end to end that cut redemption-request processing time by 50% for the Alternative Investments team.',
    points: [
      'The agent reconciles each redemption request against holder profiles and OCR’d documents, matching CUSIP, tax ID and account fields.',
      'Before rollout I validated its AI-generated output against Spring Boot mock NetX360 endpoints and synthetic data, and wrote its technical documentation. Other teams adopted its output and UI structure as the model for their own agents.',
      'Designed and built a Java/Spring Boot REST API from Wealth Services requirements that extends DocVault to non-custody clients, with dual-token authorization and JSON serialization, cutting manual document retrieval by ~30%.',
      'Built a product-owner AI assistant on Nova, BNY’s internal AI platform, to take manual work off product teams.',
    ],
    tags: ['Generative AI', 'Java', 'Spring Boot', 'REST APIs', 'OCR'],
    featured: true,
  },
  {
    id: 'bny-2025',
    org: 'BNY',
    orgFull: 'Bank of New York Mellon',
    role: 'Software Engineering Intern',
    location: 'Orlando, FL',
    start: 'Aug 2025',
    end: 'Dec 2025',
    metric: 'Real-time anomaly detection',
    headline:
      'Built a Python and Spring Boot monitoring service that catches downtime and performance anomalies across all live endpoints in real time.',
    points: [
      'The service ingests Prometheus metrics and Grafana dashboards and continuously queries latency.',
      'Deployed containerized Docker agents that run fault-tolerant, validated recovery workflows, with audit logging of every remediation step.',
      'Traced containerized service failures in Linux through CLI logs and docker exec, then fixed them with shell scripts and Dockerfiles.',
    ],
    tags: ['Python', 'Spring Boot', 'Prometheus', 'Grafana', 'Docker', 'Linux'],
  },
  {
    id: 'life-stages',
    org: 'Life Stages',
    role: 'Software Engineering & UX/UI Design Intern',
    start: 'Jun 2025',
    end: 'Aug 2025',
    metric: 'Shipped to MVP testers',
    headline:
      'Shipped customer-facing React Native and Flutter features and Figma prototypes for guided meditation and journaling.',
    points: [
      'Partnered with the UX and research teams; the features boosted engagement and retention in MVP testing.',
    ],
    tags: ['React Native', 'Flutter', 'Figma', 'UX research'],
  },
  {
    id: 'ucf-ta',
    org: 'University of Central Florida',
    orgShort: 'UCF',
    role: 'Undergraduate Teaching Assistant, Computer Science I',
    location: 'Orlando, FL',
    start: 'Jan 2025',
    end: 'Present',
    metric: '~25% fewer office-hour visits',
    headline:
      'Lead weekly algorithmic problem-solving sessions and 1-on-1 code debugging for 60+ students.',
    points: [
      'Improved Data Structures & Algorithms lab assessment scores and reduced office-hour visits by ~25%.',
    ],
    tags: ['Data structures', 'Algorithms', 'Mentoring'],
  },
]

// The agent diagram in the BNY 2026 entry. Inputs and checks are the ones the
// resume names; nothing here is real data.
export const agentFlow = {
  inputs: ['Redemption request', 'Holder profile', 'OCR’d documents'],
  checks: ['CUSIP', 'Tax ID', 'Account'],
  output: 'Reconciled request',
}

export const projects = [
  {
    id: 'vitality',
    name: 'Vitality',
    kind: 'web',
    frameLabel: 'Vitality · recorded demo',
    tagline: 'AI fall-risk platform for older adults',
    year: '2026 – now',
    role: 'Project manager, 5-person team',
    context: 'UCF Senior Design · sponsored by the UCF Morse Genius Healthy Aging Research Lab',
    summary:
      'Vitality fuses wearable, body-composition and voice data to flag fall risk in older adults, behind a large-type dashboard built for the people who use it.',
    points: [
      [
        'The model',
        'An explainable logistic-regression fall-risk model served through FastAPI. An LLM companion, still in development, will explain the risk factors through MCP tools.',
      ],
      [
        'The platform',
        'FastAPI on Elastic Beanstalk, PostgreSQL on RDS, Cognito sign-in, S3 for training data and models, and scheduled wearable ingestion with Lambda and EventBridge.',
      ],
      [
        'My part',
        'I turned the research goal into an ML, backend and frontend backlog with acceptance criteria, review the team’s pull requests, and designed the accessible Figma interfaces.',
      ],
    ],
    stack: ['AWS', 'Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'MCP'],
    links: [],
    note: 'Team repo is private',
    video: '/videos/vitality.mp4',
    poster: '/videos/vitality.webp',
    description:
      'Demo of Vitality: signing in, a daily check-in, sleep, weight, heart-rate and step cards, a sleep chart, and a plain-language fall-risk summary with a chat companion.',
  },
  {
    id: 'studyhub',
    name: 'StudyHub',
    kind: 'web',
    frameLabel: 'StudyHub · recorded demo',
    tagline: 'Breaks big assignments into small tasks',
    year: '2026',
    role: 'Team project, COP 4331',
    context: 'Processes for Object-Oriented Software Development · UCF',
    summary:
      'A task manager that splits overwhelming assignments into manageable subtasks, as a web app with a Flutter mobile client.',
    points: [
      ['Plan', 'A daily digest of the next steps, a seven-day plan, and a calendar of every deadline.'],
      ['Focus', 'A Pomodoro timer that works through the day’s queue one task at a time.'],
      ['Together', 'Study groups and email verification, plus a Flutter client for mobile.'],
    ],
    stack: ['React', 'TypeScript', 'Express', 'MongoDB', 'Flutter'],
    links: [
      { label: 'Live site', href: 'http://poosd-group15.com/login' },
      { label: 'GitHub', href: 'https://github.com/ThineRuler/study-hub' },
    ],
    video: '/videos/studyhub.mp4',
    poster: '/videos/studyhub.webp',
    description:
      'Demo of StudyHub: signing in, the daily digest, the seven-day plan, the deadline calendar, a study group, and the Pomodoro timer.',
  },
  {
    id: 'knights-pantry',
    name: 'Knight’s Pantry',
    kind: 'phone',
    tagline: 'Winner, Gemiknights 2025',
    award: 'Hackathon winner',
    year: 'Jun 2025',
    role: 'Built in a 12-hour sprint',
    context: 'Gemiknights 2025 hackathon · UCF',
    summary:
      'A cross-platform pantry app designed to serve UCF’s 60,000+ students, shipped as an iOS, Android and web MVP in a 12-hour sprint.',
    points: [
      ['Gemini OCR', 'The Gemini API identifies donated products from a photo, streamlining donation logging by 60%.'],
      ['Shop', 'Students search the pantry or browse by category, then pick a pickup time.'],
      ['Give', 'Donors can give items or money from the same app.'],
    ],
    facts: [
      ['12 hrs', 'from idea to working MVP'],
      ['3', 'platforms: iOS, Android and web'],
      ['60%', 'streamlined donation logging'],
    ],
    stack: ['Expo', 'React Native', 'Node.js', 'MongoDB', 'Gemini API'],
    links: [
      { label: 'GitHub', href: 'https://github.com/acsahl/KnightsPantry' },
      { label: 'Devpost', href: 'https://devpost.com/software/knight-s-pantry' },
    ],
    video: '/videos/knightspantry-phone.mp4',
    poster: '/videos/knightspantry-phone.webp',
    description:
      'Demo of Knight’s Pantry on a phone: browsing pantry categories, searching for items, choosing to donate, and scheduling a pickup time.',
  },
  {
    id: 'dialedin',
    name: 'DialedIn',
    kind: 'phone',
    tagline: 'AI-generated workout plans',
    year: '2025',
    role: 'Mobile app',
    context: 'React Native · Gemini',
    summary:
      'A React Native fitness app that turns “how long will you be at the gym?” into a Gemini-generated workout plan.',
    points: [
      ['Plan', 'Pick a session from 30 to 120 minutes and get a plan with a warm-up, exercises by muscle group, and alternatives.'],
      ['Train', 'A guided workout flow tracks every set, runs rest timers, and suggests alternative exercises.'],
    ],
    facts: [
      ['30–120', 'minute sessions, planned for you'],
      ['Gemini', 'writes the workout plan'],
      ['Set by set', 'guided flow with rest timers'],
    ],
    stack: ['React Native', 'Expo', 'MongoDB', 'Gemini'],
    links: [{ label: 'GitHub', href: 'https://github.com/acsahl/DialedIn' }],
    video: '/videos/dialedin-phone.mp4',
    poster: '/videos/dialedin-phone.webp',
    description:
      'Demo of DialedIn on a phone: signing in, choosing a 60-minute session, the generated muscle-gain plan, and the set-by-set workout flow with rest timers.',
  },
]

// Vitality's AWS pipeline, stage by stage, as the resume describes it.
export const vitalityPipeline = [
  {
    step: 'Collect',
    title: 'Wearable, body-composition & voice data',
    services: ['Wearables', 'Body-composition scale', 'Voice'],
  },
  {
    step: 'Ingest',
    title: 'Scheduled wearable ingestion',
    services: ['AWS Lambda', 'EventBridge'],
  },
  {
    step: 'Store',
    title: 'Records, training data & models',
    services: ['PostgreSQL on RDS', 'S3'],
  },
  {
    step: 'Score',
    title: 'Explainable fall-risk model',
    services: ['Logistic regression', 'FastAPI on Elastic Beanstalk'],
  },
  {
    step: 'Explain',
    title: 'LLM companion (in development)',
    services: ['MCP tools'],
  },
  {
    step: 'Deliver',
    title: 'Large-type, accessible dashboard',
    services: ['React on CloudFront', 'Cognito sign-in'],
  },
]

export const education = {
  school: 'University of Central Florida',
  degree: 'B.S. Computer Science (Honors)',
  minor: 'Minor in Digital Media',
  gpa: '3.73 / 4.0',
  graduation: 'Expected May 2027',
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Processes for Object-Oriented Software Development',
    'Systems Software',
    'Computer Logic & Organization',
    'Computer Networks & Design',
    'Artificial Intelligence',
  ],
}

export const honors = [
  { name: 'KnightHacks', detail: 'Winner' },
  { name: 'Gemiknights 2025', detail: 'Winner, Knight’s Pantry' },
  { name: 'BNY Good Within Case Competition', detail: 'Team lead, 5 people' },
  { name: 'InterVarsity', detail: 'Club president' },
  { name: 'CodePath', detail: 'Tech Fellow' },
  { name: 'Foundation Partners', detail: 'IT Analyst' },
  { name: 'Girls Who Code', detail: '' },
]

export const certifications = [
  'AWS Cloud Security Foundations',
  'Microsoft Azure Fundamentals (AZ-900)',
  'PCEP Certified Entry-Level Python Programmer',
  'Google AI Essentials',
  'Adobe Intro to Generative AI',
]

export const toolbox = [
  { group: 'Languages', items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'C', 'HTML/CSS'] },
  {
    group: 'Back end & distributed',
    items: ['Spring Boot', 'FastAPI', 'REST API design', 'Node.js / Express', 'Docker', 'Kubernetes', 'Linux / Bash'],
  },
  {
    group: 'Cloud, data & ops',
    items: ['AWS: Elastic Beanstalk, RDS, S3, Lambda, Cognito', 'PostgreSQL', 'Oracle SQL', 'MongoDB', 'Prometheus', 'Grafana'],
  },
  {
    group: 'AI-assisted development',
    items: ['LLM agent workflows', 'Prompt design', 'Gemini API', 'Google ADK', 'MCP', 'Cursor', 'Windsurf'],
  },
  {
    group: 'Front end, mobile & tools',
    items: ['React', 'React Native', 'Flutter', 'Expo', 'Figma', 'Git / GitHub', 'Jira', 'Agile / Scrum'],
  },
]
