import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { serviceSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params
    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(service)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    const body = serviceSchema.parse(await request.json())
    const service = await prisma.service.update({ where: { id }, data: body })
    revalidateSiteContent()
    return NextResponse.json(service)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    await prisma.service.delete({ where: { id } })
    revalidateSiteContent()
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
