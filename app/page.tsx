import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { StatsSection } from '@/components/sections/stats-section'
import { ServicesSection } from '@/components/sections/services-section'
import { ProcessSection } from '@/components/sections/process-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { TeamSection } from '@/components/sections/team-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { BlogSection } from '@/components/sections/blog-section'
import { ContactSection } from '@/components/sections/contact-section'
import { getSiteContent } from '@/lib/content'

export const revalidate = 3600

export default async function HomePage() {
  const content = await getSiteContent()

  return (
    <div className="min-h-screen bg-background">
      <Header
        navLinks={content.navigation.header}
        brandName={content.settings.brandName ?? 'DE-MAIZE'}
        ctaLabel={content.settings.headerCtaLabel ?? 'Get Started'}
        ctaUrl={content.settings.headerCtaUrl ?? '#contact'}
      />
      <main>
        <HeroSection section={content.sections.hero} />
        <StatsSection stats={content.stats} />
        <ServicesSection services={content.services} section={content.sections.services} />
        <ProcessSection steps={content.processSteps} section={content.sections.process} />
        <PortfolioSection
          projects={content.projects}
          categories={content.projectCategories}
          section={content.sections.portfolio}
        />
        <TestimonialsSection testimonials={content.testimonials} section={content.sections.testimonials} />
        <TeamSection team={content.team} section={content.sections.team} />
        <BlogSection posts={content.blogPosts} section={content.sections.blog} />
        <ContactSection
          section={content.sections.contact}
          contactEmail={content.settings.contactEmail ?? ''}
          contactPhone={content.settings.contactPhone ?? ''}
          contactAddress={content.settings.contactAddress ?? ''}
        />
      </main>
      <Footer
        brandName={content.settings.brandName ?? 'DE-MAIZE'}
        brandTagline={content.settings.brandTagline ?? ''}
        brandDescription={content.settings.brandDescription ?? ''}
        footerLinks={{
          services: content.navigation.footerServices,
          company: content.navigation.footerCompany,
          resources: content.navigation.footerResources,
        }}
        socialLinks={content.navigation.social}
      />
    </div>
  )
}
