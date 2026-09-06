import Link from "next/link";
import Image from "next/image";
import {
  FolderGit2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Cpu,
  Database,
  Terminal,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Laptop,
} from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { VISHA_PROJECTS, VishaProjectItem } from "@/data/vishaProjects";

export const metadata: Metadata = {
  title: "Enterprise Projects & Case Studies - Visha IT Solutions",
  description:
    "Explore our portfolio of high-concurrency e-commerce engines, fintech analytics portals, HIPAA telemedicine systems, logistics ERP suites, and AI automation solutions.",
};

const projectIcons = [FolderGit2, Layers, Cpu, Database, Terminal, TrendingUp];

export default function ProjectsPage() {
  const projects: VishaProjectItem[] = VISHA_PROJECTS;

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
              Enterprise Portfolio & Case Studies
            </div>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Engineering & <span className="text-[hsl(190,100%,50%)]">Client Success</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              Delivering mission-critical cloud platforms, high-concurrency systems, and digital transformations across global retail, fintech, healthcare, and logistics operations.
            </p>
          </SlideUp>

          {/* Key Metrics Bar */}
          <SlideUp delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">50+</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Delivered Platforms</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.99%</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Uptime SLA Guaranteed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">$25M+</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Client Value Created</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">15+</div>
                <div className="text-xs sm:text-sm text-cyan-100/80 font-medium">Industry Sectors</div>
              </div>
            </div>
          </SlideUp>
        </div>
      </div>

      {/* ── Projects Grid Section ───────────────────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const IconComponent = projectIcons[idx % projectIcons.length];

            return (
              <SlideUp key={project.id} delay={0.1 + (idx % 3) * 0.1}>
                <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden">
                  {/* Top Image Container with Arched Corners & Floating Badges */}
                  <div className="relative h-60 w-full overflow-hidden rounded-t-[2.5rem] bg-slate-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Floating Top-Left Pill Badge */}
                    {project.badge && (
                      <span className="absolute top-4 left-4 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
                        {project.badge}
                      </span>
                    )}

                    {/* Category Pill */}
                    <div className="absolute top-4 right-4 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {project.category}
                    </div>

                    {/* Floating Bottom-Right Circular Icon Button */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-[hsl(195,100%,25%)] shadow-xl flex items-center justify-center group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300 border border-slate-100">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Client Name Tag */}
                    <div className="flex items-center gap-2 text-xs font-bold text-[hsl(195,100%,28%)] uppercase tracking-wider mb-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                      <span>{project.clientName}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-sm text-slate-600 mb-6 leading-relaxed min-h-[4rem]">
                      {project.shortDescription}
                    </p>

                    {/* Key Deliverables */}
                    <div className="pt-5 border-t border-slate-100 mb-6 flex-grow">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                        Key Deliverables
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {project.deliverables.slice(0, 3).map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-slate-50 text-[11px] font-medium text-slate-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Distinct CTA Button with Arrow */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="w-full h-12 rounded-full border border-slate-200 bg-slate-50/80 text-slate-800 text-sm font-semibold hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </SlideUp>
            );
          })}
        </div>
      </div>

      {/* ── 4-Step Engineering Delivery Framework ─────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 sm:p-14">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[hsl(195,100%,28%)] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-100 inline-block mb-3">
              Engineering Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Stage Production Delivery Model
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Every enterprise project follows a battle-tested engineering framework designed for rapid velocity, zero security defects, and predictable deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[hsl(195,100%,25%)] flex items-center justify-center font-extrabold text-base mb-4">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Discovery & Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Requirements gathering, domain modeling, technical threat analysis, and blueprinting cloud infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[hsl(195,100%,25%)] flex items-center justify-center font-extrabold text-base mb-4">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Agile Sprints & CI/CD</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bi-weekly sprint deliverables, peer-reviewed pull requests, automated tests, and live staging previews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[hsl(195,100%,25%)] flex items-center justify-center font-extrabold text-base mb-4">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Rigorous QA & Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-concurrency stress testing, automated vulnerability scanning, OWASP top 10 compliance, and audits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[hsl(195,100%,25%)] flex items-center justify-center font-extrabold text-base mb-4">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Zero-Downtime Launch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Blue/green cloud rollout, real-time APM telemetry, automated database migration, and ongoing SLA support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Enterprise Impact CTA Banner ──────────────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[hsl(195,100%,20%)] via-[#005a80] to-[hsl(195,100%,28%)] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl relative z-10">
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-wider block mb-2">
              Scale Your Next Vision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Have an Ambitious Project in Mind?
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
              Partner with Visha IT Solutions to architect, build, and deploy high-performance software. Schedule a direct consultation with our principal software architects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href="/get-a-quote"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[hsl(195,100%,25%)] font-bold text-sm hover:bg-cyan-50 transition-all shadow-lg text-center"
            >
              Schedule Project Discovery
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all text-center"
            >
              Contact Engineering
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
