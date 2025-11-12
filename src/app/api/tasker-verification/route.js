import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, idType, idNumber, idImageFront, idImageBack } = await req.json();

    // save info and mark as pending
    const updated = await User.findByIdAndUpdate(
      userId,
      {
        "identityVerification.idType": idType,
        "identityVerification.idNumber": idNumber,
        "identityVerification.idImageFront": idImageFront,
        "identityVerification.idImageBack": idImageBack,
        "identityVerification.status": "pending",
        isVerified: false,
      },
      { new: true }
    );

    return Response.json({ success: true, user: updated });
  } catch (err) {
    console.error("Upload verification failed:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
