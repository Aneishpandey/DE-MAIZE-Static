'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AdminPageHeader,
  AdminTable,
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminCheckbox,
  AdminSubmitButton,
} from '@/components/admin/admin-ui'
import { adminDelete, adminFetch } from '@/lib/admin-client'

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox'

interface FieldConfig {
  key: string
  label: string
  type: FieldType
  required?: boolean
}

interface GenericEntityAdminProps {
  title: string
  apiPath: string
  fields: FieldConfig[]
  columns: string[]
  getRowCells: (item: Record<string, unknown>) => React.ReactNode[]
  getDefaultValues: () => Record<string, unknown>
}

function EntityForm({
  apiPath,
  fields,
  initial,
  id,
  onSaved,
}: {
  apiPath: string
  fields: FieldConfig[]
  initial?: Record<string, unknown>
  id?: string
  onSaved: () => void
}) {
  const [form, setForm] = useState<Record<string, unknown>>(initial ?? {})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function setField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = id ? `${apiPath}/${id}` : apiPath
      await adminFetch(url, { method: id ? 'PUT' : 'POST', body: JSON.stringify(form) })
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminCard className="space-y-4">
        {fields.map((field) => {
          const value = form[field.key]
          if (field.type === 'textarea') {
            return (
              <AdminTextarea
                key={field.key}
                label={field.label}
                value={String(value ?? '')}
                onChange={(e) => setField(field.key, e.target.value)}
                required={field.required}
              />
            )
          }
          if (field.type === 'checkbox') {
            return (
              <AdminCheckbox
                key={field.key}
                label={field.label}
                checked={Boolean(value)}
                onChange={(e) => setField(field.key, e.target.checked)}
              />
            )
          }
          return (
            <AdminInput
              key={field.key}
              label={field.label}
              type={field.type === 'number' ? 'number' : 'text'}
              value={field.type === 'number' ? Number(value ?? 0) : String(value ?? '')}
              onChange={(e) =>
                setField(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)
              }
              required={field.required}
            />
          )
        })}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <AdminSubmitButton loading={loading} />
      </AdminCard>
    </form>
  )
}

export function GenericEntityAdmin({
  title,
  apiPath,
  fields,
  columns,
  getRowCells,
  getDefaultValues,
}: GenericEntityAdminProps) {
  const router = useRouter()
  const [items, setItems] = useState<Array<Record<string, unknown> & { id: string }>>([])
  const [editingId, setEditingId] = useState<string | 'new' | null>(null)
  const [editData, setEditData] = useState<Record<string, unknown>>()

  async function load() {
    const data = await adminFetch<Array<Record<string, unknown> & { id: string }>>(apiPath)
    setItems(data)
  }

  useEffect(() => {
    load().catch(console.error)
  }, [apiPath])

  async function handleDelete(id: string) {
    if (!confirm('Delete this item?')) return
    await adminDelete(`${apiPath}/${id}`)
    await load()
    router.refresh()
  }

  function startCreate() {
    setEditingId('new')
    setEditData(getDefaultValues())
  }

  function startEdit(id: string) {
    const item = items.find((i) => i.id === id)
    if (!item) return
    setEditingId(id)
    setEditData(item)
  }

  if (editingId) {
    return (
      <div>
        <AdminPageHeader title={editingId === 'new' ? `New ${title}` : `Edit ${title}`} />
        <button
          onClick={() => setEditingId(null)}
          className="text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to list
        </button>
        <EntityForm
          apiPath={apiPath}
          fields={fields}
          initial={editData}
          id={editingId === 'new' ? undefined : editingId}
          onSaved={() => {
            setEditingId(null)
            load()
            router.refresh()
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader title={title} createHref="#" createLabel="Add New" />
      <button
        onClick={startCreate}
        className="mb-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Add New
      </button>
      <AdminTable
        columns={columns}
        rows={items.map((item) => ({ id: item.id, cells: getRowCells(item) }))}
        editHref={() => '#'}
        onDelete={handleDelete}
      />
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => startEdit(item.id)}
            className="text-sm text-primary hover:underline mr-4"
          >
            Edit {String(item.name ?? item.title ?? item.sectionKey ?? item.label ?? item.id)}
          </button>
        ))}
      </div>
    </div>
  )
}
