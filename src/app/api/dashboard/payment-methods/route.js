import { connectDB } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import PaymentMethod from "@/app/models/PaymentMethod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const cards = await PaymentMethod.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ cards }, { status: 200 });
  } catch (err) {
    console.error("Fetch cards error:", err);
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { cardNumber, expiryDate, cardName } = await req.json();

    if (!cardNumber || !expiryDate || !cardName)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Store only masked info
    const last4 = cardNumber.slice(-4);
    const maskedNumber = `**** **** **** ${last4}`;

    const getCardType = (num) => {
      const n = num.replace(/\s/g, "");
      if (/^4/.test(n)) return "Visa";
      if (/^5[1-5]/.test(n)) return "Mastercard";
      if (/^3[47]/.test(n)) return "American Express";
      return "Card";
    };

    await connectDB();
    const card = await PaymentMethod.create({
      userId: session.user.id,
      cardType: getCardType(cardNumber),
      last4,
      expiry: expiryDate,
      holderName: cardName,
      maskedNumber,
    });

    return NextResponse.json({ card }, { status: 201 });
  } catch (err) {
    console.error("Add card error:", err);
    return NextResponse.json({ error: "Failed to add card" }, { status: 500 });
  }
}
