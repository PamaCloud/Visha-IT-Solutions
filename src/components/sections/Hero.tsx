"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto-play slide transition with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const current = heroSlides[slideIndex];

  return (
    <section
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-24 bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Carousel Images with Smooth Crossfade ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.image}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Dark Overlays for Ultra-Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/70" />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
      </div>

      {/* ── Hero Content ───────────────────────────────────────── */}
      <div className="container relative z-10 w-full mt-6 sm:mt-0">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Subtle Glow Blob behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] max-w-4xl h-[170%] bg-black/60 blur-[110px] -z-10 rounded-full pointer-events-none hidden sm:block" />

          {/* Glass Badges Strip */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
            <span className="glass-pill flex items-center gap-1.5 border-[hsl(190,100%,50%)]/30 text-white font-medium">
              <Sparkles size={13} className="text-[hsl(190,100%,50%)]" />
              {current.badge}
            </span>
            <span className="glass-pill">99.8% Uptime</span>
            <span className="glass-pill">200+ Projects</span>
            <span className="glass-pill">MSME Registered</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
            Enterprise Grade{" "}
            <br />
            <span className="text-white inline-block relative h-[1.25em] w-full max-w-[1000px] overflow-hidden align-bottom mt-1 sm:mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.title}
                  initial={{ y: 50, opacity: 0, filter: "blur(12px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -50, opacity: 0, filter: "blur(12px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex justify-center items-center text-[hsl(190,100%,48%)] drop-shadow-[0_4px_24px_rgba(6,182,212,0.4)] whitespace-nowrap"
                >
                  {current.title}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Dynamic Service Tagline */}
          <div className="min-h-[4rem] flex items-center justify-center mb-8 sm:mb-10 px-4 sm:px-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.tagline}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="text-base sm:text-xl max-w-2xl mx-auto text-white/90 font-light leading-relaxed drop-shadow-md"
              >
                {current.tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-6 sm:px-0 mb-10">
            <Link
              href={current.ctaLink}
              className="btn-primary h-12 px-7 sm:h-14 sm:px-9 text-sm sm:text-base w-full sm:w-auto shadow-[0_0_30px_-10px_rgba(6,182,212,0.8)] inline-flex items-center justify-center gap-2 group/cta"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover/cta:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/get-a-quote"
              className="btn-glass h-12 px-7 sm:h-14 sm:px-9 text-sm sm:text-base w-full sm:w-auto inline-flex items-center justify-center"
            >
              Book a Demo
            </Link>
          </div>

          {/* Slide Indicator Bar & Navigation Controls */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2 px-2">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.title}
                  onClick={() => setSlideIndex(idx)}
                  aria-label={`Go to slide: ${slide.title}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    slideIndex === idx
                      ? "w-8 bg-[hsl(190,100%,48%)] shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
