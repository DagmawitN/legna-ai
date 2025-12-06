// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY!;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "models/gemini-2.5-flash";

if (!API_KEY) {
  console.warn("GEMINI_API_KEY not set.");
}

function client() {
  return new GoogleGenerativeAI(API_KEY);
}

async function generateText(prompt: string, options?: { maxTokens?: number }) {
  const model = client().getGenerativeModel({ model: DEFAULT_MODEL });
  const requestOptions: any = {
    // depending on SDK version, configuration placement may differ; this is defensive
    maxOutputTokens: options?.maxTokens ?? 256,
  };
  const result: any = await model.generateContent(prompt, requestOptions);
  // defensive extraction:
  const out =
    result?.response?.text?.() ??
    result?.response?.text ??
    result?.candidates?.[0]?.content ??
    JSON.stringify(result);
  return String(out).trim();
}

export async function detectLanguageFromText(text: string) {
  const prompt = `
You are a language detection assistant. Given the text below, answer ONLY with a JSON object:
{ "language": "<language name>", "iso": "<ISO code if known>", "confidence": <0-1 score> }

Text:
"""${text}"""
`;

  const raw = await generateText(prompt, { maxTokens: 80 });
  try {
    const parsed = JSON.parse(raw);
    return {
      language: parsed.language ?? parsed.lang ?? parsed.iso ?? String(parsed),
      iso: parsed.iso ?? parsed.iso639_1 ?? null,
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : null,
      raw,
    };
  } catch (e) {
    // fallback: return raw string as language (best-effort)
    return { language: raw.split("\n")[0].slice(0, 60), iso: null, confidence: null, raw };
  }
}

export async function detectToneFromText(text: string) {
  const prompt = `
You are a tone analyzer. Given the text below, return a single-word tone (one of: formal, professional, friendly, casual, emotional, neutral, playful, urgent)
and a confidence score as JSON: { "tone": "...", "confidence": 0.0 }

Text:
"""${text}"""
`;
  const raw = await generateText(prompt, { maxTokens: 50 });
  try {
    const parsed = JSON.parse(raw);
    return { tone: parsed.tone, confidence: parsed.confidence ?? null, raw };
  } catch {
    // If not JSON, try to extract first word
    const tone = raw.split(/[,\n.]/)[0].trim().toLowerCase();
    return { tone, confidence: null, raw };
  }
}

export async function generateReplyText(customerMessage: string, language: string, tone: string) {
  const prompt = `
You are a customer support assistant. Produce a concise reply in ${language} with ${tone} tone.
Keep it 1-3 sentences. Return ONLY the reply text.

Customer message:
"""${customerMessage}"""
`;
  return await generateText(prompt, { maxTokens: 200 });
}

export async function generateTranslation(text: string, targetLanguage: string) {
  const prompt = `
Translate the following text into ${targetLanguage}. Return ONLY the translated text.

Text:
"""${text}"""
`;
  return await generateText(prompt, { maxTokens: 400 });
}
