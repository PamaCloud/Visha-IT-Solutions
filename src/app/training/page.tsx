import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Clock,
  Laptop,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Code2,
  Cpu,
  Database,
  Layers,
  Terminal,
} from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { VISHA_TRAINING_PROGRAMS, VishaTrainingItem } from "@/data/vishaTraining";

export const metadata: Metadata = {
  title: "Professional IT Training Programs - Visha IT Solutions",
  description:
    "Master Python Full Stack, MERN Stack, .NET Full Stack, Java Full Stack, Cloud & DevOps, and Data Science. Hands-on capstone projects and 100% placement support.",
};

const iconList = [Code2, Layers, Cpu, Database, Terminal, GraduationCap];

export default function TrainingPage() {
  const programs: VishaTrainingItem[] = VISHA_TRAINING_PROGRAMS;

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
              Career Acceleration & Tech Academy
            </div>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Industry-Aligned <span className="text-[hsl(190,100%,50%)]">IT Training</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              Empower your career with job-ready full-stack and cloud engineering programs. Learn from practicing senior engineers, build production-grade capstone projects, and secure top placement opportunities.
            </p>
          </SlideUp>

          {/* Key Metrics Bar */}
          <SlideUp delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">98%</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Placement Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">500+</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Hiring Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Practical Labs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">1:1</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Mentor Guidance</div>
              </div>
            </div>
          </SlideUp>
        </div>
      </div>

      {/* ── Training Programs Grid Section (1 on Top Centered, 2 Below in One Row) ── */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="space-y-8">
          {/* Row 1 (Above): 1 Course Centered in the Middle */}
          {programs[0] && (
            <div className="max-w-md mx-auto w-full">
              <SlideUp delay={0.1}>
                <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden">
                  {/* Top Image Container with Arched Corners & Floating Badges */}
                  <div className="relative h-60 w-full overflow-hidden rounded-t-[2.5rem] bg-slate-900">
                    <Image
                      src={programs[0].image}
                      alt={programs[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Floating Top-Left Pill Badge */}
                    {programs[0].badge && (
                      <span className="absolute top-4 left-4 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
                        {programs[0].badge}
                      </span>
                    )}

                    {/* Duration / Mode Pill */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      <Clock size={12} className="text-cyan-300" />
                      <span>{programs[0].duration}</span>
                    </div>

                    {/* Floating Bottom-Right Circular Icon Button */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-[hsl(195,100%,25%)] shadow-xl flex items-center justify-center group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300 border border-slate-100">
                      <Code2 className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Mode Tag */}
                    <div className="flex items-center gap-2 text-xs font-bold text-[hsl(195,100%,28%)] uppercase tracking-wider mb-2">
                      <Laptop size={14} />
                      <span>{programs[0].mode}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 normal-case font-medium">{programs[0].level}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                      {programs[0].title}
                    </h2>

                    <p className="text-sm text-slate-600 mb-6 leading-relaxed min-h-[4rem]">
                      {programs[0].shortDescription}
                    </p>

                    {/* Core Curriculum Highlights */}
                    <div className="pt-5 border-t border-slate-100 mb-6 flex-grow">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                        Curriculum Highlights
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {programs[0].syllabus.slice(0, 4).map((item, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2.5">
                            <CheckCircle2
                              size={16}
                              className="text-[hsl(195,100%,35%)] shrink-0 mt-0.5"
                            />
                            <span className="text-xs text-slate-700 font-medium leading-tight">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {programs[0].technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {programs[0].technologies.length > 4 && (
                        <span className="text-[11px] font-medium px-2 py-1 text-slate-400">
                          +{programs[0].technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Bottom CTA Button */}
                    <Link
                      href={`/training/${programs[0].slug}`}
                      className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white group-hover:border-[hsl(195,100%,25%)] transition-all duration-300 shadow-xs"
                    >
                      <span>Explore Full Curriculum</span>
                      <ArrowRight
                        size={16}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </SlideUp>
            </div>
          )}

          {/* Row 2: 2 Courses in the One Row Side-by-Side */}
          {programs.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {programs.slice(1, 3).map((program, idx) => {
                const IconComponent = idx === 0 ? Layers : Cpu;
                return (
                  <SlideUp key={program.id} delay={0.2 + idx * 0.1}>
                    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden">
                      {/* Top Image Container with Arched Corners & Floating Badges */}
                      <div className="relative h-60 w-full overflow-hidden rounded-t-[2.5rem] bg-slate-900">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Floating Top-Left Pill Badge */}
                        {program.badge && (
                          <span className="absolute top-4 left-4 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
                            {program.badge}
                          </span>
                        )}

                        {/* Duration / Mode Pill */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                          <Clock size={12} className="text-cyan-300" />
                          <span>{program.duration}</span>
                        </div>

                        {/* Floating Bottom-Right Circular Icon Button */}
                        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-[hsl(195,100%,25%)] shadow-xl flex items-center justify-center group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300 border border-slate-100">
                          <IconComponent className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-8 flex flex-col flex-grow">
                        {/* Mode Tag */}
                        <div className="flex items-center gap-2 text-xs font-bold text-[hsl(195,100%,28%)] uppercase tracking-wider mb-2">
                          <Laptop size={14} />
                          <span>{program.mode}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500 normal-case font-medium">{program.level}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                          {program.title}
                        </h2>

                        <p className="text-sm text-slate-600 mb-6 leading-relaxed min-h-[4rem]">
                          {program.shortDescription}
                        </p>

                        {/* Core Curriculum Highlights */}
                        <div className="pt-5 border-t border-slate-100 mb-6 flex-grow">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                            Curriculum Highlights
                          </h3>
                          <div className="grid grid-cols-1 gap-2.5">
                            {program.syllabus.slice(0, 4).map((item, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2.5">
                                <CheckCircle2
                                  size={16}
                                  className="text-[hsl(195,100%,35%)] shrink-0 mt-0.5"
                                />
                                <span className="text-xs text-slate-700 font-medium leading-tight">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="mb-6 flex flex-wrap gap-1.5">
                          {program.technologies.slice(0, 4).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                          {program.technologies.length > 4 && (
                            <span className="text-[11px] font-medium px-2 py-1 text-slate-400">
                              +{program.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Bottom CTA Button */}
                        <Link
                          href={`/training/${program.slug}`}
                          className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white group-hover:border-[hsl(195,100%,25%)] transition-all duration-300 shadow-xs"
                        >
                          <span>Explore Full Curriculum</span>
                          <ArrowRight
                            size={16}
                            className="transform group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      </div>
                    </div>
                  </SlideUp>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── 4-Step Career Launchpad Section ───────────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-3">
              Our Methodology
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Visha Career Launchpad
            </h2>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
              We do not just teach syntax. We groom complete software professionals who understand modern architectural standards, code quality, and interview dynamics.
            </p>
          </SlideUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Industry-Vetted Curriculum",
              desc: "Engineered in sync with the current tech stack demands of tier-1 tech companies and high-growth product startups.",
            },
            {
              step: "02",
              title: "Live Enterprise Capstones",
              desc: "Write production code, review pull requests, and architect multi-tier applications instead of basic classroom tutorials.",
            },
            {
              step: "03",
              title: "1:1 Interview Coaching",
              desc: "DSA problem-solving drills, system design reviews, resume rebuilding, and rigorous mock interview rounds.",
            },
            {
              step: "04",
              title: "Direct Placement Drives",
              desc: "Guaranteed interview opportunities with our network of 500+ corporate hiring partners across India and overseas.",
            },
          ].map((item, idx) => (
            <SlideUp key={idx} delay={0.1 + idx * 0.1}>
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-black text-[hsl(195,100%,25%)]/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>

      {/* ── Enterprise Value Pillars ─────────────────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(195,100%,40%)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Award size={16} />
                Corporate & Campus Training
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Upskill Your Engineering Workforce or College Cohort
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Looking for customized corporate bootcamps or campus-to-corporate finishing school programs? Visha IT Solutions partners with universities and enterprise tech divisions to deliver tailor-made curriculum tracks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-[hsl(195,100%,40%)] hover:bg-[hsl(195,100%,35%)] text-white font-semibold text-sm transition-all shadow-lg hover:shadow-cyan-500/25"
                >
                  Request Corporate Training Proposal
                </Link>
                <Link
                  href="/get-a-quote"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/20"
                >
                  Book Free Career Counseling
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <ShieldCheck className="text-cyan-400 mb-3" size={28} />
                <h4 className="font-bold text-white text-base mb-1">Recognized Certification</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Industry-accredited graduation credentials validated by employers.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <Users className="text-cyan-400 mb-3" size={28} />
                <h4 className="font-bold text-white text-base mb-1">Practicing Mentors</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Learn from senior leads active in software product engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
