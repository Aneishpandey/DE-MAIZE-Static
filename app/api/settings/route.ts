import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { siteSettingSchema } from '@/lib/validators'
import { handleApiError, requireApiAdmin } from '@/lib/api-helpers'
import { revalidateSiteContent } from '@/lib/revalidate'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } })
    return NextResponse.json(settings)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: Request) {
  try {
    await requireApiAdmin()
    const body = siteSettingSchema.parse(await request.json())
    const setting = await prisma.siteSetting.upsert({
      where: { key: body.key },
      create: body,
      update: { value: body.value },
    })
    revalidateSiteContent()
    return NextResponse.json(setting)
  } catch (error) {
    return handleApiError(error)
  }
}
