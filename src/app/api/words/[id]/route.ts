import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserIdFromRequest } from '@/lib/getUserFromRequest'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserIdFromRequest(request)
    const { id } = await params
    const { word, definition, sentence, level, nextReviewDate, dateAdded, lastReviewed, dias, type, synonyms, antonyms } = await request.json()
    const updated = await prisma.word.updateMany({
      where: { id, userId },
      data: { word, definition, sentence, level, nextReviewDate, dateAdded, lastReviewed, dias, type, synonyms, antonyms },
    })
    if (updated.count === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const result = await prisma.word.findUnique({ where: { id } })
    return NextResponse.json(result)
  } catch (e) {
    const status = e instanceof Error && e.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status })
  }
}
