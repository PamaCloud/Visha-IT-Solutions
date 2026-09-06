"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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
      <div className="container relative z-10 w-full mt-6 sm:mt-0">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Subtle Ambient Glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-3xl h-[150%] bg-black/40 blur-[90px] -z-10 rounded-full pointer-events-none hidden sm:block" />

          {/* Glass Badges Strip */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
            <span className="glass-pill flex items-center gap-1.5 border-[hsl(190,100%,50%)]/40 text-white font-medium bg-black/40 backdrop-blur-md">
              <Sparkles size={13} className="text-[hsl(190,100%,50%)]" />
              {current.badge}
            </span>
            <span className="glass-pill bg-black/40 backdrop-blur-md">99.8% Uptime</span>
            <span className="glass-pill bg-black/40 backdrop-blur-md">200+ Projects</span>
            <span className="glass-pill bg-black/40 backdrop-blur-md">MSME Registered</span>
          </div>

          {/* Main Headline with Stable Synchronous Crossfade */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-[1.15] sm:leading-[1.1] tracking-tight drop-shadow-2xl px-2 sm:px-0">
            Enterprise Grade{" "}
            <br />
            <div className="relative min-h-[1.25em] flex items-center justify-center mt-1 sm:mt-2">
              <AnimatePresence>
                <motion.span
                  key={current.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="absolute inset-x-0 flex justify-center items-center text-[hsl(190,100%,48%)] drop-shadow-[0_4px_30px_rgba(6,182,212,0.55)] px-4"
                >
                  {current.title}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          {/* Dynamic Service Tagline */}
          <div className="min-h-[5.5rem] sm:min-h-[4rem] flex items-center justify-center mb-6 sm:mb-10 px-2 sm:px-4">
            <div className="relative w-full max-w-2xl min-h-[3rem] flex items-center justify-center">
              <AnimatePresence>
                <motion.p
                  key={current.tagline}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-x-0 text-sm sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed drop-shadow-lg text-center"
                >
                  {current.tagline}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0 mb-8 sm:mb-10">
            <Link
              href={current.ctaLink}
              className="btn-primary h-12 px-7 sm:h-14 sm:px-9 text-sm sm:text-base w-full sm:w-auto shadow-[0_0_35px_-8px_rgba(6,182,212,0.85)] inline-flex items-center justify-center gap-2 group/cta"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover/cta:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/get-a-quote"
              className="btn-glass h-12 px-7 sm:h-14 sm:px-9 text-sm sm:text-base w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border-white/25 text-white"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
