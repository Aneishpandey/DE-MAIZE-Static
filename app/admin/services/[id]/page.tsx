'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminPageHeader } from '@/components/admin/admin-ui'
import { ServiceForm } from '@/components/admin/service-form'
import { adminFetch } from '@/lib/admin-client'

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<Parameters<typeof ServiceForm>[0]['initial']>()

  useEffect(() => {
    adminFetch(`/api/services/${id}`).then(setData).catch(console.error)
  }, [id])

  if (!data) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div>
      <AdminPageHeader title="Edit Service" />
      <ServiceForm initial={data} id={id} />
    </div>
  )
}
