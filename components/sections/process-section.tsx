'use client'

import { motion } from 'framer-motion'
import { Search, Lightbulb, Code, Rocket, MessageSquare } from 'lucide-react'
import type { SectionHeader } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Lightbulb,
  Code,
  Rocket,
  MessageSquare,
}

interface ProcessSectionProps {
  steps: Array<{
    id: string
    stepNumber: string
    title: string
    description: string
    icon: string
  }>
  section?: SectionHeader
}

export function ProcessSection({ steps, section }: ProcessSectionProps) {
  return (
    <section id="process" className="relative py-20 lg:py-28">
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

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon] ?? Search
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto">
                    <div className="w-20 h-20 mx-auto rounded-full bg-card border-2 border-border flex items-center justify-center mb-5">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.stepNumber}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
