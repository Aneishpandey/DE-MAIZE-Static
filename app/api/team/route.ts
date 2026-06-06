import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { teamMemberSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(members)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = teamMemberSchema.parse(await request.json())
    const member = await prisma.teamMember.create({ data: body })
    revalidateSiteContent()
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
