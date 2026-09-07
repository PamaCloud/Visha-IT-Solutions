"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useQuoteDialog } from "@/context/QuoteDialogContext";

interface HeroSlide {
  title: string;
  tagline: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Recruitment & Staffing",
    tagline: "Connecting high-growth enterprises with pre-vetted technical and non-technical talent across India.",
    image: "/services/recruitment-and-staffing.jpg",
    ctaText: "Hire Talent",
    ctaLink: "/services/recruitment-and-staffing",
    badge: "Staffing Solutions",
  },
  {
    title: "Talent Acquisition",
    tagline: "Strategic workforce planning, executive candidate screening, and long-term talent pipeline development.",
    image: "/services/talent-acquisition.jpg",
    ctaText: "Build Talent Pipeline",
    ctaLink: "/services/talent-acquisition",
    badge: "Strategic Hiring",
  },
  {
    title: "Payroll & HR Services",
    tagline: "Error-free payroll processing, automated salary management, and 100% compliant statutory HR operations.",
    image: "/services/payroll-and-hr-services.jpg",
    ctaText: "Get Payroll Support",
    ctaLink: "/services/payroll-and-hr-services",
    badge: "Compliant HR",
  },
  {
    title: "Digital Marketing",
    tagline: "Performance-focused SEO, high-ROI Google & Meta ad campaigns, and qualified inbound lead generation.",
    image: "/services/digital-marketing.jpg",
    ctaText: "Grow Your Business",
    ctaLink: "/services/digital-marketing",
    badge: "High Growth",
  },
  {
    title: "E-Commerce Solutions",
    tagline: "Custom headless storefronts, secure multi-currency payment gateways, and automated inventory workflows.",
    image: "/services/ecommerce-solutions.jpg",
    ctaText: "Build Online Store",
    ctaLink: "/services/ecommerce-solutions",
    badge: "Digital Commerce",
  },
  {
    title: "Training & Career Dev",
    tagline: "Industry-aligned IT training with real-time practical projects, resume building, and placement assistance.",
    image: "/services/training-and-career-development.jpg",
    ctaText: "Explore Training",
    ctaLink: "/training",
    badge: "Job-Ready Academy",
  },
];

export default function Hero() {
  const { openQuoteDialog } = useQuoteDialog();
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  // Continuously cycle through the 6 services like Abhivorn home
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = heroSlides[slideIndex];

  return (
    <section
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-24 bg-black"
    >
      {/* ── Background Cinematic Carousel with Slow Video-Like Motion ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.image}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{
              opacity: 1,
              scale: 1.08,
              transition: {
                opacity: { duration: 1.6, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" },
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1.4, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-105 contrast-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette & Ambient Overlays (Crystal Clear, High Contrast, No Murky Blurs) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/55 pointer-events-none" />
      </div>

      {/* ── Hero Content ───────────────────────────────────────── */}
      <div className="container relative z-10 w-full pt-4 sm:pt-0">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Subtle Ambient Glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-2xl h-[130%] bg-cyan-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

          {/* Single Refined Category Pill (No Button Clutter) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-cyan-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-5 sm:mb-6">
            <Sparkles size={13} className="text-cyan-400" />
            <span className="tracking-wide uppercase">{current.badge}</span>
          </div>

          {/* Main Headline with Clean Fast Crossfade (Zero Overlap) */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-4 sm:mb-6 leading-[1.15]">
            Enterprise Grade{" "}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-200">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="inline-block drop-shadow-[0_4px_30px_rgba(6,182,212,0.5)]"
                >
                  {current.title}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Dynamic Service Tagline with mode="wait" (Guarantees NO overlapping text) */}
          <div className="max-w-2xl mx-auto min-h-[4rem] sm:min-h-[3.5rem] flex items-center justify-center mb-8 sm:mb-10 px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.tagline}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
                className="text-sm sm:text-base lg:text-lg text-slate-200 font-light leading-relaxed text-center drop-shadow-md"
              >
                {current.tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Classic Refined CTA Actions (Proportionate, Not Heavy Slabs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto mb-8 sm:mb-10">
            <Link
              href={current.ctaLink}
              className="h-12 px-7 sm:h-13 sm:px-9 w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm sm:text-base shadow-[0_0_28px_rgba(6,182,212,0.45)] hover:shadow-[0_0_38px_rgba(6,182,212,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 inline-flex items-center justify-center gap-2 group/cta"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={() => openQuoteDialog("Consulting")}
              className="h-12 px-6 sm:h-13 sm:px-8 w-full sm:w-auto rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all cursor-pointer"
            >
              Book a Demo
            </button>
          </div>

          {/* Minimalist Editorial Trust Indicators (Elegant text line, NOT button pills) */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-white/60 font-medium tracking-wider uppercase pt-2">
            <span>99.8% Uptime</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>200+ Projects</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>MSME Registered</span>
          </div>
        </div>
      </div>
    </section>
  );
}