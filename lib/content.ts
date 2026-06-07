import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { CONTENT_CACHE_TAG } from "@/lib/revalidate";
import type { HeroExtra, SiteContent } from "@/lib/types";

const cacheOptions = {
  tags: [CONTENT_CACHE_TAG],
  revalidate: 3600,
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function emptyContent(): SiteContent {
  return {
    settings: {},
    navigation: {
      header: [],
      footerServices: [],
      footerCompany: [],
      footerResources: [],
      social: [],
    },
    sections: {},
    services: [],
    projects: [],
    projectCategories: ["All"],
    blogPosts: [],
    team: [],
    testimonials: [],
    stats: [],
    processSteps: [],
  };
}

async function fetchSiteContent(): Promise<SiteContent> {
  try {
    await prisma.$connect();
  } catch {
    console.warn("Database unavailable — returning empty content for build");
    return emptyContent();
  }

  const [
    settings,
    navigation,
    sections,
    services,
    projects,
    categories,
    blogPosts,
    team,
    testimonials,
    stats,
    processSteps,
  ] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.sectionContent.findMany(),
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.projectCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.siteStat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  const byLocation = (location: string) =>
    navigation
      .filter((n) => n.location === location)
      .map(({ label, href }) => ({ label, href }));

  const sectionsMap = Object.fromEntries(
    sections.map((s) => [
      s.sectionKey,
      {
        badge: s.badge,
        heading: s.heading,
        subheading: s.subheading,
        description: s.description,
        ctaPrimaryLabel: s.ctaPrimaryLabel,
        ctaPrimaryUrl: s.ctaPrimaryUrl,
        ctaSecondaryLabel: s.ctaSecondaryLabel,
        ctaSecondaryUrl: s.ctaSecondaryUrl,
        extra: (s.extra as HeroExtra | null) ?? null,
      },
    ]),
  );

  return {
    settings: settingsMap,
    navigation: {
      header: byLocation("header"),
      footerServices: byLocation("footer_services"),
      footerCompany: byLocation("footer_company"),
      footerResources: byLocation("footer_resources"),
      social: navigation
        .filter((n) => n.location === "social")
        .map((n) => ({ label: n.label, href: n.href, platform: n.label })),
    },
    sections: sectionsMap,
    services: services.map((s) => ({
      id: s.id,
      slug: s.slug,
      icon: s.icon,
      title: s.title,
      description: s.description,
      fullDescription: s.fullDescription,
      features: s.features,
      technologies: s.technologies,
    })),
    projects: projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.description,
      fullDescription: p.fullDescription,
      imageUrl: p.imageUrl,
      gradient: p.gradient,
      client: p.client,
      duration: p.duration,
      results: p.results,
      technologies: p.technologies,
    })),
    projectCategories: ["All", ...categories.map((c) => c.name)],
    blogPosts: blogPosts.map((b) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      date: formatDate(b.publishedAt),
      readTime: b.readTime,
      gradient: b.gradient,
      author: b.author,
      authorRole: b.authorRole,
    })),
    team: team.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      bio: m.bio,
      gradient: m.gradient,
      linkedinUrl: m.linkedinUrl,
      twitterUrl: m.twitterUrl,
    })),
    testimonials: testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      avatarUrl: t.avatarUrl,
    })),
    stats: stats.map((s) => ({
      id: s.id,
      value: s.value,
      label: s.label,
      suffix: s.suffix,
    })),
    processSteps: processSteps.map((p) => ({
      id: p.id,
      stepNumber: p.stepNumber,
      title: p.title,
      description: p.description,
      icon: p.icon,
    })),
  };
}

export const getSiteContent = unstable_cache(
  fetchSiteContent,
  ["site-content"],
  cacheOptions,
);

export async function getServiceBySlug(slug: string) {
  const content = await getSiteContent();
  return content.services.find((s) => s.slug === slug) ?? null;
}

export async function getProjectBySlug(slug: string) {
  const content = await getSiteContent();
  return content.projects.find((p) => p.slug === slug) ?? null;
}

export async function getBlogPostBySlug(slug: string) {
  const content = await getSiteContent();
  return content.blogPosts.find((b) => b.slug === slug) ?? null;
}

export async function getPublishedSlugs() {
  const content = await getSiteContent();
  return {
    services: content.services.map((s) => s.slug),
    projects: content.projects.map((p) => p.slug),
    blogPosts: content.blogPosts.map((b) => b.slug),
  };
}
