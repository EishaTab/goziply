import User from '@/app/models/User';
import { connectDB } from '@/app/lib/db';

export async function POST(req) {
  try {
    await connectDB();
    const { userId, approve } = await req.json();

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        'identityVerification.status': approve ? 'approved' : 'rejected',
        'identityVerification.verifiedAt': approve ? new Date() : null,
        isVerified: approve,
      },
      { new: true }
    );

    return Response.json({ success: true, user: updated });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
