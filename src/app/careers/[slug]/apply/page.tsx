import { publicContentService } from "@/services/publicContentService";
import { notFound } from "next/navigation";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await publicContentService.getJob(params.slug);
  if (!job) return { title: "Job Not Found" };
  
  return {
    title: `Apply for ${job.title} - Visha IT Solutions`,
  };
}

export default async function JobApplyPage({ params }: { params: { slug: string } }) {
  const job = await publicContentService.getJob(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="bg-surface min-h-screen py-16">
      <div className="container max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">Apply for {job.title}</h1>
            <p className="text-secondary-light">
              Join the {job.department} team at Visha IT Solutions
            </p>
          </div>
          
          <JobApplicationForm jobId={job._id.toString()} />
        </div>
      </div>
    </div>
  );
}
