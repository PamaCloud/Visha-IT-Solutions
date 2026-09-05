"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
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
};

// Fallback dynamic deliverables per service slug if not explicitly defined
function getDefaultDeliverables(service: VishaServiceItem) {
  if (service.deliverables && service.deliverables.length > 0) {
    return service.deliverables;
  }

  // Create 4 rich deliverables from subServices
  const subs = service.subServices || [];
  return [
    {
      title: subs[0] || "Strategic Architecture",
      description: `Comprehensive, scalable ${service.title.toLowerCase()} engineered to meet high-growth enterprise standards with seamless operational reliability.`,
      points: [
        subs[1] || "Tailored Enterprise Workflows",
        subs[2] || "Statutory & Domain Compliance",
        subs[3] || "High-Precision SLA Delivery",
        "Continuous 24/7 Monitoring & Support",
      ],
    },
    {
      title: subs[2] || "Enterprise Execution",
      description: `Robust, production-grade solutions customized for your team with fast onboarding, automated reporting, and transparent milestones.`,
      points: [
        subs[3] || "Rapid 48h Turnaround",
        subs[4] || "Multi-Tier Screening & Quality",
        subs[5] || "Seamless Digital Integration",
        "Dedicated Account Management",
      ],
    },
    {
      title: subs[4] || "Automated Pipelines",
      description: `End-to-end management systems designed to reduce turnaround times, eliminate administrative overhead, and maximize business efficiency.`,
      points: [
        subs[5] || "Automated Dashboards & Metrics",
        subs[6] || "Scalable Team Extension",
        "Standardized Compliance Documentation",
        "Guaranteed Zero-Downtime Delivery",
      ],
    },
    {
      title: subs[6] || "Continuous Scaling & Support",
      description: `Proactive operational optimization ensuring your organization sustains competitive advantage and long-term organizational success.`,
      points: [
        subs[0] || "Customized Long-term Roadmaps",
        subs[1] || "Quarterly Strategic Reviews",
        "Performance Benchmarking",
        "Dedicated Practice Leadership",
      ],
    },
  ];
}

// Fallback 6 Key Benefits per service
function getDefaultBenefits(service: VishaServiceItem) {
  if (service.benefits && service.benefits.length > 0) {
    return service.benefits;
  }

  return [
    {
      title: "Tailored to Your Business",
      description: `Bespoke ${service.title.toLowerCase()} that matches your exact organizational workflows and compliance requirements.`,
      iconName: "Code2",
    },
    {
      title: "Scalable Architecture",
      description: "Built to expand seamlessly with your company, handling increased load and volume without compromising quality.",
      iconName: "TrendingUp",
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade data confidentiality, strict access controls, and 100% adherence to national regulatory standards.",
      iconName: "ShieldCheck",
    },
    {
      title: "Optimized Performance",
      description: "Dramatically accelerate turnaround times and operational efficiency with proven corporate methodologies.",
      iconName: "Zap",
    },
    {
      title: "Seamless Integration",
      description: "Integrates smoothly into your existing HRMS, ERPs, CRM platforms, and daily operational infrastructure.",
      iconName: "Cpu",
    },
    {
      title: "Data Driven Insights",
      description: "Real-time analytics and transparent KPI reporting built-in, enabling leadership to make confident, strategic decisions.",
      iconName: "Database",
    },
  ];
}

export default function ServiceDetailView({ service }: { service: VishaServiceItem }) {
  const [activeTab, setActiveTab] = useState(0);

  const deliverables = getDefaultDeliverables(service);
  const benefits = getDefaultBenefits(service);
  const activeDeliverable = deliverables[activeTab] || deliverables[0];

  // Split title for 2-tone effect (e.g. "Custom Software" / "Development")
  const titleWords = service.title.split(" ");
  const firstPart = titleWords.slice(0, -1).join(" ") || titleWords[0];
  const lastPart = titleWords.length > 1 ? titleWords[titleWords.length - 1] : "";

  return (
    <div className="bg-slate-50/50 min-h-screen pb-24 text-slate-900">
      {/* ── 1. Hero Section (Abhivorn Screenshot 1) ─────────────── */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-5">
                <Sparkles size={13} />
                Enterprise Practice Area
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
                  href="#what-we-deliver"
                  className="px-8 py-3.5 rounded-full bg-[hsl(195,100%,25%)] hover:bg-[hsl(195,100%,20%)] text-white font-semibold text-sm shadow-[0_4px_18px_rgba(0,105,148,0.25)] hover:shadow-lg transition-all duration-200"
                >
                  Explore Solutions
                </Link>

                <Link
                  href="/projects"
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-xs transition-all duration-200"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right Hero Image (Arched Glassy Card) */}
            <div className="lg:col-span-6">
              <div className="relative h-[340px] sm:h-[420px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 bg-slate-900 group">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
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

      {/* ── 2. WHAT WE DELIVER (Abhivorn Screenshot 2) ───────────── */}
      <section id="what-we-deliver" className="py-20 scroll-mt-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">
              WHAT WE DELIVER
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-light">
              Industry-specific solutions designed to accelerate your digital transformation and drive competitive advantage.
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
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all">
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

      {/* ── 3. Key Benefits (Abhivorn Screenshot 3) ─────────────── */}
      <section className="py-20 bg-white/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Key Benefits
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light">
              Experience quantifiable advantages designed to optimize efficiency, lower operational overhead, and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const IconComp = iconMap[benefit.iconName] || Zap;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[2.5rem] p-8 sm:p-9 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
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

      {/* ── 4. How We Deliver Exceptional Results (Screenshot 4) ── */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              How We Deliver Exceptional Results
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light">
              Take your next step forward with a robust technology strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                desc: "We analyze your business goals, technical requirements, and market position to create a comprehensive, tailored roadmap.",
              },
              {
                step: "02",
                title: "Design & Development",
                desc: "Our expert teams build scalable solutions using cutting-edge technologies and industry-leading best practices.",
              },
              {
                step: "03",
                title: "Deploy & Scale",
                desc: "We ensure smooth deployment and provide ongoing, proactive support to help your solutions grow with your business.",
              },
            ].map((st, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-[2.5rem] p-9 sm:p-10 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Large Subtle Watermark Number */}
                <span className="text-7xl font-black text-slate-100/90 absolute top-4 right-6 select-none pointer-events-none">
                  {st.step}
                </span>

                <div className="text-[hsl(195,100%,25%)] font-black text-xl mb-6">
                  {st.step}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Bottom CTA Banner (Abhivorn Screenshot 5) ─────────── */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-[hsl(195,100%,25%)] via-[#007ba7] to-[hsl(195,100%,35%)] text-white p-12 sm:p-18 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle glowing ambient spots */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Ready to build your {service.title.toLowerCase()}?
            </h2>

            <p className="text-white/85 text-base sm:text-lg font-light mb-8">
              Get a free consultation and quote for your project.
            </p>

            <Link
              href={`/contact?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-[hsl(195,100%,25%)] font-bold text-sm shadow-xl hover:bg-slate-50 hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <span>Start Your Project</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
