import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserIdFromRequest } from '@/lib/getUserFromRequest'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request)
    const topics = await prisma.grammarTopic.findMany({ where: { userId } })
    return NextResponse.json(topics)
  } catch (e) {
    const status = e instanceof Error && e.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request)
    const { title, levelEnglish, explanation, formulates, examples } = await request.json()
    const topic = await prisma.grammarTopic.create({
      data: { title, levelEnglish, explanation, formulates, examples, userId },
    })
    return NextResponse.json(topic, { status: 201 })
  } catch (e) {
    const status = e instanceof Error && e.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status })
  }
}
