'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  FileText,
  Users,
  MessageSquareQuote,
  BarChart3,
  GitBranch,
  Layout,
  Navigation,
  Settings,
  Mail,
  LogOut,
  ExternalLink,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/sections', label: 'Page Sections', icon: Layout },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/projects', label: 'Portfolio', icon: FolderKanban },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/stats', label: 'Stats', icon: BarChart3 },
  { href: '/admin/process', label: 'Process', icon: GitBranch },
  { href: '/admin/navigation', label: 'Navigation', icon: Navigation },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/contact', label: 'Messages', icon: Mail },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-foreground flex">
      <aside className="w-64 shrink-0 border-r border-border/50 bg-card/50 flex flex-col">
        <div className="p-6 border-b border-border/50">
          <p className="text-lg font-bold text-primary">DE-MAIZE</p>
          <p className="text-xs text-muted-foreground mt-1">Content Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border/50 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
