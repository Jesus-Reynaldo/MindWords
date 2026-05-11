import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserIdFromRequest } from '@/lib/getUserFromRequest'
import dayjs from 'dayjs'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request)
    const limit = Number(new URL(request.url).searchParams.get('limit') ?? '20')
    const today = dayjs().format('YYYY-MM-DD')
    const words = await prisma.word.findMany({
      where: { userId, nextReviewDate: { lte: today } },
      orderBy: { nextReviewDate: 'asc' },
      take: limit,
    })
    return NextResponse.json(words)
  } catch (e) {
    const status = e instanceof Error && e.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status })
  }
}
