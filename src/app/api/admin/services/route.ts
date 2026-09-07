import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import { readPersistedFile, writePersistedFile, initialCmsServices } from "@/lib/cmsStorage";

const STORAGE_FILE = "services.json";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Read persistent local file first (instant & reliable)
    let services = readPersistedFile<any>(STORAGE_FILE, initialCmsServices);

    // 2. Attempt to sync with MongoDB if available
    try {
      await connectToDatabase();
      const dbServices = await Service.find().sort({ order: 1, createdAt: -1 }).lean();
      
      // Filter out unrelated tyre services if present
      const validDbServices = dbServices.filter(
        (s: any) => !['wheel-alignment', 'wheel-balancing', 'new-tyre-services', 'battery-replacement-jump-start'].includes(s.slug)
      );

      if (validDbServices && validDbServices.length > 0) {
        // Merge DB services with local persistent storage
        const map = new Map();
        services.forEach((s: any) => map.set(s.slug || s._id, s));
        validDbServices.forEach((s: any) => map.set(s.slug || s._id.toString(), {
          ...s,
          _id: s._id.toString(),
        }));
        services = Array.from(map.values());
        writePersistedFile(STORAGE_FILE, services);
      }
    } catch (dbErr) {
      console.warn("MongoDB unavailable during services GET, serving from persistent storage:", dbErr);
    }

    return NextResponse.json({ success: true, data: services });
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
      return NextResponse.json({ error: "Service title is required" }, { status: 400 });
    }

    const title = body.title.trim();
    const baseSlug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const subServices = Array.isArray(body.subServices)
      ? body.subServices.filter(Boolean)
      : (body.subServices || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const features = Array.isArray(body.features)
      ? body.features.filter(Boolean)
      : (body.features || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const newService = {
      _id: `cms_service_${Date.now()}`,
      title,
      slug: baseSlug || uniqueSlug,
      badge: body.badge || "Enterprise Grade",
      shortDescription: body.shortDescription || body.description || `Comprehensive ${title} services designed for scaling enterprises.`,
      description: body.description || body.shortDescription || `Enterprise-grade ${title} solutions by Visha IT Solutions.`,
      iconName: body.iconName || body.icon || "Users",
      subServices: subServices.length > 0 ? subServices : ["Enterprise Architecture", "Dedicated Engineering Support"],
      features: features.length > 0 ? features : ["SLA Guaranteed", "Industry Standard Compliance"],
      ctaText: body.ctaText || "Explore Service →",
      ctaLink: body.ctaLink || `/contact?service=${baseSlug}`,
      image: body.image || "/services/website-development.jpg",
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: Number(body.order) || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Immediately persist to local disk storage so it stays FOREVER
    const currentServices = readPersistedFile<any>(STORAGE_FILE, initialCmsServices);
    const updatedServices = [newService, ...currentServices.filter((s: any) => s.slug !== newService.slug)];
    writePersistedFile(STORAGE_FILE, updatedServices);

    // 2. Also save to MongoDB if connected
    try {
      await connectToDatabase();
      const created = await Service.findOneAndUpdate(
        { slug: newService.slug },
        newService,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      if (created?._id) {
        newService._id = created._id.toString();
      }
    } catch (dbErr) {
      console.warn("MongoDB write failed, but saved successfully to persistent disk:", dbErr);
    }

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
