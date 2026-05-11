import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const token = await signToken(user.id, user.email)
    return NextResponse.json({ token })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
