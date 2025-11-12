import { NextResponse } from "next/server";
import { verifyPasswordResetOtp } from "@/app/controllers/authController";

export async function POST(req) {
  const { email, otp } = await req.json();
  const result = await verifyPasswordResetOtp(email, otp);
  return NextResponse.json(result, { status: result.status });
}
