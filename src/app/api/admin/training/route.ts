import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import TrainingProgram from "@/lib/models/TrainingProgram";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const courses = await TrainingProgram.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: courses });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Course title is required" }, { status: 400 });
    }

    await connectToDatabase();

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newCourse = await TrainingProgram.create({
      title: body.title,
      slug,
      badge: body.badge || "Professional Track",
      shortDescription: body.shortDescription || body.description || "",
      description: body.description || body.shortDescription || "",
      duration: body.duration || "6 Months",
      mode: body.mode || "Hybrid (Online + Lab)",
      level: body.level || "Beginner to Enterprise",
      technologies: Array.isArray(body.technologies)
        ? body.technologies
        : (body.technologies || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      syllabus: Array.isArray(body.syllabus)
        ? body.syllabus
        : (body.syllabus || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      careerRoles: Array.isArray(body.careerRoles)
        ? body.careerRoles
        : (body.careerRoles || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      image: body.image || "/services/training-and-career-development.jpg",
      eligibility: body.eligibility || "Graduates & Working Professionals",
      curriculum: body.curriculum || "Comprehensive Modular Roadmap",
      projectDetails: body.projectDetails || "Hands-on Capstone Projects",
      fee: body.fee || "",
      status: body.status || "upcoming",
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
