import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import Project from "@/lib/models/Project";
import TrainingProgram from "@/lib/models/TrainingProgram";
import { jobRepository } from "@/repositories/jobRepository";
import { VISHA_SERVICES, VishaServiceItem } from "@/data/vishaServices";
import { VISHA_PROJECTS, VishaProjectItem } from "@/data/vishaProjects";
import { VISHA_TRAINING_PROGRAMS, ALL_TRAINING_PROGRAMS, VishaTrainingItem } from "@/data/vishaTraining";

export const publicContentService = {
  // Services
  async getActiveServices(): Promise<VishaServiceItem[]> {
    try {
      await connectToDatabase();
      const services = await Service.find({ isActive: true }).sort({ order: 1 }).lean();
      if (services && services.length > 0) {
        return JSON.parse(JSON.stringify(services));
      }
    } catch (e) {
      console.error("publicContentService.getActiveServices error:", e);
    }
    return VISHA_SERVICES;
  },

  async getServiceBySlug(slug: string): Promise<VishaServiceItem | null> {
    try {
      await connectToDatabase();
      const service = await Service.findOne({ slug, isActive: true }).lean();
      if (service) {
        return JSON.parse(JSON.stringify(service));
      }
    } catch (e) {
      console.error("publicContentService.getServiceBySlug error:", e);
    }
    return VISHA_SERVICES.find((s) => s.slug === slug) || null;
  },

  // Projects
  async getActiveProjects(): Promise<VishaProjectItem[]> {
    try {
      await connectToDatabase();
      const projects = await Project.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
      if (projects && projects.length > 0) {
        return JSON.parse(JSON.stringify(projects));
      }
    } catch (e) {
      console.error("publicContentService.getActiveProjects error:", e);
    }
    return VISHA_PROJECTS;
  },

  async getProject(slug: string): Promise<VishaProjectItem | null> {
    try {
      await connectToDatabase();
      const project = await Project.findOne({ slug, isActive: true }).lean();
      if (project) {
        return JSON.parse(JSON.stringify(project));
      }
    } catch (e) {
      console.error("publicContentService.getProject error:", e);
    }
    return VISHA_PROJECTS.find((p) => p.slug === slug) || null;
  },

  // Training
  async getActiveTrainingPrograms(): Promise<VishaTrainingItem[]> {
    try {
      await connectToDatabase();
      const programs = await TrainingProgram.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
      if (programs && programs.length > 0) {
        return JSON.parse(JSON.stringify(programs));
      }
    } catch (e) {
      console.error("publicContentService.getActiveTrainingPrograms error:", e);
    }
    return VISHA_TRAINING_PROGRAMS;
  },

  async getTrainingProgram(slug: string): Promise<VishaTrainingItem | null> {
    try {
      await connectToDatabase();
      const program = await TrainingProgram.findOne({ slug, isActive: true }).lean();
      if (program) {
        return JSON.parse(JSON.stringify(program));
      }
    } catch (e) {
      console.error("publicContentService.getTrainingProgram error:", e);
    }
    return (
      ALL_TRAINING_PROGRAMS.find((p) => p.slug === slug) ||
      VISHA_TRAINING_PROGRAMS.find((p) => p.slug === slug) ||
      null
    );
  },

  // Jobs
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
};
