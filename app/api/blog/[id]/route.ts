import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { blogPostSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params
    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    const body = blogPostSchema.parse(await request.json())
    const post = await prisma.blogPost.update({
      where: { id },
      data: { ...body, publishedAt: new Date(body.publishedAt) },
    })
    revalidateSiteContent()
    return NextResponse.json(post)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    await prisma.blogPost.delete({ where: { id } })
    revalidateSiteContent()
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
