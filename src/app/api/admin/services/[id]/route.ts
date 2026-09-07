import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";
import { readPersistedFile, writePersistedFile, initialCmsServices } from "@/lib/cmsStorage";

const STORAGE_FILE = "services.json";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const subServices = Array.isArray(body.subServices)
      ? body.subServices.filter(Boolean)
      : (body.subServices || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const features = Array.isArray(body.features)
      ? body.features.filter(Boolean)
      : (body.features || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    // 1. Update persistent local storage
    const currentServices = readPersistedFile<any>(STORAGE_FILE, initialCmsServices);
    let updatedService: any = null;

    const updatedServices = currentServices.map((s: any) => {
      if (s._id === id || s.slug === id) {
        updatedService = {
          ...s,
          ...body,
          subServices: subServices.length > 0 ? subServices : s.subServices,
          features: features.length > 0 ? features : s.features,
          updatedAt: new Date().toISOString(),
        };
        return updatedService;
      }
      return s;
    });

    if (updatedService) {
      writePersistedFile(STORAGE_FILE, updatedServices);
    }

    // 2. Also update MongoDB
    try {
      await connectToDatabase();
      const mongoUpdate = await Service.findByIdAndUpdate(id, body, { new: true }).lean();
      if (mongoUpdate) {
        updatedService = { ...mongoUpdate, _id: mongoUpdate._id.toString() };
      }
    } catch (dbErr) {
      console.warn("MongoDB update error, persistent file saved:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: updatedService || body,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // 1. Remove from local persistent storage
    const currentServices = readPersistedFile<any>(STORAGE_FILE, initialCmsServices);
    const remainingServices = currentServices.filter(
      (s: any) => s._id !== id && s.slug !== id
    );
    writePersistedFile(STORAGE_FILE, remainingServices);

    // 2. Remove from MongoDB
    try {
      await connectToDatabase();
      await Service.findByIdAndDelete(id);
    } catch (dbErr) {
      console.warn("MongoDB delete error, persistent file updated:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
