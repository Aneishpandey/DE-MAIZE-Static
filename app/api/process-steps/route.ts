import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { processStepSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const steps = await prisma.processStep.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(steps)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = processStepSchema.parse(await request.json())
    const step = await prisma.processStep.create({ data: body })
    revalidateSiteContent()
    return NextResponse.json(step, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
