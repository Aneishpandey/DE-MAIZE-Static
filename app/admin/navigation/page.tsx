'use client'

import { GenericEntityAdmin } from '@/components/admin/generic-entity-admin'

export default function AdminNavigationPage() {
  return (
    <GenericEntityAdmin
      title="Navigation Item"
      apiPath="/api/navigation"
      columns={['Location', 'Label', 'Href']}
      fields={[
        { key: 'location', label: 'Location (header, footer_services, footer_company, footer_resources, social)', type: 'text', required: true },
        { key: 'label', label: 'Label', type: 'text', required: true },
        { key: 'href', label: 'Href', type: 'text', required: true },
        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
        { key: 'isVisible', label: 'Visible', type: 'checkbox' },
      ]}
      getRowCells={(item) => [item.location, item.label, item.href]}
      getDefaultValues={() => ({
        location: 'header', label: '', href: '#', sortOrder: 0, isVisible: true,
      })}
    />
  )
}
