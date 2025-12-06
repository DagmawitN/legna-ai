// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type ReqBody = {
  fullName?: string;
  email?: string;
  password?: string;
  preferredLanguage?: "Amharic" | "English" | "Oromigna" ;
  country?: string | null;
  businessType?: string | null;
};

const ALLOWED_LANGS = ["Amharic", "English", "Oromigna"] as const;

function isValidEmail(email: string) {
  // simple email regex (good for basic validation)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;

    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const preferredLanguage = body.preferredLanguage;
    const country = body.country?.trim() ?? null;
    const businessType = body.businessType?.trim() ?? null;

    // Basic validation
    if (!fullName || !email || !password || !preferredLanguage) {
      return NextResponse.json(
        { error: "fullName, email, password and preferredLanguage are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (!ALLOWED_LANGS.includes(preferredLanguage)) {
      return NextResponse.json({ error: "preferredLanguage is not allowed." }, { status: 400 });
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        preferredLanguage,
        country,
        businessType,
      },
    });

    // Return safe user object
    const safeUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      preferredLanguage: user.preferredLanguage,
      country: user.country,
      businessType: user.businessType,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ user: safeUser }, { status: 201 });
  } catch (err: any) {
    console.error("Registration error:", err);

    // Prisma unique constraint or other known errors
    if (err?.code === "P2002" && err?.meta?.target?.includes("email")) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
