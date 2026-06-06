import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { services, projects, blogPosts, categories } from '../lib/data'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@demaize.com'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123'

  await prisma.contactSubmission.deleteMany()
  await prisma.navigationItem.deleteMany()
  await prisma.sectionContent.deleteMany()
  await prisma.siteStat.deleteMany()
  await prisma.processStep.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.project.deleteMany()
  await prisma.projectCategory.deleteMany()
  await prisma.service.deleteMany()
  await prisma.siteSetting.deleteMany()
  await prisma.admin.deleteMany()

  await prisma.admin.create({
    data: {
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 12),
      name: 'Site Admin',
    },
  })

  const settings = [
    { key: 'brandName', value: 'DE-MAIZE' },
    { key: 'brandTagline', value: 'Digital Excellence in Marketing, Analytics, Innovation, Zeal & Engagement' },
    { key: 'brandDescription', value: 'Transforming businesses through innovative digital solutions and strategic marketing.' },
    { key: 'contactEmail', value: 'hello@demaize.com' },
    { key: 'contactPhone', value: '+91 (XXX) XXX-XXXX' },
    { key: 'contactAddress', value: 'Your Office Address' },
    { key: 'headerCtaLabel', value: 'Get Started' },
    { key: 'headerCtaUrl', value: '#contact' },
    { key: 'seoTitle', value: 'DE-MAIZE | Digital Agency' },
    { key: 'seoDescription', value: 'Transforming businesses through strategic digital marketing, innovative web design, and cutting-edge software solutions.' },
  ]
  await prisma.siteSetting.createMany({ data: settings })

  const headerNav = [
    { location: 'header', label: 'Home', href: '#home', sortOrder: 0 },
    { location: 'header', label: 'Services', href: '#services', sortOrder: 1 },
    { location: 'header', label: 'Process', href: '#process', sortOrder: 2 },
    { location: 'header', label: 'Portfolio', href: '#portfolio', sortOrder: 3 },
    { location: 'header', label: 'Results', href: '#results', sortOrder: 4 },
    { location: 'header', label: 'Team', href: '#team', sortOrder: 5 },
    { location: 'header', label: 'Blog', href: '#blog', sortOrder: 6 },
    { location: 'header', label: 'Contact', href: '#contact', sortOrder: 7 },
  ]

  const footerServices = services.slice(0, 4).map((s, i) => ({
    location: 'footer_services',
    label: s.title,
    href: `/services/${s.id}`,
    sortOrder: i,
  }))

  const footerCompany = [
    { location: 'footer_company', label: 'About Us', href: '#', sortOrder: 0 },
    { location: 'footer_company', label: 'Our Team', href: '#team', sortOrder: 1 },
    { location: 'footer_company', label: 'Careers', href: '#', sortOrder: 2 },
    { location: 'footer_company', label: 'Contact', href: '#contact', sortOrder: 3 },
  ]

  const footerResources = [
    { location: 'footer_resources', label: 'Blog', href: '#blog', sortOrder: 0 },
    { location: 'footer_resources', label: 'Case Studies', href: '#portfolio', sortOrder: 1 },
    { location: 'footer_resources', label: 'Privacy Policy', href: '#', sortOrder: 2 },
    { location: 'footer_resources', label: 'Terms of Service', href: '#', sortOrder: 3 },
  ]

  const social = [
    { location: 'social', label: 'Twitter', href: '#', sortOrder: 0 },
    { location: 'social', label: 'LinkedIn', href: '#', sortOrder: 1 },
    { location: 'social', label: 'Instagram', href: '#', sortOrder: 2 },
    { location: 'social', label: 'GitHub', href: '#', sortOrder: 3 },
  ]

  await prisma.navigationItem.createMany({
    data: [...headerNav, ...footerServices, ...footerCompany, ...footerResources, ...social],
  })

  await prisma.sectionContent.createMany({
    data: [
      {
        sectionKey: 'hero',
        badge: 'DE-MAIZE DIGITAL AGENCY',
        heading: 'We Turn Ideas Into Digital Reality',
        description: 'Transforming businesses through strategic digital marketing, innovative web design, and cutting-edge software solutions.',
        ctaPrimaryLabel: 'Get Started',
        ctaPrimaryUrl: '#contact',
        ctaSecondaryLabel: 'View Our Work',
        ctaSecondaryUrl: '#portfolio',
        extra: {
          headlinePrefix: 'We Turn',
          headlineHighlight1: 'Ideas',
          headlineMiddle: 'Into',
          headlineHighlight2: 'Digital Reality',
          imageUrl: '/images/hero-maize.png',
          imageAlt: 'Digital Innovation - Maize field representing growth and transformation',
          acronymLabel: 'DE-MAIZE',
          acronymParts: [
            'Digital', 'Excellence in', 'Marketing,', 'Analytics,', 'Innovation,', 'Zeal &', 'Engagement',
          ],
          featuredBadge: 'FEATURED',
          featuredTitle: 'Digital Transformation Solutions',
          featuredSubtitle: 'Explore our strategic approach',
          floatingTitle: 'Fast Turnaround',
          floatingDescription: 'We deliver quality results in record time',
        },
      },
      {
        sectionKey: 'services',
        badge: 'OUR SERVICES',
        heading: 'Comprehensive Digital Solutions for Your Business',
        description: 'We offer a full range of digital services to help your business thrive in the modern landscape.',
        ctaPrimaryLabel: 'Discuss Your Project',
        ctaPrimaryUrl: '#contact',
      },
      {
        sectionKey: 'process',
        badge: 'OUR PROCESS',
        heading: 'How We Deliver Excellence',
        description: 'Our proven process ensures every project is delivered on time, on budget, and beyond expectations.',
      },
      {
        sectionKey: 'portfolio',
        badge: 'OUR PORTFOLIO',
        heading: 'Featured Projects',
        description: 'Explore our latest work and see how we have helped businesses achieve their digital goals.',
      },
      {
        sectionKey: 'testimonials',
        badge: 'TESTIMONIALS',
        heading: 'What Our Clients Say',
        description: "Don't just take our word for it. Here's what our clients have to say about working with us.",
      },
      {
        sectionKey: 'team',
        badge: 'OUR TEAM',
        heading: 'Meet the Experts',
        description: 'Our talented team of professionals is dedicated to delivering exceptional results.',
      },
      {
        sectionKey: 'blog',
        badge: 'LATEST INSIGHTS',
        heading: 'From Our Blog',
        description: 'Stay updated with the latest trends, tips, and insights from our team of experts.',
      },
      {
        sectionKey: 'contact',
        badge: 'GET IN TOUCH',
        heading: "Let's Start Your Project",
        description: 'Ready to transform your digital presence? Contact us today and let\'s discuss how we can help your business grow.',
      },
    ],
  })

  await prisma.siteStat.createMany({
    data: [
      { value: 59, label: 'Projects Completed', suffix: '', sortOrder: 0 },
      { value: 28, label: 'Client Satisfaction', suffix: '', sortOrder: 1 },
      { value: 12, label: 'Industry Awards', suffix: '', sortOrder: 2 },
    ],
  })

  await prisma.processStep.createMany({
    data: [
      { stepNumber: '01', title: 'Discovery', description: 'We dive deep into understanding your business, goals, target audience, and competitive landscape.', icon: 'Search', sortOrder: 0 },
      { stepNumber: '02', title: 'Strategy', description: 'Based on our research, we develop a comprehensive strategy tailored to your unique needs.', icon: 'Lightbulb', sortOrder: 1 },
      { stepNumber: '03', title: 'Development', description: 'Our expert team brings the strategy to life with cutting-edge technology and design.', icon: 'Code', sortOrder: 2 },
      { stepNumber: '04', title: 'Testing & Review', description: 'Rigorous testing and client feedback ensure every detail meets our high standards.', icon: 'MessageSquare', sortOrder: 3 },
      { stepNumber: '05', title: 'Launch & Support', description: 'We launch your project and provide ongoing support to ensure continued success.', icon: 'Rocket', sortOrder: 4 },
    ],
  })

  await prisma.teamMember.createMany({
    data: [
      { name: 'Sarah Johnson', role: 'CEO & Founder', bio: 'Visionary leader with 15+ years in digital transformation', gradient: 'from-primary/60 to-accent/40', sortOrder: 0 },
      { name: 'Michael Chen', role: 'CTO', bio: 'Full-stack expert driving technical innovation', gradient: 'from-accent/60 to-primary/40', sortOrder: 1 },
      { name: 'Emily Rodriguez', role: 'Creative Director', bio: 'Award-winning designer crafting memorable experiences', gradient: 'from-primary/40 to-accent/60', sortOrder: 2 },
      { name: 'David Kim', role: 'Head of Marketing', bio: 'Strategic marketer with proven growth track record', gradient: 'from-accent/40 to-primary/60', sortOrder: 3 },
    ],
  })

  await prisma.testimonial.createMany({
    data: [
      { name: 'James Wilson', role: 'CEO, TechStart Inc.', content: 'Working with this agency transformed our digital presence. Their strategic approach and attention to detail exceeded our expectations. Highly recommend!', rating: 5, sortOrder: 0 },
      { name: 'Amanda Foster', role: 'Marketing Director, GrowthCo', content: 'The team delivered exceptional results on our marketing campaign. Our conversion rates increased by 150% within just three months.', rating: 5, sortOrder: 1 },
      { name: 'Robert Martinez', role: 'Founder, InnovateTech', content: 'Professional, creative, and results-driven. They built us a platform that perfectly captures our vision and serves our customers beautifully.', rating: 5, sortOrder: 2 },
    ],
  })

  for (const [index, service] of services.entries()) {
    await prisma.service.create({
      data: {
        slug: service.id,
        icon: service.icon,
        title: service.title,
        description: service.description,
        fullDescription: service.fullDescription,
        features: service.features,
        technologies: service.technologies,
        sortOrder: index,
      },
    })
  }

  for (const [index, cat] of categories.filter((c) => c !== 'All').entries()) {
    await prisma.projectCategory.create({
      data: { name: cat, sortOrder: index },
    })
  }

  for (const [index, project] of projects.entries()) {
    await prisma.project.create({
      data: {
        slug: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        fullDescription: project.fullDescription,
        imageUrl: project.image ?? null,
        gradient: project.gradient ?? null,
        client: project.client,
        duration: project.duration,
        results: project.results,
        technologies: project.technologies,
        sortOrder: index,
      },
    })
  }

  for (const [index, post] of blogPosts.entries()) {
    await prisma.blogPost.create({
      data: {
        slug: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        publishedAt: new Date(post.date),
        readTime: post.readTime,
        gradient: post.gradient,
        author: post.author,
        authorRole: post.authorRole,
      },
    })
  }

  console.log('Database seeded successfully')
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
