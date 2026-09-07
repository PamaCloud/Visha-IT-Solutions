import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { readPersistedFile, writePersistedFile, initialCmsProjects } from "@/lib/cmsStorage";

const STORAGE_FILE = "projects.json";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let projects = readPersistedFile<any>(STORAGE_FILE, initialCmsProjects);

    try {
      await connectToDatabase();
      const dbProjects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
      if (dbProjects && dbProjects.length > 0) {
        const map = new Map();
        projects.forEach((p: any) => map.set(p.slug || p._id, p));
        dbProjects.forEach((p: any) => map.set(p.slug || p._id.toString(), {
          ...p,
          _id: p._id.toString(),
        }));
        projects = Array.from(map.values());
        writePersistedFile(STORAGE_FILE, projects);
      }
    } catch (dbErr) {
      console.warn("MongoDB unavailable during projects GET, serving from persistent storage:", dbErr);
    }

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
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: "Project title is required" }, { status: 400 });
    }

    const title = body.title.trim();
    const baseSlug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const technologies = Array.isArray(body.technologies)
      ? body.technologies.filter(Boolean)
      : (body.technologies || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const metrics = Array.isArray(body.metrics)
      ? body.metrics.filter(Boolean)
      : (body.metrics || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const deliverables = Array.isArray(body.deliverables)
      ? body.deliverables.filter(Boolean)
      : (body.deliverables || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const newProject = {
      _id: `cms_project_${Date.now()}`,
      title,
      slug: baseSlug || uniqueSlug,
      clientName: body.clientName || "Enterprise Client",
      category: body.category || "Web Application",
      badge: body.badge || "Featured Project",
      shortDescription: body.shortDescription || body.description || `Enterprise digital solution built by Visha IT Solutions.`,
      description: body.description || body.shortDescription || `Full-stack digital transformation project delivered for client scaling.`,
      technologies: technologies.length > 0 ? technologies : ["React", "Next.js", "Node.js", "Cloud"],
      metrics: metrics.length > 0 ? metrics : ["99.9% Uptime", "40% Performance Boost"],
      deliverables: deliverables.length > 0 ? deliverables : ["System Architecture", "Production Deployment"],
      image: body.image || "/services/ecommerce-solutions.jpg",
      outcome: body.outcome || "Production deployed enterprise software",
      projectUrl: body.projectUrl || "https://vishait.com",
      featured: Boolean(body.featured),
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: Number(body.order) || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Save to persistent disk storage
    const current = readPersistedFile<any>(STORAGE_FILE, initialCmsProjects);
    const updated = [newProject, ...current.filter((p: any) => p.slug !== newProject.slug)];
    writePersistedFile(STORAGE_FILE, updated);

    // 2. Save to MongoDB
    try {
      await connectToDatabase();
      const created = await Project.findOneAndUpdate(
        { slug: newProject.slug },
        newProject,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      if (created?._id) {
        newProject._id = created._id.toString();
      }
    } catch (dbErr) {
      console.warn("MongoDB write failed, saved to persistent file:", dbErr);
    }

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
