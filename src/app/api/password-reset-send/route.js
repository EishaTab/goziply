import { NextResponse } from "next/server";
import { sendPasswordResetOtp } from "@/app/controllers/authController";

export async function POST(req) {
  const { email } = await req.json();
  const result = await sendPasswordResetOtp(email);
  return NextResponse.json(result, { status: result.status });
}
