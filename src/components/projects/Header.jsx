export default function Header({ dark = false, title = "Things I've shipped." }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-10">
      <div>
        <p className={`font-mono text-xs tracking-widest mb-2 ${dark ? 'text-amber' : 'text-amber-dark'}`}>WORK</p>
        <h2 className={`font-display font-bold ${dark ? 'text-paper' : 'text-navy'}`} style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)' }}>{title}</h2>
      </div>
      <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
        className={`text-sm transition-colors shrink-0 ${dark ? 'text-paper/60 hover:text-paper' : 'text-navy/60 hover:text-navy'}`}>More on GitHub →</a>
    </div>
  )
}

export function TechList({ tech, dark = false }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map(t => (
        <span key={t} className={`pill px-2.5 py-0.5 text-[11px] font-mono border ${dark ? 'text-paper/70 border-paper/20' : 'text-navy/60 border-navy/15'}`}>{t}</span>
      ))}
    </div>
  )
}
