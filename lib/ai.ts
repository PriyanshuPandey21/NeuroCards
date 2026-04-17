import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

let _genAI: GoogleGenerativeAI | null = null;
let _openai: OpenAI | null = null;

export interface GeneratedFlashcard {
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  type: "concept" | "definition" | "application" | "true_false" | "fill_blank" | "example";
}

export interface GenerationResult {
  flashcards: GeneratedFlashcard[];
  summary: string;
}

const promptTemplate = (title: string, text: string, cardCount: number = 15) => `You are an expert educational content creator. Generate comprehensive, high-quality flashcards for active recall learning.

Generate flashcards from the following study material titled "${title}".

Create a diverse set of EXACTLY ${cardCount} flashcards covering:
- **Definitions**: Key terms and their meanings
- **Concepts**: Core ideas and principles  
- **Application**: How to apply concepts
- **True/False**: Verify understanding of facts
- **Fill in the blank**: Test recall of specific details
- **Examples**: Real-world applications and scenarios

Each flashcard must have:
- question: Clear, specific question
- answer: Concise but complete answer
- difficulty: "easy", "medium", or "hard"
- topic: The specific subtopic this covers
- type: One of "concept", "definition", "application", "true_false", "fill_blank", "example"

Also generate a 2-3 sentence summary of the entire document.

Return the result as a valid JSON object matching this structure. Output valid JSON ONLY, no extra text, markdown formatting or code fences.
{
  "summary": "Brief summary of the document...",
  "flashcards": [
    {
      "question": "...",
      "answer": "...",
      "difficulty": "easy|medium|hard",
      "topic": "...",
      "type": "concept|definition|application|true_false|fill_blank|example"
    }
  ]
}

STUDY MATERIAL:
${text}`;

function parseAIResponse(content: string): GenerationResult {
  let jsonStr = content.trim();
  if (jsonStr.startsWith("\`\`\`")) {
    jsonStr = jsonStr.replace(/^\`\`\`(?:json)?\n?/, "").replace(/\n?\`\`\`$/, "");
  }
  
  const parsed = JSON.parse(jsonStr);
  return {
    summary: parsed.summary || "No summary available.",
    flashcards: parsed.flashcards || [],
  };
}

async function generateWithGemini(text: string, title: string, cardCount: number = 15): Promise<GenerationResult> {
  if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY missing");
  
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  
  const model = _genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const maxChars = 100000;
  const truncatedText = text.length > maxChars ? text.slice(0, maxChars) : text;
  
  const prompt = promptTemplate(title, truncatedText, cardCount);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const content = response.text() || "";
  
  return parseAIResponse(content);
}

async function generateWithOpenAI(text: string, title: string, cardCount: number = 15): Promise<GenerationResult> {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY missing");
  
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  const maxChars = 60000; // GPT-4o-mini is safer with smaller chunks
  const truncatedText = text.length > maxChars ? text.slice(0, maxChars) : text;
  
  const response = await _openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert educational content creator. You must return valid JSON only.`,
      },
      {
        role: "user",
        content: promptTemplate(title, truncatedText, cardCount),
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content || "";
  return parseAIResponse(content);
}

export async function generateFlashcardsFromText(
  text: string,
  title: string,
  cardCount: number = 15
): Promise<GenerationResult> {
  // First attempt: Gemini
  try {
    console.log("Attempting flashcard generation with Gemini...");
    return await generateWithGemini(text, title, cardCount);
  } catch (error) {
    console.error("Gemini AI failed, falling back to OpenAI...");
    console.error(error);
    
    // Second attempt: Fallback to OpenAI
    try {
      console.log("Attempting flashcard generation with OpenAI...");
      return await generateWithOpenAI(text, title, cardCount);
    } catch (fallbackError) {
      console.error("OpenAI Fallback failed:");
      console.error(fallbackError);
      throw new Error("Both Gemini and OpenAI generation failed. Please try again later.");
    }
  }
}
