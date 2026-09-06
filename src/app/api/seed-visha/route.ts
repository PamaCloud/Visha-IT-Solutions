import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import TrainingProgram from "@/lib/models/TrainingProgram";
import Project from "@/lib/models/Project";
import { VISHA_SERVICES } from "@/data/vishaServices";
import { VISHA_TRAINING_PROGRAMS } from "@/data/vishaTraining";
import { VISHA_PROJECTS } from "@/data/vishaProjects";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Sync Services with all rich fields
    await Service.deleteMany({});
    const servicesToInsert = VISHA_SERVICES.map((s, idx) => ({
      title: s.title,
      slug: s.slug,
      badge: s.badge || "Enterprise Grade",
      shortDescription: s.shortDescription,
      description: s.description,
      iconName: s.iconName || "Users",
      subServices: s.subServices || [],
      features: s.features || [],
      ctaText: s.ctaText || "Explore Service →",
      ctaLink: `/contact?service=${s.slug}`,
      image: s.image,
      isActive: true,
      order: idx + 1,
    }));
    await Service.insertMany(servicesToInsert);

    // 2. Sync Training Programs with all 6 REAL MODULES and full topic points
    await TrainingProgram.deleteMany({});
    const trainingToInsert = VISHA_TRAINING_PROGRAMS.map((t, idx) => ({
      title: t.title,
      slug: t.slug,
      badge: t.badge || "Most Popular",
      shortDescription: t.shortDescription,
      description: t.description,
      duration: t.duration,
      eligibility: "Students & Working Professionals",
      mode: t.mode,
      level: t.level || "Beginner to Enterprise",
      technologies: t.technologies || [],
      syllabus: t.syllabus || [],
      modules: t.modules || [],
      careerRoles: t.careerRoles || [],
      image: t.image || "/services/training-and-career-development.jpg",
      curriculum: t.syllabus?.join(", ") || "",
      projectDetails: `${t.title} Capstone Project`,
      fee: "INR 35,000",
      status: "upcoming",
      isActive: true,
      order: idx + 1,
    }));
    await TrainingProgram.insertMany(trainingToInsert);

    // 3. Sync Projects with all deliverables & performance metrics
    await Project.deleteMany({});
    const projectsToInsert = VISHA_PROJECTS.map((p, idx) => ({
      title: p.title,
      slug: p.slug,
      clientName: p.clientName || "Enterprise Client",
      category: p.category,
      badge: p.badge || "Production Deployed",
      shortDescription: p.shortDescription || p.description?.slice(0, 160),
      description: p.description,
      technologies: p.technologies || [],
      metrics: p.metrics || [],
      deliverables: p.deliverables || [],
      image: p.image,
      outcome: p.outcome || "Production deployed enterprise software",
      projectUrl: "https://vishait.com",
      featured: true,
      isActive: true,
      order: idx + 1,
    }));
    await Project.insertMany(projectsToInsert);

    return NextResponse.json({
      success: true,
      message: "Successfully synchronized exact services, projects, and training programs with all real modules into MongoDB!",
      count: {
        services: servicesToInsert.length,
        training: trainingToInsert.length,
        projects: projectsToInsert.length,
      },
    });
  } catch (error: any) {
    console.error("Failed to seed Visha content:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to seed content" },
      { status: 500 }
    );
  }
}
