// app/api/list-models/route.ts
import { NextResponse } from "next/server";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export async function GET() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not set in .env.local" }, { status: 500 });
  }

  try {
    const res = await fetch(`${API_URL}?key=${encodeURIComponent(key)}`, {
      method: "GET",
      headers: {
        // Gemini docs recommend x-goog-api-key header
        "x-goog-api-key": key,
        "Accept": "application/json",
      },
    });

    const text = await res.text();

    // Try to parse JSON safely, otherwise return raw text
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      json = { raw: text };
    }

    // Return both status and body so we can inspect issues
    return NextResponse.json({ status: res.status, statusText: res.statusText, body: json });
  } catch (err) {
    console.error("list-models (REST) error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
