'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AdminPageHeader,
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminSubmitButton,
} from '@/components/admin/admin-ui'
import { adminFetch } from '@/lib/admin-client'

interface Section {
  id: string
  sectionKey: string
  badge: string | null
  heading: string | null
  subheading: string | null
  description: string | null
  ctaPrimaryLabel: string | null
  ctaPrimaryUrl: string | null
  ctaSecondaryLabel: string | null
  ctaSecondaryUrl: string | null
  extra: Record<string, unknown> | null
}

export default function AdminSectionsPage() {
  const router = useRouter()
  const [sections, setSections] = useState<Section[]>([])
  const [selected, setSelected] = useState<Section | null>(null)
  const [extraJson, setExtraJson] = useState('{}')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    adminFetch<Section[]>('/api/sections').then((data) => {
      setSections(data)
      if (data[0]) {
        setSelected(data[0])
        setExtraJson(JSON.stringify(data[0].extra ?? {}, null, 2))
      }
    }).catch(console.error)
  }, [])

  function selectSection(section: Section) {
    setSelected(section)
    setExtraJson(JSON.stringify(section.extra ?? {}, null, 2))
    setError('')
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setLoading(true)
    setError('')
    try {
      let extra = null
      if (extraJson.trim()) {
        extra = JSON.parse(extraJson)
      }
      await adminFetch(`/api/sections/${selected.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...selected, extra }),
      })
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Page Sections"
        description="Edit homepage section headers, copy, and hero-specific fields (extra JSON for hero)."
      />
      <div className="grid lg:grid-cols-4 gap-6">
        <AdminCard className="lg:col-span-1 space-y-2 p-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => selectSection(section)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                selected?.id === section.id ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-secondary/50'
              }`}
            >
              {section.sectionKey}
            </button>
          ))}
        </AdminCard>
        {selected && (
          <form onSubmit={handleSave} className="lg:col-span-3">
            <AdminCard className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase">{selected.sectionKey}</p>
              <AdminInput label="Badge" value={selected.badge ?? ''} onChange={(e) => setSelected({ ...selected, badge: e.target.value })} />
              <AdminInput label="Heading" value={selected.heading ?? ''} onChange={(e) => setSelected({ ...selected, heading: e.target.value })} />
              <AdminInput label="Subheading" value={selected.subheading ?? ''} onChange={(e) => setSelected({ ...selected, subheading: e.target.value })} />
              <AdminTextarea label="Description" value={selected.description ?? ''} onChange={(e) => setSelected({ ...selected, description: e.target.value })} rows={4} />
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput label="Primary CTA Label" value={selected.ctaPrimaryLabel ?? ''} onChange={(e) => setSelected({ ...selected, ctaPrimaryLabel: e.target.value })} />
                <AdminInput label="Primary CTA URL" value={selected.ctaPrimaryUrl ?? ''} onChange={(e) => setSelected({ ...selected, ctaPrimaryUrl: e.target.value })} />
                <AdminInput label="Secondary CTA Label" value={selected.ctaSecondaryLabel ?? ''} onChange={(e) => setSelected({ ...selected, ctaSecondaryLabel: e.target.value })} />
                <AdminInput label="Secondary CTA URL" value={selected.ctaSecondaryUrl ?? ''} onChange={(e) => setSelected({ ...selected, ctaSecondaryUrl: e.target.value })} />
              </div>
              <AdminTextarea label="Extra JSON (hero cards, image, acronym, etc.)" value={extraJson} onChange={(e) => setExtraJson(e.target.value)} rows={12} className="font-mono text-xs" />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <AdminSubmitButton loading={loading} />
            </AdminCard>
          </form>
        )}
      </div>
    </div>
  )
}
