import { motion } from 'motion/react'

const education = [
  { when: '2023 – 2027', what: 'University of Central Florida', sub: 'BS Computer Science, Honors' },
]

const experience = [
  { when: '2026', role: 'Software Engineering Intern', org: 'Bank of New York' },
  { when: '2026', role: 'SWE & UX/UI Design Intern', org: 'Life Stages' },
  { when: '2026 –', role: 'Teaching Assistant', org: 'UCF Data Structures & Algorithms' },
]

const skills = ['React', 'Python', 'TypeScript', 'Node.js', 'MongoDB', 'Docker']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Resume() {
  return (
    <section id="resume" data-navtheme="dark" className="bg-navy">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — paper: education + experience */}
        <div className="bg-paper px-6 lg:px-12 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-lg ml-auto">
            <p className="font-mono text-xs tracking-widest mb-2 text-amber-dark">EDUCATION</p>
            <div className="flex flex-col gap-4 mb-14">
              {education.map(e => (
                <div key={e.what} className="flex gap-4">
                  <span className="text-amber-dark shrink-0 mt-1">◆</span>
                  <div>
                    <p className="text-xs font-mono text-navy/50 mb-0.5">{e.when}</p>
                    <p className="font-display font-semibold text-navy">{e.what}</p>
                    <p className="text-sm text-navy/60">{e.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-amber p-6">
              <p className="font-mono text-xs tracking-widest mb-4 text-navy/70">EXPERIENCE</p>
              <div className="flex flex-col gap-4">
                {experience.map(e => (
                  <div key={e.role} className="flex gap-4">
                    <span className="text-navy/50 font-mono text-xs shrink-0 mt-0.5 w-12">{e.when}</span>
                    <div>
                      <p className="font-semibold text-navy leading-snug">{e.role}</p>
                      <p className="text-sm text-navy/70">{e.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — navy: skills + languages */}
        <div className="relative overflow-hidden px-6 lg:px-12 py-24">
          <p aria-hidden="true"
            className="ghost-text absolute -top-4 right-6 font-display font-bold text-amber/40 select-none pointer-events-none whitespace-nowrap"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            RESUME
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="max-w-lg relative">
            <p className="font-mono text-xs tracking-widest mb-2 text-amber">TECHNICAL SKILLS</p>
            <div className="flex flex-wrap gap-2 mb-14 mt-4">
              {skills.map(s => (
                <span key={s} className="pill px-4 py-1.5 text-sm font-mono text-paper border border-paper/20">{s}</span>
              ))}
            </div>

            <p className="font-mono text-xs tracking-widest mb-4 text-amber">CURRENTLY</p>
            <div className="space-y-2.5">
              {['Open to Fall 2026 roles', 'Shipping side projects', 'Learning something new'].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-paper/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
