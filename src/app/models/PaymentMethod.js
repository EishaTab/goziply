// /app/models/PaymentMethod.js
import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cardType: { type: String, enum: ["Visa", "Mastercard", "American Express", "Card"], required: true },
    last4: { type: String, required: true },
    expiry: { type: String, required: true }, // MM/YY
    holderName: { type: String, required: true },
    maskedNumber: { type: String, required: true }, // e.g., **** **** **** 1234
  },
  { timestamps: true }
);

const PaymentMethod =
  mongoose.models.PaymentMethod || mongoose.model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;
