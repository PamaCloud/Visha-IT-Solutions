import { publicContentService } from "@/services/publicContentService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MonitorPlay, CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const program = await publicContentService.getTrainingProgram(resolvedParams.slug);
  if (!program) return { title: "Program Not Found" };
  
  return {
    title: `${program.title} Training - Visha IT Solutions`,
    description: program.shortDescription,
  };
}

// Generate beautiful mock data if the database doesn't have the slug yet
const getMockProgram = (slug: string) => {
  const safeSlug = slug || 'training-program';
  const formattedTitle = safeSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: formattedTitle,
    mode: "Online & Classroom",
    duration: "12 Weeks",
    level: "Beginner to Advanced",
    shortDescription: `Master ${formattedTitle} with our comprehensive, industry-aligned training program.`,
    description: `Our ${formattedTitle} training is designed to take you from fundamentals to advanced concepts through hands-on, project-based learning.\n\nLed by industry experts with years of real-world experience, this course bridges the gap between academic learning and industry requirements. You will work on live projects, build a strong portfolio, and gain the confidence needed to excel in your tech career.\n\nWhether you are a fresh graduate looking to start your career or a working professional aiming to upskill, this program is tailored to help you achieve your goals.`,
    syllabus: [
      "Introduction and Core Fundamentals",
      "Advanced Concepts and Best Practices",
      "Real-world Application Development",
      "Industry Tools and Workflows",
      "Live Project Implementation",
      "Interview Preparation and Mock Tests"
    ]
  };
};

export default async function TrainingDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let program = await publicContentService.getTrainingProgram(slug);

  // Fallback to mock data to prevent 404s during UI review
  if (!program) {
    program = getMockProgram(slug);
  }

  return (
    <div className="bg-surface min-h-screen pb-16">
      {/* Sleek, Compact Hero Section */}
      <div className="relative pt-28 pb-16 overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-primary-dark opacity-95"></div>
          {/* Subtle light effects */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-10 w-[20rem] h-[20rem] bg-blue-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="container relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <FadeIn>
            <Link href="/training" className="inline-flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors text-sm font-medium mb-6 group">
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              Back to Training Programs
            </Link>
          </FadeIn>

          <div className="max-w-4xl">
            <SlideUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Training Program</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {program.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold shadow-sm">
                  {program.mode}
                </div>
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
                  <Clock size={14} />
                  {program.duration}
                </div>
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
                  <MonitorPlay size={14} />
                  {program.level}
                </div>
              </div>

              <p className="text-lg text-blue-100/70 leading-relaxed max-w-2xl font-light">
                {program.shortDescription}
              </p>
            </SlideUp>
          </div>
        </div>
      </div>

      {/* Main Content Area - Overlapping the Hero slightly */}
      <div className="container max-w-6xl mx-auto px-4 md:px-6 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Column: Core Content */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            <SlideUp delay={0.1}>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                <h2 className="text-2xl font-bold font-display text-secondary mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full inline-block"></span>
                  Course Overview
                </h2>
                <div className="prose prose-blue max-w-none text-secondary-light/90 text-base">
                  <div className="whitespace-pre-wrap leading-relaxed">{program.description}</div>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                <h3 className="text-xl font-bold font-display text-secondary mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full inline-block"></span>
                  What you will learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.syllabus?.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 bg-surface/50 p-3.5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                      <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                      <span className="font-medium text-secondary text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="sticky top-28 flex flex-col gap-6">
              
              <SlideUp delay={0.2}>
                <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <h3 className="text-xl font-bold font-display mb-2 relative z-10">Enroll in this course</h3>
                  <p className="text-blue-100/80 mb-6 text-sm leading-relaxed relative z-10">
                    Ready to upgrade your skills? Contact us to get pricing and batch schedule details.
                  </p>
                  
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-primary font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)] group/btn">
                    Contact for Enrollment
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SlideUp>

              <SlideUp delay={0.3}>
                 <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                   <h4 className="text-base font-bold text-secondary mb-4 flex items-center gap-2">
                     <CheckCircle2 className="text-primary" size={18} />
                     Why Train With Us
                   </h4>
                   <ul className="space-y-3">
                     <li className="flex items-start gap-2.5 text-secondary-light/90 text-sm">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                       <span>Industry-expert instructors</span>
                     </li>
                     <li className="flex items-start gap-2.5 text-secondary-light/90 text-sm">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                       <span>Hands-on, live project experience</span>
                     </li>
                     <li className="flex items-start gap-2.5 text-secondary-light/90 text-sm">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                       <span>Placement assistance & resume building</span>
                     </li>
                   </ul>
                 </div>
              </SlideUp>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
