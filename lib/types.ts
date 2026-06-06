export interface HeroExtra {
  headlinePrefix?: string
  headlineHighlight1?: string
  headlineMiddle?: string
  headlineHighlight2?: string
  imageUrl?: string
  imageAlt?: string
  acronymLabel?: string
  acronymParts?: string[]
  featuredBadge?: string
  featuredTitle?: string
  featuredSubtitle?: string
  floatingTitle?: string
  floatingDescription?: string
}

export interface SectionHeader {
  badge?: string | null
  heading?: string | null
  subheading?: string | null
  description?: string | null
  ctaPrimaryLabel?: string | null
  ctaPrimaryUrl?: string | null
  ctaSecondaryLabel?: string | null
  ctaSecondaryUrl?: string | null
}

export interface SiteContent {
  settings: Record<string, string>
  navigation: {
    header: Array<{ label: string; href: string }>
    footerServices: Array<{ label: string; href: string }>
    footerCompany: Array<{ label: string; href: string }>
    footerResources: Array<{ label: string; href: string }>
    social: Array<{ label: string; href: string; platform: string }>
  }
  sections: Record<string, SectionHeader & { extra?: HeroExtra | null }>
  services: Array<{
    id: string
    slug: string
    icon: string
    title: string
    description: string
    fullDescription: string
    features: string[]
    technologies: string[]
  }>
  projects: Array<{
    id: string
    slug: string
    title: string
    category: string
    description: string
    fullDescription: string
    imageUrl: string | null
    gradient: string | null
    client: string
    duration: string
    results: string[]
    technologies: string[]
  }>
  projectCategories: string[]
  blogPosts: Array<{
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    category: string
    date: string
    readTime: string
    gradient: string
    author: string
    authorRole: string
  }>
  team: Array<{
    id: string
    name: string
    role: string
    bio: string
    gradient: string
    linkedinUrl: string | null
    twitterUrl: string | null
  }>
  testimonials: Array<{
    id: string
    name: string
    role: string
    content: string
    rating: number
    avatarUrl: string | null
  }>
  stats: Array<{ id: string; value: number; label: string; suffix: string }>
  processSteps: Array<{
    id: string
    stepNumber: string
    title: string
    description: string
    icon: string
  }>
}
