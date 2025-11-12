// components/ForgotPasswordForm.jsx
"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ResetPasswordForm from "@/app/components/auth/ResetPasswordForm";

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [devOtp, setDevOtp] = useState(null);
  const [GoTo, setGoTo] = useState(false)  
  const [ResetEmail, setResetEmail] = useState()
  const onSubmit = async (data) => {
    setResetEmail(data.email)
    setLoading(true);
    setMessage("");
    setDevOtp(null);

    try {
      const res = await fetch("/api/send-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessage(json.error || "Failed to request OTP");
        setLoading(false);
        return;
      }
      setMessage("✅ OTP saved to database. Check server console or use dev endpoint to retrieve it.");
      setGoTo(true)
      // dev helper: fetch OTP from dev endpoint (only available in development)
      if (process.env.NODE_ENV !== "production") {
        const q = `/api/dev/get-latest-otp?email=${encodeURIComponent(data.email)}`;
        const res2 = await fetch(q);
        if (res2.ok) {
          const j = await res2.json();
          setDevOtp(j.otp);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    GoTo == false ? <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 min-w-[70%]">
      <input
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: "Email is required" })}
        className="border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <button type="submit" disabled={loading} className="cursor-pointer transition-all bg-black rounded-full text-white py-2 mt-2 disabled:opacity-50">
        {loading ? "Sending..." : "Send Reset OTP"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
      {devOtp && (
        <p className="text-sm mt-2">DEV OTP (from DB): <b>{devOtp}</b> — use in Reset form</p>
      )}
    </form> : <ResetPasswordForm email={ResetEmail}/>
  );
}
