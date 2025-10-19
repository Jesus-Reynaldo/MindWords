import { GoogleGenAI } from "@google/genai";
import type { DefineWord, GrammarFeedback } from "../interfaces/vocabulary.interface";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});



export async function validateGrammarWithGemini(sentence: string, word: string): Promise<GrammarFeedback> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `Verifica la gramática de la oración en inglés. Debe usar la palabra "${word}". 
Oración: "${sentence}"`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, 
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

export async function defineWordWithGemini(word: string): Promise<DefineWord> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `Define la palabra "${word}" en inglés. La respuesta debe ser corta y precisa maximo 6 palabras. Al final debe decir entre parentesis que tipo de palabra es por ejemplo (n, v, adj, adv, prep, phv, ind)`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, 
      },
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          definition: { type: "string" },
          type: { type: "string" },
          synonyms: { type: "array", items: { type: "string" } },
          antonyms: { type: "array", items: { type: "string" } },
          examples: { type: "array", items: { type: "string" } },
        },
        required: ["definition", "type", "synonyms", "antonyms", "examples"],
      },
    }
  });
  return JSON.parse(response.text || '{}');
}
