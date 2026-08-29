import connectToDatabase from "@/lib/mongoose";
import Job, { IJob } from "@/lib/models/Job";

export class JobRepository {
  async getAllActiveJobs(): Promise<IJob[]> {
    await connectToDatabase();
    return Job.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  }

  async getJobBySlug(slug: string): Promise<IJob | null> {
    await connectToDatabase();
    return Job.findOne({ slug, isActive: true }).lean();
  }
}

export const jobRepository = new JobRepository();
