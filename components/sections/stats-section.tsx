'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatItemProps {
  value: number
  label: string
  suffix?: string
}

function StatItem({ value, label, suffix = '' }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary tabular-nums">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-base sm:text-lg text-muted-foreground">{label}</p>
    </motion.div>
  )
}

interface StatsSectionProps {
  stats: Array<{ id: string; value: number; label: string; suffix: string }>
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat) => (
            <StatItem key={stat.id} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>
      </div>
    </section>
  )
}
