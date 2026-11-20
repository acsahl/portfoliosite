import { site } from '../data/content'
import { useZonedTime } from '../lib/hooks'
import { useUI } from '../lib/ui'
import { ArrowUpRight, Copy, Github, Linkedin } from './ui/Icons'
import { Reveal, Rule, SplitWords } from './ui/motion'

export default function Contact() {
  const { copy } = useUI()
  const { time, zone } = useZonedTime(site.timeZone)
  return (
    <section id="contact" data-section="contact" data-theme="dark" aria-labelledby="contact-title" className="grain relative overflow-hidden bg-ink-900 text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[30%] left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(240,166,58,0.10), transparent 70%)' }}
      />
      <div className="page relative pb-20 pt-28 lg:pb-24 lg:pt-40">
        <div className="eyebrow flex items-baseline justify-between gap-6 pb-4 text-mist">
          <span>
            <span className="text-amber">04</span>
            <span aria-hidden="true" className="mx-2 opacity-60">/</span>Contact
          </span>
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">{site.location} · </span>
            <span className="nums">{time}</span> {zone}
          </span>
        </div>
        <Rule className="bg-paper/20" />

        <SplitWords
          as="h2"
          id="contact-title"
          text="Let’s build something."
          italic={[2]}
          wordClassName="[&.italic]:text-amber"
          className="mt-14 font-display text-[clamp(3.6rem,11.5vw,11.5rem)] font-normal leading-[0.9] tracking-[-0.035em] lg:mt-20"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12">
          <Reveal as="p" className="max-w-[34ch] text-pretty text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed text-paper/80 lg:col-span-5">
            I’m looking for new-grad software engineering roles for 2027. If you’re hiring, or just want to talk shop,
            send me an email.
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="flex flex-col gap-4 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${site.email}`}
                className="link-line break-all font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-tight text-paper transition-colors hover:text-amber"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={() => copy(site.email, 'Email address copied')}
                className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full border border-paper/25 px-5 text-[14px] transition-colors hover:border-paper/60 sm:self-auto"
              >
                <Copy width={16} height={16} /> Copy
              </button>
            </div>
            <ul className="mt-8 border-t border-paper/15">
              <ContactRow href={site.linkedin} icon={<Linkedin width={18} height={18} />} label="LinkedIn" value={`in/${site.linkedinHandle}`} />
              <ContactRow href={site.github} icon={<Github width={18} height={18} />} label="GitHub" value={`@${site.githubHandle}`} />
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ href, icon, label, value }) {
  return (
    <li className="border-b border-paper/15">
      <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-5">
        <span className="text-mist transition-colors group-hover:text-amber">{icon}</span>
        <span className="text-[17px]">{label}</span>
        <span className="ml-auto font-mono text-[13px] text-mist">{value}</span>
        <ArrowUpRight
          width={18}
          height={18}
          className="text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
        />
      </a>
    </li>
  )
}
