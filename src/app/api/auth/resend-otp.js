import { resendOtp } from '@/app/controllers/authControllerr';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;

  try {
    const result = await resendOtp(email);
    res.status(result.error ? 400 : 200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
