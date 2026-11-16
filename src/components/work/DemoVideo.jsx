import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play } from '../ui/Icons'

// A silent, looping product demo. Neither the poster nor the video is fetched
// until it gets near the viewport, and it only plays while it's on screen. Reports playback progress to a
// motion value so other parts of the UI can draw a progress bar.
export default function DemoVideo({ src, poster, description, progress, rounded = '', fit = 'cover', tone = 'dark' }) {
  const videoRef = useRef(null)
  const reduce = useReducedMotion()
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [playing, setPlaying] = useState(false)
  const barRef = useRef(null)

  // Load when within a screen of the viewport; play when mostly visible.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' })
    const visObs = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.35), {
      threshold: [0, 0.35, 0.6],
    })
    nearObs.observe(el)
    visObs.observe(el)
    return () => {
      nearObs.disconnect()
      visObs.disconnect()
    }
  }, [])

  const shouldPlay = near && visible && !userPaused && !reduce
  useEffect(() => {
    const el = videoRef.current
    if (!el || !near) return
    if (shouldPlay) el.play().catch(() => {})
    else el.pause()
  }, [shouldPlay, near])

  // Smooth progress, read once per frame while playing.
  useEffect(() => {
    const el = videoRef.current
    if (!el || !playing) return
    let frame
    const loop = () => {
      const p = el.duration ? el.currentTime / el.duration : 0
      progress?.set(p)
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [playing, progress])

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      setUserPaused(false)
      setNear(true)
      el.play().catch(() => {})
    } else {
      setUserPaused(true)
      el.pause()
    }
  }

  const light = tone === 'light'
  return (
    <div className={`group/video relative h-full w-full overflow-hidden ${rounded}`}>
      <video
        ref={videoRef}
        src={near ? src : undefined}
        poster={near ? poster : undefined}
        muted
        loop
        playsInline
        preload={near ? 'auto' : 'none'}
        aria-label={description}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className={`h-full w-full cursor-pointer ${fit === 'cover' ? 'object-cover object-top' : 'object-contain'}`}
      />

      {/* Reduced motion: nothing moves until asked. */}
      {reduce && !playing && (
        <button
          type="button"
          onClick={toggle}
          className="absolute inset-0 grid place-items-center bg-ink/20 transition-colors hover:bg-ink/10"
          aria-label="Play demo video"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-amber text-ink shadow-xl">
            <Play width={22} height={22} />
          </span>
        </button>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-ink/10">
        <div ref={barRef} className="h-full origin-left bg-amber" style={{ transform: 'scaleX(0)' }} />
      </div>

      {/* Always reachable by keyboard; fades back while playing, except on
          touch screens where there is no hover to bring it back. */}
      {!(reduce && !playing) && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause demo video' : 'Play demo video'}
          className={`absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-[opacity,transform] duration-300 hover:scale-105 focus-visible:opacity-100
            ${light ? 'bg-paper/85 text-ink' : 'bg-ink/75 text-paper'}
            ${playing ? 'opacity-0 group-hover/video:opacity-100 [@media(hover:none)]:opacity-80' : 'opacity-100'}`}
        >
          {playing ? <Pause width={14} height={14} aria-hidden="true" /> : <Play width={14} height={14} aria-hidden="true" />}
        </button>
      )}
    </div>
  )
}
