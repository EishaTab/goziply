import { NextResponse } from "next/server";
import { resetPassword } from "@/app/controllers/authController";

export async function POST(req) {
  const { email, otp, newPassword } = await req.json();
  const result = await resetPassword(email, otp, newPassword);
  return NextResponse.json(result, { status: result.status });
}
