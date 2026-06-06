'use client'

import { GenericEntityAdmin } from '@/components/admin/generic-entity-admin'

export default function AdminProcessPage() {
  return (
    <GenericEntityAdmin
      title="Process Step"
      apiPath="/api/process-steps"
      columns={['Number', 'Title', 'Icon']}
      fields={[
        { key: 'stepNumber', label: 'Step Number', type: 'text', required: true },
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea', required: true },
        { key: 'icon', label: 'Icon (Lucide name)', type: 'text', required: true },
        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
      ]}
      getRowCells={(item) => [item.stepNumber, item.title, item.icon]}
      getDefaultValues={() => ({
        stepNumber: '01', title: '', description: '', icon: 'Search', sortOrder: 0,
      })}
    />
  )
}
