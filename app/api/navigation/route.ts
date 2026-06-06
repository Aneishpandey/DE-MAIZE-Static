import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { navigationSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const items = await prisma.navigationItem.findMany({ orderBy: [{ location: 'asc' }, { sortOrder: 'asc' }] })
    return NextResponse.json(items)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = navigationSchema.parse(await request.json())
    const item = await prisma.navigationItem.create({ data: body })
    revalidateSiteContent()
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
