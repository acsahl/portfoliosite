import { certifications, education, honors, toolbox } from '../data/content'
import { Reveal } from './ui/motion'
import SectionHeader from './ui/SectionHeader'

export default function About() {
  return (
    <section id="about" data-section="about" data-theme="light" aria-labelledby="about-title" className="paper-grain bg-paper text-ink">
      <div className="page py-28 lg:py-40">
        <SectionHeader id="about-title" number="03" label="About" aside="Orlando, FL" title="The longer version." italic={[1]} />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal as="p" className="text-pretty font-display text-[clamp(1.6rem,2.6vw,2.35rem)] leading-[1.22] tracking-[-0.01em]">
              I’m a Computer Science Honors student at UCF with a minor in Digital Media, graduating in{' '}
              <span className="italic">May 2027</span>.
            </Reveal>
            <Reveal delay={0.08} className="mt-8 max-w-[62ch] space-y-5 text-pretty text-[17px] leading-relaxed text-stone">
              <p>
                My work so far spans a generative-AI agent, a REST API and a monitoring service at BNY, React Native and
                Flutter features at Life Stages, and leading a five-person senior design team on Vitality.
              </p>
              <p>
                I also TA Computer Science I, where I run weekly problem-solving sessions and 1-on-1 debugging for 60+
                students. On the design side, I designed Vitality’s accessible Figma interfaces and built Figma prototypes
                at Life Stages.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-14">
              <p className="eyebrow border-b border-ink/15 pb-3 text-stone">Honors &amp; leadership</p>
              <ul>
                {honors.map((h) => (
                  <li key={h.name} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-3.5">
                    <span className="text-[16px] text-ink">{h.name}</span>
                    <span className="shrink-0 text-right text-[14px] text-stone">{h.detail}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-6 lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.05} className="rounded-2xl border border-ink/12 bg-paper-50/80 p-6 sm:p-8">
              <p className="eyebrow text-stone">Education</p>
              <p className="mt-5 font-display text-[28px] leading-[1.1]">{education.school}</p>
              <p className="mt-2 text-[16px] text-ink/85">{education.degree}</p>
              <p className="text-[16px] text-ink/85">{education.minor}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-5">
                <div>
                  <dt className="eyebrow text-stone">GPA</dt>
                  <dd className="nums mt-1.5 font-display text-[26px] leading-none">{education.gpa}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-stone">Graduation</dt>
                  <dd className="mt-1.5 font-display text-[26px] leading-none">May 2027</dd>
                </div>
              </dl>
              <p className="eyebrow mt-7 text-stone">Relevant coursework</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <li key={c} className="rounded-full border border-ink/12 px-3 py-1 text-[13px] text-ink/80">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="rounded-2xl border border-ink/12 p-6 sm:p-8">
              <p className="eyebrow text-stone">Certifications</p>
              <ul className="mt-4 space-y-2.5">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-3 text-[15px] leading-snug text-ink/85">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-amber-700" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Toolbox />
      </div>
    </section>
  )
}

function Toolbox() {
  return (
    <div className="mt-24 lg:mt-32">
      <Reveal className="flex items-baseline justify-between gap-6 border-b border-ink/15 pb-4">
        <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-none tracking-[-0.02em]">
          The <span className="italic">toolbox</span>
        </h3>
        <p className="eyebrow hidden text-stone sm:block">What I build with</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
        {toolbox.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.06} className="border-b border-ink/10 py-7 lg:border-b-0">
            <p className="eyebrow text-amber-700">
              {String(i + 1).padStart(2, '0')} · {group.group}
            </p>
            <ul className="mt-4 space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-[15.5px] leading-snug text-ink/85">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
