'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminCheckbox,
  AdminSubmitButton,
} from '@/components/admin/admin-ui'
import { adminFetch } from '@/lib/admin-client'

interface BlogFormData {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  publishedAt: string
  readTime: string
  gradient: string
  author: string
  authorRole: string
  isPublished: boolean
}

export function BlogForm({ initial, id }: { initial?: BlogFormData; id?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<BlogFormData>(
    initial ?? {
      slug: '', title: '', excerpt: '', content: '', category: 'Marketing',
      publishedAt: new Date().toISOString(), readTime: '5 min read',
      gradient: 'from-primary/60 to-accent/40', author: '', authorRole: '', isPublished: true,
    },
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = id ? `/api/blog/${id}` : '/api/blog'
      await adminFetch(url, { method: id ? 'PUT' : 'POST', body: JSON.stringify(form) })
      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminCard className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <AdminInput label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          <AdminInput label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <AdminInput label="Read Time" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} required />
          <AdminInput label="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
          <AdminInput label="Author Role" value={form.authorRole} onChange={(e) => setForm({ ...form, authorRole: e.target.value })} required />
          <AdminInput label="Published At" type="datetime-local" value={form.publishedAt.slice(0, 16)} onChange={(e) => setForm({ ...form, publishedAt: new Date(e.target.value).toISOString() })} />
          <AdminInput label="Gradient Class" value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })} required />
        </div>
        <AdminTextarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required rows={3} />
        <AdminTextarea label="Content (Markdown)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={16} />
        <AdminCheckbox label="Published" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <AdminSubmitButton loading={loading} />
      </AdminCard>
    </form>
  )
}
