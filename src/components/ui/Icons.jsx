// Small inline icon set, drawn on a 24px grid with a 1.6px stroke.
const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
)
export const ArrowDown = (p) => (
  <svg {...base} {...p}><path d="M12 4v15M6 13l6 6 6-6" /></svg>
)
export const ArrowLeft = (p) => (
  <svg {...base} {...p}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
)
export const Copy = (p) => (
  <svg {...base} {...p}><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
)
export const Play = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
)
export const Pause = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><rect x="6.5" y="5" width="4" height="14" rx="1" /><rect x="13.5" y="5" width="4" height="14" rx="1" /></svg>
)
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
)
export const Search = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
)
export const Close = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Corner = (p) => (
  <svg {...base} {...p}><path d="M9 10 4 15l5 5" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></svg>
)
export const Github = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19c.49.09.67-.21.67-.47v-1.66c-2.72.59-3.29-1.31-3.29-1.31-.45-1.13-1.1-1.43-1.1-1.43-.88-.6.07-.59.07-.59.98.07 1.5 1 1.5 1 .87 1.5 2.29 1.07 2.85.82.09-.63.34-1.07.62-1.31-2.17-.25-4.46-1.09-4.46-4.83 0-1.07.38-1.94 1-2.62-.1-.25-.43-1.24.1-2.59 0 0 .82-.26 2.68 1a9.3 9.3 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .53 1.35.2 2.34.1 2.59.62.68 1 1.55 1 2.62 0 3.75-2.3 4.58-4.48 4.82.35.3.66.9.66 1.82v2.7c0 .26.18.57.68.47A9.75 9.75 0 0 0 12 2.25Z" />
  </svg>
)
export const Linkedin = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3ZM8.4 18.3H5.7V9.75h2.7v8.55ZM7.05 8.58a1.56 1.56 0 1 1 0-3.13 1.56 1.56 0 0 1 0 3.13Zm11.25 9.72h-2.67v-4.16c0-.99-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2v4.23H9.98V9.75h2.56v1.17h.04a2.8 2.8 0 0 1 2.52-1.39c2.7 0 3.2 1.78 3.2 4.09v4.68Z" />
  </svg>
)
export const Trophy = (p) => (
  <svg {...base} {...p}><path d="M8 4.5h8v4.5a4 4 0 0 1-8 0V4.5ZM8 6.5H5.5a2.5 2.5 0 0 0 2.6 3.2M16 6.5h2.5a2.5 2.5 0 0 1-2.6 3.2M12 13v3.5M8.5 19.5h7M10 16.5h4l.5 3h-5l.5-3Z" /></svg>
)
export const Lock = (p) => (
  <svg {...base} {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></svg>
)
