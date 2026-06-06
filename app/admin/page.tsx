import Link from 'next/link'
import { prisma } from '@/lib/db'
import { AdminPageHeader, AdminCard } from '@/components/admin/admin-ui'
import {
  Briefcase,
  FolderKanban,
  FileText,
  Users,
  MessageSquareQuote,
  Mail,
} from 'lucide-react'

export default async function AdminDashboardPage() {
  const [services, projects, blog, team, testimonials, messages] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.teamMember.count(),
    prisma.testimonial.count(),
    prisma.contactSubmission.count({ where: { status: 'new' } }),
  ])

  const cards = [
    { label: 'Services', count: services, href: '/admin/services', icon: Briefcase },
    { label: 'Portfolio Projects', count: projects, href: '/admin/projects', icon: FolderKanban },
    { label: 'Blog Posts', count: blog, href: '/admin/blog', icon: FileText },
    { label: 'Team Members', count: team, href: '/admin/team', icon: Users },
    { label: 'Testimonials', count: testimonials, href: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'New Messages', count: messages, href: '/admin/contact', icon: Mail },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Manage all website content from one place. Changes appear on the live site after saving."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.href} href={card.href}>
              <AdminCard className="hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{card.count}</p>
                  </div>
                  <Icon className="w-8 h-8 text-primary/60" />
                </div>
              </AdminCard>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
