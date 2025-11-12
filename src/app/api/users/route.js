import { connectDB } from "../../lib/db";
import User from "../../models/User";

export async function GET() {
  await connectDB();

  // Get total user count
  const total = await User.countDocuments();

  // In naye fields ko 'select' query mein shamil kiya gaya hai:
  // 'profileImage', 'skills', 'bio', 'hourlyRate', 'rating', 'reviewsCount'
  const fieldsToSelect = 
    "firstName lastName email city phone isVerified createdAt profileImage skills bio hourlyRate rating reviewsCount";
    
  const users = await User.find()
    // SAARE ZAROORI FIELDS SELECT KARNA:
    .select(fieldsToSelect) 
    .sort({ createdAt: -1 });

  return Response.json({
    totalUsers: total,
    users,
  });
}