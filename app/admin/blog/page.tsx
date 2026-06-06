'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminPageHeader, AdminTable } from '@/components/admin/admin-ui'
import { adminDelete, adminFetch } from '@/lib/admin-client'

interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  isPublished: boolean
}

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    adminFetch<BlogPost[]>('/api/blog').then(setPosts).catch(console.error)
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return
    await adminDelete(`/api/blog/${id}`)
    setPosts((prev) => prev.filter((p) => p.id !== id))
    router.refresh()
  }

  return (
    <div>
      <AdminPageHeader title="Blog" description="Manage blog posts" createHref="/admin/blog/new" />
      <AdminTable
        columns={['Title', 'Category', 'Status']}
        rows={posts.map((p) => ({
          id: p.id,
          cells: [p.title, p.category, p.isPublished ? 'Published' : 'Draft'],
        }))}
        editHref={(id) => `/admin/blog/${id}`}
        onDelete={handleDelete}
      />
    </div>
  )
}
