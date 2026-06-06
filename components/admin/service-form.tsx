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

interface ServiceFormData {
  slug: string
  icon: string
  title: string
  description: string
  fullDescription: string
  features: string[]
  technologies: string[]
  sortOrder: number
  isPublished: boolean
}

const defaultData: ServiceFormData = {
  slug: '',
  icon: 'Globe',
  title: '',
  description: '',
  fullDescription: '',
  features: [''],
  technologies: [''],
  sortOrder: 0,
  isPublished: true,
}

export function ServiceForm({ initial, id }: { initial?: ServiceFormData; id?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<ServiceFormData>(initial ?? defaultData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const payload = {
      ...form,
      features: form.features.filter(Boolean),
      technologies: form.technologies.filter(Boolean),
    }
    try {
      if (id) {
        await adminFetch(`/api/services/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      } else {
        await adminFetch('/api/services', { method: 'POST', body: JSON.stringify(payload) })
      }
      router.push('/admin/services')
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
          <AdminInput label="Icon (Lucide name)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} required />
          <AdminInput label="Sort Order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
        </div>
        <AdminTextarea label="Short Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} />
        <AdminTextarea label="Full Description" value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} required rows={8} />
        <ArrayFieldEditor label="Features" values={form.features} onChange={(features) => setForm({ ...form, features })} />
        <ArrayFieldEditor label="Technologies" values={form.technologies} onChange={(technologies) => setForm({ ...form, technologies })} />
        <AdminCheckbox label="Published" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <AdminSubmitButton loading={loading} />
      </AdminCard>
    </form>
  )
}
