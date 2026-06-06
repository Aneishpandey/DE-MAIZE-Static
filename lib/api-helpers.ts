import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getSession } from '@/lib/auth'

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError(error.issues.map((i) => i.message).join(', '), 400)
  }
  if (error instanceof Error && error.message === 'Unauthorized') {
    return jsonError('Unauthorized', 401)
  }
  console.error(error)
  return jsonError('Internal server error', 500)
}

export async function requireApiAdmin() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}
