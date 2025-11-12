import nodemailer from "nodemailer";

// Utility function for a cleaner delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ✅ Create transporter only once — reuse for all emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email safely via Gmail App Password.
 * Adds delay + retry to ensure first-time emails succeed.
 */
export async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: `"Genius Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    console.log("📨 Preparing to send email to:", to);

    // 💡 FIXED: Increased warm-up delay from 2s to 4s (fixes Gmail first-send lag)
    await delay(4000); 

    // Attempt to send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ EMAIL SENT SUCCESSFULLY!");
    console.log("📧 Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED!");
    console.error("Error message:", error.message);

    // Gmail-specific hint
    if (error.response && error.response.includes("5.7.8")) {
      console.error(
        "⚠️ Gmail 5.7.8 AUTH ERROR — use a valid Gmail App Password (not your normal Gmail password)."
      );
    }

    // Retry once automatically after short delay
    console.log("⏳ Retrying email send in 3 seconds...");
    await delay(3000); // 3-second delay before retry

    try {
      const retryInfo = await transporter.sendMail(mailOptions);
      console.log("✅ EMAIL SENT SUCCESSFULLY ON RETRY!");
      console.log("📧 Message ID:", retryInfo.messageId);
      return retryInfo;
    } catch (retryError) {
      console.error("❌ SECOND ATTEMPT FAILED:", retryError.message);
      console.error("Please verify your .env EMAIL_USER and EMAIL_PASS values.");
      throw retryError;
    }
  }
}