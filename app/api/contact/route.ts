import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { contactSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await request.json())
    const submission = await prisma.contactSubmission.create({ data: body })
    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET() {
  try {
    await requireApiAdmin()
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(submissions)
  } catch (error) {
    return handleApiError(error)
  }
}
