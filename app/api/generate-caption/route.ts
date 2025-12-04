// app/api/generate-caption/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Body = {
  productName?: string;
  description?: string;
  language?: string;
  tone?: string;
  count?: number;
};

const API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "gemini-pro";

async function generateCaptions(params: {
  productName?: string;
  description?: string;
  language?: string;
  tone?: string;
  count?: number;
}): Promise<string[]> {
  const { productName, description, language = "English", tone = "friendly", count = 5 } = params;
  const client = new GoogleGenerativeAI(API_KEY!);
  const model = client.getGenerativeModel({ model: DEFAULT_MODEL });

  const prompt = `
You are a social media copywriter. Generate ${count} short social-media captions in ${language}
for this product.

Product name: ${productName ?? "N/A"}
Description: ${description ?? "N/A"}
Tone: ${tone}

Return the captions as a JSON array. Example: ["caption1","caption2",...]
`;

  const result: any = await model.generateContent(prompt);
  const text =
    result?.response?.text?.() ??
    result?.response?.text ??
    result?.candidates?.[0]?.content ??
    JSON.stringify(result);

  // Attempt to parse JSON array first
  try {
    const parsed = JSON.parse(String(text));
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch (e) {
    // fall through to fallback parsing
  }

  // Fallback: split by lines and return top `count`
  return String(text)
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, count);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { productName, description, language, tone, count } = body ?? {};

    if (!productName && !description) {
      return NextResponse.json(
        { error: "Provide at least 'productName' or 'description' in the body." },
        { status: 400 }
      );
    }

    const captions = await generateCaptions({ productName, description, language, tone, count });
    return NextResponse.json({ captions });
  } catch (err) {
    console.error("generate-caption error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
