'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { SectionHeader } from '@/lib/types'

interface PortfolioSectionProps {
  projects: Array<{
    slug: string
    title: string
    category: string
    description: string
    imageUrl: string | null
    gradient: string | null
  }>
  categories: string[]
  section?: SectionHeader
}

export function PortfolioSection({ projects, categories, section }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects =
    activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="relative py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group relative block rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${project.gradient ?? 'from-primary/60 to-accent/40'}`} />
                    )}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary">{project.category}</span>
                    <h3 className="text-lg font-bold text-card-foreground mt-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
