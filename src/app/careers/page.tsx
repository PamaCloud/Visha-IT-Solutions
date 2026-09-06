import { publicContentService } from "@/services/publicContentService";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowRight, UploadCloud } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Visha IT Solutions",
  description: "Join our team of technology experts and shape the future of IT.",
};

const benefits = [
  { title: "Industry-Leading Compensation", desc: "Competitive salaries paired with performance bonuses." },
  { title: "Comprehensive Health", desc: "Full medical, dental & vision for you and your family." },
  { title: "Hybrid Work Freedom", desc: "Remote-first culture with flexible schedules." },
  { title: "Professional Growth", desc: "Learning stipends, certifications & mentorship." },
  { title: "Cutting-Edge Projects", desc: "Build solutions in AI, cloud & quantum tech." },
  { title: "Collaborative Culture", desc: "Diverse teams where ideas thrive and voices are heard." },
];

export default async function CareersPage() {
  const jobs = await publicContentService.getActiveJobs();

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Hero Section (80vh Viewport) */}
      <section className="pt-28 pb-16 lg:pt-20 lg:pb-0 min-h-[80vh] flex items-center bg-white relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl py-10">
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Careers at <br/>Visha IT Solutions
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed mb-8">
                Build your future with a team that values innovation, growth, and impact.
              </p>
              {/* Smooth scroll anchor link */}
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                View Openings
              </a>
            </div>
            {/* Right Image */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[65vh] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100">
              <Image 
                src="/careers-hero.jpg" 
                alt="Careers at Visha IT"
                fill
                priority
                quality={100}
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Open Roles Section */}
      <section id="open-roles" className="py-24 sm:py-32 bg-[#1a1f2b] scroll-mt-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-slate-400 tracking-[0.2em] uppercase mb-3">OPEN ROLES</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Explore Our Opportunities
            </h3>
          </div>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job: any) => (
                <div key={job._id} className="bg-[#232936] border border-slate-700/50 rounded-2xl p-8 hover:bg-[#2a303d] transition-colors flex flex-col h-full shadow-lg group/card">
                  <h4 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover/card:text-[hsl(190,100%,65%)] transition-colors">{job.title || job.jobTitle}</h4>
                  
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-medium uppercase tracking-wide mb-6">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate-500" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-500" /> {job.type || job.employmentType}
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                    {job.description}
                  </p>
                  
                  <Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-2 text-[hsl(190,100%,65%)] font-semibold hover:text-[hsl(190,100%,75%)] transition-colors mt-auto text-sm group">
                    Learn More <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center p-12 bg-[#232936] rounded-2xl border border-slate-700/50 shadow-lg">
              <h4 className="text-xl font-medium text-slate-300">No open positions right now. Please check back later!</h4>
            </div>
          )}
        </div>
      </section>

      {/* 3. Benefits Section */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-slate-500 tracking-[0.2em] uppercase mb-4">BENEFITS</h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Why Work With Us
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-[#1a1f2b] rounded-3xl p-10 shadow-xl hover:-translate-y-1 transition-transform duration-300 group">
                <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{b.title}</h4>
                <p className="text-slate-300 text-sm leading-relaxed font-light">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Apply Now Form */}
      <section className="py-24 sm:py-32 bg-white border-t border-slate-100">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
              Apply Now
            </h3>
            <p className="text-slate-600 text-lg">
              Ready to join our team? Fill out the form below to submit your application.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100">
            <h4 className="text-2xl font-bold text-slate-900 mb-10 tracking-tight">Apply for a Position</h4>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name *</label>
                  <input type="text" required placeholder="John" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name *</label>
                  <input type="text" required placeholder="Doe" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                  <input type="email" required placeholder="john.doe@example.com" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                  <input type="tel" required placeholder="+1 (555) 123-4567" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Position *</label>
                  <select required className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all bg-white text-slate-700">
                    <option value="">Select a position</option>
                    {jobs.map((job: any) => (
                      <option key={job._id} value={job._id}>{job.title || job.jobTitle}</option>
                    ))}
                    <option value="general">General Application</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Experience Level *</label>
                  <select required className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all bg-white text-slate-700">
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead / Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current Company</label>
                <input type="text" placeholder="Current company name" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Resume/CV *</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-200 transition-colors">
                    <UploadCloud className="text-slate-500 group-hover:text-slate-700 transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-[hsl(195,100%,25%)] mb-1">Upload a file or drag and drop</p>
                  <p className="text-xs text-slate-400">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Cover Letter (Optional)</label>
                <textarea rows={4} placeholder="Tell us why you'd be a great fit for this role..." className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Portfolio/Website</label>
                  <input type="url" placeholder="https://yourportfolio.com" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">LinkedIn Profile</label>
                  <input type="url" placeholder="https://linkedin.com/in/yourprofile" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,25%)] focus:border-transparent transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100">
                <button type="button" className="w-full py-4 rounded-xl bg-[#ff8c42] hover:bg-[#ff7b25] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
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
