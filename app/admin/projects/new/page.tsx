import { AdminPageHeader } from '@/components/admin/admin-ui'
import { ProjectForm } from '@/components/admin/project-form'

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="New Project" />
      <ProjectForm />
    </div>
  )
}
