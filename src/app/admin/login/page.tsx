"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please check credentials.");
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fbfe] flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#00779e]/20">
      {/* Background ambient decorative glows matching website palette */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-[#00b4d8]/10 via-[#0077b6]/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-[0_12px_45px_-10px_rgba(0,119,182,0.12)] border border-sky-100/80 p-8 sm:p-10 relative z-10">
        
        {/* Brand Header: Perfectly Centered & Organised */}
        <div className="flex flex-col items-center text-center mb-7">
          {/* Centered Back Button */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-5 rounded-full text-xs font-medium text-slate-600 bg-sky-50/70 border border-sky-100 hover:bg-sky-100 hover:text-[#004f6e] transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft size={13} />
            Back to Website
          </button>

          {/* Centered Brand Logo */}
          <div className="relative w-44 h-12 mb-3">
            <Image
              src="/logo-dark.png"
              alt="Visha IT Solutions"
              fill
              sizes="176px"
              className="object-contain object-center"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-[#004f6e] tracking-tight mt-1">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to continue to Admin Dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl text-rose-600 text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-[#00779e]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#00779e]/70">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 bg-sky-50/40 border border-sky-200/70 focus:border-[#00779e] focus:bg-white focus:ring-2 focus:ring-[#00779e]/15 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password <span className="text-[#00779e]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#00779e]/70">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full pl-10 pr-10 py-2.5 bg-sky-50/40 border border-sky-200/70 focus:border-[#00779e] focus:bg-white focus:ring-2 focus:ring-[#00779e]/15 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#004f6e] transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck size={13} />
              Secured Session
            </span>
          </div>

          {/* Submit Button in Website's exact gradient theme */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-[#004f6e] via-[#006e94] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#00779e]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={17} />
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In To Dashboard"
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400">
            &copy; 2026 Visha IT Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
