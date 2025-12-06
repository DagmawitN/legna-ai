// app/api/detect-language/route.ts
import { NextResponse } from "next/server";
import { detectLanguageFromText } from "@/lib/gemini";

type Req = {
  text?: string;
};

export async function POST(req: Request) {
  try {
    const { text } = (await req.json()) as Req;
    if (!text) return NextResponse.json({ error: "text required" }, { status: 400 });

    const detected = await detectLanguageFromText(text);
    return NextResponse.json({ detected });
  } catch (err: any) {
    console.error("detect-language error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
