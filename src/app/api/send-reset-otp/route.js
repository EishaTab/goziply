import { sendPasswordResetOtp } from "@/app/controllers/authController";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    const result = await sendPasswordResetOtp(email);

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : result.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-reset-otp error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
