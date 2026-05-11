import type { NextRequest } from 'next/server'
import { verifyToken } from './auth'

export async function getUserIdFromRequest(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) throw new Error('Unauthorized')
  const token = authHeader.slice(7)
  const { userId } = await verifyToken(token)
  return userId
}
