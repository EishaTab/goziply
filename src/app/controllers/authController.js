import bcrypt from 'bcrypt';
import User from '../models/User';
import PasswordReset from '../models/PasswordReset';
import { connectDB } from '../lib/db';
import { sendEmail } from '../api/utils/sendEmail';

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

  // ❌ ROLE VALIDATION REMOVE KAREIN - SAB TASKER HI HAIN

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
    console.log('🔧 Signup process started with data:', { 
      firstName: data.firstName,
      lastName: data.lastName, 
      email: data.email,
      password: '***' ,
      location: data.location
    });

    // ✅ Database connection
    try {
      console.log('🔄 Connecting to database...');
      await connectDB();
      console.log('✅ Database connected successfully');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError.message);
      return jsonErr('Database connection failed. Please try again.', 500);
    }

    const v = validateSignup(data);
    if (!v.valid) {
      console.log('❌ Validation failed:', v.issues);
      return jsonErr('Validation failed', 422, v.issues);
    }
    console.log('✅ Validation passed'), v;

    const { firstName, lastName, email, countryCode, phone, password, zipCode, location } = v.value;

    // ✅ Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('❌ User already exists with email:', email);
      return jsonErr('User already exists with this email.', 409);
    }
    console.log('✅ No existing user found');

    // ✅ Generate unique username
    let username = email.split('@')[0].toLowerCase().replace(/\W/g, '');
    let usernameExists = await User.findOne({ username });
    let counter = 1;
    
    while (usernameExists && counter <= 10) {
      username = `${email.split('@')[0].toLowerCase().replace(/\W/g, '')}${counter}`;
      usernameExists = await User.findOne({ username });
      counter++;
    }
    
    if (counter > 10) {
      username = `${email.split('@')[0].toLowerCase().replace(/\W/g, '')}${Date.now()}`;
    }
    
    console.log('✅ Username generated:', username);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    console.log('✅ Password hashed successfully');

    // ✅ TASKER-SPECIFIC SETTINGS WITH VERIFICATION
    const role = "tasker"; // ✅ SIRF TASKER
    const requiresVerification = true; // ✅ VERIFICATION REQUIRED
    const isVerified = false; // ✅ INITIALLY NOT VERIFIED
    
    let otp = null;
    let otpExpiresAt = null;

    if (requiresVerification) {
      otp = generateOtp();
      otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
      console.log('✅ OTP generated for verification:', otp);
    }

    // ✅ Create user
    let newUser;
    try {
      console.log('🔄 Creating TASKER in database...');
      
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        username: username.trim(),
        countryCode: countryCode.trim(),
        phone: phone.replace(/\D/g, '').trim(),
        // zipCode: zipCode.trim(),
        password: hashedPassword,
        role: role, // ✅ ALWAYS "tasker"
        isVerified: isVerified, // ✅ INITIALLY FALSE - VERIFICATION REQUIRED
        isApproved: false, // ✅ ADMIN APPROVAL PENDING
        otp: otp, // ✅ OTP FOR VERIFICATION
        otpExpiresAt: otpExpiresAt, // ✅ OTP EXPIRY
        location:data?.location,
        city:data?.location?.city || '',
        zipCode:data?.location?.zipCode ||  zipCode.trim(),

      };

      console.log('📝 TASKER data to save:', { 
        ...userData, 
        password: '***',
        role: userData.role,
        isVerified: userData.isVerified,
        otp: userData.otp
      });
      
      newUser = await User.create(userData);
      console.log('✅ TASKER created successfully with ID:', newUser._id.toString());
      
    } catch (createError) {
      console.error('❌ TASKER creation failed:', createError);
      
      // More specific error messages
      if (createError.code === 11000) {
        if (createError.keyPattern.email) {
          return jsonErr('Email already exists', 409);
        } else if (createError.keyPattern.username) {
          return jsonErr('Username already exists', 409);
        }
      }
      
      // Mongoose validation error
      if (createError.name === 'ValidationError') {
        const errors = Object.values(createError.errors).map(err => err.message);
        return jsonErr('Validation failed: ' + errors.join(', '), 422);
      }
      
      return jsonErr('TASKER creation failed. Please try again.', 500);
    }

    // ✅ SEND OTP EMAIL FOR VERIFICATION
    if (requiresVerification && otp) {
      const html = `
        <h2>Welcome to Genius - Tasker Verification</h2>
        <p>Your verification OTP is:</p>
        <h1 style="letter-spacing:4px;">${otp}</h1>
        <p>This code will expire in <b>${OTP_TTL_MINUTES} minutes</b>.</p>
        <p>Please verify your email to complete your tasker registration.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `;
      
      try {
        console.log('📧 Attempting to send OTP email to:', email);
        await sendEmail(email, 'Verify Your Tasker Account - Genius', html);
        console.log(`✅ OTP email sent successfully to ${email}`);
      } catch (emailErr) {
        console.error(`❌ Email send failed for ${email}:`, emailErr);
        // User ban gaya hai, but email nahi bhej paye
        return jsonOk({ 
          userId: newUser._id.toString(), 
          email, 
          username, 
          role: "tasker",
          isVerified: false,
          isApproved: false,
          emailSent: false,
          message: 'TASKER account created but OTP email failed. Please use resend OTP.'
        }, 201);
      }
    }

    console.log('🎉 TASKER Signup completed successfully - Verification Required');
    return jsonOk({ 
      userId: newUser._id.toString(), 
      email, 
      username, 
      role: "tasker",
      isVerified: false, // ✅ VERIFICATION PENDING
      isApproved: false,
      emailSent: true,
      message: 'TASKER account created successfully. Please check your email for verification OTP.'
    }, 201);

  } catch (err) {
    console.error('❌ signupUser error:', err);
    return jsonErr('TASKER signup failed. Please try again.', 500);
  }
}

export async function verifyOtp(email, otp) {
  try {
    console.log('🔧 OTP verification started for:', email);
    
    await connectDB();

    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) {
      console.log('❌ User not found for OTP verification:', email);
      return jsonErr('User not found', 404);
    }
    if (user.isVerified) {
      console.log('❌ User already verified:', email);
      return jsonErr('User already verified', 400);
    }
    if (!user.otp || user.otp !== otp.toString()) {
      console.log('❌ Invalid OTP for:', email, 'Expected:', user.otp, 'Got:', otp);
      return jsonErr('Invalid OTP', 400);
    }
    if (new Date() > user.otpExpiresAt) {
      console.log('❌ OTP expired for:', email);
      return jsonErr('OTP expired', 400);
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    console.log('✅ OTP verified successfully for:', email);
    return jsonOk({ 
      verified: true,
      message: 'Email verified successfully. You can now login.'
    });
  } catch (err) {
    console.error('❌ verifyOtp error:', err);
    return jsonErr('Verification failed.', 500);
  }
}

export async function resendOtp(email) {
  try {
    console.log('🔧 Resend OTP requested for:', email);
    
    await connectDB();

    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user) {
      console.log('❌ User not found for OTP resend:', email);
      return jsonErr("User not found", 404);
    }
    if (user.isVerified) {
      console.log('❌ User already verified:', email);
      return jsonErr("User already verified", 400);
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
    await user.save();

    console.log('✅ New OTP generated for:', email, 'OTP:', otp);

    // ✅ Send new OTP email
    const html = `
      <h2>Resent OTP Code - Tasker Verification</h2>
      <p>Your new verification code is:</p>
      <h1 style="letter-spacing:4px;">${otp}</h1>
      <p>This code will expire in <b>${OTP_TTL_MINUTES} minutes</b>.</p>
      <p>Please verify your email to complete your tasker registration.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;
    
    try {
      console.log('📧 Attempting to resend OTP email to:', email);
      await sendEmail(email, "Your New OTP Code - Genius Tasker", html);
      console.log('✅ Resend OTP email sent to:', email);
      return jsonOk({ 
        resendAfter: 60, 
        emailSent: true,
        message: 'New OTP sent to your email.'
      });
    } catch (emailErr) {
      console.error('❌ Resend OTP email failed:', emailErr);
      return jsonErr("OTP generated but email sending failed. Please try again.", 500);
    }

  } catch (err) {
    console.error("❌ resendOtp error:", err);
    return jsonErr("Could not resend OTP.", 500);
  }
}

// ---------- password reset flow ----------
export async function sendPasswordResetOtp(email) {
  try {
    console.log('🔧 Password reset OTP requested for:', email);
    
    await connectDB();

    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) {
      console.log('❌ User not found for password reset:', email);
      return jsonErr('User not found', 404);
    }
    if (!user.password || user.password === 'gauth') {
      console.log('❌ Google auth user tried password reset:', email);
      return jsonErr('Cannot reset password for Google-auth accounts', 400);
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_SEC * 1000);

    await PasswordReset.deleteMany({ email: user.email });
    await PasswordReset.create({ email: user.email, otp, otpExpiresAt });

    console.log('✅ Password reset OTP created for:', email, 'OTP:', otp);

    // ✅ Send reset OTP email
    const html = `
      <h2>Password Reset Request - Genius Tasker</h2>
      <p>Your reset code is:</p>
      <h1 style="letter-spacing:4px;">${otp}</h1>
      <p>This code will expire in <b>${Math.floor(PASSWORD_RESET_TTL_SEC / 60)} minutes</b>.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;
    
    try {
      console.log('📧 Attempting to send password reset email to:', email);
      await sendEmail(email, 'Password Reset OTP - Genius Tasker', html);
      console.log('✅ Password reset email sent to:', email);
      return jsonOk({ resendAfter: PASSWORD_RESET_TTL_SEC, alreadySent: false, emailSent: true });
    } catch (emailErr) {
      console.error('❌ Password reset email failed:', emailErr);
      return jsonErr('OTP generated but email sending failed. Please try again.', 500);
    }

  } catch (err) {
    console.error('❌ sendPasswordResetOtp error:', err);
    return jsonErr('Could not send reset OTP.', 500);
  }
}

export async function verifyPasswordResetOtp(email, otp) {
  try {
    console.log('🔧 Password reset OTP verification for:', email);
    
    await connectDB();

    const record = await PasswordReset.findOne({
      email: (email || '').toLowerCase(),
      otp: otp?.toString(),
    });

    if (!record) {
      console.log('❌ Invalid password reset OTP for:', email);
      return jsonErr('Invalid OTP', 400);
    }
    if (new Date() > record.otpExpiresAt) {
      console.log('❌ Password reset OTP expired for:', email);
      return jsonErr('OTP expired', 400);
    }

    console.log('✅ Password reset OTP verified for:', email);
    return jsonOk({ valid: true });
  } catch (err) {
    console.error('❌ verifyPasswordResetOtp error:', err);
    return jsonErr('Could not verify OTP.', 500);
  }
}

export async function resetPassword(email, otp, newPassword) {
  try {
    console.log('🔧 Password reset process for:', email);
    
    await connectDB();

    if (!strongPwRe.test(newPassword)) {
      console.log('❌ Weak password during reset');
      return jsonErr("Password must be 8+ chars with upper, lower, number, special", 422, [
        { field: "newPassword" },
      ]);
    }

    const resetRecord = await PasswordReset.findOne({
      email: (email || "").toLowerCase(),
      otp: otp.toString(),
    });
    
    if (!resetRecord) {
      console.log('❌ Invalid reset record for:', email);
      return jsonErr("Invalid or expired OTP", 400);
    }
    if (new Date() > resetRecord.otpExpiresAt) {
      console.log('❌ Reset OTP expired for:', email);
      return jsonErr("OTP expired", 400);
    }

    const user = await User.findOne({ email: resetRecord.email });
    if (!user) {
      console.log('❌ User not found during password reset:', email);
      return jsonErr("User not found", 404);
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      console.log('❌ Same password used during reset for:', email);
      return jsonErr("New password cannot be the same as the old one.", 400);
    }

    user.password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await user.save();
    await PasswordReset.deleteMany({ email: resetRecord.email });

    console.log('✅ Password reset successful for:', email);
    return jsonOk({ reset: true });
  } catch (err) {
    console.error("❌ resetPassword error:", err);
    return jsonErr("Could not reset password.", 500);
  }
}

// 💡 LOGIN FUNCTION - TASKER ONLY WITH VERIFICATION CHECK
export async function loginUser(email, password) {
  try {
    console.log('🔧 Login attempt for:', email);
    
    await connectDB();

    const user = await User.findOne({ email: (email || '').toLowerCase() });

    if (!user) {
      console.log('❌ Login failed - user not found:', email);
      return jsonErr('Invalid email or password', 401);
    }
    
    // ✅ ENSURE ONLY TASKERS CAN LOGIN
    if (user.role !== 'tasker') {
      console.log('❌ Login failed - not a tasker:', email, 'Role:', user.role);
      return jsonErr('Access denied. This login is for Taskers only.', 403);
    }
    
    // ✅ CHECK IF TASKER IS VERIFIED
    if (!user.isVerified) {
      console.log('❌ Login failed - tasker not verified:', email);
      return jsonErr('Please verify your email first to login.', 403, { 
        needsVerification: true 
      });
    }

    // Password Check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Login failed - wrong password for:', email);
      return jsonErr('Invalid email or password', 401);
    }

    console.log('✅ TASKER Login successful for:', email);
    return jsonOk({ 
      userId: user._id.toString(), 
      email: user.email,
      username: user.username,
      role: user.role,
      isApproved: user.isApproved
    });

  } catch (err) {
    console.error('❌ loginUser error:', err);
    return jsonErr('Login failed. Please try again.', 500);
  }
}