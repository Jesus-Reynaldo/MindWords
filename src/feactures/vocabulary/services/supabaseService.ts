import type { Word } from '../interfaces/vocabulary.interface'

function authHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export const insertWord = async (newWord: Omit<Word, 'id'>): Promise<Word[]> => {
  try {
    const res = await fetch('/api/words', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(newWord),
    })
    if (!res.ok) return []
    const word = await res.json()
    return [word as Word]
  } catch {
    return []
  }
}

export const getWords = async (): Promise<Word[]> => {
  try {
    const res = await fetch('/api/words', { headers: authHeaders() })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const updateWordSupabase = async (word: Word): Promise<Word[]> => {
  try {
    const res = await fetch(`/api/words/${word.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(word),
    })
    if (!res.ok) return []
    const updated = await res.json()
    return [updated as Word]
  } catch {
    return []
  }
}

export const getWordByReviewDate = async (limit: number = 20): Promise<Word[]> => {
  try {
    const res = await fetch(`/api/words/review?limit=${limit}`, { headers: authHeaders() })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
