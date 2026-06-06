'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminPageHeader } from '@/components/admin/admin-ui'
import { BlogForm } from '@/components/admin/blog-form'
import { adminFetch } from '@/lib/admin-client'

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<Parameters<typeof BlogForm>[0]['initial']>()

  useEffect(() => {
    adminFetch(`/api/blog/${id}`).then((post) => {
      setData({
        ...post,
        publishedAt: new Date(post.publishedAt as string).toISOString(),
      } as Parameters<typeof BlogForm>[0]['initial'])
    }).catch(console.error)
  }, [id])

  if (!data) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div>
      <AdminPageHeader title="Edit Blog Post" />
      <BlogForm initial={data} id={id} />
    </div>
  )
}
