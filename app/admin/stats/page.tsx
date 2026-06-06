'use client'

import { GenericEntityAdmin } from '@/components/admin/generic-entity-admin'

export default function AdminStatsPage() {
  return (
    <GenericEntityAdmin
      title="Stat"
      apiPath="/api/stats"
      columns={['Value', 'Label', 'Suffix']}
      fields={[
        { key: 'value', label: 'Value', type: 'number', required: true },
        { key: 'label', label: 'Label', type: 'text', required: true },
        { key: 'suffix', label: 'Suffix', type: 'text' },
        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
      ]}
      getRowCells={(item) => [item.value, item.label, item.suffix || '—']}
      getDefaultValues={() => ({ value: 0, label: '', suffix: '', sortOrder: 0 })}
    />
  )
}
