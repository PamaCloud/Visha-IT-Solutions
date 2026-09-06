import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Award,
  Headphones,
} from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import { VISHA_SERVICES } from "@/data/vishaServices";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Services - Visha IT Solutions",
  description:
    "Explore our core enterprise services: Recruitment & Staffing, Talent Acquisition, Payroll & HR Services, Digital Marketing, E-Commerce Solutions, and Training & Career Development.",
};

const iconMap: Record<string, any> = {
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
};

export default async function ServicesPage() {
  let services: any[] = VISHA_SERVICES;

  try {
    await connectToDatabase();
    const dbServices = await Service.find({ isActive: true }).sort({ order: 1 }).lean();
    if (dbServices && dbServices.length > 0) {
      services = dbServices.map((s: any) => ({
        ...s,
        id: s.slug || s._id.toString(),
        iconName: s.icon || "Users",
        subServices: s.subServices || s.features || [],
        features: s.features || [],
        ctaText: s.ctaText || "Explore Service →",
        ctaLink: `/contact?service=${s.slug}`,
        image: s.image || `/services/${s.slug}.jpg`,
      }));
    }
  } catch (err) {
    console.error("Error loading services dynamically from DB:", err);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className="relative pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32 bg-gradient-to-br from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,32%)] text-white overflow-hidden">
        {/* Subtle decorative glowing background orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-200 text-xs font-semibold tracking-wider uppercase mb-5 border border-white/10">
              <Sparkles size={13} className="text-cyan-300" />
              End-to-End Enterprise Capabilities
            </div>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Our Core <span className="text-[hsl(190,100%,50%)]">Services</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed">
              Empowering organizations with world-class recruitment, compliant HR & payroll infrastructure, high-converting digital marketing, robust e-commerce, and hands-on career training.
            </p>
          </SlideUp>
        </div>
      </div>

      {/* ── Services Grid Section (Screenshots 2 & 3 Exact Style) ─ */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Users;

            return (
              <SlideUp key={service.id} delay={0.1 + (idx % 3) * 0.1}>
                <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden">
                  {/* Top Image Container with Arched Corners & Floating Badges */}
                  <div className="relative h-60 w-full overflow-hidden rounded-t-[2.5rem] bg-slate-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Floating Top-Left Pill Badge */}
                    {service.badge && (
                      <span className="absolute top-4 left-4 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
                        {service.badge}
                      </span>
                    )}

                    {/* Floating Bottom-Right Circular Icon Button */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-[hsl(195,100%,25%)] shadow-xl flex items-center justify-center group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300 border border-slate-100">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                      {service.title}
                    </h2>

                    <p className="text-sm text-slate-600 mb-6 leading-relaxed min-h-[4rem]">
                      {service.shortDescription}
                    </p>

                    {/* Included Offerings */}
                    <div className="pt-5 border-t border-slate-100 mb-8 flex-grow">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                        Included Offerings
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {service.subServices.map((sub: string, sIdx: number) => (
                          <div key={sIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Distinct CTA Button with Arrow */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full h-12 rounded-full border border-slate-200 bg-slate-50/80 text-slate-800 text-sm font-semibold hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 group/btn"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </SlideUp>
            );
          })}
        </div>
      </div>

      {/* ── 4-Step Engagement Process (Abhivorn Pattern) ─────────── */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-3">
            Proven Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How We Deliver Excellence
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-light">
            A structured, transparent delivery methodology designed to eliminate risks and deliver measurable enterprise results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Discovery & Alignment",
              desc: "In-depth consultation to map your workforce gaps, technical requirements, compliance posture, or business objectives.",
            },
            {
              step: "02",
              title: "Strategic Blueprint",
              desc: "Crafting customized talent acquisition pipelines, payroll architectures, growth marketing plans, or IT learning roadmaps.",
            },
            {
              step: "03",
              title: "Execution & Vetting",
              desc: "Deploying pre-screened professionals, rolling out automated workflows, or executing targeted high-ROI marketing funnels.",
            },
            {
              step: "04",
              title: "Continuous Optimization",
              desc: "Ongoing performance reviews, dedicated SLA account management, and adaptive scaling to fuel long-term corporate growth.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <span className="text-5xl font-black text-slate-100 absolute top-4 right-4 select-none">
                {item.step}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] font-bold text-sm flex items-center justify-center mb-6">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Enterprise Value Pillars (Trust & Quality) ─────────── */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-white">48 Hours</h4>
                <p className="text-xs text-white/70 mt-1">Average Turnaround for Pre-Vetted Candidate Shortlists</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-white">100%</h4>
                <p className="text-xs text-white/70 mt-1">Statutory Compliance with Labor & Financial Regulations</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <Award size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-white">200+</h4>
                <p className="text-xs text-white/70 mt-1">Projects & Enterprise Staffing Solutions Delivered</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-white">24/7</h4>
                <p className="text-xs text-white/70 mt-1">Dedicated Account Management & Operational Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Enterprise Call-to-Action ────────────────────── */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-br from-[hsl(195,100%,25%)] to-[#004e70] rounded-[2.5rem] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-white/85 text-base sm:text-lg font-light mb-8 leading-relaxed">
              Partner with Visha IT Solutions for agile staffing, compliant HR, performance digital marketing, and industry-leading corporate IT training.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[hsl(195,100%,25%)] font-bold text-sm shadow-lg hover:bg-slate-100 hover:shadow-xl transition-all"
              >
                Get Free Consultation →
              </Link>
              <Link
                href="/get-a-quote"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold text-sm transition-all"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
