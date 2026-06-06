import { NextResponse } from 'next/server'
import { authenticateAdmin, createSession } from '@/lib/auth'
import { loginSchema } from '@/lib/validators'
import { handleApiError } from '@/lib/api-helpers'

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json())
    const admin = await authenticateAdmin(body.email, body.password)

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    await createSession({ adminId: admin.id, email: admin.email })
    return NextResponse.json({ success: true, admin: { email: admin.email, name: admin.name } })
  } catch (error) {
    return handleApiError(error)
  }
}
