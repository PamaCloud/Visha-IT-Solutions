import { publicContentService } from "@/services/publicContentService";
import Link from "next/link";
import { GraduationCap, Clock, MonitorPlay, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Professional Training - Visha IT Solutions",
  description: "Advance your career with our industry-leading IT training programs.",
};

// Fallback mock data to ensure the grid always looks full and professional
const MOCK_PROGRAMS = [
  {
    _id: "mock1",
    slug: "full-stack-development",
    title: "Full Stack Development",
    shortDescription: "Master MERN stack and build scalable web applications from scratch.",
    mode: "Hybrid",
    duration: "6 Months",
    level: "Beginner to Advanced"
  },
  {
    _id: "mock2",
    slug: "advanced-java-programming",
    title: "Advanced Java Programming",
    shortDescription: "Deep dive into Spring Boot, Microservices, and enterprise Java development.",
    mode: "Online",
    duration: "4 Months",
    level: "Intermediate"
  },
  {
    _id: "mock3",
    slug: "cloud-computing-aws",
    title: "Cloud Computing & AWS",
    shortDescription: "Learn to architect, deploy, and scale applications on Amazon Web Services.",
    mode: "Online",
    duration: "3 Months",
    level: "Intermediate"
  }
];

export default async function TrainingPage() {
  let programs = await publicContentService.getActiveTrainingPrograms();

  // If DB is empty or has too few items, use mock data to fill the grid
  if (!programs || programs.length < 3) {
    const existingSlugs = programs.map((p: any) => p.slug);
    const missingMocks = MOCK_PROGRAMS.filter(m => !existingSlugs.includes(m.slug));
    programs = [...programs, ...missingMocks];
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-surface">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-gradient-to-bl from-blue-500/10 via-primary/5 to-surface rounded-bl-full blur-[100px] -z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary"></div>
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                ACADEMY
              </h2>
              <div className="w-8 h-[2px] bg-primary"></div>
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4 tracking-tight">
              IT Training Programs
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-base md:text-lg text-secondary-light leading-relaxed max-w-2xl mx-auto">
              Empower yourself with high-demand tech skills. Our training programs are designed by industry experts to get you job-ready in months, not years.
            </p>
          </SlideUp>
        </div>

        {programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program: any, idx: number) => (
              <SlideUp key={program._id || program.slug} delay={0.1 + (idx * 0.1)}>
                <div className="group h-full bg-white/80 backdrop-blur-xl border border-white rounded-[1.5rem] p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-400 relative overflow-hidden">
                  
                  {/* Decorative background circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="w-12 h-12 bg-white border border-gray-100 text-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <GraduationCap size={24} strokeWidth={1.5} />
                    </div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {program.mode}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold font-display text-secondary mb-3 group-hover:text-primary transition-colors relative z-10 leading-tight">
                    {program.title}
                  </h3>
                  
                  <p className="text-secondary-light/90 text-sm mb-6 flex-grow leading-relaxed relative z-10">
                    {program.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-secondary-light font-medium mb-8 relative z-10">
                    <div className="flex items-center gap-1.5 bg-surface/50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <Clock size={14} className="text-primary" /> {program.duration}
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface/50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <MonitorPlay size={14} className="text-primary" /> {program.level}
                    </div>
                  </div>

                  <Link href={`/training/${program.slug}`} className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-surface/80 border border-gray-100 text-secondary text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md group-hover:border-primary/20 relative z-10 group/btn">
                    View Course Details
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SlideUp>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="text-center p-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white">
              <h4 className="text-lg font-medium text-secondary-light">New training programs are launching soon. Check back later!</h4>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
