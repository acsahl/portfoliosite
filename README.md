# Acsah Lukose — portfolio

The source for [acsahportfolio.netlify.app](https://acsahportfolio.netlify.app/): a single-page portfolio laid out like a
magazine, with recorded demos of four projects and an architecture walkthrough of Vitality.

Built with React 18, Vite, Tailwind CSS and [Motion](https://motion.dev/). Hosted on Netlify.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build at http://localhost:4173
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/data/content.js` | **All the copy.** Roles, projects, numbers, coursework, links. Edit this to update the site. |
| `src/components/Hero.jsx` | Nameplate, intro and the four headline numbers |
| `src/components/Experience.jsx` | Roles, plus the diagram of the BNY agent |
| `src/components/work/` | Project switcher, demo video player, device frames, Vitality pipeline |
| `src/components/About.jsx`, `Contact.jsx`, `Footer.jsx` | The rest of the page |
| `src/components/Nav.jsx`, `CommandPalette.jsx` | Navigation and the ⌘K / Ctrl K menu |
| `src/components/ui/` | Shared pieces: icons, scroll reveals, section headers |
| `src/lib/` | Hooks and shared UI state |
| `public/videos/` | Demo recordings and their poster frames |

## Updating content

Everything on the page reads from `src/data/content.js`, so most edits never touch a component.

- **A new role**: add an object to `experience`. Set `featured: true` on at most one.
- **A new project**: add an object to `projects`. Use `kind: 'web'` for a browser recording (16:9) or `kind: 'phone'`
  for a phone recording (304:664, with three `facts`). Put the `.mp4` and a `.webp` poster in `public/videos/`.
- **The headline numbers**: `ledger`.

Demo videos are silent H.264 `.mp4` files. They load only when they scroll near the viewport and play only while on
screen.

## Accessibility and motion

- Keyboard reachable throughout, with a skip link, visible focus, and focus trapped inside the menu and command palette.
- `prefers-reduced-motion` turns off the entrance animations and stops the demos from autoplaying.
- Text meets WCAG AA contrast on both the dark and light chapters.
