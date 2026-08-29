import connectToDatabase from "@/lib/mongoose";
import Project, { IProject } from "@/lib/models/Project";

export class ProjectRepository {
  async getAllActiveProjects(): Promise<IProject[]> {
    await connectToDatabase();
    return Project.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  }

  async getProjectBySlug(slug: string): Promise<IProject | null> {
    await connectToDatabase();
    return Project.findOne({ slug, isActive: true }).lean();
  }
}

export const projectRepository = new ProjectRepository();
