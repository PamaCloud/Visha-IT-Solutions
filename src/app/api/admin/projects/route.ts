import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/lib/models/Project";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: projects });
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
      return NextResponse.json({ error: "Project title is required" }, { status: 400 });
    }

    await connectToDatabase();

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newProject = await Project.create({
      title: body.title,
      slug,
      clientName: body.clientName || "Enterprise Client",
      category: body.category || "Web Application",
      badge: body.badge || "Featured Project",
      shortDescription: body.shortDescription || body.description || "",
      description: body.description || body.shortDescription || "",
      technologies: Array.isArray(body.technologies)
        ? body.technologies
        : (body.technologies || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      metrics: Array.isArray(body.metrics)
        ? body.metrics
        : (body.metrics || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      deliverables: Array.isArray(body.deliverables)
        ? body.deliverables
        : (body.deliverables || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      image: body.image || "/services/ecommerce-solutions.jpg",
      outcome: body.outcome || "Successful deployment",
      projectUrl: body.projectUrl || "",
      featured: Boolean(body.featured),
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
