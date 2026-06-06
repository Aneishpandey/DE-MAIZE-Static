import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { blogPostSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

function parsePublishedAt(value: string) {
  return new Date(value)
}

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } })
    return NextResponse.json(posts)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = blogPostSchema.parse(await request.json())
    const post = await prisma.blogPost.create({
      data: { ...body, publishedAt: parsePublishedAt(body.publishedAt) },
    })
    revalidateSiteContent()
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
