import { jobRepository } from "@/repositories/jobRepository";
import { trainingRepository } from "@/repositories/trainingRepository";
import { projectRepository } from "@/repositories/projectRepository";

// Since they are simple pass-throughs with serialization, I will combine them into one file for convenience
// In a real huge app, these would be separate files.
export const publicContentService = {
  async getActiveJobs() {
    try {
      const jobs = await jobRepository.getAllActiveJobs();
      return JSON.parse(JSON.stringify(jobs));
    } catch (e) {
      return [];
    }
  },
  async getJob(slug: string) {
    try {
      const job = await jobRepository.getJobBySlug(slug);
      return job ? JSON.parse(JSON.stringify(job)) : null;
    } catch (e) {
      return null;
    }
  },

  async getActiveTrainingPrograms() {
    try {
      const programs = await trainingRepository.getAllActivePrograms();
      return JSON.parse(JSON.stringify(programs));
    } catch (e) {
      return [];
    }
  },
  async getTrainingProgram(slug: string) {
    try {
      const program = await trainingRepository.getProgramBySlug(slug);
      return program ? JSON.parse(JSON.stringify(program)) : null;
    } catch (e) {
      return null;
    }
  },

  async getActiveProjects() {
    try {
      const projects = await projectRepository.getAllActiveProjects();
      return JSON.parse(JSON.stringify(projects));
    } catch (e) {
      return [];
    }
  },
  async getProject(slug: string) {
    try {
      const project = await projectRepository.getProjectBySlug(slug);
      return project ? JSON.parse(JSON.stringify(project)) : null;
    } catch (e) {
      return null;
    }
  }
};
