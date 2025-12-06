// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReplyText, detectToneFromText } from "@/lib/gemini";

type ReqBody = {
  userId: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const { userId, message } = body;

    if (!userId || !message) {
      return NextResponse.json(
        { error: "userId and message are required." },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

    // Generate AI reply
    const replyText = await generateReplyText(message, user.preferredLanguage, ""); // tone empty, we detect it next

    // Detect tone from AI reply
    const toneResult = await detectToneFromText(replyText);
    const tone = toneResult.tone ?? "neutral"; // fallback

    return NextResponse.json({
      reply: replyText,
      tone,
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
