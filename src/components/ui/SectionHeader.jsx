import { Reveal, Rule, SplitWords } from './motion'

// Every chapter opens the same way: a numbered folio line, a hairline, then a
// big headline with an optional deck beside it.
export default function SectionHeader({ id, number, label, aside, title, italic = [], deck, tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <header className="mb-14 lg:mb-20">
      <div className={`eyebrow flex items-baseline justify-between gap-6 pb-4 ${dark ? 'text-mist' : 'text-stone'}`}>
        <span>
          <span className={dark ? 'text-amber' : 'text-amber-700'}>{number}</span>
          <span aria-hidden="true" className="mx-2 opacity-60">/</span>
          {label}
        </span>
        {aside && <span className="hidden sm:block">{aside}</span>}
      </div>
      <Rule className={dark ? 'bg-paper/20' : 'bg-ink/20'} />
      <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
        <SplitWords
          as="h2"
          id={id}
          text={title}
          italic={italic}
          className={`font-display text-[clamp(2.9rem,7.4vw,6.75rem)] font-normal leading-[0.95] tracking-[-0.03em] lg:col-span-8 ${dark ? 'text-paper' : 'text-ink'}`}
        />
        {deck && (
          <Reveal
            as="p"
            delay={0.2}
            className={`text-pretty text-[17px] leading-relaxed lg:col-span-4 lg:pb-3 ${dark ? 'text-mist' : 'text-stone'}`}
          >
            {deck}
          </Reveal>
        )}
      </div>
    </header>
  )
}
