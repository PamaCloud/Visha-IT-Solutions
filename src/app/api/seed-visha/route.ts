import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import TrainingProgram from "@/lib/models/TrainingProgram";
import Project from "@/lib/models/Project";
import Job from "@/lib/models/Job";
import { VISHA_SERVICES } from "@/data/vishaServices";
import { VISHA_TRAINING_PROGRAMS } from "@/data/vishaTraining";
import { VISHA_PROJECTS } from "@/data/vishaProjects";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Sync Services
    await Service.deleteMany({});
    const servicesToInsert = VISHA_SERVICES.map((s, idx) => ({
      title: s.title,
      slug: s.slug,
      shortDescription: s.shortDescription,
      description: s.description,
      icon: s.iconName,
      features: s.features,
      ctaText: s.ctaText,
      isActive: true,
      order: idx + 1,
    }));
    await Service.insertMany(servicesToInsert);

    // 2. Sync Training Programs
    await TrainingProgram.deleteMany({});
    const trainingToInsert = VISHA_TRAINING_PROGRAMS.map((t) => ({
      title: t.title,
      slug: t.slug,
      description: t.description,
      duration: t.duration,
      eligibility: "Students & Graduates",
      mode: t.mode,
      curriculum: t.syllabus?.join(", ") || "",
      projectDetails: `${t.title} Capstone Project`,
      fee: "INR 35,000",
      status: "upcoming",
      isActive: true,
    }));
    await TrainingProgram.insertMany(trainingToInsert);

    // 3. Sync Projects
    await Project.deleteMany({});
    const projectsToInsert = VISHA_PROJECTS.map((p) => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      description: p.description,
      technologies: p.technologies,
      image: p.image,
      outcome: p.metrics?.join(" • ") || "Production deployed enterprise software",
      projectUrl: "https://vishait.com",
      featured: true,
      isActive: true,
    }));
    await Project.insertMany(projectsToInsert);

    // 4. Ensure Active Jobs
    await Job.deleteMany({});
    const seededJobs = await Job.insertMany([
        {
          title: "Senior Full Stack Developer",
          slug: "senior-full-stack-developer",
          department: "Engineering",
          location: "Hyderabad (Hybrid)",
          type: "Full-Time",
          experienceRequired: "3–6 Years",
          description: "We are seeking a seasoned Full Stack Developer with deep proficiency in React, Next.js, Node.js, and MongoDB to architect scalable web solutions for enterprise clients.",
          requirements: [
            "3+ years experience with Next.js, React 19, and TypeScript",
            "Strong backend architecture with Node.js, Express, and MongoDB",
            "Experience deploying on AWS or Vercel with CI/CD pipelines",
            "Excellent problem-solving and mentoring skills",
          ],
          skills: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "AWS"],
          status: "open",
          isActive: true,
        },
        {
          title: "Cloud & DevOps Engineer",
          slug: "cloud-devops-engineer",
          department: "Cloud Infrastructure",
          location: "Hyderabad / Remote",
          type: "Full-Time",
          experienceRequired: "2–5 Years",
          description: "Join our cloud practice to design, build, and maintain mission-critical cloud infrastructure on AWS and Azure with Kubernetes orchestration and Terraform.",
          requirements: [
            "Hands-on expertise with AWS, Docker, and Kubernetes",
            "Experience building automated CI/CD pipelines with GitHub Actions",
            "Knowledge of Terraform infrastructure-as-code",
            "Linux systems administration and monitoring tools",
          ],
          skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
          status: "open",
          isActive: true,
        },
        {
          title: "Frontend Developer (React / Next.js)",
          slug: "frontend-developer",
          department: "Frontend Engineering",
          location: "Hyderabad (On-Site)",
          type: "Full-Time",
          experienceRequired: "1–3 Years",
          description: "Looking for an ambitious Frontend Developer with sharp attention to detail, modern CSS animations, and strong React/Next.js skills to craft interactive user interfaces.",
          requirements: [
            "Strong proficiency in JavaScript (ES6+), TypeScript, and HTML/CSS",
            "Experience with React, Next.js, and Tailwind CSS",
            "Understanding of web performance, SEO, and responsive design",
          ],
          skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "UI/UX"],
          status: "open",
          isActive: true,
        },
        {
          title: "Digital Marketing Specialist",
          slug: "digital-marketing-specialist",
          department: "Marketing",
          location: "Hyderabad / Remote",
          type: "Full-Time",
          experienceRequired: "2–4 Years",
          description: "Drive multi-channel organic and paid growth across SEO, Google Ads, and Meta campaigns for enterprise clients and in-house digital products.",
          requirements: [
            "Proven track record of scaling organic search rankings (SEO)",
            "Hands-on experience running high-ROI Google Search and Meta ad funnels",
            "Data-driven mindset with Google Analytics 4 proficiency",
          ],
          skills: ["SEO", "Google Ads", "Meta Ads", "Content Strategy", "Analytics"],
          status: "open",
          isActive: true,
        }
      ]);

    return NextResponse.json({
      success: true,
      message: "Successfully synchronized all real Visha IT website data into MongoDB Atlas!",
      counts: {
        services: servicesToInsert.length,
        training: trainingToInsert.length,
        projects: projectsToInsert.length,
        jobs: await Job.countDocuments(),
      }
    });
  } catch (err: any) {
    console.error("Error syncing Visha website data:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
