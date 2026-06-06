'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminPageHeader } from '@/components/admin/admin-ui'
import { ProjectForm } from '@/components/admin/project-form'
import { adminFetch } from '@/lib/admin-client'

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<Parameters<typeof ProjectForm>[0]['initial']>()

  useEffect(() => {
    adminFetch(`/api/projects/${id}`).then(setData).catch(console.error)
  }, [id])

  if (!data) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div>
      <AdminPageHeader title="Edit Project" />
      <ProjectForm initial={data} id={id} />
    </div>
  )
}
