import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sectionSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const sections = await prisma.sectionContent.findMany({ orderBy: { sectionKey: 'asc' } })
    return NextResponse.json(sections)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = sectionSchema.parse(await request.json())
    const section = await prisma.sectionContent.create({ data: body })
    revalidateSiteContent()
    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
