import { useRef } from 'react'

// A 16:9 video frame. Plays muted on hover when `src` is set; otherwise shows a placeholder.
export default function VideoSlot({ src, poster, label, dark = false, playing, className = '' }) {
  const ref = useRef(null)
  const controlled = playing !== undefined

  const play = () => { if (!controlled) ref.current?.play() }
  const stop = () => {
    if (!controlled && ref.current) { ref.current.pause(); ref.current.currentTime = 0 }
  }

  return (
    <div
      onMouseEnter={play}
      onMouseLeave={stop}
      className={`relative aspect-video overflow-hidden rounded-xl ${dark ? 'bg-navy-light' : 'bg-paper-dim'} ${className}`}
    >
      {src ? (
        <video ref={ref} src={src} poster={poster} muted loop playsInline autoPlay={controlled && playing} preload="metadata"
          className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, ${dark ? 'rgba(246,241,231,0.04)' : 'rgba(18,21,27,0.04)'} 0 12px, transparent 12px 24px)`,
          }}>
          <span className={`flex items-center justify-center w-14 h-14 rounded-full ${dark ? 'bg-amber text-navy' : 'bg-navy text-paper'} transition-transform group-hover:scale-110`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span className={`font-mono text-[11px] tracking-widest uppercase ${dark ? 'text-paper/50' : 'text-navy/40'}`}>
            {label ? `${label} · demo video` : 'demo video'}
          </span>
        </div>
      )}
    </div>
  )
}
