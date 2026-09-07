import { NextResponse } from "next/server";
import { readPersistedFile, initialCmsTraining } from "@/lib/cmsStorage";
import connectToDatabase from "@/lib/mongoose";
import TrainingProgram from "@/lib/models/TrainingProgram";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let training = readPersistedFile<any>("training.json", initialCmsTraining);

    try {
      await connectToDatabase();
      const dbPrograms = await TrainingProgram.find({ isActive: true }).sort({ order: 1 }).lean();
      if (dbPrograms && dbPrograms.length > 0) {
        const map = new Map();
        training.forEach((t: any) => map.set(t.slug || t._id, t));
        dbPrograms.forEach((p: any) => map.set(p.slug || p._id.toString(), {
          ...p,
          _id: p._id.toString(),
        }));
        training = Array.from(map.values());
      }
    } catch (dbErr) {
      // Gracefully serve from persistent local file
    }

    return NextResponse.json({ success: true, data: training, timestamp: Date.now() }, {
      headers: { "Cache-Control": "no-store, max-age=0" }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
