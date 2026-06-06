import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { processStepSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    const body = processStepSchema.parse(await request.json())
    const step = await prisma.processStep.update({ where: { id }, data: body })
    revalidateSiteContent()
    return NextResponse.json(step)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    await prisma.processStep.delete({ where: { id } })
    revalidateSiteContent()
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
