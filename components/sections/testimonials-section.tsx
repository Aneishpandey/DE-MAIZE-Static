'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { SectionHeader } from '@/lib/types'

interface TestimonialsSectionProps {
  testimonials: Array<{
    id: string
    name: string
    role: string
    content: string
    rating: number
  }>
  section?: SectionHeader
}

export function TestimonialsSection({ testimonials, section }: TestimonialsSectionProps) {
  return (
    <section id="results" className="relative py-20 lg:py-28 bg-secondary/30">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-6 lg:p-8 rounded-2xl bg-card border border-border/50"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">&ldquo;{testimonial.content}&rdquo;</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
