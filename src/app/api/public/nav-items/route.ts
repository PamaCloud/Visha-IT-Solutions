import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import Project from "@/lib/models/Project";
import TrainingProgram from "@/lib/models/TrainingProgram";
import { VISHA_SERVICES } from "@/data/vishaServices";
import { VISHA_PROJECTS } from "@/data/vishaProjects";
import { VISHA_TRAINING_PROGRAMS } from "@/data/vishaTraining";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const [dbServices, dbProjects, dbTraining] = await Promise.all([
      Service.find({ isActive: true }).sort({ order: 1 }).lean(),
      Project.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean(),
      TrainingProgram.find({ isActive: true }).sort({ order: 1 }).lean(),
    ]);

    const services = dbServices && dbServices.length > 0
      ? dbServices.map((s: any) => ({
          id: s._id.toString(),
          slug: s.slug,
          title: s.title,
          badge: s.badge || "",
          shortDescription: s.shortDescription || "",
          iconName: s.iconName || "Users",
          image: s.image || "/services/website-development.jpg",
          subServices: s.subServices || [],
          ctaText: s.ctaText || "Learn More →",
          ctaLink: s.ctaLink || `/services/${s.slug}`,
        }))
      : VISHA_SERVICES;

    const projects = dbProjects && dbProjects.length > 0
      ? dbProjects.map((p: any) => ({
          id: p._id.toString(),
          slug: p.slug,
          title: p.title,
          clientName: p.clientName || "Client Project",
          category: p.category || "Web Application",
          badge: p.badge || "Featured",
          shortDescription: p.shortDescription || "",
          image: p.image || "/services/ecommerce-solutions.jpg",
          technologies: p.technologies || [],
          deliverables: p.deliverables || [],
          metrics: p.metrics || [],
          outcome: p.outcome || "",
        }))
      : VISHA_PROJECTS;

    const training = dbTraining && dbTraining.length > 0
      ? dbTraining.map((t: any) => ({
          id: t._id.toString(),
          slug: t.slug,
          title: t.title,
          badge: t.badge || "Professional Track",
          shortDescription: t.shortDescription || "",
          duration: t.duration || "6 Months",
          mode: t.mode || "Hybrid",
          level: t.level || "Beginner to Pro",
          image: t.image || "/services/training-and-career-development.jpg",
          technologies: t.technologies || [],
          syllabus: t.syllabus || [],
          careerRoles: t.careerRoles || [],
        }))
      : VISHA_TRAINING_PROGRAMS;

    return NextResponse.json({
      success: true,
      data: {
        services,
        projects,
        training,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      data: {
        services: VISHA_SERVICES,
        projects: VISHA_PROJECTS,
        training: VISHA_TRAINING_PROGRAMS,
      },
    });
  }
}
