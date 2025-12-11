import bcrypt from 'bcrypt';
import User from '@/app/models/User';
import PasswordReset from '@/app/models/PasswordReset';
import { connectDB } from '@/app/lib/db';
import { sendEmail } from '@/app/api/utils/sendEmail'; // ✅ added import

// ---------- constants ----------
const OTP_TTL_MINUTES = 10;
const PASSWORD_RESET_TTL_SEC = 300;
const BCRYPT_ROUNDS = 12;

// ---------- helpers ----------
function jsonOk(data = {}, status = 200) {
  return { ok: true, status, data };
}
function jsonErr(message = 'Bad request', status = 400, issues = null) {
  return { ok: false, status, error: message, issues };
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ---------- NEW: Login Function (NO OTP) ----------
export async function loginUser(email, password) {
  try {
    await connectDB();

    const user = await User.findOne({ email: (email || '').toLowerCase() });

    if (!user) {
      return jsonErr('Invalid email or password', 401);
    }
    
    // IMPORTANT: NextAuth handles this check, but keeping it here for safety if you use a custom route
    if (!user.isVerified) {
        return jsonErr('Account is not verified. Please verify your email first.', 403, { 
            needsVerification: true 
        });
    }

    // 2. Password Check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return jsonErr('Invalid email or password', 401);
    }

    // 3. SUCCESS: Generate and return an Authentication Token (JWT)
    
    // ⚠️ REPLACE THIS LINE with your actual JWT token generation logic!
    const authToken = 'YOUR_GENERATED_JWT_TOKEN'; 

    console.log(`✅ User ${user.email} logged in successfully.`);
    return jsonOk({ 
        userId: user._id.toString(), 
        email: user.email,
        username: user.username,
        token: authToken, 
        // role: user.role, // Include role if available
    });

  } catch (err) {
    console.error('loginUser error:', err);
    return jsonErr('Login failed. Please try again.', 500);
  }
}
// ---------- End of NEW: Login Function ----------


// ---------- signup / verify ----------
function validateSignup(payload) {
  const issues = [];
  const req = (k) => (payload[k] ?? '').toString().trim();

  const firstName = req('firstName');
  const lastName = req('lastName');
  const email = req('email').toLowerCase();
  const countryCode = req('countryCode');
  const phone = req('phone').replace(/\D/g, '');
  const zipCode = req('zipCode').trim();
  const password = payload.password ?? '';

  if (!firstName) issues.push({ field: 'firstName', message: "First name can't be blank" });
  if (!lastName) issues.push({ field: 'lastName', message: "Last name can't be blank" });
  if (!emailRe.test(email)) issues.push({ field: 'email', message: 'Invalid email' });
  if (!countryCode) issues.push({ field: 'countryCode', message: 'Country is required' });
  if (!phone) issues.push({ field: 'phone', message: 'Phone is required' });
  if (!zipCode) issues.push({ field: 'zipCode', message: "Zip code can't be blank" });
  if (!strongPwRe.test(password)) {
    issues.push({
      field: 'password',
      message: 'Password must be 8+ chars with upper, lower, number, special',
    });
  }

  if (issues.length) return { valid: false, issues };
  return { valid: true, value: { firstName, lastName, email, countryCode, phone, zipCode, password } };
}

export async function signupUser(data) {
  try {
    await connectDB();

    const v = validateSignup(data);
    if (!v.valid) return jsonErr('Validation failed', 422, v.issues);

    const { firstName, lastName, email, countryCode, phone, password, zipCode } = v.value;

    const existing = await User.findOne({ email });
    if (existing) return jsonErr('User already exists with this email.', 409);

    // ✅ Generate unique username
    let username = email.split('@')[0].toLowerCase().replace(/\W/g, '');
    let usernameExists = await User.findOne({ username });
    let counter = 1;
    while (usernameExists) {
      username = `${username}${counter}`;
      usernameExists = await User.findOne({ username });
      counter++;
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      countryCode,
      phone,
      password: hashedPassword,
      zipCode,
      isVerified: false, // User requires verification
      otp,
      otpExpiresAt,
    });

    // ✅ Send OTP email via Gmail
    const html = `
      <h2>Welcome to Genius!</h2>
      <p>Your verification OTP is:</p>
      <h1 style="letter-spacing:4px;">${otp}</h1>
      <p>This code will expire in <b>${OTP_TTL_MINUTES} minutes</b>.</p>
    `;
    await sendEmail(email, 'Verify your account', html);

    return jsonOk({ userId: newUser._id.toString(), email, username }, 201);
  } catch (err) {
    console.error('signupUser error:', err);
    return jsonErr('Signup failed. Please try again.', 500);
  }
}

export async function verifyOtp(email, otp) {
  try {
    await connectDB();

    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) return jsonErr('User not found', 404);
    if (user.isVerified) return jsonErr('User already verified', 400);
    if (!user.otp || user.otp !== otp.toString()) return jsonErr('Invalid OTP', 400);
    if (new Date() > user.otpExpiresAt) return jsonErr('OTP expired', 400);

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return jsonOk({ verified: true });
  } catch (err) {
    console.error('verifyOtp error:', err);
    return jsonErr('Verification failed.', 500);
  }
}

export async function resendOtp(email) {
  try {
    await connectDB();

    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user) return jsonErr("User not found", 404);
    if (user.isVerified) return jsonErr("User already verified", 400);

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
    await user.save();

    // ✅ Send new OTP email
    const html = `
      <h2>Resent OTP Code</h2>
      <p>Your new verification code is:</p>
      <h1 style="letter-spacing:4px;">${otp}</h1>
      <p>This code will expire in <b>${OTP_TTL_MINUTES} minutes</b>.</p>
    `;
    await sendEmail(email, "Your New OTP Code", html);

    return jsonOk({ resendAfter: 60 });
  } catch (err) {
    console.error("resendOtp error:", err);
    return jsonErr("Could not resend OTP.", 500);
  }
}

// ---------- password reset flow ----------
export async function sendPasswordResetOtp(email) {
  try {
    await connectDB();

    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) return jsonErr('User not found', 404);
    if (!user.password || user.password === 'gauth') {
      return jsonErr('Cannot reset password for Google-auth accounts', 400);
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_SEC * 1000);

    await PasswordReset.deleteMany({ email: user.email });
    await PasswordReset.create({ email: user.email, otp, otpExpiresAt });

    // ✅ Send reset OTP email
    const html = `
      <h2>Password Reset Request</h2>
      <p>Your reset code is:</p>
      <h1 style="letter-spacing:4px;">${otp}</h1>
      <p>This code will expire in <b>${Math.floor(PASSWORD_RESET_TTL_SEC / 60)} minutes</b>.</p>
    `;
    await sendEmail(email, 'Password Reset OTP', html);

    return jsonOk({ resendAfter: PASSWORD_RESET_TTL_SEC, alreadySent: false });
  } catch (err) {
    console.error('sendPasswordResetOtp error:', err);
    return jsonErr('Could not send reset OTP.', 500);
  }
}

export async function verifyPasswordResetOtp(email, otp) {
  try {
    await connectDB();

    const record = await PasswordReset.findOne({
      email: (email || '').toLowerCase(),
      otp: otp?.toString(),
    });

    if (!record) return jsonErr('Invalid OTP', 400);
    if (new Date() > record.otpExpiresAt) return jsonErr('OTP expired', 400);

    return jsonOk({ valid: true });
  } catch (err) {
    console.error('verifyPasswordResetOtp error:', err);
    return jsonErr('Could not verify OTP.', 500);
  }
}

export async function resetPassword(email, otp, newPassword) {
  try {
    await connectDB();

    if (!strongPwRe.test(newPassword)) {
      return jsonErr("Password must be 8+ chars with upper, lower, number, special", 422, [
        { field: "newPassword" },
      ]);
    }

    const resetRecord = await PasswordReset.findOne({
      email: (email || "").toLowerCase(),
      otp: otp.toString(),
    });
    if (!resetRecord) return jsonErr("Invalid or expired OTP", 400);
    if (new Date() > resetRecord.otpExpiresAt) return jsonErr("OTP expired", 400);

    const user = await User.findOne({ email: resetRecord.email });
    if (!user) return jsonErr("User not found", 404);

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return jsonErr("New password cannot be the same as the old one.", 400);
    }

    user.password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await user.save();
    await PasswordReset.deleteMany({ email: resetRecord.email });

    return jsonOk({ reset: true });
  } catch (err) {
    console.error("resetPassword error:", err);
    return jsonErr("Could not reset password.", 500);
  }
}