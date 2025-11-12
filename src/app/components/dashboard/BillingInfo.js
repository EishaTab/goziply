"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, ShieldAlert, PlusCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Utility Functions ---

const isValidLuhn = (value) => {
  const cardNumber = value.replace(/\s/g, "");
  if (!/^\d+$/.test(cardNumber) || cardNumber.length < 13) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const isFutureDate = (value) => {
  const [month, year] = value.split("/");
  if (!month || !year || year.length !== 2) return false;
  const expiryDate = new Date(`20${year}`, month - 1);
  const now = new Date();
  now.setDate(1);
  now.setMonth(now.getMonth() + 1);
  now.setDate(0);
  return expiryDate > now;
};

const getCardType = (cardNumber) => {
  const num = cardNumber.replace(/\s/g, "");
  if (/^4/.test(num)) return "Visa";
  if (/^5[1-5]/.test(num)) return "Mastercard";
  if (/^3[47]/.test(num)) return "American Express";
  return "Card";
};

// --- Card Brand Icon ---
const CardBrandIcon = ({ type }) => {
  const icons = {
    Visa: "/visa.png",
    Mastercard: "/master.png",
    "American Express": "/express.png",
  };
  const sizes = {
    Visa: "h-6 w-auto",
    Mastercard: "h-8 w-auto",
    "American Express": "h-10 w-auto",
  };

  const src = icons[type];
  const size = sizes[type] || "h-8 w-auto";

  if (src)
    return (
      <img
        src={src}
        alt={`${type} logo`}
        className={`${size} object-contain`}
      />
    );
  return <CreditCard className={`${size} text-slate-400`} />;
};

// --- Main Component ---
export default function BillingInfo() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  // ✅ Fetch existing cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/dashboard/payment-methods");
        const data = await res.json();
        if (res.ok) setCards(data.cards);
      } catch (err) {
        console.error("Error loading cards:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // ✅ Save a new card
  const handleSaveCard = async (details) => {
    try {
      const res = await fetch("/api/dashboard/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();

      if (res.ok) {
        setCards((prev) => [data.card, ...prev]);
        setShowAddCardForm(false);
      } else {
        alert(data.error || "Failed to add card");
      }
    } catch (err) {
      console.error("Add card error:", err);
    }
  };

  // ✅ Remove card
  const handleRemoveCard = async (id) => {
    try {
      const res = await fetch(`/api/dashboard/payment-methods/${id}`, {
        method: "DELETE",
      });

      if (res.ok) setCards(cards.filter((c) => c._id !== id));
      else alert("Failed to delete card");
    } catch (err) {
      console.error("Delete card error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700">
          Payment Methods
        </h3>
        <button
          onClick={() => setShowAddCardForm(!showAddCardForm)}
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
        >
          <PlusCircle size={16} />
          {showAddCardForm ? "Cancel" : "Add New Card"}
        </button>
      </div>

      {/* --- Add Card Form --- */}
      <AnimatePresence>
        {showAddCardForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mb-6"
          >
            <CreditCardForm onSave={handleSaveCard} />
          </motion.div>
        )}
      </AnimatePresence>

      <hr className="border-slate-200 mb-4" />

      {/* --- Card List --- */}
      {loading ? (
        <p className="text-slate-500 text-sm">Loading cards...</p>
      ) : cards.length === 0 ? (
        <p className="text-slate-500 text-sm">No saved payment methods.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {cards.map((card) => (
            <li
              key={card._id}
              className="flex justify-between items-center py-3 group"
            >
              <div className="flex items-center gap-4">
                <CardBrandIcon type={card.cardType} />
                <div>
                  <p className="font-medium text-slate-700">
                    {card.cardType} ending in {card.last4}
                  </p>
                  <p className="text-sm text-slate-500">
                    Expires {card.expiry}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveCard(card._id)}
                className="text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- Credit Card Form Component ---
function CreditCardForm({ onSave }) {
  const { register, handleSubmit, formState, watch, setValue } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;
  const watched = watch();
  const [isFlipped, setIsFlipped] = useState(false);

  const cardType = useMemo(
    () => getCardType(watched.cardNumber || ""),
    [watched.cardNumber]
  );

  const onSubmit = (data) => onSave(data);

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Card Preview --- */}
        <div
          className="w-full lg:w-1/2 flex justify-center items-center"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative w-full max-w-sm h-52 transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute w-full h-full rounded-xl text-white shadow-lg"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="/card.jpg"
                alt="Card Front"
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-0 left-0 w-full h-full p-5 flex flex-col justify-between">
                <div className="flex justify-end">
                  {cardType && <CardBrandIcon type={cardType} />}
                </div>
                <p className="text-xl font-mono tracking-widest">
                  {watched.cardNumber || "XXXX XXXX XXXX XXXX"}
                </p>
                <div className="flex justify-between items-end">
                  <p className="uppercase text-sm">
                    {watched.cardName || "CARDHOLDER NAME"}
                  </p>
                  <p>{watched.expiryDate || "MM/YY"}</p>
                </div>
              </div>
            </div>
            {/* Back */}
            <div
              className="absolute w-full h-full rounded-xl shadow-lg"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <img
                src="/card.jpg"
                alt="Card Back"
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-8 left-0 w-full h-10 bg-black"></div>
              <div className="absolute top-24 right-4 text-right">
                <p className="text-white text-xs mb-1">Security Code</p>
                <div className="flex items-center justify-end h-8 w-28 bg-white rounded">
                  <p className="text-black font-mono tracking-widest pr-2">
                    {watched.cvv}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Form Inputs --- */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-1/2 space-y-3"
        >
          {/* Card Number */}
          <div>
            <label className="text-slate-600 font-medium text-sm block mb-1">
              Card Number
            </label>
            <input
              {...register("cardNumber", {
                required: "Card number is required",
                validate: (v) => isValidLuhn(v) || "Invalid card number",
                onChange: (e) => {
                  const formatted = e.target.value
                    .replace(/\D/g, "")
                    .replace(/(.{4})/g, "$1 ")
                    .trim();
                  setValue("cardNumber", formatted, { shouldValidate: true });
                },
              })}
              maxLength="19"
              className={`w-full p-2 border rounded-md text-sm ${
                errors.cardNumber ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <ShieldAlert size={12} /> {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="text-slate-600 font-medium text-sm block mb-1">
              Cardholder Name
            </label>
            <input
              {...register("cardName", { required: "Cardholder name is required" })}
              className={`w-full p-2 border rounded-md text-sm ${
                errors.cardName ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.cardName && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <ShieldAlert size={12} /> {errors.cardName.message}
              </p>
            )}
          </div>

          {/* Expiry + CVV */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-slate-600 font-medium text-sm block mb-1">
                Expiry Date
              </label>
              <input
                {...register("expiryDate", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Invalid format (MM/YY)",
                  },
                  validate: (v) => isFutureDate(v) || "Card has expired",
                  onChange: (e) => {
                    const formatted = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{2})(\d{0,2})/, "$1/$2");
                    setValue("expiryDate", formatted, { shouldValidate: true });
                  },
                })}
                maxLength="5"
                placeholder="MM/YY"
                className={`w-full p-2 border rounded-md text-sm ${
                  errors.expiryDate ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <ShieldAlert size={12} /> {errors.expiryDate.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="text-slate-600 font-medium text-sm block mb-1">
                CVV
              </label>
              <input
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: { value: /^\d{3,4}$/, message: "Invalid CVV" },
                })}
                maxLength="4"
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                className={`w-full p-2 border rounded-md text-sm ${
                  errors.cvv ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <ShieldAlert size={12} /> {errors.cvv.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 transition"
          >
            Save Card
          </button>
        </form>
      </div>
    </div>
  );
}
