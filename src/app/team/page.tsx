import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe2,
  MapPin,
  CheckCircle2,
  Users,
  Award,
  TrendingUp,
  Building2,
  Briefcase,
  CheckSquare2
} from "lucide-react";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Leadership Team - Visha IT Solutions",
  description:
    "Meet the visionary executive leaders steering Visha IT Solutions across India and the United Kingdom. Driving enterprise engineering, strategic recruitment, and global digital transformation.",
};

interface LeaderProfile {
  name: string;
  role: string;
  division: string;
  badge: string;
  image: string;
  accentGradient: string;
  ringColor: string;
  badgeBg: string;
  location: string;
  country: string;
  quote: string;
  topPoints: { label: string; desc: string }[];
}

const LEADERS: LeaderProfile[] = [
  {
    name: "Devayani Kodipelli",
    role: "Founder & Chief Executive Officer (CEO)",
    division: "Global Strategy & Corporate Governance",
    badge: "GLOBAL LEADERSHIP",
    image: "/team/devayani-avatar.jpg",
    accentGradient: "from-[#004f6e] via-[#00779e] to-[#0284c7]",
    ringColor: "border-[#00779e]/30 shadow-[#00779e]/20",
    badgeBg: "bg-sky-50 text-[#004f6e] border-sky-200",
    location: "Hyderabad, India",
    country: "Global Headquarters",
    quote: "Steering Visha IT Solutions with engineering excellence and global enterprise vision.",
    topPoints: [
      { label: "Global Strategy", desc: "Corporate expansion roadmaps & long-term value creation." },
      { label: "Enterprise Alliances", desc: "Strategic partnerships with Tier-1 industry leaders." },
      { label: "Digital Innovation", desc: "Next-generation cloud, AI systems & talent development." },
    ],
  },
  {
    name: "Vishnu Ganesh Kamsani",
    role: "Director / UK & Europe Operations",
    division: "UK & European Enterprise Expansion",
    badge: "UK & EUROPE OPERATIONS",
    image: "/team/vishnu-avatar.jpg",
    accentGradient: "from-[#0a2540] via-[#1e3a8a] to-[#2563eb]",
    ringColor: "border-blue-500/30 shadow-blue-500/20",
    badgeBg: "bg-blue-50 text-blue-900 border-blue-200",
    location: "London, United Kingdom",
    country: "European Presence",
    quote: "Connecting UK & European enterprises with agile IT talent and reliable execution.",
    topPoints: [
      { label: "UK & EU Expansion", desc: "Enterprise business growth & strategic client acquisition." },
      { label: "Talent Mobility", desc: "Deploying vetted, high-caliber engineering specialists." },
      { label: "Cross-Border Synergy", desc: "Seamless 24/7 UK-offshore team alignment & delivery." },
    ],
  },
  {
    name: "Srikanth Nallapu",
    role: "Managing Director",
    division: "Operational Scalability & Delivery SLA",
    badge: "OPERATIONS & DELIVERY",
    image: "/team/srikanth-avatar.jpg",
    accentGradient: "from-[#064e3b] via-[#0d9488] to-[#0284c7]",
    ringColor: "border-teal-500/30 shadow-teal-500/20",
    badgeBg: "bg-teal-50 text-teal-900 border-teal-200",
    location: "Hyderabad, India",
    country: "Execution Center",
    quote: "Upholding uncompromising delivery SLAs, agile execution, and QA excellence.",
    topPoints: [
      { label: "Operational Scale", desc: "Scaling multi-disciplinary engineering & agile infrastructure." },
      { label: "Delivery SLAs & QA", desc: "Zero-defect quality benchmarks & milestone adherence." },
      { label: "Resource Planning", desc: "Optimizing full-stack talent & long-term client retention." },
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800">
      {/* ── 1. Hero Section ────────────────────────────────────────────── */}
      <section className="relative w-full py-20 sm:py-28 bg-[#061424] overflow-hidden text-white border-b border-slate-800">
        {/* Ambient Gradient Flares */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-[#00779e]/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sky-300 text-xs font-bold tracking-widest uppercase mb-5 border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <Sparkles size={14} className="text-cyan-400" />
              <span>EXECUTIVE GOVERNANCE</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-5 max-w-4xl mx-auto">
              Leadership Driving{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Global Impact
              </span>
            </h1>
          </FadeIn>

          <SlideUp delay={0.1}>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Meet the executive leadership guiding Visha IT Solutions with precision, integrity, and cross-border capabilities across India and the UK.
            </p>
          </SlideUp>

          {/* Quick Metrics Pill Row */}
          <SlideUp delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <Globe2 size={15} className="text-sky-400" />
                <span>2 Strategic Hubs: <strong>Hyderabad &amp; London</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <Building2 size={15} className="text-cyan-400" />
                <span>4 Core Domains: <strong>Recruitment • Marketing • Training • Software</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>Enterprise SLA: <strong>Quality First</strong></span>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ── 2. Modern Executive Leadership Cards ───────────────────────── */}
      <section className="py-16 sm:py-20 relative -mt-10 z-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {LEADERS.map((leader, idx) => (
              <SlideUp key={leader.name} delay={0.1 + idx * 0.12}>
                <div className="group h-full flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(2,132,199,0.12)] hover:border-sky-400/60 transition-all duration-300 relative overflow-hidden">
                  {/* Top Radiant Accent Ribbon */}
                  <div className={`h-2 w-full bg-gradient-to-r ${leader.accentGradient}`} />

                  {/* Card Main Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    {/* Header: Photo Avatar & Location / Domain Badge */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        {/* Executive High-Res Professional Vector Avatar */}
                        <div className="relative shrink-0">
                          <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-br ${leader.accentGradient} shadow-md ${leader.ringColor} border-2 border-white ring-4 ring-slate-100 overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                          >
                            <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                              <Image
                                src={leader.image}
                                alt={leader.name}
                                width={256}
                                height={256}
                                quality={100}
                                priority
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          </div>
                          {/* Miniature Executive Verified Shield */}
                          <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00779e] shadow-xs">
                            <Award size={13} className="text-[#00779e]" />
                          </div>
                        </div>

                        {/* Domain & Location Tag */}
                        <div className="text-right">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase border ${leader.badgeBg}`}
                          >
                            {leader.badge}
                          </span>
                          <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-slate-500 mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <MapPin size={12} className="text-[#00779e]" />
                            <span>{leader.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Name & Title */}
                      <div className="space-y-1 border-b border-slate-100 pb-4">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#004f6e] transition-colors">
                          {leader.name}
                        </h2>
                        <p className="text-xs sm:text-sm font-bold text-[#00779e]">
                          {leader.role}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-400">
                          {leader.division}
                        </p>
                      </div>
                    </div>

                    {/* Executive Quote Vision Box */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-50 border border-slate-200/80 relative">
                      <div className="text-[9px] font-black uppercase tracking-widest text-[#00779e] mb-1 flex items-center gap-1">
                        <Sparkles size={10} />
                        <span>Leadership Mandate</span>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
                        &ldquo;{leader.quote}&rdquo;
                      </p>
                    </div>

                    {/* Core Roles & Key Strategic Highlights */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#004f6e] flex items-center gap-1.5">
                        <CheckSquare2 size={12} className="text-[#00779e]" />
                        <span>Key Responsibilities &amp; Focus</span>
                      </div>
                      <div className="space-y-1.5">
                        {leader.topPoints.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2 p-2 rounded-xl bg-slate-50/90 border border-slate-100 hover:border-sky-200 hover:bg-sky-50/40 transition-colors"
                          >
                            <CheckCircle2 size={13} className="text-[#00779e] mt-0.5 shrink-0" />
                            <div className="text-xs text-slate-700 leading-snug">
                              <strong className="font-bold text-slate-900">{pt.label}:</strong>
                              <span className="text-slate-600 ml-1">{pt.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Enterprise Status Bar */}
                  <div className="bg-slate-50/90 border-t border-slate-100 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-600 text-[11px]">{leader.country}</span>
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00779e] group-hover:translate-x-0.5 transition-transform">
                      <span>Executive Governance</span>
                      <CheckCircle2 size={12} className="text-[#00779e]" />
                    </div>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Strategic Pillars ───────────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#004f6e] text-xs font-bold tracking-wider uppercase mb-3 border border-sky-200">
              <ShieldCheck size={13} className="text-[#00779e]" />
              <span>CORE COMMITMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Leadership Commitment
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Driven by integrity, agile delivery, and human-centric technology partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#004f6e] flex items-center justify-center">
                <Globe2 size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Global Presence &amp; UK Delivery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Operating out of Hyderabad and London, ensuring worldwide enterprises benefit from uninterrupted time-zone coverage and seasoned engineering teams.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <TrendingUp size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Agile &amp; Velocity Driven</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From fast-turnaround IT staffing to full-stack e-commerce deployment, our leadership empowers rapid execution without compromising code security.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Users size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">People-First Culture</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe exceptional software is built by supported engineers. Our training programs and mentorship foster continuous career advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Executive Call to Action ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-slate-100">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#061424] via-[#091f38] to-[#061424] text-white p-8 sm:p-12 md:p-16 border border-slate-700 shadow-2xl text-center overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold tracking-wider uppercase border border-white/10">
                PARTNER WITH US
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Connect With Our Leadership
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you need dedicated IT recruitment, custom cloud software, digital marketing scaling, or corporate tech training — our leadership team is ready to assist.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 text-slate-950 font-bold text-sm shadow-lg shadow-sky-400/25 transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  <span>Reach Executive Office</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all hover:scale-105"
                >
                  Explore All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
