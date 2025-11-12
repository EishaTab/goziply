import { signupUser } from '@/app/controllers/authController';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📝 API Route: Signup request received');
    
    const result = await signupUser(req.body);
    
    console.log('📝 API Route: Signup result:', result);
    
    // ✅ FIX: Proper response handling
    if (result.ok) {
      res.status(result.status || 200).json(result.data);
    } else {
      res.status(result.status || 400).json({
        error: result.error,
        issues: result.issues || null
      });
    }
  } catch (err) {
    console.error('❌ API Route Error:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message 
    });
  }
}