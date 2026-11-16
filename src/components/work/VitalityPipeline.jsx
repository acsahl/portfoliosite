import { vitalityPipeline } from '../../data/content'
import { Reveal } from '../ui/motion'

// A "case file" on Vitality's architecture: six stages from a wearable to the
// dashboard, strung on a rail with a pulse of data travelling along it.
export default function VitalityPipeline() {
  return (
    <div className="border-t border-paper/10 bg-ink-950/40">
      <div className="page py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-mist">
              <span className="text-amber">Case file</span> · Vitality architecture
            </p>
            <h3 className="mt-5 text-balance font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] tracking-[-0.025em]">
              From a wearable to a risk score <span className="italic text-amber">someone can act on.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-pretty text-[16px] leading-relaxed text-mist lg:col-span-4 lg:col-start-9">
            The platform runs on AWS. Scheduled jobs pull wearable data in, an explainable model scores it, and older adults
            see the result in plain language on a large-type dashboard.
          </Reveal>
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-3 pl-8 sm:grid-cols-2 sm:pl-0 lg:mt-16 lg:grid-cols-6 lg:pt-8">
          {/* Phone: a vertical rail down the left edge. */}
          <span aria-hidden="true" className="absolute bottom-7 left-[11px] top-7 w-px bg-paper/15 sm:hidden">
            <span className="pipeline-pulse-v absolute -left-[3.5px] inset-y-0 w-2">
              <span className="absolute bottom-0 left-0 h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_2px_rgba(240,166,58,0.7)]" />
            </span>
          </span>
          {/* Desktop: a horizontal rail across the top. */}
          <span aria-hidden="true" className="absolute inset-x-0 top-[8px] hidden h-px bg-paper/15 lg:block">
            <span className="pipeline-pulse-h absolute inset-x-0 -top-[3.5px] h-2">
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_2px_rgba(240,166,58,0.7)]" />
            </span>
          </span>

          {vitalityPipeline.map((stage, i) => {
            const pending = stage.title.includes('in development')
            return (
              <Reveal
                as="li"
                key={stage.step}
                delay={i * 0.07}
                className={`relative flex flex-col rounded-xl border p-5 ${pending ? 'border-dashed border-paper/25 bg-ink-900' : 'border-paper/12 bg-ink-800'}`}
              >
                {/* Node on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[26px] top-[22px] h-2.5 w-2.5 rounded-full border border-paper/40 bg-ink-900 sm:hidden lg:-top-[29px] lg:left-5 lg:block"
                />
                <p className="eyebrow flex items-center justify-between text-mist">
                  <span>
                    <span className="text-amber">{String(i + 1).padStart(2, '0')}</span> {stage.step}
                  </span>
                  {pending && <span className="text-mist/80">WIP</span>}
                </p>
                <p className="mb-5 mt-5 text-balance font-display text-[19px] leading-[1.2] text-paper">{stage.title}</p>
                <ul className="mt-auto space-y-1.5 border-t border-paper/10 pt-3.5 text-[14px] leading-snug text-paper/65">
                  {stage.services.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.62em] h-px w-2 shrink-0 bg-amber/70" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ol>
        <p className="eyebrow mt-6 text-mist/80">Simplified · the LLM companion is still in development</p>
      </div>
    </div>
  )
}
