"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ResetPasswordForm({email}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
    let route = useRouter()
  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          otp: data.otp,
          newPassword: data.newPassword,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setMessage(json.error || "Password reset failed");
        setLoading(false);
        return;
      }

      setMessage("✅ Password reset successful! You can now log in.");
      route.push('/auth/login')
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 min-w-[70%]">
      <input
        type="email"
        value={email}
        disabled
        {...register("email", { required: "Email is required" })}
        className="border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        type="text"
        placeholder="Enter OTP"
        {...register("otp", { required: "OTP is required" })}
        className="border p-2 rounded"
      />
      {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

      <input
        type="password"
        placeholder="Enter new password"
        {...register("newPassword", { required: "New password is required" })}
        className="border p-2 rounded"
      />
      {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer transition-all bg-black rounded-full text-white py-2 mt-2 disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
