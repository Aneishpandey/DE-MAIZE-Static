'use client'

import { GenericEntityAdmin } from '@/components/admin/generic-entity-admin'

export default function AdminTeamPage() {
  return (
    <GenericEntityAdmin
      title="Team Member"
      apiPath="/api/team"
      columns={['Name', 'Role', 'Status']}
      fields={[
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'bio', label: 'Bio', type: 'textarea', required: true },
        { key: 'gradient', label: 'Gradient Class', type: 'text', required: true },
        { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
        { key: 'twitterUrl', label: 'Twitter URL', type: 'text' },
        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
      getRowCells={(item) => [item.name, item.role, item.isPublished ? 'Published' : 'Draft']}
      getDefaultValues={() => ({
        name: '', role: '', bio: '', gradient: 'from-primary/60 to-accent/40',
        linkedinUrl: null, twitterUrl: null, sortOrder: 0, isPublished: true,
      })}
    />
  )
}
