import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { z } from 'zod'

type Params = { params: Promise<{ id: string }> }

const statusSchema = z.object({
  status: z.enum(['new', 'read', 'replied']),
})

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    const body = statusSchema.parse(await request.json())
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status: body.status },
    })
    return NextResponse.json(submission)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireApiAdmin()
    const { id } = await params
    await prisma.contactSubmission.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
