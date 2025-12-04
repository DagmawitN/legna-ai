// app/api/generate-strategy/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Body = {
  businessType?: string;
  objective?: string;
  language?: string;
};

const API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "gemini-pro";

async function generateStrategy(params: {
  businessType?: string;
  objective?: string;
  language?: string;
}): Promise<string[]> {
  const { businessType = "general small business", objective = "social media growth", language = "English" } = params;
  const client = new GoogleGenerativeAI(API_KEY!);
  const model = client.getGenerativeModel({ model: DEFAULT_MODEL });

  const prompt = `
You are a marketing consultant. Provide a short 5-point marketing strategy (bullet points) in ${language}
for the following business to achieve: ${objective}.
Business type / product: ${businessType}
Return as a JSON array of strings.
`;

  const result: any = await model.generateContent(prompt);
  const text =
    result?.response?.text?.() ??
    result?.response?.text ??
    result?.candidates?.[0]?.content ??
    JSON.stringify(result);

  try {
    const parsed = JSON.parse(String(text));
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch (e) {}

  return String(text)
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { businessType, objective, language } = body ?? {};

    if (!businessType) {
      return NextResponse.json({ error: "Provide 'businessType' in the request body." }, { status: 400 });
    }

    const strategy = await generateStrategy({ businessType, objective, language });
    return NextResponse.json({ strategy });
  } catch (err) {
    console.error("generate-strategy error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
