import { motion } from 'motion/react'

const education = [
  {
    when: '2023 – May 2027',
    what: 'University of Central Florida',
    sub: 'B.S. Computer Science (Honors), Minor in Digital Media · GPA 3.73',
  },
]

const experience = [
  {
    when: 'Summer 2026',
    role: 'Software Engineering Intern',
    org: 'BNY · Lake Mary, FL',
    note: 'Built a generative-AI agent that cut redemption-request processing time by 50%, plus a Spring Boot REST API extending DocVault to non-custody clients.',
  },
  {
    when: 'Fall 2025',
    role: 'Software Engineering Intern',
    org: 'BNY · Orlando, FL',
    note: 'Built a Python and Spring Boot monitoring service on Prometheus and Grafana, with Docker agents running audited recovery workflows.',
  },
  {
    when: 'Summer 2025',
    role: 'SWE & UX/UI Design Intern',
    org: 'Life Stages',
    note: 'Shipped React Native and Flutter features and Figma prototypes for guided meditation and journaling.',
  },
  {
    when: '2025 –',
    role: 'Undergraduate Teaching Assistant',
    org: 'UCF · Computer Science I',
    note: 'Lead weekly problem-solving sessions and 1-on-1 debugging for 60+ students.',
  },
]

const skills = [
  'Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'C',
  'Spring Boot', 'FastAPI', 'Node.js', 'React', 'React Native', 'Flutter',
  'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB',
  'Prometheus', 'Grafana', 'Gemini API', 'MCP', 'Figma',
]

const awards = [
  'KnightHacks — Winner',
  'Gemiknights 2025 — Winner',
  'BNY Good Within Case Competition — Team Lead',
  'InterVarsity — Club President',
  'CodePath — Tech Fellow',
]

const certs = 'AWS Cloud Security Foundations · Azure AZ-900 · PCEP Python · Google AI Essentials'

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
                  <div key={e.when + e.role} className="flex gap-4">
                    <span className="text-navy/50 font-mono text-xs shrink-0 mt-0.5 w-20">{e.when}</span>
                    <div>
                      <p className="font-semibold text-navy leading-snug">{e.role}</p>
                      <p className="text-sm text-navy/70">{e.org}</p>
                      <p className="text-sm text-navy/80 mt-1 leading-snug">{e.note}</p>
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

            <p className="font-mono text-xs tracking-widest mb-4 text-amber">AWARDS &amp; LEADERSHIP</p>
            <div className="space-y-2.5 mb-14">
              {awards.map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-paper/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <p className="font-mono text-xs tracking-widest mb-4 text-amber">CERTIFICATIONS</p>
            <p className="text-sm text-paper/75 leading-relaxed mb-14">{certs}</p>

            <p className="font-mono text-xs tracking-widest mb-4 text-amber">CURRENTLY</p>
            <div className="space-y-2.5">
              {['Open to new-grad SWE roles for 2027', 'Project manager for Vitality, UCF senior design', 'TA for Computer Science I'].map(item => (
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
