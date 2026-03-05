import { GoogleGenAI } from "@google/genai";
import type { GrammarTopic, QuizQuestion } from "../interfaces/grammar.interface";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateGrammarTopicWithGemini(
  topic: string,
  levelEnglish: string
): Promise<GrammarTopic> {
  const system = `
You are an expert grammar tutor based on the book "Understanding and Using English Grammar".
You create spaced-repetition study cards. Always answer ONLY in English.
Keep explanations clear and accessible for the specified level.
Output must follow the exact 4-part format and nothing else.
`.trim();

  const user = `
Create a study card for the topic: "${topic}".
Follow EXACTLY this format:

1. Explanation: Explain the topic clearly, using a ${levelEnglish} English level. Avoid unnecessary jargon.
2. Rule or Formula + Steps: Provide a general rule or formula, then 2–4 steps to apply it.
3. Examples (4 total): Give 4 contextual sentences that correctly demonstrate the topic.
4. Do not add anything else: No notes, no warnings, no translations.

Constraints:
- Output must be entirely in English.
- Use concise, student-friendly language at ${levelEnglish} level.
- No extra sections beyond the 4 specified.
`.trim();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: system + "\n\n" + user,
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          title: { type: "string" },
          levelEnglish: { type: "string" },
          explanation: { type: "string" },
          formulates: { type: "array", items: { type: "string" } },
          examples: { type: "array", items: { type: "string" } },
        },
        required: ["title", "levelEnglish", "explanation", "formulates", "examples"],
      },
    },
  });
  console.log("response", response.text);
  return JSON.parse(response.text || "{}");
}

export async function generateQuizQuestionsWithGemini(
  topic: GrammarTopic
): Promise<QuizQuestion[]> {
  const system = `
You are a TOEFL exam question writer specializing in English grammar.
You create multiple-choice questions that test understanding of specific grammar rules.
Always output exactly 5 questions. Each question must have exactly 4 options.
The correctAnswer field must be the 0-based index of the correct option.
`.trim();

  const user = `
Create 20 TOEFL-style multiple-choice questions for the grammar topic: "${topic.title}" (${topic.levelEnglish} level).

Topic explanation: ${topic.explanation}

Rules/Formulas:
${topic.formulates.map((f, i) => `${i + 1}. ${f}`).join("\n")}

Examples:
${topic.examples.map((e, i) => `${i + 1}. ${e}`).join("\n")}

Requirements:
- Each question should test a different aspect of this grammar topic.
- Use fill-in-the-blank or sentence completion format.
- Make distractors (wrong options) plausible but clearly incorrect.
- Provide a brief explanation for why the correct answer is right.
- Match the ${topic.levelEnglish} difficulty level.
`.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: system + "\n\n" + user,
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      responseMimeType: "application/json",
      responseSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            options: { type: "array", items: { type: "string" } },
            correctAnswer: { type: "integer" },
            explanation: { type: "string" },
          },
          required: ["question", "options", "correctAnswer", "explanation"],
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
}
