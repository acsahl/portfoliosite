import { Fragment, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1]

// Fades and lifts its children into place the first time they scroll into view.
export function Reveal({ as = 'div', delay = 0, y = 22, amount = 0.25, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// A headline whose words rise out of a mask, one after another.
// Screen readers get the plain sentence once, from aria-label.
export function SplitWords({
  text,
  as = 'h2',
  className,
  wordClassName = '',
  delay = 0,
  stagger = 0.06,
  trigger,
  italic = [],
  ...rest
}) {
  const Tag = motion[as]
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const show = trigger ?? inView
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="mask-line">
            <motion.span
              className={`inline-block ${italic.includes(i) ? 'italic' : ''} ${wordClassName}`}
              initial={reduce ? false : { y: '108%' }}
              animate={show ? { y: '0%' } : undefined}
              transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

// Counts up to `value` once it scrolls into view.
export function Counter({ value, prefix = '', suffix = '', duration = 1.6, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (reduce) {
      setShown(value)
      return
    }
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {shown}
        {suffix}
      </span>
    </span>
  )
}

// A hairline that draws itself across when it scrolls into view.
export function Rule({ className = '', delay = 0, origin = 'left' }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full ${className}`}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    />
  )
}
