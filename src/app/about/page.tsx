import Image from "next/image";
import Link from "next/link";
import {
  Rocket,
  Award,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Globe2,
  Briefcase,
  CheckCircle2,
  MapPin,
  CheckSquare2,
} from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Visha IT Solutions",
  description:
    "Learn about Visha IT Solutions, our journey, enterprise values, and mission to deliver cutting-edge technology and human-capital solutions worldwide.",
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

export default function AboutPage() {
  const stats = [
    {
      value: "10+",
      label: "Years Experience",
      sub: "Industry expertise",
      icon: Clock,
    },
    {
      value: "500+",
      label: "Projects Delivered",
      sub: "High-performance apps",
      icon: Briefcase,
    },
    {
      value: "200+",
      label: "Global Clients",
      sub: "Across 14 countries",
      icon: Globe2,
    },
    {
      value: "50+",
      label: "IT Professionals",
      sub: "Engineers & architects",
      icon: Users,
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We push technical boundaries with modern frameworks, cloud architectures, and intelligent workflows.",
      icon: Rocket,
      tag: "Forward-Thinking",
    },
    {
      title: "Quality",
      description:
        "Uncompromising standards in every line of code, infrastructure configuration, and talent deployment.",
      icon: Award,
      tag: "Best-in-Class",
    },
    {
      title: "Collaboration",
      description:
        "Transparent engineering roadmaps and close partner alignment to bring your strategic vision to life.",
      icon: Users,
      tag: "Partner-First",
    },
    {
      title: "Focus",
      description:
        "Dedicated to measurable velocity, resilient software architectures, and sustainable business ROI.",
      icon: Target,
      tag: "Outcome-Driven",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[420px] md:min-h-[480px] flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        <Image
          src="/about-hero-v2.jpg"
          alt="Visha IT Solutions Corporate Office"
          fill
          priority
          quality={95}
          unoptimized
          className="object-cover"
        />
        {/* Sleek Deep Navy Glassy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/85 via-[#0d223f]/70 to-[#0a192f]/95 backdrop-blur-[1px]" />

        <div className="container relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sky-200 text-xs font-semibold tracking-wider uppercase mb-5 border border-white/15">
              <Sparkles size={14} className="text-sky-300" />
              <span>Pioneering Enterprise Tech &amp; Talent</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight drop-shadow-md">
              About <span className="bg-gradient-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent">Visha IT Solutions</span>
            </h1>
          </FadeIn>
          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-sky-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
              We empower modern enterprises through scalable software engineering, strategic IT staffing, digital marketing, and industry-grade tech education.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* 2. Story & Stats Section (Redesigned with Glassmorphism) */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
        {/* Subtle glowing ambient mesh */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Story Content Left */}
            <div className="lg:w-1/2">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-[#0369a1] text-xs font-bold tracking-widest uppercase mb-4 border border-sky-200/60">
                  <Sparkles size={13} className="text-[#0284c7]" />
                  <span>OUR STORY &amp; HERITAGE</span>
                </div>
              </FadeIn>
              
              <SlideUp delay={0.1}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
                  Bridging the gap between{" "}
                  <span className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] bg-clip-text text-transparent">
                    vision
                  </span>{" "}
                  and{" "}
                  <span className="bg-gradient-to-r from-[#0369a1] to-[#0284c7] bg-clip-text text-transparent">
                    flawless execution.
                  </span>
                </h2>
              </SlideUp>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <SlideUp delay={0.2}>
                  <p>
                    Founded with a bold mission to connect high-caliber technology with tangible business outcomes, Visha IT Solutions has grown into a high-trust digital engineering and human-capital partner for organizations globally.
                  </p>
                </SlideUp>
                <SlideUp delay={0.3}>
                  <p>
                    From a specialized core of software architects, we expanded into an end-to-end powerhouse: providing cloud application development, high-conversion e-commerce systems, data-driven digital marketing, enterprise recruitment, and corporate talent bootcamps.
                  </p>
                </SlideUp>
                <SlideUp delay={0.4}>
                  <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-sky-100 shadow-sm flex items-start gap-3 mt-4">
                    <ShieldCheck className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm font-medium text-slate-700 leading-normal">
                      We don’t just deploy code; we architect reliable, high-uptime digital ecosystems that empower your organization to outperform and scale with certainty.
                    </p>
                  </div>
                </SlideUp>
              </div>
            </div>

            {/* Glassmorphic Stats Grid Right */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6 w-full">
              {stats.map((stat, idx) => (
                <SlideUp key={idx} delay={0.2 + idx * 0.1}>
                  <div className="group relative bg-white/80 backdrop-blur-xl p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(2,132,199,0.12)] hover:border-sky-300 transition-all duration-300 overflow-hidden">
                    {/* Top hover accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284c7] mb-4 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all">
                      <stat.icon size={20} />
                    </div>

                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight group-hover:text-[#0284c7] transition-colors">
                      {stat.value}
                    </div>
                    
                    <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                      {stat.label}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                      {stat.sub}
                    </div>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Section (Luxury Dark Glassmorphism - Replaced harsh solid cyan) */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0a192f] via-[#0c2340] to-[#0a192f] relative overflow-hidden text-white">
        {/* Radiant Cyan & Blue Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-white/10">
                <Sparkles size={13} className="text-cyan-400" />
                <span>GUIDING PRINCIPLES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Our Core Values
              </h2>
            </FadeIn>
            <SlideUp delay={0.1}>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                The architectural and human principles that guide every solution we deploy, project we engineer, and client relationship we nurture.
              </p>
            </SlideUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <SlideUp key={idx} delay={0.15 + idx * 0.1}>
                <div className="group relative bg-white/[0.04] backdrop-blur-2xl p-7 rounded-3xl border border-white/10 hover:border-sky-400/50 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between h-full shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                  {/* Subtle corner glow */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-sky-400/20 rounded-full blur-2xl group-hover:bg-sky-400/40 transition-all pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-cyan-400/30 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all shadow-inner">
                        <value.icon size={24} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-sky-200 border border-white/10">
                        {value.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
                      {value.description}
                    </p>
                  </div>


                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Team Section */}
      <section id="team" className="py-20 md:py-28 bg-slate-50/60 relative scroll-mt-24 border-t border-slate-200/80">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-[#004f6e] text-xs font-bold tracking-wider uppercase mb-3 border border-sky-200">
                <Sparkles size={13} className="text-[#00779e]" />
                <span>EXECUTIVE GOVERNANCE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Our Leadership Team
              </h2>
            </FadeIn>
            <SlideUp delay={0.1}>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Guiding Visha IT Solutions with a vision of world-class technology, talent excellence, and global delivery across India and the UK.
              </p>
            </SlideUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {LEADERS.map((leader, idx) => (
              <SlideUp key={leader.name} delay={0.15 + idx * 0.1}>
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
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#004f6e] transition-colors">
                          {leader.name}
                        </h3>
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

      {/* 5. Ready to Work With Us CTA Section */}
      <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <SlideUp delay={0.1}>
            <div className="relative rounded-[2.5rem] bg-gradient-to-b from-white via-white to-sky-50/60 p-8 sm:p-12 md:p-16 border border-sky-200/80 shadow-[0_20px_60px_rgba(2,132,199,0.08)] text-center overflow-hidden">
              {/* Background ambient orbs */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0369a1] text-xs font-bold tracking-wider uppercase mb-4 border border-sky-200">
                  <Sparkles size={13} className="text-[#0284c7]" />
                  <span>START YOUR DIGITAL JOURNEY</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                  Ready to accelerate your business with{" "}
                  <span className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] bg-clip-text text-transparent">
                    future-proof IT?
                  </span>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  Let’s architect a tailored solution for your engineering, staffing, marketing, or training objectives. Talk to our senior consultants today.
                </p>

                {/* Button actions */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#075985] shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Contact Us Today</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/services"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:border-sky-300 transition-all"
                  >
                    <span>Explore All Services</span>
                  </Link>
                </div>

                {/* Trust Highlights */}
                <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>SLA Guaranteed Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>24/7 Enterprise Support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Dedicated Technical PM</span>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
