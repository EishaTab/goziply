import { connectDB } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import PaymentMethod from "@/app/models/PaymentMethod";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = params;

    const card = await PaymentMethod.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!card)
      return NextResponse.json({ error: "Card not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Card removed" });
  } catch (err) {
    console.error("Delete card error:", err);
    return NextResponse.json({ error: "Failed to delete card" }, { status: 500 });
  }
}
