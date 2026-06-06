'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export function AdminPageHeader({
  title,
  description,
  createHref,
  createLabel = 'Add New',
}: {
  title: string
  description?: string
  createHref?: string
  createLabel?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {createHref && (
        <Link
          href={createHref}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          {createLabel}
        </Link>
      )}
    </div>
  )
}

export function AdminCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border/50 bg-card/80 p-6 ${className}`}>{children}</div>
}

export function AdminInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </label>
  )
}

export function AdminTextarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground mb-1.5 block">{label}</span>
      <textarea
        {...props}
        className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y min-h-[100px]"
      />
    </label>
  )
}

export function AdminSelect({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground mb-1.5 block">{label}</span>
      <select
        {...props}
        className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {children}
      </select>
    </label>
  )
}

export function AdminCheckbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <input type="checkbox" {...props} className="rounded border-border" />
      {label}
    </label>
  )
}

export function AdminSubmitButton({
  loading,
  children = 'Save Changes',
}: {
  loading?: boolean
  children?: React.ReactNode
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
    >
      {loading ? 'Saving...' : children}
    </button>
  )
}

export function AdminTable({
  columns,
  rows,
  editHref,
  onDelete,
}: {
  columns: string[]
  rows: Array<{ id: string; cells: React.ReactNode[] }>
  editHref: (id: string) => string
  onDelete: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full text-sm">
        <thead className="bg-secondary/30">
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left px-4 py-3 font-semibold text-foreground">
                {col}
              </th>
            ))}
            <th className="text-right px-4 py-3 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-border/30 hover:bg-secondary/20">
              {row.cells.map((cell, i) => (
                <td key={i} className="px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={editHref(row.id)}
                    className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-primary"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(row.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ArrayFieldEditor({
  label,
  values,
  onChange,
}: {
  label: string
  values: string[]
  onChange: (values: string[]) => void
}) {
  return (
    <div>
      <span className="text-sm font-medium text-foreground mb-2 block">{label}</span>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={value}
              onChange={(e) => {
                const next = [...values]
                next[index] = e.target.value
                onChange(next)
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, i) => i !== index))}
              className="px-3 py-2 rounded-lg border border-border text-muted-foreground hover:text-destructive"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ''])}
          className="text-sm text-primary hover:underline"
        >
          + Add item
        </button>
      </div>
    </div>
  )
}
