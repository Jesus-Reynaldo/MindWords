import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserIdFromRequest } from '@/lib/getUserFromRequest'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserIdFromRequest(request)
    const { id } = await params
    const topic = await prisma.grammarTopic.findFirst({ where: { id, userId } })
    if (!topic) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(topic)
  } catch (e) {
    const status = e instanceof Error && e.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status })
  }
}
