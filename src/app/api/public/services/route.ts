import { NextResponse } from "next/server";
import { readPersistedFile, initialCmsServices } from "@/lib/cmsStorage";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let services = readPersistedFile<any>("services.json", initialCmsServices);

    try {
      await connectToDatabase();
      const dbServices = await Service.find({ isActive: true }).sort({ order: 1 }).lean();
      const validDb = dbServices.filter(
        (s: any) => !['wheel-alignment', 'wheel-balancing', 'new-tyre-services', 'battery-replacement-jump-start'].includes(s.slug)
      );
      if (validDb && validDb.length > 0) {
        const map = new Map();
        services.forEach((s: any) => map.set(s.slug || s._id, s));
        validDb.forEach((s: any) => map.set(s.slug || s._id.toString(), {
          ...s,
          _id: s._id.toString(),
        }));
        services = Array.from(map.values());
      }
    } catch (dbErr) {
      // Gracefully serve from persistent local file
    }

    return NextResponse.json({ success: true, data: services, timestamp: Date.now() }, {
      headers: { "Cache-Control": "no-store, max-age=0" }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
