import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SlideUp from "@/components/animations/SlideUp";
import { Sparkles } from "lucide-react";
import TrainingLiveCatalog from "@/components/training/TrainingLiveCatalog";
import { readPersistedFile, initialCmsTraining } from "@/lib/cmsStorage";
import connectToDatabase from "@/lib/mongoose";
import TrainingProgram from "@/lib/models/TrainingProgram";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Professional IT Training Programs - Visha IT Solutions",
  description:
    "Master Python Full Stack, MERN Stack, .NET Full Stack, Java Full Stack, Cloud & DevOps, and Data Science. Hands-on capstone projects and 100% placement support.",
};

export default async function TrainingPage() {
  // 1. Load from persistent disk storage (includes all admin-added courses like 'java')
  let programs: any[] = readPersistedFile<any>("training.json", initialCmsTraining);

  // 2. Attempt to merge with MongoDB if connected
  try {
    await connectToDatabase();
    const dbPrograms = await TrainingProgram.find({ isActive: true }).sort({ order: 1 }).lean();
    if (dbPrograms && dbPrograms.length > 0) {
      const map = new Map();
      programs.forEach((p: any) => map.set(p.slug || p._id, p));
      dbPrograms.forEach((p: any) => map.set(p.slug || p._id.toString(), {
        ...p,
        _id: p._id.toString(),
      }));
      programs = Array.from(map.values());
    }
  } catch (err) {
    // Gracefully continue with persistent storage
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Banner */}
      <div className="relative pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32 bg-gradient-to-br from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,32%)] text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-200 text-xs font-semibold tracking-wider uppercase mb-5 border border-white/10">
              <Sparkles size={13} className="text-cyan-300" />
              Career Acceleration &amp; Tech Academy
            </div>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Industry-Aligned <span className="text-[hsl(190,100%,50%)]">IT Training</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              Empower your career with job-ready full-stack, cloud engineering, and modern developer programs. Learn from practicing senior engineers, build production-grade capstone projects, and secure top placement opportunities.
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

      {/* Real-time Dynamic Live Training Catalog (Auto-updates without page refresh) */}
      <TrainingLiveCatalog initialPrograms={programs} />
    </div>
  );
}
