import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sectionSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params
    const section = await prisma.sectionContent.findUnique({ where: { id } })
    if (!section) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(section)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    const body = sectionSchema.parse(await request.json())
    const section = await prisma.sectionContent.update({ where: { id }, data: body })
    revalidateSiteContent()
    return NextResponse.json(section)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    await prisma.sectionContent.delete({ where: { id } })
    revalidateSiteContent()
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
