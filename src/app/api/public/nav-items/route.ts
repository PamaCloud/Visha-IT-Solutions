import { NextResponse } from "next/server";
import {
  readPersistedFile,
  initialCmsServices,
  initialCmsProjects,
  initialCmsTraining,
} from "@/lib/cmsStorage";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import Project from "@/lib/models/Project";
import TrainingProgram from "@/lib/models/TrainingProgram";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Read directly from persistent disk storage (always instant and up-to-date with admin edits)
    let services = readPersistedFile<any>("services.json", initialCmsServices);
    let projects = readPersistedFile<any>("projects.json", initialCmsProjects);
    let training = readPersistedFile<any>("training.json", initialCmsTraining);

    // 2. Attempt to sync with MongoDB if connected
    try {
      await connectToDatabase();

      const [dbServices, dbProjects, dbTraining] = await Promise.all([
        Service.find({ isActive: true }).sort({ order: 1 }).lean(),
        Project.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean(),
        TrainingProgram.find({ isActive: true }).sort({ order: 1 }).lean(),
      ]);

      if (dbServices && dbServices.length > 0) {
        const validDb = dbServices.filter(
          (s: any) => !['wheel-alignment', 'wheel-balancing', 'new-tyre-services', 'battery-replacement-jump-start'].includes(s.slug)
        );
        if (validDb.length > 0) {
          const map = new Map();
          services.forEach((s: any) => map.set(s.slug || s._id, s));
          validDb.forEach((s: any) => map.set(s.slug || s._id.toString(), {
            ...s,
            id: s._id.toString(),
            ctaLink: s.ctaLink || `/services/${s.slug}`,
          }));
          services = Array.from(map.values());
        }
      }

      if (dbProjects && dbProjects.length > 0) {
        const map = new Map();
        projects.forEach((p: any) => map.set(p.slug || p._id, p));
        dbProjects.forEach((p: any) => map.set(p.slug || p._id.toString(), {
          ...p,
          id: p._id.toString(),
        }));
        projects = Array.from(map.values());
      }

      if (dbTraining && dbTraining.length > 0) {
        const map = new Map();
        training.forEach((t: any) => map.set(t.slug || t._id, t));
        dbTraining.forEach((t: any) => map.set(t.slug || t._id.toString(), {
          ...t,
          id: t._id.toString(),
        }));
        training = Array.from(map.values());
      }
    } catch (dbErr) {
      console.warn("MongoDB unavailable in nav-items, serving from persistent storage:", dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          services,
          projects,
          training,
        },
        timestamp: Date.now(),
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
