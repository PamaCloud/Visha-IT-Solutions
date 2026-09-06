import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const services = await Service.find().sort({ order: 1, createdAt: -1 }).lean();
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
    if (!body.title) {
      return NextResponse.json({ error: "Service title is required" }, { status: 400 });
    }

    await connectToDatabase();

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newService = await Service.create({
      title: body.title,
      slug,
      badge: body.badge || "",
      shortDescription: body.shortDescription || "",
      description: body.description || body.shortDescription || "",
      iconName: body.iconName || body.icon || "Users",
      subServices: Array.isArray(body.subServices)
        ? body.subServices
        : (body.subServices || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      features: Array.isArray(body.features)
        ? body.features
        : (body.features || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      ctaText: body.ctaText || "Learn More →",
      ctaLink: body.ctaLink || "/contact",
      image: body.image || "/services/website-development.jpg",
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
