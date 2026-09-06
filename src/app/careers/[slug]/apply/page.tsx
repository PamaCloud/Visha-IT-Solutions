import { publicContentService } from "@/services/publicContentService";
import { notFound } from "next/navigation";
import CareerApplicationForm from "@/components/forms/CareerApplicationForm";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const job = await publicContentService.getJob(resolvedParams.slug);
  if (!job) return { title: "Job Not Found - Visha IT Solutions" };

  return {
    title: `Apply for ${job.title} | Careers - Visha IT Solutions`,
    description: `Apply directly for the ${job.title} role at Visha IT Solutions. Join our dynamic tech team.`,
  };
}

export default async function JobApplyPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const [job, allJobs] = await Promise.all([
    publicContentService.getJob(resolvedParams.slug),
    publicContentService.getActiveJobs(),
  ]);

  if (!job) {
    notFound();
  }

  const activeJobTitles: string[] = allJobs
    .map((j: any) => j.title || j.jobTitle)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/70 py-12 md:py-16">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/careers/${job.slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[hsl(195,100%,25%)] transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to {job.title} Details
          </Link>
          <Link
            href="/careers"
            className="text-xs font-bold text-slate-500 hover:text-[hsl(195,100%,25%)] transition-colors"
          >
            View All Openings &rarr;
          </Link>
        </div>

        {/* Application Card */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
          {/* Subtle Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 font-bold text-xs uppercase tracking-wider mb-3 shadow-2xs">
              <Sparkles size={13} className="text-cyan-600" />
              Direct Job Application
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Submit Your Application
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Applying for{" "}
              <strong className="text-slate-900 font-bold">{job.title}</strong>. Fill
              out the form below to apply directly to our recruitment team.
            </p>
          </div>

          <div className="relative z-10">
            <CareerApplicationForm
              defaultPosition={job.title}
              availablePositions={activeJobTitles}
              jobContext={{
                title: job.title,
                department: job.department,
                location: job.location,
                type: job.type || job.employmentType,
                experience: job.experience,
                slug: job.slug,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
