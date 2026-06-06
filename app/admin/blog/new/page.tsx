import { AdminPageHeader } from '@/components/admin/admin-ui'
import { BlogForm } from '@/components/admin/blog-form'

export default function NewBlogPage() {
  return (
    <div>
      <AdminPageHeader title="New Blog Post" />
      <BlogForm />
    </div>
  )
}
