// Device chrome for the demos: a quiet browser window for the web apps and a
// phone for the mobile ones. Both are pure CSS so they stay sharp at any size.

export function BrowserFrame({ label, children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-paper/12 bg-ink-700 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-black/30 px-3 sm:h-9">
        <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span className="mx-auto truncate rounded-md bg-ink-900/70 px-3 py-0.5 font-mono text-[10.5px] text-paper/55 sm:px-6">
          {label}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative aspect-video bg-paper">{children}</div>
    </div>
  )
}

// Width comes from the caller (className); everything else scales with it
// through container units, so corners stay circular at any size.
export function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`relative [container-type:inline-size] ${className}`}>
      <div className="relative rounded-[15cqw] bg-ink-950 p-[3.4cqw] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(246,241,231,0.16),0_0_0_1px_rgba(0,0,0,0.6)]">
        <span aria-hidden="true" className="absolute -left-[1.1cqw] top-[18%] h-[6%] w-[1.1cqw] rounded-l-sm bg-ink-600" />
        <span aria-hidden="true" className="absolute -left-[1.1cqw] top-[27%] h-[10%] w-[1.1cqw] rounded-l-sm bg-ink-600" />
        <span aria-hidden="true" className="absolute -right-[1.1cqw] top-[23%] h-[13%] w-[1.1cqw] rounded-r-sm bg-ink-600" />
        <div className="relative aspect-[304/664] overflow-hidden rounded-[11.6cqw] bg-black">{children}</div>
      </div>
    </div>
  )
}
