'use client'

import { useEffect, useState } from 'react'
import { AdminPageHeader, AdminCard } from '@/components/admin/admin-ui'
import { adminDelete, adminFetch } from '@/lib/admin-client'

interface Submission {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  status: string
  createdAt: string
}

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  async function load() {
    const data = await adminFetch<Submission[]>('/api/contact')
    setSubmissions(data)
  }

  useEffect(() => {
    load().catch(console.error)
  }, [])

  async function updateStatus(id: string, status: string) {
    await adminFetch(`/api/contact/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
    await load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this message?')) return
    await adminDelete(`/api/contact/${id}`)
    await load()
  }

  return (
    <div>
      <AdminPageHeader title="Contact Messages" description="View and manage form submissions." />
      <div className="space-y-4">
        {submissions.map((sub) => (
          <AdminCard key={sub.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">{sub.name}</p>
                <p className="text-sm text-muted-foreground">{sub.email}{sub.company ? ` · ${sub.company}` : ''}</p>
                <p className="text-sm text-foreground mt-3 whitespace-pre-wrap">{sub.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(sub.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  value={sub.status}
                  onChange={(e) => updateStatus(sub.id, e.target.value)}
                  className="px-2 py-1 rounded border border-border bg-secondary/50 text-sm"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
                <button onClick={() => handleDelete(sub.id)} className="text-sm text-destructive hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
        {submissions.length === 0 && (
          <p className="text-muted-foreground">No messages yet.</p>
        )}
      </div>
    </div>
  )
}
