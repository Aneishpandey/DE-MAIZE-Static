'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminPageHeader, AdminTable } from '@/components/admin/admin-ui'
import { adminDelete, adminFetch } from '@/lib/admin-client'

interface Project {
  id: string
  slug: string
  title: string
  category: string
  isPublished: boolean
}

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    adminFetch<Project[]>('/api/projects').then(setProjects).catch(console.error)
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return
    await adminDelete(`/api/projects/${id}`)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    router.refresh()
  }

  return (
    <div>
      <AdminPageHeader title="Portfolio" description="Manage portfolio projects" createHref="/admin/projects/new" />
      <AdminTable
        columns={['Title', 'Category', 'Status']}
        rows={projects.map((p) => ({
          id: p.id,
          cells: [p.title, p.category, p.isPublished ? 'Published' : 'Draft'],
        }))}
        editHref={(id) => `/admin/projects/${id}`}
        onDelete={handleDelete}
      />
    </div>
  )
}
