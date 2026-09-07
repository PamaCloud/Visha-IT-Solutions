"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowRight, RefreshCw, Compass, Sparkles } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const TOTAL_SECONDS = 30; // 30 seconds countdown
  const [countdown, setCountdown] = useState(TOTAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);

  // Hide global navbar/footer/floating widgets when 404 is active
  useEffect(() => {
    document.body.classList.add("not-found-active");
    return () => {
      document.body.classList.remove("not-found-active");
    };
  }, []);

  // Smooth auto-redirect countdown
  useEffect(() => {
    if (isPaused) return;

    if (countdown <= 0) {
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isPaused, router]);

  const progressPercent = Math.max(0, Math.min(100, ((TOTAL_SECONDS - countdown) / TOTAL_SECONDS) * 100));

  return (
    <div className="fixed inset-0 z-[999] min-h-screen w-full bg-[#f8fbfe] flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto selection:bg-[#00779e]/20">
      {/* Ambient background glow matching login theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-[#00b4d8]/15 via-[#0077b6]/8 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-[#0096c7]/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main 404 Floating Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_12px_45px_-10px_rgba(0,119,182,0.14)] border border-sky-100/90 p-8 sm:p-10 relative z-10 text-center flex flex-col items-center">
        
        {/* Brand Logo - Perfectly Centered */}
        <div className="relative w-44 h-12 mb-6 flex justify-center items-center">
          <Image
            src="/logo-dark.png"
            alt="Visha IT Solutions"
            fill
            sizes="176px"
            className="object-contain object-center"
            priority
          />
        </div>

        {/* Dynamic Loading Radar / Scanner Animation */}
        <div className="relative w-36 h-36 my-2 flex items-center justify-center">
          {/* Outer Rotating Glowing Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00b4d8] border-r-[#00779e] animate-[spin_3s_linear_infinite]" />
          
          {/* Middle Counter-Rotating Dashed Orbit */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-sky-200 border-t-[#0096c7] animate-[spin_6s_linear_infinite_reverse]" />
          
          {/* Glowing Ambient Radial Pulse */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-sky-100/60 to-cyan-50/80 animate-ping opacity-30" />
          
          {/* Core HUD Container */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-b from-white to-sky-50/80 border border-sky-200/80 shadow-inner flex flex-col items-center justify-center">
            {/* 404 Numbers with Brand Gradient */}
            <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-[#004f6e] via-[#00779e] to-[#00b4d8] bg-clip-text text-transparent">
              404
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] animate-ping" />
              <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">LOST</span>
            </div>
          </div>
        </div>

        {/* Loading Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mt-4 rounded-full bg-sky-50 border border-sky-100/80 text-[11px] font-semibold text-[#004f6e]">
          <RefreshCw size={12} className="text-[#00779e] animate-spin" />
          <span>Searching for requested destination...</span>
        </div>

        {/* Heading & Context */}
        <h1 className="text-2xl font-bold text-[#004f6e] tracking-tight mt-4">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
          The page or route you are attempting to access does not exist or may have been relocated.
        </p>

        {/* Auto-Redirect Progress Bar */}
        <div className="w-full mt-6 p-3.5 bg-sky-50/50 rounded-2xl border border-sky-100/70">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-2">
            <span className="flex items-center gap-1.5">
              <Compass size={12} className="text-[#00779e]" />
              Auto-redirecting to Home
            </span>
            <span className="font-semibold text-[#004f6e] font-mono">
              {`${countdown}s`}
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full h-1.5 bg-sky-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#004f6e] to-[#00b4d8] rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="mt-2 text-[10px] font-medium text-slate-400 hover:text-[#004f6e] transition-colors cursor-pointer inline-block"
          >
            {isPaused ? "▶ Resume auto-redirect" : "⏸ Pause auto-redirect"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5 mt-5">
          <Link
            href="/"
            className="w-full py-3 px-4 bg-gradient-to-r from-[#004f6e] via-[#006e94] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-[#00779e]/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/services"
            className="w-full py-2.5 px-4 bg-sky-50/60 hover:bg-sky-100/70 text-[#004f6e] border border-sky-200/60 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={13} className="text-[#00779e]" />
            <span>Explore Our Services</span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-7 text-center">
          <p className="text-[11px] text-slate-400">
            &copy; 2026 Visha IT Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
