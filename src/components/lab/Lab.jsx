import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { mips } from '../../data/content'
import { datapath, decode, describeField, fieldsFor, hex, PRESETS, SIGNALS } from '../../lib/mips'
import { EASE, Reveal } from '../ui/motion'
import SectionHeader from '../ui/SectionHeader'

const FIELD_COLORS = {
  op: '#F0A63A',
  rs: '#7EB6FF',
  rt: '#7FD1B0',
  rd: '#F29BC6',
  shamt: '#A9A499',
  funct: '#C3A6FF',
  offset: '#F2906B',
  target: '#F2906B',
}

export default function Lab() {
  return (
    <section id="lab" data-section="lab" data-theme="light" aria-labelledby="lab-title" className="paper-grain bg-paper-200 text-ink">
      <div className="page py-28 lg:py-40">
        <SectionHeader
          id="lab-title"
          number="03"
          label="Lab"
          aside={`${mips.course} · ${mips.date}`}
          title="Thirty-two bits at a time."
          italic={[1]}
          deck={mips.summary}
        />
        <Reveal>
          <Decoder />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal as="p" className="text-pretty text-[16px] leading-relaxed text-stone lg:col-span-6">
            {mips.detail}
          </Reveal>
          <Reveal as="p" delay={0.08} className="eyebrow text-stone lg:col-span-5 lg:col-start-8 lg:pt-1.5 lg:text-right">
            The original simulator is written in C · this is a browser re-creation of its decode stage
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Decoder() {
  const [word, setWord] = useState(PRESETS[0].word)
  const [draft, setDraft] = useState(null) // text in the hex box while typing
  const d = useMemo(() => decode(word), [word])
  const preset = PRESETS.find((p) => p.word === word)
  const fields = fieldsFor(d.format)

  const flip = (bit) => {
    setDraft(null)
    setWord((w) => (w ^ (1 << bit)) >>> 0)
  }

  const onHex = (e) => {
    const text = e.target.value.replace(/^0x/i, '').replace(/[^0-9a-f]/gi, '').slice(0, 8)
    setDraft(text)
    if (text.length) setWord(parseInt(text, 16) >>> 0)
  }

  return (
    <div className="grain overflow-hidden rounded-3xl bg-ink-900 text-paper shadow-[0_50px_100px_-50px_rgba(18,21,27,0.65)]">
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 px-5 py-3.5 sm:px-8">
        <p className="eyebrow flex items-center gap-2.5 text-mist">
          <span className={`h-2 w-2 rounded-full ${d.halt ? 'bg-[#F2906B]' : 'bg-signal'}`} aria-hidden="true" />
          decode stage
        </p>
        <p className="eyebrow text-mist/80">Flip any bit</p>
      </div>

      <div className="px-5 py-7 sm:px-8 sm:py-9">
        {/* Inputs */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="radiogroup" aria-label="Example instructions" className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {PRESETS.map((p) => {
              const on = preset?.label === p.label
              return (
                <button
                  key={p.label}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => {
                    setDraft(null)
                    setWord(p.word)
                  }}
                  className={`h-9 shrink-0 rounded-full border px-3.5 font-mono text-[13px] transition-colors duration-200
                    ${on ? 'border-amber bg-amber text-ink' : 'border-paper/15 text-paper/75 hover:border-paper/40 hover:text-paper'}`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          <label className="flex h-11 shrink-0 items-center gap-1 rounded-xl border border-paper/15 bg-ink-950/60 pl-3.5 pr-2 font-mono text-[15px] focus-within:border-amber">
            <span className="text-mist">0x</span>
            <input
              value={draft ?? hex(word).slice(2)}
              onChange={onHex}
              onBlur={() => setDraft(null)}
              spellCheck="false"
              autoComplete="off"
              inputMode="text"
              maxLength={10}
              aria-label="Instruction word in hexadecimal"
              className="w-[8.5ch] bg-transparent uppercase tracking-[0.06em] text-paper outline-none"
            />
            <span className="eyebrow ml-1 rounded-md bg-paper/5 px-2 py-1 text-mist">{preset ? 'example' : 'custom'}</span>
          </label>
        </div>

        {/* Disassembly */}
        <div className="mt-9 flex flex-col gap-3 border-t border-paper/10 pt-7 sm:flex-row sm:items-end sm:justify-between" aria-live="polite">
          <div className="min-w-0">
            <p className="eyebrow text-mist">Disassembly</p>
            <p className={`mt-2 truncate font-mono text-[clamp(1.4rem,3.6vw,2.6rem)] leading-tight ${d.halt ? 'text-[#F2906B]' : 'text-paper'}`}>
              {d.halt ? 'HALT' : d.asm}
            </p>
            <p className="mt-1.5 font-mono text-[14px] text-mist">{d.halt ? `${d.halt}: the machine stops here` : d.effect}</p>
          </div>
          <p className="eyebrow shrink-0 self-start rounded-full border border-paper/15 px-3 py-1.5 text-paper/80 sm:self-auto">
            {d.halt ? 'Illegal' : `${d.format}-type`}
          </p>
        </div>

        {/* The 32 bits, grouped by field */}
        <div className="mt-8 flex flex-wrap gap-x-3 gap-y-5 sm:gap-x-2.5" role="group" aria-label="Instruction bits, 31 to 0">
          {fields.map((field) => (
            <BitGroup key={field.key} field={field} word={word} d={d} onFlip={flip} />
          ))}
        </div>

        {/* Code + control unit */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Snippet format={d.halt ? null : d.format} />
          <ControlUnit d={d} />
        </div>
      </div>
    </div>
  )
}

function BitGroup({ field, word, d, onFlip }) {
  const color = FIELD_COLORS[field.key]
  const bits = []
  for (let b = field.from; b >= field.to; b--) bits.push(b)
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap gap-[2px]">
        {bits.map((b) => {
          const v = (word >>> b) & 1
          return (
            <button
              key={b}
              type="button"
              onClick={() => onFlip(b)}
              aria-label={`Bit ${b} (${field.label}): ${v}. Flip`}
              className="group relative grid h-[clamp(34px,3.4vw,46px)] w-[clamp(24px,2.35vw,30px)] place-items-center overflow-hidden rounded-[4px] bg-paper/[0.06] font-mono text-[clamp(12px,1.2vw,15px)] transition-colors hover:bg-paper/[0.14] [perspective:200px]"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: color, opacity: v ? 1 : 0.35 }} />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={v}
                  aria-hidden="true"
                  className={v ? 'text-paper' : 'text-paper/50'}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.35, delay: (31 - b) * 0.008, ease: EASE }}
                >
                  {v}
                </motion.span>
              </AnimatePresence>
            </button>
          )
        })}
      </div>
      <div className="mt-2.5 flex flex-col gap-0.5 font-mono">
        <span className="text-[11px] uppercase tracking-[0.1em]" style={{ color }}>
          {field.label}
        </span>
        <span className="text-[13px] text-paper/85">{describeField(field.key, d)}</span>
        <span className="text-[10.5px] text-mist/80">
          {field.from}–{field.to}
        </span>
      </div>
    </div>
  )
}

const SNIPPET = [
  { key: 'op', code: 'op     = (instr >> 26) & 0x3F;', formats: ['R', 'I', 'J'] },
  { key: 'rs', code: 'rs     = (instr >> 21) & 0x1F;', formats: ['R', 'I'] },
  { key: 'rt', code: 'rt     = (instr >> 16) & 0x1F;', formats: ['R', 'I'] },
  { key: 'rd', code: 'rd     = (instr >> 11) & 0x1F;', formats: ['R'] },
  { key: 'shamt', code: 'shamt  = (instr >>  6) & 0x1F;', formats: ['R'] },
  { key: 'funct', code: 'funct  =  instr        & 0x3F;', formats: ['R'] },
  { key: 'offset', code: 'offset =  instr        & 0xFFFF;', formats: ['I'] },
  { key: 'offset', code: 'ext    = (offset & 0x8000) ? offset | 0xFFFF0000 : offset;', formats: ['I'] },
  { key: 'target', code: 'target =  instr        & 0x3FFFFFF;', formats: ['J'] },
]

function Snippet({ format }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-paper/10 bg-ink-950/70">
      <figcaption className="flex items-center justify-between border-b border-paper/10 px-4 py-2.5">
        <span className="font-mono text-[12px] text-mist">decode.c</span>
        <span className="eyebrow hidden text-mist/80 sm:inline">split by mask & shift</span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-[1.75] sm:text-[13px]">
        {SNIPPET.map((line, i) => {
          const on = format && line.formats.includes(format)
          return (
            <div key={i} className="flex gap-4 transition-opacity duration-300" style={{ opacity: on ? 1 : 0.6 }}>
              <span aria-hidden="true" className="hidden w-4 shrink-0 select-none text-right text-mist/75 sm:block">
                {i + 1}
              </span>
              {/* Wraps on a phone, with continuation lines hung under the value. */}
              <code className="block min-w-0 whitespace-pre-wrap pl-[9ch] -indent-[9ch]">
                <span style={{ color: on ? FIELD_COLORS[line.key] : undefined }}>{line.code.split('=')[0]}</span>=
                <span className="text-paper/85">{line.code.split('=').slice(1).join('=')}</span>
              </code>
            </div>
          )
        })}
      </pre>
    </figure>
  )
}

function ControlUnit({ d }) {
  const paths = datapath(d)
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-paper/10 bg-ink-950/70">
      <div className="flex items-center justify-between border-b border-paper/10 px-4 py-2.5">
        <span className="font-mono text-[12px] text-mist">control unit</span>
        <span className="eyebrow text-mist/80">ALUOp: {d.halt ? '—' : d.alu}</span>
      </div>
      <ul className="grid flex-1 auto-rows-fr grid-cols-2 gap-px bg-paper/10 sm:grid-cols-4">
        {SIGNALS.map((s) => {
          const v = d.halt ? 'X' : d.control[s]
          return (
            <li key={s} className="flex items-center justify-between gap-2 bg-ink-950 px-4 py-3.5">
              <span className="font-mono text-[12.5px] text-paper/80">{s}</span>
              <span className="flex items-center gap-2 font-mono text-[12.5px]">
                <span className={v === 1 ? 'text-amber' : 'text-mist/80'}>{v}</span>
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    v === 1
                      ? 'bg-amber shadow-[0_0_10px_2px_rgba(240,166,58,0.55)]'
                      : v === 'X'
                        ? 'border border-dashed border-mist/50'
                        : 'bg-paper/15'
                  }`}
                />
              </span>
            </li>
          )
        })}
      </ul>
      <div className="border-t border-paper/10">
        <p className="px-4 py-2.5 font-mono text-[12px] text-mist">datapath</p>
        <dl className="grid grid-cols-2 gap-px border-t border-paper/10 bg-paper/10 sm:grid-cols-4">
          {(paths ?? DATAPATH_HALTED).map((row) => (
            <div key={row.label} className="min-w-0 bg-ink-950 px-4 py-3">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mist/80">{row.label}</dt>
              <dd className={`mt-1 truncate font-mono text-[13px] ${row.value === '—' ? 'text-mist/75' : 'text-paper/90'}`}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

const DATAPATH_HALTED = ['Write reg', 'ALU in B', 'Write data', 'Next PC'].map((label) => ({ label, value: '—' }))
