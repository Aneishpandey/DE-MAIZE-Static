'use client'

import { motion } from 'framer-motion'
import { Search, Lightbulb, Code, Rocket, MessageSquare } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We dive deep into understanding your business, goals, target audience, and competitive landscape.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Based on our research, we develop a comprehensive strategy tailored to your unique needs.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our expert team brings the strategy to life with cutting-edge technology and design.',
  },
  {
    number: '04',
    icon: MessageSquare,
    title: 'Testing & Review',
    description: 'Rigorous testing and client feedback ensure every detail meets our high standards.',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'We launch your project and provide ongoing support to ensure continued success.',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-accent tracking-wide">OUR PROCESS</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            How We Deliver Excellence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our proven process ensures every project is delivered on time, on budget, and beyond expectations.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number & Icon */}
                <div className="relative z-10 mx-auto">
                  <div className="w-20 h-20 mx-auto rounded-full bg-card border-2 border-border flex items-center justify-center mb-5 group-hover:border-primary transition-colors">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
