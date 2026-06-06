import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { projectSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(projects)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin()
    const body = projectSchema.parse(await request.json())
    const project = await prisma.project.create({ data: body })
    revalidateSiteContent()
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
