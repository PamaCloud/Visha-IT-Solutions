import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import TrainingProgram from "@/lib/models/TrainingProgram";
import { readPersistedFile, writePersistedFile, initialCmsTraining } from "@/lib/cmsStorage";

const STORAGE_FILE = "training.json";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let training = readPersistedFile<any>(STORAGE_FILE, initialCmsTraining);

    try {
      await connectToDatabase();
      const dbTraining = await TrainingProgram.find().sort({ order: 1, createdAt: -1 }).lean();
      if (dbTraining && dbTraining.length > 0) {
        const map = new Map();
        training.forEach((t: any) => map.set(t.slug || t._id, t));
        dbTraining.forEach((t: any) => map.set(t.slug || t._id.toString(), {
          ...t,
          _id: t._id.toString(),
        }));
        training = Array.from(map.values());
        writePersistedFile(STORAGE_FILE, training);
      }
    } catch (dbErr) {
      console.warn("MongoDB unavailable during training GET, serving from persistent storage:", dbErr);
    }

    return NextResponse.json({ success: true, data: training });
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
      return NextResponse.json({ error: "Training program title is required" }, { status: 400 });
    }

    const title = body.title.trim();
    const baseSlug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newProgram = {
      _id: `cms_training_${Date.now()}`,
      title,
      slug: baseSlug || uniqueSlug,
      badge: body.badge || "Career Ready",
      shortDescription: body.shortDescription || body.description || `Comprehensive ${title} training program with placement assistance.`,
      description: body.description || body.shortDescription || `Industry-focused hands-on training curriculum by senior tech leads.`,
      duration: body.duration || "12 Weeks",
      eligibility: body.eligibility || "Graduates & Working Professionals",
      mode: body.mode || "Hybrid (Online + In-Person)",
      level: body.level || "Beginner to Advanced",
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      syllabus: Array.isArray(body.syllabus) ? body.syllabus : [],
      modules: Array.isArray(body.modules) ? body.modules : [],
      careerRoles: Array.isArray(body.careerRoles) ? body.careerRoles : [],
      image: body.image || "/services/training-and-career-development.jpg",
      curriculum: body.curriculum || "Complete enterprise curriculum",
      projectDetails: body.projectDetails || `${title} Real-time Production Project`,
      fee: body.fee || "INR 35,000",
      status: body.status || "upcoming",
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: Number(body.order) || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const current = readPersistedFile<any>(STORAGE_FILE, initialCmsTraining);
    const updated = [newProgram, ...current.filter((t: any) => t.slug !== newProgram.slug)];
    writePersistedFile(STORAGE_FILE, updated);

    try {
      await connectToDatabase();
      const created = await TrainingProgram.findOneAndUpdate(
        { slug: newProgram.slug },
        newProgram,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      if (created?._id) {
        newProgram._id = created._id.toString();
      }
    } catch (dbErr) {
      console.warn("MongoDB write error, persisted locally:", dbErr);
    }

    return NextResponse.json({ success: true, data: newProgram }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
