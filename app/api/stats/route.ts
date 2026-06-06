import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { siteStatSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const stats = await prisma.siteStat.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(stats)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = siteStatSchema.parse(await request.json())
    const stat = await prisma.siteStat.create({ data: body })
    revalidateSiteContent()
    return NextResponse.json(stat, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
