import { GoogleGenAI } from "@google/genai";
import type { GrammarFeedback } from "../interfaces/vocabulary.interface";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});



export async function validateGrammarWithGemini(sentence: string, word: string): Promise<GrammarFeedback> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `Verifica la gramática de la oración en inglés. Debe usar la palabra "${word}". 
Oración: "${sentence}"`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          isCorrect: { type: "boolean" },
          explanation: { type: "string" },
          suggestion: { type: "string" },
        },
        required: ["isCorrect", "explanation", "suggestion"],
      },
    }

  });
  return JSON.parse(response.text || '{}');
}
