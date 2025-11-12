"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function OtpVerificationForm({ email = "" }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Warn if email is missing
  useEffect(() => {
    if (!email) {
      console.warn("⚠️ OtpVerificationForm: 'email' prop is missing.");
    }
  }, [email]);

  // countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((sec) => sec - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const onSubmit = async (data) => {
    if (!email) {
      setServerError("Email is required for OTP verification.");
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: data.otp }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "OTP verification failed");
      } else {
        alert("OTP verified successfully ✅");
        window.location.href = "/auth/login";
      }
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setServerError("Email is required to resend OTP.");
      return;
    }

    try {
      const res = await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.issues && result.issues[0]?.secondsLeft) {
          setCooldown(result.issues[0].secondsLeft); // use backend response
        }
        setServerError(result.error || "Failed to resend OTP");
      } else {
        setCooldown(result.data?.resendAfter || 60);
      }
    } catch (err) {
      console.error(err);
      setServerError("Could not resend OTP");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 min-w-[70%]">
      <input
        type="text"
        placeholder="Enter OTP"
        {...register("otp", { required: "OTP is required" })}
        className="border p-2 rounded"
      />
      {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer transition-all th-bg-5 rounded-full text-white py-2 mt-2"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <button
        type="button"
        onClick={handleResend}
        disabled={cooldown > 0}
        className={`rounded-full py-2 px-4 mt-2 border ${
          cooldown > 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
      >
        {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
      </button>
    </form>
  );
}
