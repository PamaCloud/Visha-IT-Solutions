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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Devayani Kodipelli */}
            <SlideUp delay={0.15}>
              <div className="group h-full flex flex-col justify-between bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 relative overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-[#004f6e] via-[#00779e] to-[#0284c7]" />
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#004f6e] to-[#00779e] text-white font-black text-lg flex items-center justify-center shadow-md border-2 border-white ring-2 ring-sky-100">
                        <span>DK</span>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border bg-sky-50 text-[#004f6e] border-sky-200">
                          GLOBAL LEADERSHIP
                        </span>
                        <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-500 mt-1.5">
                          <MapPin size={12} className="text-[#00779e]" />
                          <span>Hyderabad, India</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-slate-100 pb-4 mb-4">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#004f6e] transition-colors">
                        Devayani Kodipelli
                      </h3>
                      <p className="text-sm font-bold text-[#00779e] mt-1">
                        Chief Executive Officer (CEO)
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Pioneering executive leader steering corporate strategy, international enterprise alliances, and continuous organizational scaling across IT recruitment, web architectures, and career development programs.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div className="p-2 rounded-lg bg-slate-50 text-[11px] font-bold text-slate-700 text-center">
                      Global Enterprise Strategy
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 text-[11px] font-bold text-slate-700 text-center">
                      Strategic Partnerships
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Vishnu Ganesh Kamsani */}
            <SlideUp delay={0.25}>
              <div className="group h-full flex flex-col justify-between bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-[#0a2540] via-[#1e3a8a] to-[#2563eb]" />
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#2563eb] text-white font-black text-lg flex items-center justify-center shadow-md border-2 border-white ring-2 ring-blue-100">
                        <span>VG</span>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border bg-blue-50 text-blue-900 border-blue-200">
                          UK &amp; EUROPE
                        </span>
                        <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-500 mt-1.5">
                          <MapPin size={12} className="text-[#00779e]" />
                          <span>London, UK</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-slate-100 pb-4 mb-4">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#004f6e] transition-colors">
                        Vishnu Ganesh Kamsani
                      </h3>
                      <p className="text-sm font-bold text-[#00779e] mt-1">
                        Director / UK Operations
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Leading overseas market expansion and enterprise technology client accounts. Vishnu bridges European market opportunities with precision technical execution and bespoke engineering delivery.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div className="p-2 rounded-lg bg-slate-50 text-[11px] font-bold text-slate-700 text-center">
                      UK &amp; Europe Expansion
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 text-[11px] font-bold text-slate-700 text-center">
                      Cross-Border Delivery
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Srikanth Nallapu */}
            <SlideUp delay={0.35}>
              <div className="group h-full flex flex-col justify-between bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 relative overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-[#064e3b] via-[#0d9488] to-[#0284c7]" />
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#0d9488] text-white font-black text-lg flex items-center justify-center shadow-md border-2 border-white ring-2 ring-teal-100">
                        <span>SN</span>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border bg-teal-50 text-teal-900 border-teal-200">
                          OPERATIONS &amp; SLA
                        </span>
                        <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-500 mt-1.5">
                          <MapPin size={12} className="text-[#00779e]" />
                          <span>Hyderabad, India</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-slate-100 pb-4 mb-4">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#004f6e] transition-colors">
                        Srikanth Nallapu
                      </h3>
                      <p className="text-sm font-bold text-[#00779e] mt-1">
                        Managing Director
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Directing daily organizational momentum, technical execution velocity, and delivery quality governance across all software projects, recruitment pipelines, and digital campaigns.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div className="p-2 rounded-lg bg-slate-50 text-[11px] font-bold text-slate-700 text-center">
                      Operational Scalability
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 text-[11px] font-bold text-slate-700 text-center">
                      Engineering SLAs &amp; QA
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
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
