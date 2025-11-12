"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import OtpVerificationForm from "@/app/components/auth/OtpVerificationForm";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (res.error) {
      if (
        res.error.toLowerCase().includes("not verified") ||
        res.error.toLowerCase().includes("please verify your email first")
      ) {
        // Store email for OTP verification
        setPendingEmail(data.email);
        setServerError("Please verify your email first");
      } else {
        setServerError(res.error);
      }
    } else {
      window.location.href = "/";
    }
  };

  // ✅ If user chooses "Verify Now", replace login with OTP form
  if (showVerifyOtp) {
    return (
      <div className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm text-gray-600">
          Enter the OTP sent to <b>{pendingEmail}</b>
        </p>
        <OtpVerificationForm email={pendingEmail} />
        <button
          onClick={() => setShowVerifyOtp(false)}
          className="text-blue-600 text-sm underline mt-2"
        >
          ← Back to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 min-w-[70%] pt-5"
      >
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className={`border p-2 rounded ${errors.email && "border-[#B70830]"}`}
        />
        {errors.email && (
          <p className="text-[#B70830] text-md">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={`border p-2 rounded ${errors.password && "border-[#B70830]"}`}
        />
        {errors.password && (
          <p className="text-[#B70830] text-md">{errors.password.message}</p>
        )}

        {/* Error Handling */}
        {serverError && (
          <div className="text-[#B70830] text-sm flex flex-col gap-2">
            {serverError}
            {serverError.toLowerCase().includes("please verify your email first") && (
              <button
                type="button"
                onClick={() => setShowVerifyOtp(true)}
                className="text-blue-600 cursor-pointer hover:underline text-sm self-start"
              >
                Verify Now →
              </button>
            )}
          </div>
        )}

        <Link
          href="/auth/reset-pass"
          className="font-bold cursor-pointer transition-all text-[black] hover:text-[#0a2a7a] text-start"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full transition-all cursor-pointer text-white py-2 mt-2 th-bg-black bg-black text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Google Sign-in */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex cursor-pointer justify-center items-center border rounded-lg p-2 gap-3 text-gray-700"
        >
          <img
            className="w-5 h-5"
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt=""
          />{" "}
          Continue with Google
        </button>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <Link
          href="/auth/signup"
          className="font-bold cursor-pointer transition-all text-[black] hover:text-[#0a2a7a]"
        >
          Create an account
        </Link>
      </div>
    </>
  );
}
