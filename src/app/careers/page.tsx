import { publicContentService } from "@/services/publicContentService";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Careers - Visha IT Solutions",
  description: "Join our team of technology experts and shape the future of IT.",
};

export default async function CareersPage() {
  const jobs = await publicContentService.getActiveJobs();

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden bg-surface">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-gradient-to-bl from-primary/10 via-blue-50/50 to-surface rounded-bl-full blur-[100px] -z-10"></div>
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <h2 className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">
                JOIN THE TEAM
              </h2>
              <div className="w-12 h-[2px] bg-primary"></div>
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6 tracking-tight">
              Careers at Visha IT
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-base md:text-xl text-secondary-light leading-relaxed max-w-2xl mx-auto">
              We are always looking for talented individuals who are passionate about technology and innovation. Explore our open positions below.
            </p>
          </SlideUp>
        </div>

        {jobs.length > 0 ? (
          <div className="flex flex-col gap-5 md:gap-6">
            {jobs.map((job: any, idx: number) => (
              <SlideUp key={job._id} delay={0.1 + (idx * 0.1)}>
                <div className="group bg-white/70 backdrop-blur-xl border border-white/50 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6 overflow-hidden relative">
                  
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>

                  <div className="relative z-10 flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold font-display text-secondary mb-3 group-hover:text-primary transition-colors">{job.title || job.jobTitle}</h3>
                    <div className="flex flex-wrap gap-2 md:gap-4 text-secondary-light text-xs md:text-sm font-medium mb-4">
                      <div className="flex items-center gap-1.5 bg-surface/80 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Briefcase size={16} className="text-primary" /> {job.department}
                      </div>
                      <div className="flex items-center gap-1.5 bg-surface/80 px-3 py-1.5 rounded-lg border border-gray-100">
                        <MapPin size={16} className="text-primary" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 bg-surface/80 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Clock size={16} className="text-primary" /> {job.type || job.employmentType}
                      </div>
                    </div>
                    <p className="text-secondary-light text-sm md:text-base line-clamp-2 max-w-3xl leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  <div className="shrink-0 relative z-10 mt-2 md:mt-0 w-full md:w-auto">
                    <Link href={`/careers/${job.slug}`} className="flex w-full md:inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-surface/80 border border-gray-200 text-secondary font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(14,165,233,0.3)] group-hover/btn relative group/btn">
                      View Details
                      <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="text-center p-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50">
              <h4 className="text-xl font-medium text-secondary-light">No open positions right now. Please check back later!</h4>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
