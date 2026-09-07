import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Laptop,
  Award,
  CheckCircle2,
  ShieldCheck,
  Users,
  Code2,
  Briefcase,
  Layers,
  Sparkles,
  Terminal,
  Database,
  Cpu,
} from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { VISHA_TRAINING_PROGRAMS, ALL_TRAINING_PROGRAMS, VishaTrainingItem } from "@/data/vishaTraining";
import TrainingInteractiveTabs from "@/components/training/TrainingInteractiveTabs";
import connectToDatabase from "@/lib/mongoose";
import TrainingProgram from "@/lib/models/TrainingProgram";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  let program = ALL_TRAINING_PROGRAMS.find((p) => p.slug === resolvedParams.slug) ||
    VISHA_TRAINING_PROGRAMS.find((p) => p.slug === resolvedParams.slug);

  if (!program) {
    try {
      await connectToDatabase();
      const dbProg = await TrainingProgram.findOne({ slug: resolvedParams.slug }).lean();
      if (dbProg) {
        return {
          title: `${dbProg.title} Training - Visha IT Solutions`,
          description: dbProg.description?.slice(0, 160),
        };
      }
    } catch {}
  }

  if (!program) return { title: "Training Program - Visha IT Solutions" };

  return {
    title: `${program.title} Training - Visha IT Solutions`,
    description: program.shortDescription,
  };
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let program: VishaTrainingItem | undefined;

  try {
    await connectToDatabase();
    const dbProg: any = await TrainingProgram.findOne({ slug, isActive: true }).lean();
    const staticMatch =
      ALL_TRAINING_PROGRAMS.find((p) => p.slug === slug) ||
      VISHA_TRAINING_PROGRAMS.find((p) => p.slug === slug);

    if (dbProg) {
      program = {
        id: dbProg.slug || dbProg._id.toString(),
        slug: dbProg.slug,
        title: dbProg.title || staticMatch?.title,
        badge: dbProg.badge || staticMatch?.badge || "Professional Track",
        shortDescription: dbProg.shortDescription || staticMatch?.shortDescription || (dbProg.description ? dbProg.description.slice(0, 160) : ""),
        description: dbProg.description || staticMatch?.description || "",
        duration: dbProg.duration || staticMatch?.duration || "6 Months",
        mode: dbProg.mode || staticMatch?.mode || "Hybrid (Online + Lab)",
        level: dbProg.level || staticMatch?.level || "Beginner to Enterprise",
        image: dbProg.image || staticMatch?.image || "/services/training-and-career-development.jpg",
        technologies: (dbProg.technologies && dbProg.technologies.length > 0) ? dbProg.technologies : (staticMatch?.technologies || ["Core Engineering", "Frameworks", "Databases", "Cloud Architecture"]),
        syllabus: (dbProg.syllabus && dbProg.syllabus.length > 0) ? dbProg.syllabus : (staticMatch?.syllabus || (dbProg.curriculum ? dbProg.curriculum.split(",") : [
          "Language & Core Fundamentals",
          "Framework Architecture & Microservices",
          "Database Design & Optimization",
          "Capstone Project & Deployment",
        ])),
        modules: (dbProg.modules && dbProg.modules.length > 0) ? dbProg.modules : (staticMatch?.modules || [
          {
            title: "Module 1: Language & Architecture Fundamentals",
            badge: "Weeks 1 - 4",
            description: `Deep dive into the core architecture, syntax and foundations of ${dbProg.title}.`,
            points: ["Core Architecture & Foundations", "Design Patterns & Object Modeling", "Code Quality & Git"],
          },
          {
            title: "Module 2: Enterprise Services & APIs",
            badge: "Weeks 5 - 8",
            description: "Building production microservices, secure APIs, and middleware pipelines.",
            points: ["RESTful API Architecture", "Microservices & Authentication", "Performance Optimization"],
          },
          {
            title: "Module 3: Capstone & Cloud Deployment",
            badge: "Weeks 9 - 12",
            description: "End-to-end project implementation, containerization, and cloud deployment.",
            points: ["Enterprise Capstone Project", "CI/CD & Cloud Launch", "Placement Preparation"],
          },
        ]),
        careerRoles: (dbProg.careerRoles && dbProg.careerRoles.length > 0) ? dbProg.careerRoles : (staticMatch?.careerRoles || [
          `${dbProg.title} Engineer`,
          "Full Stack Developer",
          "Software Development Engineer",
          "Technical Consultant",
        ]),
      };
    } else if (staticMatch) {
      program = staticMatch;
    }
  } catch (e) {
    console.error("Error fetching program from DB:", e);
    program =
      ALL_TRAINING_PROGRAMS.find((p) => p.slug === slug) ||
      VISHA_TRAINING_PROGRAMS.find((p) => p.slug === slug);
  }

  // Fallback if slug is not matched exactly
  if (!program) {
    const formattedTitle = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    program = {
      id: slug,
      slug: slug,
      title: formattedTitle,
      badge: "Professional Track",
      shortDescription: `Comprehensive, industry-aligned ${formattedTitle} masterclass featuring live practical labs, real-time code reviews, and placement assistance.`,
      description: `Our ${formattedTitle} program is meticulously curated by enterprise architects to prepare engineers for modern technical roles.\n\nYou will gain deep conceptual mastery, write production-grade code, implement microservices, and deploy multi-tier cloud applications. Benefit from 1:1 mentorship, portfolio review, and direct interviews with top hiring partners.`,
      duration: "6 Months",
      mode: "Hybrid (Online + Lab)",
      level: "Beginner to Enterprise",
      technologies: ["Core Engineering", "Frameworks", "Databases", "Cloud Architecture", "Docker", "Git"],
      syllabus: [
        "Language & Core Fundamentals",
        "Framework Architecture & Microservices",
        "Database Design & Query Optimization",
        "RESTful API & Cloud Integration",
        "Enterprise Capstone Project Development",
        "Automated CI/CD & Production Deployment",
      ],
      modules: [
        {
          title: "Module 1: Language & Core Fundamentals",
          badge: "Weeks 1 - 4",
          description: `Deep dive into the core syntax, OOP paradigms, and modular structure of ${formattedTitle}.`,
          points: [
            "Language Foundations & Semantic Standards",
            "Object-Oriented Programming & Design Patterns",
            "Data Structures & Algorithmic Problem Solving",
            "Git Version Control & Code Quality Practices",
          ],
        },
        {
          title: "Module 2: Frameworks & Asynchronous APIs",
          badge: "Weeks 5 - 8",
          description: "Building production-grade services, backend routing, and RESTful APIs.",
          points: [
            "Framework Architecture & Lifecycle",
            "REST API Development & Validation",
            "Authentication, Middleware & Security",
          ],
        },
        {
          title: "Module 3: Database & Cloud Infrastructure",
          badge: "Weeks 9 - 12",
          description: "Relational/NoSQL database integration, query optimization, and caching.",
          points: [
            "Database Schema Modeling & Transactions",
            "In-Memory Caching & Performance Tuning",
            "Cloud Storage & Asynchronous Worker Pipelines",
          ],
        },
        {
          title: "Module 4: Capstone & Production Deployment",
          badge: "Weeks 13 - 16",
          description: "Containerize with Docker and deploy to cloud platforms with CI/CD.",
          points: [
            "Full-Stack Enterprise Capstone Project",
            "Docker Containerization & CI/CD Pipelines",
            "Cloud Rollout & Placement Interview Preparation",
          ],
        },
      ],
      careerRoles: [
        "Software Development Engineer",
        "Full Stack Developer",
        "Backend Specialist",
        "Solutions Architect",
      ],
      image: "/services/training-and-career-development.jpg",
    };
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* ── Section 1: Hero Header & Overview ────────────────────── */}
      <div className="relative pt-24 sm:pt-32 lg:pt-36 pb-28 sm:pb-28 bg-gradient-to-br from-slate-900 via-slate-900 to-[hsl(195,100%,15%)] text-white overflow-hidden">
        {/* Subtle decorative glowing background orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[hsl(195,100%,40%)]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <FadeIn>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-200/80 mb-6 font-medium">
              <Link
                href="/training"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                Back to All Programs
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white truncate">{program.title}</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Badge */}
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-wider uppercase mb-5 border border-cyan-400/20 backdrop-blur-sm">
                  <Sparkles size={13} className="text-cyan-400" />
                  {program.badge || "Career Acceleration"}
                </div>
              </FadeIn>

              {/* Title & Description */}
              <SlideUp delay={0.1}>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                  {program.title}
                </h1>
              </SlideUp>

              <SlideUp delay={0.2}>
                <p className="text-base sm:text-lg text-slate-300 mb-8 font-light leading-relaxed">
                  {program.shortDescription}
                </p>
              </SlideUp>

              {/* Meta Tags Bar */}
              <SlideUp delay={0.25}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold text-white border border-white/10">
                    <Clock size={16} className="text-cyan-300" />
                    <span>Duration: {program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold text-white border border-white/10">
                    <Laptop size={16} className="text-cyan-300" />
                    <span>Format: {program.mode}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold text-white border border-white/10">
                    <Award size={16} className="text-cyan-300" />
                    <span>Level: {program.level}</span>
                  </div>
                </div>
              </SlideUp>

              {/* CTAs */}
              <SlideUp delay={0.3}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-0">
                  <Link
                    href="/get-a-quote"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[hsl(195,100%,35%)] hover:bg-[hsl(195,100%,30%)] text-white font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(0,105,148,0.4)] hover:-translate-y-0.5 w-full sm:w-auto text-center"
                  >
                    <span>Enroll in Next Cohort</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/15 hover:border-white/30"
                  >
                    Request Syllabus PDF
                  </Link>
                </div>
              </SlideUp>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <SlideUp delay={0.2}>
                <div className="relative h-[340px] sm:h-[420px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 bg-slate-900 group">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Floating Tech Stack Badges */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
                      Technologies Covered
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {program.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Interactive Curriculum & Syllabus Breakdown ── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-3">
            Course Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What You Will Master
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Structured modular roadmap engineered to take you from foundational syntax to architecting multi-tier production systems.
          </p>
        </div>

        {/* Interactive Tabs Component */}
        <TrainingInteractiveTabs program={program} />
      </div>

      {/* ── Section 3: Career Outcomes & Roles ───────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-3">
            Career Progression
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Target Industry Roles & Capabilities
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Graduates of this program step directly into high-growth software engineering roles with industry-competitive compensation packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Code2,
              title: "Production-Grade Codebase",
              desc: "Build and publish a comprehensive GitHub portfolio with production capstones that prove your technical skills to hiring managers.",
            },
            {
              icon: Users,
              title: "1:1 Technical Mentorship",
              desc: "Receive individualized code reviews, architectural advice, and guidance from senior leads working in active tech enterprises.",
            },
            {
              icon: Briefcase,
              title: "Job-Ready Role Alignment",
              desc: `Tailored training for high-demand roles including: ${program.careerRoles.join(", ")}.`,
            },
            {
              icon: Award,
              title: "Verified Industry Certificate",
              desc: "Earn an industry-accredited diploma certified by Visha IT Solutions and recognized across our hiring corporate network.",
            },
            {
              icon: ShieldCheck,
              title: "Interview & DSA Mastery",
              desc: "Extensive practice with real company interview questions, algorithmic problem-solving, and live system design interviews.",
            },
            {
              icon: Sparkles,
              title: "100% Placement Assistance",
              desc: "Direct referrals, resume forwarding to 500+ active enterprise partners, and scheduled recruitment drives until placed.",
            },
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section 4: 3-Step Learning Pathway ───────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-slate-900 rounded-[3rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">
              The Learning Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How You Will Progress
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                step: "Phase 01",
                title: "Fundamentals & Practical Drills",
                desc: "Master syntax, core programming semantics, version control, and write daily algorithmic problem sets.",
              },
              {
                step: "Phase 02",
                title: "Advanced Frameworks & APIs",
                desc: "Build full-stack microservices, configure databases, manage states, and implement security tokens.",
              },
              {
                step: "Phase 03",
                title: "Live Capstone & Placement",
                desc: "Deploy an end-to-end multi-tenant application to the cloud, undergo mock interviews, and attend hiring drives.",
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="text-cyan-400 font-extrabold text-sm mb-2">{st.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 5: Bottom CTA Banner ─────────────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,32%)] p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
              Ready to Master {program.title}?
            </h2>
            <p className="text-cyan-100 text-sm sm:text-base mb-8 leading-relaxed">
              New batches are starting soon with limited seats for personalized mentor attention. Reserve your spot today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-a-quote"
                className="px-8 py-3.5 rounded-full bg-white text-[hsl(195,100%,25%)] font-bold text-sm hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Enroll Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
              >
                Talk to an Academic Counselor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
