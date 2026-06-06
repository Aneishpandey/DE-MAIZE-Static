'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Globe,
  Code,
  Megaphone,
  Smartphone,
  BarChart3,
  Palette,
  ArrowRight,
} from 'lucide-react'
import type { SectionHeader } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Megaphone,
  Code,
  Palette,
  BarChart3,
}

interface ServicesSectionProps {
  services: Array<{
    slug: string
    icon: string
    title: string
    description: string
  }>
  section?: SectionHeader
}

export function ServicesSection({ services, section }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {section?.badge && (
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-primary tracking-wide">{section.badge}</span>
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon]
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <div className="mt-5 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {section?.ctaPrimaryLabel && section?.ctaPrimaryUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={section.ctaPrimaryUrl}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
            >
              {section.ctaPrimaryLabel}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
