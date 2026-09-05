import { publicContentService } from "@/services/publicContentService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, PlayCircle, Wallet, CalendarDays, CheckCircle2, Building2, Users } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const job = await publicContentService.getJob(resolvedParams.slug);
  if (!job) return { title: "Job Not Found" };
  
  return {
    title: `${job.title} - Careers - Visha IT Solutions`,
    description: `Apply for ${job.title} at Visha IT Solutions.`,
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const job = await publicContentService.getJob(resolvedParams.slug);

  if (!job) {
    notFound();
  }

  // Parse requirements to create skill pills if it's a string
  let skills = [];
  if (Array.isArray(job.requirements)) {
    skills = job.requirements;
  } else if (typeof job.requirements === 'string') {
    skills = job.requirements.split('.').filter((r: string) => r.trim().length > 0).map((r: string) => r.trim());
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pt-32 pb-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link href="/careers" className="text-secondary-light hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 w-fit">
            &larr; Back to all jobs
          </Link>
        </div>

        {/* Main Job Card (Internshala Style) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-secondary mb-2 font-display">{job.title || job.jobTitle}</h1>
                <div className="flex items-center gap-2 text-secondary-light mb-4">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="font-medium">Visha IT Solutions</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-light text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-surface rounded-xl flex items-center justify-center border border-gray-100 p-2 shrink-0">
                <img src="/favicon.png" alt="Visha IT Solutions" className="w-full h-full object-contain rounded-md" />
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-secondary-light text-xs uppercase tracking-wider font-semibold">
                  <PlayCircle size={14} /> Start Date
                </div>
                <span className="text-secondary font-medium">Immediately</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-secondary-light text-xs uppercase tracking-wider font-semibold">
                  <Clock size={14} /> Experience
                </div>
                <span className="text-secondary font-medium">{job.experienceRequired || job.experience || "0-2 Years"}</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-secondary-light text-xs uppercase tracking-wider font-semibold">
                  <Wallet size={14} /> CTC
                </div>
                <span className="text-secondary font-medium">Not disclosed</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-secondary-light text-xs uppercase tracking-wider font-semibold">
                  <CalendarDays size={14} /> Apply By
                </div>
                <span className="text-secondary font-medium">Rolling Basis</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                {job.type || job.employmentType || "Full-time"}
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                {job.department}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-8">
            <h3 className="text-lg font-bold text-secondary mb-4">About the job</h3>
            <div className="prose prose-blue max-w-none text-secondary-light whitespace-pre-wrap leading-relaxed text-sm mb-8">
              {job.description}
            </div>

            <h3 className="text-lg font-bold text-secondary mb-4">Skill(s) required</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill: string, idx: number) => (
                <span key={idx} className="bg-surface border border-gray-100 text-secondary-light px-4 py-1.5 rounded-full text-sm font-medium hover:border-primary/30 transition-colors">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-bold text-secondary mb-4">Who can apply</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-secondary-light text-sm">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                <span>Are available for the work from home/office job</span>
              </li>
              <li className="flex items-start gap-3 text-secondary-light text-sm">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                <span>Have the relevant skills and interests</span>
              </li>
            </ul>

            <h3 className="text-lg font-bold text-secondary mb-4">Number of openings</h3>
            <div className="text-secondary-light text-sm flex items-center gap-2 mb-10">
              <Users size={16} className="text-gray-400" />
              2
            </div>

            {/* Apply Button */}
            <div className="flex justify-center border-t border-gray-100 pt-8 mt-4">
              <Link href={`/careers/${job.slug}/apply`} className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-12 rounded-xl transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 w-full sm:w-auto text-center">
                Apply now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
