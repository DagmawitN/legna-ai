// app/api/generate-reply/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Body = {
  customerMessage?: string;
  language?: string;
  tone?: string;
};

const API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "gemini-pro";

async function generateReply(params: { customerMessage: string; language?: string; tone?: string }): Promise<string> {
  const { customerMessage, language = "English", tone = "professional" } = params;
  const client = new GoogleGenerativeAI(API_KEY!);
  const model = client.getGenerativeModel({ model: DEFAULT_MODEL });

  const prompt = `
You are a helpful customer support assistant. Read the customer's message and produce a concise ${tone} reply in ${language}.
Keep it short (1-3 sentences). Answer directly, and do not include extra commentary.

Customer message:
"""${customerMessage}"""
`;

  const result: any = await model.generateContent(prompt);
  const reply =
    result?.response?.text?.() ??
    result?.response?.text ??
    result?.candidates?.[0]?.content ??
    JSON.stringify(result);

  return String(reply).trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { customerMessage, language, tone } = body ?? {};

    if (!customerMessage) {
      return NextResponse.json({ error: "Provide 'customerMessage' in the request body." }, { status: 400 });
    }

    const reply = await generateReply({ customerMessage, language, tone });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("generate-reply error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
