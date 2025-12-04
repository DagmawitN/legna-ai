// app/api/translate/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Body = {
  text?: string;
  targetLanguage?: string;
};

const API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "gemini-pro";

if (!API_KEY) {
  console.warn("GEMINI_API_KEY is not set. Set it in .env.local");
}

async function translateWithGemini(text: string, targetLanguage: string): Promise<string> {
  const client = new GoogleGenerativeAI(API_KEY!);
  const model = client.getGenerativeModel({ model: DEFAULT_MODEL });

  const prompt = `
You are a translator. Translate the following text into ${targetLanguage}.
Return ONLY the translated text and nothing else.

Text:
"""${text}"""
`;

  const result: any = await model.generateContent(prompt);
  // Defensive extraction for response text
  const translated =
    result?.response?.text?.() ??
    result?.response?.text ??
    result?.candidates?.[0]?.content ??
    JSON.stringify(result);

  return String(translated).trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { text, targetLanguage } = body ?? {};

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: "Please provide 'text' and 'targetLanguage' in the JSON body." },
        { status: 400 }
      );
    }

    const translation = await translateWithGemini(text, targetLanguage);
    return NextResponse.json({ translation });
  } catch (err) {
    console.error("translate error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
