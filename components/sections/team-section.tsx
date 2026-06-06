'use client'

import { motion } from 'framer-motion'
import type { SectionHeader } from '@/lib/types'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

interface TeamSectionProps {
  team: Array<{
    id: string
    name: string
    role: string
    bio: string
    gradient: string
    linkedinUrl: string | null
    twitterUrl: string | null
  }>
  section?: SectionHeader
}

export function TeamSection({ team, section }: TeamSectionProps) {
  return (
    <section id="team" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {section?.badge && (
            <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-accent tracking-wide">{section.badge}</span>
            </span>
          )}
          {section?.heading && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {section.heading}
            </h2>
          )}
          {section?.description && (
            <p className="mt-4 text-lg text-muted-foreground">{section.description}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative text-center"
            >
              <div className={`w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-5`}>
                <span className="text-3xl font-bold text-foreground/80">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
              <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
              <div className="flex items-center justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20">
                    <LinkedinIcon className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}
                {member.twitterUrl && (
                  <a href={member.twitterUrl} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20">
                    <TwitterIcon className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
