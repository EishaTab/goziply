import { verifyOtp } from "@/app/controllers/authController";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, otp } = await req.json();
  const result = await verifyOtp(email, otp);
  return NextResponse.json(result, { status: result.status });
}
