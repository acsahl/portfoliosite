import { useRef } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { projects } from '../../data/content'
import { useIsDesktop } from '../../lib/hooks'
import { useUI } from '../../lib/ui'
import { ArrowUpRight, Lock, Trophy } from '../ui/Icons'
import { EASE, Reveal } from '../ui/motion'
import SectionHeader from '../ui/SectionHeader'
import DemoVideo from './DemoVideo'
import { BrowserFrame, PhoneFrame } from './Frames'
import VitalityPipeline from './VitalityPipeline'

export default function Work() {
  const desktop = useIsDesktop()
  return (
    <section id="work" data-section="work" data-theme="dark" aria-labelledby="work-title" className="grain relative bg-ink-900 text-paper">
      <div className="page py-28 lg:py-40">
        <SectionHeader
          id="work-title"
          tone="dark"
          number="02"
          label="Selected work"
          aside="Recorded demos · silent"
          title="Watch it run."
          italic={[2]}
          deck="Four projects, each recorded from the real app: a senior-design health platform, a team-built study planner, a hackathon winner, and an AI workout coach."
        />
        {desktop ? <Screening /> : <Stack />}
      </div>
      <VitalityPipeline />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: one stage, a vertical index of projects beside it.         */
/* ------------------------------------------------------------------ */

function Screening() {
  const { activeProject: active, setActiveProject: setActive } = useUI()
  const progress = useMotionValue(0)
  const tabs = useRef([])
  const p = projects[active]

  const select = (i) => {
    progress.set(0)
    setActive(i)
  }

  const onKeyDown = (e) => {
    const last = projects.length - 1
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    select(next)
    tabs.current[next]?.focus()
  }

  return (
    <div id="screening" className="scroll-mt-4">
      <div className="grid grid-cols-12 gap-10 xl:gap-14">
        <div className="col-span-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-paper/10 bg-ink-800">
            <StageBackdrop />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={p.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {p.kind === 'web' ? <WebStage project={p} progress={progress} /> : <PhoneStage project={p} progress={progress} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="col-span-4 flex flex-col">
          <div
            role="tablist"
            aria-label="Projects"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex flex-1 flex-col border-t border-paper/15"
          >
            {projects.map((q, i) => {
              const on = i === active
              return (
                <button
                  key={q.id}
                  ref={(el) => (tabs.current[i] = el)}
                  role="tab"
                  id={`tab-${q.id}`}
                  aria-selected={on}
                  aria-controls="project-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  className="group relative flex flex-1 flex-col justify-center border-b border-paper/15 py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`font-mono text-[11px] transition-colors ${on ? 'text-amber' : 'text-mist/75'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-[clamp(1.5rem,2.1vw,2rem)] leading-none tracking-[-0.01em] transition-colors duration-300
                        ${on ? 'text-paper' : 'text-paper/40 group-hover:text-paper/75'}`}
                    >
                      {q.name}
                    </span>
                    <span className={`eyebrow ml-auto shrink-0 transition-colors ${on ? 'text-mist' : 'text-mist/75'}`}>{q.year}</span>
                  </span>
                  <span
                    className={`mt-2 block pl-[calc(11px*2.4+1rem)] text-[14px] leading-snug transition-colors duration-300
                      ${on ? 'text-mist' : 'text-mist/75 group-hover:text-mist'}`}
                  >
                    {q.tagline}
                  </span>
                  {on && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-px left-0 right-0 h-px origin-left bg-amber"
                      style={{ scaleX: progress }}
                    />
                  )}
                </button>
              )
            })}
          </div>
          <p className="eyebrow mt-5 flex items-center gap-2 text-mist/80">
            <span className="kbd border-paper/20 text-mist">↑</span>
            <span className="kbd border-paper/20 text-mist">↓</span>
            to switch projects
          </p>
        </div>
      </div>

      <div id="project-panel" role="tabpanel" aria-labelledby={`tab-${p.id}`} className="mt-12 border-t border-paper/15 pt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ProjectDetail project={p} index={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function StageBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(246,241,231,0.16) 1px, transparent 0)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 30%, transparent 80%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(60% 55% at 50% 40%, rgba(240,166,58,0.10), transparent 70%)' }}
      />
    </div>
  )
}

function WebStage({ project, progress }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-[5.5%]">
      <BrowserFrame label={project.frameLabel} className="w-full">
        <DemoVideo src={project.video} poster={project.poster} description={project.description} progress={progress} />
      </BrowserFrame>
    </div>
  )
}

function PhoneStage({ project, progress }) {
  return (
    <div className="absolute inset-0 flex items-center gap-[7%] px-[8%]">
      <PhoneFrame className="w-[27%] shrink-0">
        <DemoVideo src={project.video} poster={project.poster} description={project.description} progress={progress} />
      </PhoneFrame>
      <div className="flex-1">
        <PhoneFacts project={project} />
      </div>
    </div>
  )
}

// The three headline facts that sit beside a phone demo.
function PhoneFacts({ project }) {
  return (
    <>
      {project.award && (
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-[13px] text-amber">
          <Trophy width={15} height={15} /> {project.tagline}
        </p>
      )}
      <dl className="border-t border-paper/15">
        {project.facts.map(([value, label]) => (
          <div key={label} className="border-b border-paper/15 py-[clamp(0.6rem,1.4vw,1.1rem)]">
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="nums block font-display text-[clamp(1.6rem,2.8vw,2.6rem)] leading-none tracking-[-0.02em]">{value}</span>
              <span className="mt-1.5 block text-[14px] text-mist">{label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

function ProjectDetail({ project: p }) {
  return (
    <div className="grid grid-cols-12 gap-10 xl:gap-14">
      <div className="col-span-5">
        <p className="eyebrow text-mist">{p.context}</p>
        <h3 className="mt-4 font-display text-[clamp(2.6rem,4.2vw,3.75rem)] leading-[0.95] tracking-[-0.025em]">{p.name}</h3>
        <p className="mt-5 text-pretty text-[17px] leading-relaxed text-paper/85">{p.summary}</p>
        <ProjectLinks project={p} />
      </div>
      <dl className="col-span-4 space-y-6">
        {p.points.map(([term, text]) => (
          <div key={term}>
            <dt className="eyebrow text-amber">{term}</dt>
            <dd className="mt-2 text-pretty text-[15px] leading-relaxed text-mist">{text}</dd>
          </div>
        ))}
      </dl>
      <div className="col-span-3 space-y-6">
        <div>
          <p className="eyebrow text-mist/80">Role</p>
          <p className="mt-2 text-[15px] text-paper">{p.role}</p>
        </div>
        <div>
          <p className="eyebrow text-mist/80">When</p>
          <p className="nums mt-2 text-[15px] text-paper">{p.year}</p>
        </div>
        <div>
          <p className="eyebrow text-mist/80">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s} className="chip border-paper/20 text-paper/75">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ProjectLinks({ project: p }) {
  if (!p.links.length && !p.note) return null
  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      {p.links.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-[14px] font-medium transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5
            ${i === 0 ? 'bg-amber text-ink hover:bg-amber-300' : 'border border-paper/25 text-paper hover:border-paper/60'}`}
        >
          {link.label}
          <ArrowUpRight width={15} height={15} />
          <span className="sr-only"> for {p.name} (opens in a new tab)</span>
        </a>
      ))}
      {p.note && (
        <span className="inline-flex items-center gap-2 text-[14px] text-mist">
          <Lock width={15} height={15} /> {p.note}
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile and tablet: every project gets its own card.                 */
/* ------------------------------------------------------------------ */

function Stack() {
  return (
    <ol className="space-y-6">
      {projects.map((p, i) => (
        <Reveal as="li" key={p.id} id={`project-${p.id}`} className="scroll-mt-2 overflow-hidden rounded-2xl border border-paper/12 bg-ink-800/60">
          <article aria-labelledby={`m-${p.id}`}>
            <div className="relative overflow-hidden border-b border-paper/10 bg-ink-800">
              <StageBackdrop />
              {p.kind === 'web' ? (
                <div className="relative p-3 sm:p-6">
                  <BrowserFrame label={p.frameLabel}>
                    <DemoVideo src={p.video} poster={p.poster} description={p.description} />
                  </BrowserFrame>
                </div>
              ) : (
                <div className="relative flex items-center justify-center gap-12 px-6 py-8 sm:px-12 sm:py-10">
                  <PhoneFrame className="w-[min(58vw,250px)] shrink-0 sm:w-[230px]">
                    <DemoVideo src={p.video} poster={p.poster} description={p.description} />
                  </PhoneFrame>
                  <div className="hidden min-w-0 flex-1 sm:block">
                    <PhoneFacts project={p} />
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 sm:p-8">
              <p className="eyebrow text-mist">
                <span className="text-amber">{String(i + 1).padStart(2, '0')}</span> · <span className="nums">{p.year}</span>
                <span className="mt-1.5 block text-paper/70">{p.role}</span>
              </p>
              <h3 id={`m-${p.id}`} className="mt-4 font-display text-[clamp(2.3rem,9vw,3.2rem)] leading-[0.95] tracking-[-0.02em]">
                {p.name}
              </h3>
              <p className="mt-2 text-pretty text-[14px] leading-snug text-mist">{p.context}</p>
              {p.award && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[13px] text-amber sm:hidden">
                  <Trophy width={14} height={14} /> {p.tagline}
                </p>
              )}
              <p className="mt-4 text-pretty text-[16px] leading-relaxed text-paper/85">{p.summary}</p>
              <dl className="mt-6 space-y-4 border-t border-paper/10 pt-6">
                {p.points.map(([term, text]) => (
                  <div key={term} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                    <dt className="eyebrow text-amber sm:pt-[3px]">{term}</dt>
                    <dd className="text-pretty text-[15px] leading-relaxed text-mist">{text}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
                {p.stack.map((s) => (
                  <li key={s} className="chip border-paper/20 text-paper/75">
                    {s}
                  </li>
                ))}
              </ul>
              <ProjectLinks project={p} />
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  )
}
