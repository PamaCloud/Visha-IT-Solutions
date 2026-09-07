import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { readPersistedFile, writePersistedFile, initialCmsProjects } from "@/lib/cmsStorage";

const STORAGE_FILE = "projects.json";

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

    const current = readPersistedFile<any>(STORAGE_FILE, initialCmsProjects);
    let updatedProject: any = null;

    const updated = current.map((p: any) => {
      if (p._id === id || p.slug === id) {
        updatedProject = { ...p, ...body, updatedAt: new Date().toISOString() };
        return updatedProject;
      }
      return p;
    });

    if (updatedProject) {
      writePersistedFile(STORAGE_FILE, updated);
    }

    try {
      await connectToDatabase();
      const dbUpdated = await Project.findByIdAndUpdate(id, body, { new: true }).lean();
      if (dbUpdated) {
        updatedProject = { ...dbUpdated, _id: dbUpdated._id.toString() };
      }
    } catch (dbErr) {
      console.warn("MongoDB update error, persistent file saved:", dbErr);
    }

    return NextResponse.json({ success: true, data: updatedProject || body });
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

    const current = readPersistedFile<any>(STORAGE_FILE, initialCmsProjects);
    const remaining = current.filter((p: any) => p._id !== id && p.slug !== id);
    writePersistedFile(STORAGE_FILE, remaining);

    try {
      await connectToDatabase();
      await Project.findByIdAndDelete(id);
    } catch (dbErr) {
      console.warn("MongoDB delete error, persistent file updated:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
