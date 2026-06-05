'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-6"
            >
              <span className="text-sm font-medium text-primary tracking-wide">
                DE-MAIZE DIGITAL AGENCY
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-balance">
              We Turn{' '}
              <span className="text-primary">Ideas</span>
              <br />
              Into
              <br />
              <span className="text-accent">Digital Reality</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Transforming businesses through strategic digital marketing,
              innovative web design, and cutting-edge software solutions.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                Get Started
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border-2 border-foreground/20 bg-transparent px-8 py-3.5 text-base font-semibold text-foreground hover:border-foreground/40 hover:bg-foreground/5 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Image and Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-foreground/10 hidden sm:block" />
              <div className="absolute -top-4 -right-4 w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-foreground/5 hidden sm:block" />
              
              {/* Crosshair decoration */}
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-32 hidden lg:block">
                <svg viewBox="0 0 100 100" className="w-full h-full text-foreground/10">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
                  <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="1" />
                  <line x1="85" y1="15" x2="15" y2="85" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-foreground/10">
                <Image
                  src="/images/hero-maize.png"
                  alt="Digital Innovation - Maize field representing growth and transformation"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* DE-MAIZE Full Form Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-primary tracking-wider">DE-MAIZE</p>
                      <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[10px] sm:text-xs text-foreground/90 font-medium">
                        <span><span className="text-primary font-bold">D</span>igital</span>
                        <span><span className="text-accent font-bold">E</span>xcellence in</span>
                        <span><span className="text-primary font-bold">M</span>arketing,</span>
                        <span><span className="text-accent font-bold">A</span>nalytics,</span>
                        <span><span className="text-primary font-bold">I</span>nnovation,</span>
                        <span><span className="text-accent font-bold">Z</span>eal &</span>
                        <span><span className="text-primary font-bold">E</span>ngagement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 sm:left-0 z-20"
              >
                <div className="bg-card rounded-xl p-5 shadow-xl border border-border/50 max-w-xs">
                  <div className="inline-flex items-center rounded-full bg-primary px-3 py-1 mb-3">
                    <span className="text-xs font-semibold text-primary-foreground">FEATURED</span>
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground">
                    Digital Transformation Solutions
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Explore our strategic approach
                  </p>
                </div>
              </motion.div>

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
                      <h4 className="text-sm font-bold text-card-foreground">Fast Turnaround</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        We deliver quality results in record time
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
