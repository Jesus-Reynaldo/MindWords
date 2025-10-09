// Interfaces
export interface Word {
  id?: string;
  word: string;
  definition: string;
  sentence: string[];
  level: number;
  nextReviewDate: string;
  dateAdded: string;
  lastReviewed?: string;
  dias: number[];
  user_id?: string;
}

export interface NewWord {
  word: string;
  definition: string;
  sentence: string[];
}

export interface GrammarFeedback {
  isCorrect: boolean;
  explanation: string;
  suggestion: string;
}

export interface Stats {
  total: number;
  toReview: number;
  mastered: number;
}

export interface ApiResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export interface DefineWord {
  definition: string;
}

export type Mode = 'review' | 'add';