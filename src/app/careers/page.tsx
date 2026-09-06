import { publicContentService } from "@/services/publicContentService";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowRight, UploadCloud, Sparkles, Zap, ShieldCheck, TrendingUp, Code2, Users, Briefcase } from "lucide-react";
import CareerApplicationForm from "@/components/forms/CareerApplicationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Visha IT Solutions",
  description: "Join our team of technology experts and shape the future of IT.",
};

export const dynamic = "force-dynamic";

const benefits = [
  { title: "Industry-Leading Compensation", desc: "Competitive salaries paired with performance bonuses.", icon: TrendingUp },
  { title: "Comprehensive Health", desc: "Full medical, dental & vision for you and your family.", icon: ShieldCheck },
  { title: "Hybrid Work Freedom", desc: "Remote-first culture with flexible schedules.", icon: Zap },
  { title: "Professional Growth", desc: "Learning stipends, certifications & mentorship.", icon: Code2 },
  { title: "Cutting-Edge Projects", desc: "Build solutions in AI, cloud & quantum tech.", icon: Briefcase },
  { title: "Collaborative Culture", desc: "Diverse teams where ideas thrive and voices are heard.", icon: Users },
];

export default async function CareersPage() {
  const jobs = await publicContentService.getActiveJobs();

  return (
    <div className="bg-slate-50/50 min-h-screen pb-24 text-slate-900 font-sans">
      
      {/* ── 1. Hero Section (Exact Services Layout) ─────────────── */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-5">
                <Sparkles size={13} />
                Join Our Team
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Careers at{" "}
                <span className="text-[hsl(190,100%,45%)] inline-block">
                  Visha IT
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed mb-8">
                Build your future with a team that values innovation, growth, and impact. We are always looking for exceptional talent to join our practice areas.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#open-roles"
                  className="px-8 py-3.5 rounded-full bg-[hsl(195,100%,25%)] hover:bg-[hsl(195,100%,20%)] text-white font-semibold text-sm shadow-[0_4px_18px_rgba(0,105,148,0.25)] hover:shadow-lg transition-all duration-200"
                >
                  View Openings
                </Link>

                <Link
                  href="#application-form"
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-xs transition-all duration-200"
                >
                  General Application
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6">
              <div className="relative h-[340px] sm:h-[420px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 bg-slate-900 group">
                <Image 
                  src="/careers-hero.jpg" 
                  alt="Careers at Visha IT"
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                <span className="absolute top-6 left-6 text-xs font-bold px-4 py-1.5 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
                  Visha IT Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Benefits Section ─────────────── */}
      <section className="py-20 bg-white/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Why Work With Us
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light">
              Experience unparalleled growth opportunities designed to accelerate your career and drive personal success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[2.5rem] p-8 sm:p-9 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mb-6">
                    <IconComp size={22} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {benefit.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Open Roles ────────────── */}
      <section id="open-roles" className="py-24 scroll-mt-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Explore Open Roles
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-light">
              Find the perfect position that matches your skills and ambitions.
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job: any) => (
                <div key={job._id} className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group">
                  {/* Subtle Background Badge */}
                  <span className="absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-100">
                    {job.type || job.employmentType}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight pr-24">
                    {job.title || job.jobTitle}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs sm:text-sm font-semibold mb-6">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-cyan-500" /> {job.location}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-3 mt-auto pt-5 border-t border-slate-100">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[hsl(195,100%,25%)] font-bold transition-colors text-xs sm:text-sm group-hover:translate-x-0.5 duration-200"
                    >
                      Learn More <ArrowRight size={15} />
                    </Link>
                    <Link
                      href={`/careers/${job.slug}/apply`}
                      className="px-5 py-2.5 rounded-xl bg-[hsl(195,100%,25%)] hover:bg-[hsl(195,100%,20%)] text-white font-bold text-xs tracking-wide shadow-xs hover:shadow-md transition-all cursor-pointer inline-flex items-center justify-center"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-3">No Open Positions Currently</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We are always looking for great talent. Feel free to submit a general application below, and we will keep you in mind for future roles!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Application Form (Wide 2-Column Layout) ─────────────── */}
      <section id="application-form" className="py-20 scroll-mt-20">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                Submit Your Application
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Fill out the form below to apply directly to our recruitment team.
              </p>
            </div>

            <div className="relative z-10">
              <CareerApplicationForm
                availablePositions={jobs.map((j: any) => j.title || j.jobTitle).filter(Boolean)}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
