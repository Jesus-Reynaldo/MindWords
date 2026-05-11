import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserIdFromRequest } from '@/lib/getUserFromRequest'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request)
    const words = await prisma.word.findMany({ where: { userId } })
    return NextResponse.json(words)
  } catch (e) {
    const status = e instanceof Error && e.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request)
    const { word, definition, sentence, level, nextReviewDate, dateAdded, lastReviewed, dias, type, synonyms, antonyms } = await request.json()
    const created = await prisma.word.create({
      data: { word, definition, sentence, level, nextReviewDate, dateAdded, lastReviewed, dias, type, synonyms: synonyms ?? [], antonyms: antonyms ?? [], userId },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    const status = e instanceof Error && e.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status })
  }
}
