"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroTitles = [
  "Custom Software",
  "HRMS Platforms",
  "AI Development",
  "Healthcare IT",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % heroTitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-20 bg-black">
      {/* ── Background: hero image with crossfade (Abhivorn style) ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Visha IT Solutions"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay — matches Abhivorn's `sm:bg-black/10` + full gradient on mobile */}
        <div className="absolute inset-0 max-sm:bg-gradient-to-b max-sm:from-black/80 max-sm:via-black/40 max-sm:to-black/90 sm:bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:hidden" />
      </div>

      {/* ── Hero Content ───────────────────────────────────────── */}
      <div className="container relative z-10 w-full mt-10 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center relative"
        >
          {/* Text legibility glow blob (exact Abhivorn) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-4xl h-[160%] bg-black/60 blur-[100px] -z-10 rounded-[100%] pointer-events-none hidden sm:block" />

          {/* Glass pill badges (Abhivorn style) */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 flex-wrap">
            {[
              "99.8% Uptime",
              "200+ Projects",
              "MSME Registered",
            ].map((badge) => (
              <span key={badge} className="glass-pill">
                {badge}
              </span>
            ))}
          </div>

          {/* Main heading (Abhivorn: "Enterprise Grade" + cycling accent title) */}
          <h1 className="text-[8vw] sm:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-[1.1] drop-shadow-2xl">
            Enterprise Grade{" "}
            <br />
            <span className="text-white inline-block relative h-[1.2em] w-full max-w-[1000px] overflow-hidden align-bottom mt-1 sm:mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -60, opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex justify-center items-center text-[hsl(195,100%,50%)] drop-shadow-2xl whitespace-nowrap"
                >
                  {heroTitles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-xl max-w-2xl mx-auto text-white/90 font-medium leading-relaxed mb-8 sm:mb-10 px-4 sm:px-0">
            We build scalable web apps, HRMS platforms, AI tools, and enterprise solutions for startups and companies across India.
          </p>

          {/* CTA Buttons (Abhivorn: accent-bg primary + glass outline secondary) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-6 sm:px-0">
            <Link
              href="/services"
              className="btn-primary h-12 px-6 sm:h-14 sm:px-8 text-sm sm:text-base w-full sm:w-auto shadow-[0_0_30px_-10px_rgba(6,182,212,0.8)]"
            >
              Get Free Consultation <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/get-a-quote"
              className="btn-glass h-12 px-6 sm:h-14 sm:px-8 text-sm sm:text-base w-full sm:w-auto"
            >
              Book Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
