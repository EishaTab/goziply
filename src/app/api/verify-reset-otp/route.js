import { verifyPasswordResetOtp } from "@/app/controllers/authController";
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    const result = await verifyPasswordResetOtp(email, otp);

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : result.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("verify-reset-otp error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
