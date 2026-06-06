'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminPageHeader, AdminCard, AdminInput, AdminTextarea, AdminSubmitButton } from '@/components/admin/admin-ui'
import { adminFetch } from '@/lib/admin-client'

interface Setting {
  id: string
  key: string
  value: string
}

const settingLabels: Record<string, string> = {
  brandName: 'Brand Name',
  brandTagline: 'Brand Tagline',
  brandDescription: 'Brand Description',
  contactEmail: 'Contact Email',
  contactPhone: 'Contact Phone',
  contactAddress: 'Contact Address',
  headerCtaLabel: 'Header CTA Label',
  headerCtaUrl: 'Header CTA URL',
  seoTitle: 'SEO Title',
  seoDescription: 'SEO Description',
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    adminFetch<Setting[]>('/api/settings').then(setSettings).catch(console.error)
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await Promise.all(
        settings.map((s) =>
          adminFetch('/api/settings', { method: 'PUT', body: JSON.stringify({ key: s.key, value: s.value }) }),
        ),
      )
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <AdminPageHeader title="Site Settings" description="Global site configuration and contact information." />
      <form onSubmit={handleSave}>
        <AdminCard className="space-y-4">
          {settings.map((setting, index) => (
            setting.key === 'seoDescription' || setting.key === 'brandDescription' ? (
              <AdminTextarea
                key={setting.key}
                label={settingLabels[setting.key] ?? setting.key}
                value={setting.value}
                onChange={(e) => {
                  const next = [...settings]
                  next[index] = { ...setting, value: e.target.value }
                  setSettings(next)
                }}
                rows={3}
              />
            ) : (
              <AdminInput
                key={setting.key}
                label={settingLabels[setting.key] ?? setting.key}
                value={setting.value}
                onChange={(e) => {
                  const next = [...settings]
                  next[index] = { ...setting, value: e.target.value }
                  setSettings(next)
                }}
              />
            )
          ))}
          <AdminSubmitButton loading={loading} />
        </AdminCard>
      </form>
    </div>
  )
}
