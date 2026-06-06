'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminPageHeader, AdminTable } from '@/components/admin/admin-ui'
import { adminDelete, adminFetch } from '@/lib/admin-client'

interface Service {
  id: string
  slug: string
  title: string
  isPublished: boolean
}

export default function AdminServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    adminFetch<Service[]>('/api/services').then(setServices).catch(console.error)
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return
    await adminDelete(`/api/services/${id}`)
    setServices((prev) => prev.filter((s) => s.id !== id))
    router.refresh()
  }

  return (
    <div>
      <AdminPageHeader title="Services" description="Manage service offerings" createHref="/admin/services/new" />
      <AdminTable
        columns={['Title', 'Slug', 'Status']}
        rows={services.map((s) => ({
          id: s.id,
          cells: [s.title, s.slug, s.isPublished ? 'Published' : 'Draft'],
        }))}
        editHref={(id) => `/admin/services/${id}`}
        onDelete={handleDelete}
      />
    </div>
  )
}
