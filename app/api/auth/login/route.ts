// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import  {prisma } from "@/lib/prisma";

type ReqBody = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not defined in .env");
    }

    const payload = { id: user.id, email: user.email };
    const options: SignOptions = { expiresIn: "1h" };

    const token = jwt.sign(payload, secret, options);

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        preferredLanguage: user.preferredLanguage,
        country: user.country,
        businessType: user.businessType,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
