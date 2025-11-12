import { verifyOtp } from '@/app/controllers/authController';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    console.log('📝 OTP Verification API: Request received');
    
    const { email, otp } = req.body;

    // ✅ Validate required fields
    if (!email || !otp) {
      console.log('❌ OTP Verification: Missing email or OTP');
      return res.status(400).json({
        success: false,
        error: 'Email and OTP are required'
      });
    }

    console.log('🔧 OTP Verification: Processing for email:', email);
    
    const result = await verifyOtp(email, otp);
    
    console.log('📝 OTP Verification: Result status:', result.status);
    
    // ✅ FIX: Proper response handling
    if (result.ok) {
      return res.status(result.status || 200).json({
        success: true,
        ...result.data
      });
    } else {
      return res.status(result.status || 400).json({
        success: false,
        error: result.error,
        issues: result.issues || null
      });
    }
    
  } catch (err) {
    console.error('❌ OTP Verification API Error:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
}