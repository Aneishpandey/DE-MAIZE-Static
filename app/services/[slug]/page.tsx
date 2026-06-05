import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { services } from '@/lib/data'
import { BackButton } from '@/components/ui/back-button'

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const service = services.find((s) => s.id === slug)
    if (!service) return { title: 'Service Not Found' }
    return {
      title: `${service.title} | DE-MAIZE`,
      description: service.description,
    }
  })
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.id === slug)
  
  if (!service) {
    notFound()
  }

  const currentIndex = services.findIndex((s) => s.id === slug)
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <BackButton fallbackHref="/#services" label="Back to Services" />

        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-primary tracking-wide">SERVICE</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {service.description}
          </p>
        </div>

        {/* Full Description */}
        <div className="prose prose-invert max-w-none mb-12">
          {service.fullDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50"
              >
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-secondary border border-border text-foreground text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-6">
            {"Let's discuss how our"} {service.title.toLowerCase()} services can help your business grow.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          {prevService ? (
            <Link
              href={`/services/${prevService.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{prevService.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextService ? (
            <Link
              href={`/services/${nextService.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-sm">{nextService.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  )
}
