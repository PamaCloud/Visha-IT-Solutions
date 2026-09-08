"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Target,
  Workflow,
  Rocket,
  Compass,
  ArrowRight,
  Code2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Cpu,
  Database,
  Users,
  Briefcase,
  FileCheck,
  Headphones,
  Award,
  Layers,
  Sparkles,
  UserCheck,
  Clock,
  Lock,
  Smartphone,
  Search,
  ShoppingCart,
  GraduationCap,
} from "lucide-react";
import { VishaServiceItem } from "@/data/vishaServices";

const iconMap: Record<string, any> = {
  Code2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Cpu,
  Database,
  Users,
  Briefcase,
  FileCheck,
  Headphones,
  Award,
  Layers,
  UserCheck,
  Clock,
  Lock,
  Smartphone,
  Search,
  ShoppingCart,
  GraduationCap,
  CheckCircle2,
};

export default function ServiceDetailView({ service }: { service: VishaServiceItem }) {
  const [activeTab, setActiveTab] = useState(0);

  const deliverables = service.deliverables && service.deliverables.length > 0
    ? service.deliverables
    : [
        {
          title: "Enterprise Solutions",
          description: `Comprehensive ${service.title} designed to meet modern corporate standards.`,
          points: [
            "Tailored Enterprise Execution",
            "Full Statutory Compliance",
            "24/7 Dedicated Support",
            "Guaranteed Service Delivery",
          ],
        },
      ];

  const benefits = service.benefits && service.benefits.length > 0
    ? service.benefits
    : [
        {
          title: "Tailored to Your Business",
          description: `Bespoke ${service.title.toLowerCase()} that matches your exact organizational workflows.`,
          iconName: "Zap",
        },
      ];

  const steps = service.steps && service.steps.length > 0
    ? service.steps
    : [
        {
          step: "01",
          title: "Strategic Discovery",
          description: "We analyze your business goals, technical requirements, and objectives to build a customized roadmap.",
        },
        {
          step: "02",
          title: "Tailored Execution",
          description: "Our dedicated specialists execute with industry best practices, compliance, and continuous updates.",
        },
        {
          step: "03",
          title: "Delivery & Continuous Support",
          description: "We deliver measurable results and provide ongoing proactive support to help your organization grow.",
        },
      ];

  const activeDeliverable = deliverables[activeTab] || deliverables[0];

  // Split title for 2-tone visual effect
  const titleWords = service.title.split(" ");
  const firstPart = titleWords.slice(0, -1).join(" ") || titleWords[0];
  const lastPart = titleWords.length > 1 ? titleWords[titleWords.length - 1] : "";

  const defaultServiceImages: Record<string, string> = {
    "recruitment-and-staffing": "/services/recruitment-and-staffing.jpg",
    "talent-acquisition": "/services/talent-acquisition.jpg",
    "payroll-and-hr-services": "/services/payroll-and-hr-services.jpg",
    "digital-marketing": "/services/digital-marketing.jpg",
    "ecommerce-solutions": "/services/e-commerce-solutions.jpg",
    "training-and-career-development": "/services/training-and-career-development.jpg",
  };

  const safeImage =
    service.image && typeof service.image === "string" && service.image.trim() !== ""
      ? service.image
      : defaultServiceImages[service.slug] ||
        defaultServiceImages[service.id] ||
        "/services/recruitment-and-staffing.jpg";

  // Dynamic CTAs per service
  const ctaHeadline = service.ctaHeadline || `Ready to accelerate your ${service.title.toLowerCase()}?`;
  const ctaSubtext = service.ctaSubtext || "Get a free consultation and quote tailored for your business.";
  const ctaButtonText = service.ctaButtonText || "Get in Touch";
  const ctaButtonLink = service.ctaButtonLink || `/contact?service=${service.slug}`;

  // Dynamic Hero Buttons
  const heroPrimaryText = service.heroPrimaryText || "Explore Solutions";
  const heroPrimaryLink = service.heroPrimaryLink || "#what-we-deliver";
  const heroSecondaryText = service.heroSecondaryText || "View Deliverables";
  const heroSecondaryLink = service.heroSecondaryLink || "#what-we-deliver";

  return (
    <div className="bg-slate-50/50 min-h-screen pb-24 text-slate-900">
      {/* ── 1. Hero Section ───────────────────────────────────────── */}
      <section className="pt-24 sm:pt-36 pb-16 sm:pb-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-5">
                <Sparkles size={13} />
                <span>{service.badge || "Enterprise Practice Area"}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                {firstPart}{" "}
                {lastPart && (
                  <span className="text-[hsl(190,100%,45%)] inline-block">
                    {lastPart}
                  </span>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed mb-8">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={heroPrimaryLink}
                  className="px-8 py-3.5 rounded-full bg-[hsl(195,100%,25%)] hover:bg-[hsl(195,100%,20%)] text-white font-semibold text-sm shadow-[0_4px_18px_rgba(0,105,148,0.25)] hover:shadow-lg transition-all duration-200"
                >
                  {heroPrimaryText}
                </Link>

                <Link
                  href={heroSecondaryLink}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-xs transition-all duration-200"
                >
                  {heroSecondaryText}
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:h-[420px] w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 bg-slate-900 group">
                {safeImage ? (
                  <Image
                    src={safeImage}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                {service.badge && (
                  <span className="absolute top-6 left-6 text-xs font-bold px-4 py-1.5 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
                    {service.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT WE DELIVER ───────────────────────────────────── */}
      <section id="what-we-deliver" className="py-20 scroll-mt-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">
              WHAT WE DELIVER
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-light">
              Tailored solutions designed specifically for {service.title.toLowerCase()} to accelerate operational excellence and organizational growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Vertical Pill Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {deliverables.map((item, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left px-6 py-4 rounded-2xl sm:rounded-full font-bold text-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[hsl(195,100%,25%)] text-white shadow-[0_8px_20px_rgba(0,105,148,0.25)] translate-x-1"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Right Large White Content Card */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {activeDeliverable.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                  {activeDeliverable.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  {activeDeliverable.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} className="text-cyan-500" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Key Benefits (Domain Specific) ────────────────────── */}
      <section className="py-20 bg-white/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Key Benefits
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light">
              Experience quantifiable advantages in {service.title.toLowerCase()} designed to optimize performance, lower overhead, and deliver sustainable value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const IconComp = iconMap[benefit.iconName] || Zap;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-9 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mb-6">
                    <IconComp size={22} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {benefit.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. How We Deliver Exceptional Results (Classic UI - Zero Numbers) ── */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles size={13} />
              <span>Proven Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              How We Deliver Exceptional Results
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light">
              Our structured, transparent approach ensuring precision and excellence in every phase of {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, sIdx) => {
              const StepIcons = [Target, Workflow, Rocket];
              const StepIcon = StepIcons[sIdx % StepIcons.length] || Target;
              const phaseLabels = ["Strategic Foundation", "Seamless Execution", "Successful Delivery"];

              return (
                <div
                  key={sIdx}
                  className="group bg-white rounded-[2rem] p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,105,148,0.09)] hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between"
                >
                  <div>
                    {/* Classic Icon Container (No Numbers) */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 via-sky-50 to-cyan-100/70 border border-cyan-100 text-[hsl(195,100%,25%)] flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300">
                      <StepIcon size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                      {st.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {st.description}
                    </p>
                  </div>

                  {/* Refined subtle bottom indicator bar */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[hsl(195,100%,25%)] transition-colors">
                    <span className="uppercase tracking-wider text-[11px] text-slate-400 group-hover:text-[hsl(195,100%,25%)]">
                      {phaseLabels[sIdx] || "Excellence"}
                    </span>
                    <CheckCircle2 size={16} className="text-cyan-500/70 group-hover:text-[hsl(195,100%,25%)] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Bottom CTA Banner (Tailored Per Service) ─────────── */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-r from-[hsl(195,100%,25%)] via-[#007ba7] to-[hsl(195,100%,35%)] text-white p-8 sm:p-18 text-center shadow-2xl relative overflow-hidden">
          {/* Glowing ambient spots */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              {ctaHeadline}
            </h2>

            <p className="text-white/85 text-base sm:text-lg font-light mb-8">
              {ctaSubtext}
            </p>

            <Link
              href={ctaButtonLink}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-[hsl(195,100%,25%)] font-bold text-sm shadow-xl hover:bg-slate-50 hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <span>{ctaButtonText}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
