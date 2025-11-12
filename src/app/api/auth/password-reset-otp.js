import { sendPasswordResetOtp } from "@/app/controllers/authController";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;

  try {
    const result = await sendPasswordResetOtp(email);
    res.status(result.ok ? 200 : result.status).json(result);
  } catch (err) {
    console.error('send-reset-otp error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
