import { resetPassword } from '@/app/controllers/authController';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, otp, newPassword } = req.body;

  try {
    const result = await resetPassword(email, otp, newPassword);
    res.status(result.error ? 400 : 200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
