import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { projects } from '@/lib/data'
import { BackButton } from '@/components/ui/back-button'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.id === slug)
    if (!project) return { title: 'Project Not Found' }
    return {
      title: `${project.title} | DE-MAIZE Portfolio`,
      description: project.description,
    }
  })
}

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  
  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex((p) => p.id === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <BackButton fallbackHref="/#portfolio" label="Back to Portfolio" />

        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-accent tracking-wide">{project.category.toUpperCase()}</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-video relative rounded-2xl overflow-hidden mb-12">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
          )}
        </div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <span className="text-sm text-muted-foreground">Client</span>
            <p className="text-lg font-semibold text-foreground mt-1">{project.client}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <span className="text-sm text-muted-foreground">Duration</span>
            <p className="text-lg font-semibold text-foreground mt-1">{project.duration}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <span className="text-sm text-muted-foreground">Category</span>
            <p className="text-lg font-semibold text-foreground mt-1">{project.category}</p>
          </div>
        </div>

        {/* Full Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Project Overview</h2>
          <div className="prose prose-invert max-w-none">
            {project.fullDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Results</h2>
          <div className="space-y-4">
            {project.results.map((result, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30"
              >
                <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                <span className="text-foreground font-medium">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
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
            Want Similar Results?
          </h2>
          <p className="text-muted-foreground mb-6">
            {"Let's discuss how we can help your business achieve its goals."}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{prevProject.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/portfolio/${nextProject.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-sm">{nextProject.title}</span>
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
