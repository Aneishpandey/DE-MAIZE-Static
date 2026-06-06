'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminCheckbox,
  AdminSubmitButton,
  ArrayFieldEditor,
} from '@/components/admin/admin-ui'
import { adminFetch } from '@/lib/admin-client'

interface ProjectFormData {
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
  sortOrder: number
  isPublished: boolean
}

export function ProjectForm({ initial, id }: { initial?: ProjectFormData; id?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<ProjectFormData>(
    initial ?? {
      slug: '', title: '', category: 'Web Design', description: '', fullDescription: '',
      imageUrl: null, gradient: 'from-primary/80 to-accent/60', client: '', duration: '',
      results: [''], technologies: [''], sortOrder: 0, isPublished: true,
    },
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const payload = {
      ...form,
      imageUrl: form.imageUrl || null,
      gradient: form.gradient || null,
      results: form.results.filter(Boolean),
      technologies: form.technologies.filter(Boolean),
    }
    try {
      const url = id ? `/api/projects/${id}` : '/api/projects'
      await adminFetch(url, { method: id ? 'PUT' : 'POST', body: JSON.stringify(payload) })
      router.push('/admin/projects')
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
          <AdminInput label="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required />
          <AdminInput label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
          <AdminInput label="Sort Order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
          <AdminInput label="Image URL" value={form.imageUrl ?? ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value || null })} />
          <AdminInput label="Gradient Class" value={form.gradient ?? ''} onChange={(e) => setForm({ ...form, gradient: e.target.value || null })} />
        </div>
        <AdminTextarea label="Short Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} />
        <AdminTextarea label="Full Description" value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} required rows={8} />
        <ArrayFieldEditor label="Results" values={form.results} onChange={(results) => setForm({ ...form, results })} />
        <ArrayFieldEditor label="Technologies" values={form.technologies} onChange={(technologies) => setForm({ ...form, technologies })} />
        <AdminCheckbox label="Published" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <AdminSubmitButton loading={loading} />
      </AdminCard>
    </form>
  )
}
