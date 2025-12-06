// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { detectToneFromText, generateReplyText } from "@/lib/gemini";

type ReqBody = {
  userId: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const { userId, message } = body;

    if (!userId || !message) {
      return NextResponse.json({ error: "userId and message are required" }, { status: 400 });
    }

    // Fetch user for language preference
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Detect tone using Gemini AI
    const toneResult = await detectToneFromText(message);
    const tone = toneResult.tone || "neutral"; // fallback if AI fails

    // Generate a realistic reply with Gemini
    const replyText = await generateReplyText(message, user.preferredLanguage, tone);

    return NextResponse.json({
      reply: replyText,
      tone,
    });
  } catch (err: any) {
    console.error("AI chat error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
