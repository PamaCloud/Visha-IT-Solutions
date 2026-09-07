import { NextResponse } from "next/server";
import { readPersistedFile, initialCmsProjects } from "@/lib/cmsStorage";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/lib/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let projects = readPersistedFile<any>("projects.json", initialCmsProjects);

    try {
      await connectToDatabase();
      const dbProjects = await Project.find({ isActive: true }).sort({ order: 1 }).lean();
      if (dbProjects && dbProjects.length > 0) {
        const map = new Map();
        projects.forEach((p: any) => map.set(p.slug || p._id, p));
        dbProjects.forEach((p: any) => map.set(p.slug || p._id.toString(), {
          ...p,
          _id: p._id.toString(),
        }));
        projects = Array.from(map.values());
      }
    } catch (dbErr) {
      // Gracefully serve from persistent local file
    }

    return NextResponse.json({ success: true, data: projects, timestamp: Date.now() }, {
      headers: { "Cache-Control": "no-store, max-age=0" }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
