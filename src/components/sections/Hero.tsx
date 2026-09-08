"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Megaphone,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useQuoteDialog } from "@/context/QuoteDialogContext";

interface HeroSlide {
  id: string;
  badge: string;
  serviceName: string;
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "ecommerce",
    badge: "Digital Commerce",
    serviceName: "E-Commerce Solutions",
    image: "/services/ecommerce-daylight.jpg",
  },
  {
    id: "marketing",
    badge: "High Growth",
    serviceName: "Digital Marketing",
    image: "/services/digital-marketing-daylight.jpg",
  },
  {
    id: "recruitment",
    badge: "Talent & Staffing",
    serviceName: "Recruitment Services",
    image: "/services/recruitment-daylight.jpg",
  },
  {
    id: "training",
    badge: "Tech Academy",
    serviceName: "Training & Development",
    image: "/services/training-daylight.jpg",
  },
];

interface ServiceCardItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: typeof ShoppingCart;
  iconColor: string;
  slideIdx: number;
}

const serviceCards: ServiceCardItem[] = [
  {
    id: "ecommerce",
    title: "E-Commerce",
    subtitle: "Solutions",
    href: "/services/ecommerce-solutions",
    icon: ShoppingCart,
    iconColor: "text-[#0d5cd9]",
    slideIdx: 0,
  },
  {
    id: "marketing",
    title: "Digital",
    subtitle: "Marketing",
    href: "/services/digital-marketing",
    icon: Megaphone,
    iconColor: "text-[#16a34a]",
    slideIdx: 1,
  },
  {
    id: "recruitment",
    title: "Recruitment",
    subtitle: "Services",
    href: "/services/recruitment-and-staffing",
    icon: Users,
    iconColor: "text-[#7c3aed]",
    slideIdx: 2,
  },
  {
    id: "training",
    title: "Training &",
    subtitle: "Development",
    href: "/training",
    icon: GraduationCap,
    iconColor: "text-[#ea580c]",
    slideIdx: 3,
  },
];

const SLIDE_DURATION = 4500;

export default function Hero() {
  const { openQuoteDialog } = useQuoteDialog();
  const [slideIndex, setSlideIndex] = useState(0);

  // Unconditional continuous auto-cycling carousel (4.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[slideIndex];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════════
          MOBILE VERSION (< lg): Matching Image 4 (Classic, Clean, Deep Navy Glass)
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="lg:hidden relative w-full min-h-[580px] sm:min-h-[620px] flex items-center justify-center overflow-hidden pt-24 pb-12 px-4 sm:px-6">
        {/* Mobile Background Carousel with Deep Navy Glass Overlay (identical to Image 4 About Hero) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={current.image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: 1,
                scale: 1.12,
                transition: {
                  opacity: { duration: 1.0, ease: "easeInOut" },
                  scale: { duration: 6.5, ease: "linear" },
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.serviceName}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Deep Navy Glassy Overlay matching Image 4 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/92 via-[#0d223f]/82 to-[#0a192f]/95 backdrop-blur-[1.5px]" />
        </div>

        {/* Mobile Content Container */}
        <div className="relative z-10 w-full max-w-lg mx-auto text-center flex flex-col items-center">
          {/* Active Service Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sky-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-4 border border-white/15 shadow-sm">
            <Sparkles size={13} className="text-sky-300 animate-pulse" />
            <AnimatePresence mode="wait">
              <motion.span
                key={current.badge}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {current.badge} • {current.serviceName}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Headline: Clean, Centered, High Legibility */}
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.14] mb-3.5 drop-shadow-md">
            Technology. Talent.{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Solutions.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed font-normal max-w-md mb-6">
            Visha IT Solutions empowers businesses with scalable{" "}
            <strong className="font-semibold text-white">E-Commerce</strong>,{" "}
            high-growth{" "}
            <strong className="font-semibold text-white">Digital Marketing</strong>,{" "}
            top <strong className="font-semibold text-white">Talent</strong>, and career-focused{" "}
            <strong className="font-semibold text-white">Training</strong>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm mb-6">
            <button
              type="button"
              onClick={() => openQuoteDialog("General Quote")}
              className="h-11.5 px-6 rounded-xl bg-[#0d5cd9] hover:bg-[#0b4eb8] text-white font-bold text-sm shadow-[0_4px_16px_rgba(13,92,217,0.45)] active:scale-95 transition-all duration-200 cursor-pointer text-center flex items-center justify-center"
            >
              Get a Project Quote
            </button>

            <Link
              href="/services"
              className="h-11.5 px-6 rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all duration-200 inline-flex items-center justify-center gap-1.5 active:scale-95 text-center"
            >
              <span>Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Compact 4-Service Navigation Chips (Neat, app-like, zero clutter) */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {serviceCards.map((card, idx) => {
              const IconComponent = card.icon;
              const isActive = slideIndex === idx;

              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white/20 border-sky-400 text-white shadow-[0_0_12px_rgba(56,189,248,0.35)] scale-[1.02]"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-sky-500/30 text-sky-200" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate leading-tight">
                      {card.title}
                    </span>
                    <span className="text-[10px] text-sky-200/70 truncate leading-none mt-0.5">
                      {card.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          DESKTOP VERSION (lg+): Crisp Split View with Daylight Photo & Floating Cards
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="hidden lg:flex relative w-full bg-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 min-h-[85vh] lg:min-h-[88vh] items-center border-b border-slate-100">
        {/* Background Video-Like Carousel */}
        <div className="absolute top-0 right-0 bottom-0 w-[58%] xl:w-[60%] z-0 overflow-hidden pointer-events-none">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={current.image}
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{
                opacity: 1,
                scale: 1.08,
                transition: {
                  opacity: { duration: 1.1, ease: "easeInOut" },
                  scale: { duration: 7.0, ease: "linear" },
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.9, ease: "easeInOut" },
              }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.serviceName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center brightness-[1.02] contrast-[1.02]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Narrow 24px edge feather seam */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        </div>

        <div className="container relative z-10 w-full">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Column: Bold Typography */}
            <div className="col-span-7 pr-6 pt-4 lg:pt-10">
              {/* Active Service Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/95 border border-blue-200/80 text-[#0d5cd9] text-xs font-semibold shadow-xs mb-5 sm:mb-6">
                <Sparkles size={13} className="text-[#0d5cd9]" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.badge}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="tracking-wider uppercase text-xs"
                  >
                    {current.badge} • {current.serviceName}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl lg:text-[62px] xl:text-[68px] font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
                Technology.
                <br />
                Talent.
                <br />
                <span className="text-[#0d5cd9]">Solutions.</span>
              </h1>

              {/* Short Company Description */}
              <p className="text-lg lg:text-[19px] text-slate-700 font-normal leading-relaxed max-w-xl mb-9">
                Visha IT Solutions helps businesses grow with powerful{" "}
                <strong className="font-semibold text-slate-900">E-Commerce solutions</strong>,{" "}
                result-driven{" "}
                <strong className="font-semibold text-slate-900">Digital Marketing</strong>,{" "}
                right <strong className="font-semibold text-slate-900">Talent</strong> through Recruitment, and career-focused{" "}
                <strong className="font-semibold text-slate-900">Training</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => openQuoteDialog("General Quote")}
                  className="h-13 px-8 rounded-xl bg-[#0d5cd9] hover:bg-[#0b4eb8] text-white font-semibold text-base shadow-[0_4px_14px_rgba(13,92,217,0.35)] hover:shadow-[0_6px_20px_rgba(13,92,217,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-center"
                >
                  Get a Project Quote
                </button>

                <Link
                  href="/services"
                  className="h-13 px-8 rounded-xl border-2 border-[#0d5cd9] text-[#0d5cd9] bg-white hover:bg-blue-50/60 font-semibold text-base transition-all duration-200 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center group"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Interactive Floating Service Cards */}
            <div className="col-span-5 flex flex-col items-end justify-center pt-8">
              <div className="grid grid-cols-1 gap-3.5 w-full max-w-[295px]">
                {serviceCards.map((card, idx) => {
                  const IconComponent = card.icon;
                  const isActive = slideIndex === idx;

                  return (
                    <button
                      key={card.title}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      className={`relative text-left group bg-white/95 backdrop-blur-md rounded-2xl p-4.5 px-6 border transition-all duration-300 flex items-center gap-4 cursor-pointer overflow-hidden ${
                        isActive
                          ? "border-[#0d5cd9] shadow-[0_12px_28px_rgba(13,92,217,0.18)] scale-[1.02] ring-2 ring-[#0d5cd9]/20"
                          : "border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.14)] hover:border-blue-300 hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Active left indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCardIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0d5cd9]"
                        />
                      )}

                      {/* Icon container */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                          isActive
                            ? "bg-blue-50 border border-blue-100 scale-105"
                            : "bg-slate-50 border border-slate-100 group-hover:scale-105"
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${card.iconColor}`}
                          strokeWidth={2.2}
                        />
                      </div>

                      {/* Card Title & Subtitle */}
                      <div className="flex flex-col">
                        <span
                          className={`text-base font-bold transition-colors leading-tight ${
                            isActive
                              ? "text-[#0d5cd9]"
                              : "text-slate-900 group-hover:text-[#0d5cd9]"
                          }`}
                        >
                          {card.title}
                        </span>
                        <span className="text-[13px] font-medium text-slate-500 leading-tight mt-0.5">
                          {card.subtitle}
                        </span>
                      </div>

                      {/* Arrow indicator */}
                      <div
                        className={`ml-auto transition-all ${
                          isActive
                            ? "opacity-100 translate-x-0 text-[#0d5cd9]"
                            : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400"
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
