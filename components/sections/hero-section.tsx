'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import type { HeroExtra, SectionHeader } from '@/lib/types'

interface HeroSectionProps {
  section?: SectionHeader & { extra?: HeroExtra | null }
}

export function HeroSection({ section }: HeroSectionProps) {
  const extra = section?.extra ?? {}
  const headlinePrefix = extra.headlinePrefix ?? 'We Turn'
  const headlineHighlight1 = extra.headlineHighlight1 ?? 'Ideas'
  const headlineMiddle = extra.headlineMiddle ?? 'Into'
  const headlineHighlight2 = extra.headlineHighlight2 ?? 'Digital Reality'
  const imageUrl = extra.imageUrl ?? '/images/hero-maize.png'
  const imageAlt = extra.imageAlt ?? 'Digital Innovation'
  const acronymLabel = extra.acronymLabel ?? 'DE-MAIZE'
  const acronymParts = extra.acronymParts ?? ['Digital', 'Excellence in', 'Marketing,', 'Analytics,', 'Innovation,', 'Zeal &', 'Engagement']

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {section?.badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-6"
              >
                <span className="text-sm font-medium text-primary tracking-wide">{section.badge}</span>
              </motion.div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-balance">
              {headlinePrefix}{' '}
              <span className="text-primary">{headlineHighlight1}</span>
              <br />
              {headlineMiddle}
              <br />
              <span className="text-accent">{headlineHighlight2}</span>
            </h1>

            {section?.description && (
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                {section.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              {section?.ctaPrimaryLabel && section?.ctaPrimaryUrl && (
                <Link
                  href={section.ctaPrimaryUrl}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  {section.ctaPrimaryLabel}
                </Link>
              )}
              {section?.ctaSecondaryLabel && section?.ctaSecondaryUrl && (
                <Link
                  href={section.ctaSecondaryUrl}
                  className="inline-flex items-center justify-center rounded-full border-2 border-foreground/20 bg-transparent px-8 py-3.5 text-base font-semibold text-foreground hover:border-foreground/40 hover:bg-foreground/5 transition-all"
                >
                  {section.ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-foreground/10 hidden sm:block" />
              <div className="absolute -top-4 -right-4 w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-foreground/5 hidden sm:block" />

              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-foreground/10">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-primary tracking-wider">{acronymLabel}</p>
                      <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[10px] sm:text-xs text-foreground/90 font-medium">
                        {acronymParts.map((part, i) => (
                          <span key={i}>{part}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {extra.featuredTitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 sm:left-0 z-20"
                >
                  <div className="bg-card rounded-xl p-5 shadow-xl border border-border/50 max-w-xs">
                    {extra.featuredBadge && (
                      <div className="inline-flex items-center rounded-full bg-primary px-3 py-1 mb-3">
                        <span className="text-xs font-semibold text-primary-foreground">{extra.featuredBadge}</span>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-card-foreground">{extra.featuredTitle}</h3>
                    {extra.featuredSubtitle && (
                      <p className="mt-1 text-sm text-muted-foreground">{extra.featuredSubtitle}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {extra.floatingTitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-12 right-4 sm:right-8 z-20"
                >
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 max-w-[200px]">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-card-foreground">{extra.floatingTitle}</h4>
                        {extra.floatingDescription && (
                          <p className="text-xs text-muted-foreground mt-0.5">{extra.floatingDescription}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
