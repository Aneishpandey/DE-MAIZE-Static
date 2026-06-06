import { AdminPageHeader } from '@/components/admin/admin-ui'
import { ServiceForm } from '@/components/admin/service-form'

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="New Service" />
      <ServiceForm />
    </div>
  )
}
