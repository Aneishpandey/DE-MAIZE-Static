'use client'

import { GenericEntityAdmin } from '@/components/admin/generic-entity-admin'

export default function AdminTestimonialsPage() {
  return (
    <GenericEntityAdmin
      title="Testimonial"
      apiPath="/api/testimonials"
      columns={['Name', 'Role', 'Rating']}
      fields={[
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'content', label: 'Content', type: 'textarea', required: true },
        { key: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
        { key: 'avatarUrl', label: 'Avatar URL', type: 'text' },
        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
      getRowCells={(item) => [item.name, item.role, item.rating]}
      getDefaultValues={() => ({
        name: '', role: '', content: '', rating: 5, avatarUrl: null, sortOrder: 0, isPublished: true,
      })}
    />
  )
}
