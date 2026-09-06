"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VISHA_SERVICES, VishaServiceItem } from "@/data/vishaServices";

const iconMap: Record<string, any> = {
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
};

export default function ServicesPreview() {
  const services: VishaServiceItem[] = VISHA_SERVICES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Update cards per view based on viewport width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Smooth auto-play carousel with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="py-16 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="services">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[hsl(195,100%,25%)]/8 text-[hsl(195,100%,25%)] text-xs font-semibold uppercase tracking-wider mb-3">
              Our Core Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(210,29%,24%)] tracking-tight">
              Technology & <span className="gradient-text">Talent Solutions</span>
            </h2>
            <p className="text-base sm:text-lg text-[hsl(207,14%,50%)] mt-3 leading-relaxed">
              Explore our specialized services tailored for modern enterprises, high-growth startups, and ambitious professionals.
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={prevSlide}
              aria-label="Previous service"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-200 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next service"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-200 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex transition-transform duration-700 ease-out gap-6 lg:gap-8"
            animate={{
              x: `-${currentIndex * (100 / cardsPerView)}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
          >
            {services.map((service) => {
              const IconComponent = iconMap[service.iconName] || Users;

              return (
                <div
                  key={service.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] flex-shrink-0 flex flex-col"
                >
                  <div className="group bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden">
                    {/* Realistic Corporate Cover Image */}
                    <div className="relative aspect-[4/3] sm:aspect-auto sm:h-56 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                      {/* Badge */}
                      {service.badge && (
                        <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[hsl(195,100%,25%)] shadow-sm">
                          {service.badge}
                        </span>
                      )}

                      {/* Floating Icon */}
                      <div className="absolute bottom-4 right-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md text-[hsl(195,100%,25%)] shadow-md flex items-center justify-center group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-colors duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold text-[hsl(210,29%,24%)] mb-2 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-sm text-[hsl(207,14%,50%)] mb-5 leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>

                      {/* Sub-services / Capabilities Highlights */}
                      <div className="mb-6 pt-4 border-t border-slate-100 flex-grow">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                          Core Capabilities
                        </p>
                        <ul className="space-y-2">
                          {service.subServices.slice(0, 4).map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(195,100%,35%)] shrink-0" />
                              <span className="truncate">{sub}</span>
                            </li>
                          ))}
                        </ul>
                        {service.subServices.length > 4 && (
                          <p className="text-[11px] font-semibold text-[hsl(195,100%,30%)] mt-2.5">
                            + {service.subServices.length - 4} more specialized offerings
                          </p>
                        )}
                      </div>

                      {/* Custom CTA button */}
                      <Link
                        href={`/services/${service.slug}`}
                        className="mt-auto flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-slate-50 border border-slate-200 text-[hsl(210,29%,24%)] text-sm font-semibold hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-300 group/btn shadow-2xs"
                      >
                        <span>{service.ctaText}</span>
                        <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-[hsl(195,100%,25%)]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
