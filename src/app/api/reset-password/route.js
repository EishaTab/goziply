import { NextResponse } from "next/server";
import { resetPassword } from "@/app/controllers/authController";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Email, OTP and new password are required" },
        { status: 400 }
      );
    }

    const result = await resetPassword(email, otp, newPassword);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 400 }
      );
    }

    return NextResponse.json(
      { message: "Password reset successful!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("reset-password API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
