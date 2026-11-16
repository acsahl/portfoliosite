import { agentFlow, experience } from '../data/content'
import { Check } from './ui/Icons'
import { Reveal, Rule } from './ui/motion'
import SectionHeader from './ui/SectionHeader'

export default function Experience() {
  return (
    <section
      id="experience"
      data-section="experience"
      data-theme="light"
      aria-labelledby="experience-title"
      className="paper-grain bg-paper text-ink"
    >
      <div className="page py-28 lg:py-40">
        <SectionHeader
          id="experience-title"
          number="01"
          label="Experience"
          aside="2025 — 2026"
          title="The work behind the numbers."
          italic={[4]}
          deck="Two software engineering internships at BNY, a summer shipping mobile features at Life Stages, and teaching Computer Science I at UCF since 2025."
        />

        <ol>
          {experience.map((role, i) => (
            <Role key={role.id} role={role} index={i} />
          ))}
        </ol>
        <Rule className="bg-ink/15" />
      </div>
    </section>
  )
}

function Role({ role, index }) {
  return (
    <li className="group relative">
      <Rule className="bg-ink/15" delay={index * 0.05} />
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 py-10 lg:grid-cols-12 lg:py-14">
        <Reveal className="flex flex-row flex-wrap items-baseline justify-between gap-x-6 gap-y-1 lg:sticky lg:top-24 lg:col-span-3 lg:flex-col lg:justify-start lg:self-start">
          <p className="eyebrow nums text-ink">
            {role.start} <span className="text-stone">—</span> {role.end}
          </p>
          {role.location && <p className="eyebrow text-stone lg:mt-2">{role.location}</p>}
        </Reveal>

        <Reveal delay={0.06} className="lg:sticky lg:top-24 lg:col-span-3 lg:self-start">
          <h3 className="font-display text-[clamp(2.1rem,3.4vw,3rem)] leading-[1] tracking-[-0.02em]">
            {role.orgShort ?? role.org}
          </h3>
          {role.orgShort && <p className="mt-1 text-[14px] text-stone">{role.org}</p>}
          <p className="mt-3 max-w-[26ch] text-[15px] leading-snug text-ink/80">{role.role}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
            {role.metric}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-6">
          <p className="text-pretty font-display text-[clamp(1.35rem,1.9vw,1.7rem)] leading-[1.3] text-ink">{role.headline}</p>
          <ul className="mt-6 space-y-3">
            {role.points.map((point) => (
              <li key={point} className="flex gap-3 text-[16px] leading-relaxed text-stone">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-amber-700" />
                <span className="text-pretty">{point}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills used">
            {role.tags.map((tag) => (
              <li key={tag} className="chip border-ink/15 text-ink/70">
                {tag}
              </li>
            ))}
          </ul>
          {role.featured && <AgentDiagram />}
        </Reveal>
      </div>
    </li>
  )
}

// How the BNY redemption agent reconciles a request. Drawn from the resume's
// description; there is no real data in it.
function AgentDiagram() {
  return (
    <figure className="flow mt-10 overflow-hidden rounded-2xl border border-ink/12 bg-paper-50/80 shadow-[0_1px_0_rgba(18,21,27,0.04),0_24px_60px_-40px_rgba(18,21,27,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-ink/10 px-5 py-3">
        <span className="eyebrow text-ink">How the agent works</span>
        <span className="eyebrow text-stone">Illustration · no real data</span>
      </div>

      <div className="flow-grid px-5 py-6 sm:px-6 sm:py-8">
        <ul className="flow-row grid gap-2" aria-label="Inputs">
          {agentFlow.inputs.map((input) => (
            <li key={input} className="rounded-lg border border-ink/12 bg-paper px-3 py-2.5 text-[14px] leading-tight text-ink">
              {input}
            </li>
          ))}
        </ul>

        <Connector />

        <div className="mx-auto rounded-xl bg-ink px-5 py-4 text-center text-paper shadow-[0_16px_40px_-20px_rgba(18,21,27,0.7)]">
          <p className="eyebrow text-amber">Gen-AI agent</p>
          <p className="mt-1.5 font-display text-[19px] leading-tight">Reconcile</p>
        </div>

        <Connector />

        <div>
          <ul className="flow-row grid gap-2" aria-label="Fields matched">
            {agentFlow.checks.map((check) => (
              <li
                key={check}
                className="flex items-center justify-between gap-3 rounded-lg border border-ink/12 bg-paper px-3 py-2.5 text-[14px] leading-tight text-ink"
              >
                <span>
                  <span className="flow-kicker text-stone">match </span>
                  {check}
                </span>
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/90 text-ink">
                  <Check width={12} height={12} strokeWidth={2.6} aria-hidden="true" />
                  <span className="sr-only">matched</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-2 whitespace-nowrap font-display text-[17px] italic text-ink">
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-ink/40" />
            {agentFlow.output}
          </p>
        </div>
      </div>

      <figcaption className="grid gap-px border-t border-ink/10 bg-ink/10 text-[14px] leading-snug sm:grid-cols-2">
        <p className="bg-paper-50 px-5 py-4 text-stone">
          <span className="eyebrow mb-1 block text-ink">Before rollout</span>
          Validated against Spring Boot mock NetX360 endpoints and synthetic data.
        </p>
        <p className="bg-paper-50 px-5 py-4 text-stone">
          <span className="eyebrow mb-1 block text-ink">After</span>
          Other teams adopted its output and UI structure as the model for their own agents.
        </p>
      </figcaption>
    </figure>
  )
}

// A short flowing connector: horizontal beside the nodes, vertical when stacked.
function Connector() {
  return (
    <div aria-hidden="true" className="flow-gap flex items-center justify-center">
      <svg className="flow-x h-3 w-11 overflow-visible" viewBox="0 0 44 12">
        <line x1="0" y1="6" x2="38" y2="6" stroke="#12151B" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" className="animate-flow" />
        <path d="M35 2l5 4-5 4" fill="none" stroke="#12151B" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="flow-y h-9 w-3 overflow-visible" viewBox="0 0 12 36">
        <line x1="6" y1="0" x2="6" y2="30" stroke="#12151B" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" className="animate-flow" />
        <path d="M2 27l4 5 4-5" fill="none" stroke="#12151B" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
