// Projects shown in the Work section, in display order.
// `video` and `poster` are paths under public/videos; leave video null to show the placeholder.
export const projects = [
  {
    name: 'Vitality',
    tagline: 'Health dashboard for older adults',
    desc: 'Team project at UCF. A large-type health dashboard for older adults that pulls sleep, steps and weight from their devices, tracks goals, and turns daily check-ins into a weekly fall-risk level with simple tips.',
    tech: ['React', 'TypeScript', 'Recharts', 'FastAPI'],
    github: 'https://github.com/UCF-Vitality/Vitality',
    year: '2026',
    video: '/videos/vitality.mp4',
    poster: '/videos/vitality.jpg',
  },
  {
    name: 'StudyHub',
    tagline: 'Breaks big assignments into small tasks',
    desc: 'Team project for COP4331 at UCF. A task manager that splits overwhelming assignments into subtasks, with study groups, a calendar, a daily digest, a Pomodoro timer and email verification. Web app plus a Flutter mobile client.',
    tech: ['React', 'TypeScript', 'Express', 'MongoDB', 'Flutter'],
    github: 'https://github.com/ThineRuler/study-hub',
    live: 'http://poosd-group15.com/login',
    year: '2026',
    video: '/videos/studyhub.mp4',
    poster: '/videos/studyhub.jpg',
  },
  {
    name: "Knight's Pantry",
    tagline: 'Hackathon winner, built in 12 hours',
    desc: 'Built in 12 hours at a hackathon — a campus food pantry app. Won.',
    tech: ['Expo', 'React Native', 'Gemini API', 'MongoDB'],
    github: 'https://github.com/acsahl/KnightsPantry',
    year: '2025',
    highlight: true,
    video: null
  },
{
    name: 'DialedIn',
    tagline: 'AI-generated workout plans',
    desc: 'React Native fitness app with AI-generated workout plans, powered by Gemini.',
    tech: ['React Native', 'Expo', 'MongoDB', 'Gemini'],
    github: 'https://github.com/acsahl/DialedIn',
    year: '2025',
    video: null
  },
]
