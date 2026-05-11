import type { GrammarTopic } from '../interfaces/grammar.interface'

function authHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export const getGrammarTopics = async (): Promise<GrammarTopic[]> => {
  try {
    const res = await fetch('/api/grammar', { headers: authHeaders() })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const getGrammarTopicById = async (id: string): Promise<GrammarTopic | null> => {
  try {
    const res = await fetch(`/api/grammar/${id}`, { headers: authHeaders() })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export const insertGrammarTopic = async (newGrammarTopic: Omit<GrammarTopic, 'id'>): Promise<GrammarTopic[]> => {
  if (!newGrammarTopic || Object.keys(newGrammarTopic).length === 0) {
    throw new Error('Grammar topic data is required')
  }
  const res = await fetch('/api/grammar', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(newGrammarTopic),
  })
  if (!res.ok) throw new Error('Failed to insert grammar topic')
  const topic = await res.json()
  return [topic as GrammarTopic]
}
