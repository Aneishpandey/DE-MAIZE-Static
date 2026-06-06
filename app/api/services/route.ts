import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { serviceSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(services)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = serviceSchema.parse(await request.json())
    const service = await prisma.service.create({ data: body })
    revalidateSiteContent()
    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
