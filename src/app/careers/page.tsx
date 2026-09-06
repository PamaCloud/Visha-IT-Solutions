import { publicContentService } from "@/services/publicContentService";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowRight, UploadCloud, Sparkles, Zap, ShieldCheck, TrendingUp, Code2, Users, Briefcase } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Visha IT Solutions",
  description: "Join our team of technology experts and shape the future of IT.",
};

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
                  
                  <Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-2 text-[hsl(195,100%,25%)] font-bold hover:text-[hsl(190,100%,45%)] transition-colors mt-auto text-sm group-hover:translate-x-1 duration-200">
                    Learn More <ArrowRight size={16} />
                  </Link>
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

            <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              
              {/* --- Left Column: Personal Information --- */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-[hsl(195,100%,25%)] uppercase tracking-wider mb-2 border-b border-slate-100 pb-2">Personal Information</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name *</label>
                    <input type="text" required placeholder="John" className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name *</label>
                    <input type="text" required placeholder="Doe" className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input type="email" required placeholder="john.doe@example.com" className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
                    <input type="tel" required placeholder="+1 (555) 123-4567" className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Company (Optional)</label>
                  <input type="text" placeholder="Current company name" className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">LinkedIn Profile</label>
                    <input type="url" placeholder="https://linkedin.com/in/..." className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Portfolio / Website</label>
                    <input type="url" placeholder="https://yourportfolio.com" className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white" />
                  </div>
                </div>
              </div>

              {/* --- Right Column: Application Details --- */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-[hsl(195,100%,25%)] uppercase tracking-wider mb-2 border-b border-slate-100 pb-2">Application Details</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Position *</label>
                    <select required className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all bg-slate-50/50 hover:bg-white text-slate-700 cursor-pointer">
                      <option value="">Select a position</option>
                      {jobs.map((job: any) => (
                        <option key={job._id} value={job._id}>{job.title || job.jobTitle}</option>
                      ))}
                      <option value="general">General Application</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Experience Level *</label>
                    <select required className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all bg-slate-50/50 hover:bg-white text-slate-700 cursor-pointer">
                      <option value="">Select level</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="lead">Lead / Manager</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Resume/CV *</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-cyan-50 hover:border-[hsl(190,100%,45%)] transition-all cursor-pointer group bg-slate-50/50">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:bg-[hsl(195,100%,25%)] transition-colors">
                      <UploadCloud size={18} className="text-[hsl(195,100%,25%)] group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-[hsl(195,100%,25%)] mb-1">Click to upload or drag & drop</p>
                    <p className="text-xs text-slate-400 font-medium">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Cover Letter (Optional)</label>
                  <textarea rows={3} placeholder="Tell us why you'd be a great fit..." className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(190,100%,45%)] transition-all placeholder:text-slate-400 bg-slate-50/50 hover:bg-white resize-none"></textarea>
                </div>
              </div>

              {/* --- Full Width Submit --- */}
              <div className="lg:col-span-2 pt-6 mt-2 border-t border-slate-100 flex justify-end">
                <button type="button" className="w-full md:w-auto px-12 py-4 rounded-xl bg-[hsl(195,100%,25%)] hover:bg-[hsl(195,100%,20%)] text-white font-bold text-base shadow-[0_4px_18px_rgba(0,105,148,0.25)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
