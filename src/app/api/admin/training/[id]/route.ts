import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import TrainingProgram from "@/lib/models/TrainingProgram";
import { readPersistedFile, writePersistedFile, initialCmsTraining } from "@/lib/cmsStorage";

const STORAGE_FILE = "training.json";

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

    const current = readPersistedFile<any>(STORAGE_FILE, initialCmsTraining);
    let updatedProgram: any = null;

    const updated = current.map((t: any) => {
      if (t._id === id || t.slug === id) {
        updatedProgram = { ...t, ...body, updatedAt: new Date().toISOString() };
        return updatedProgram;
      }
      return t;
    });

    if (updatedProgram) {
      writePersistedFile(STORAGE_FILE, updated);
    }

    try {
      await connectToDatabase();
      const dbUpdated = await TrainingProgram.findByIdAndUpdate(id, body, { new: true }).lean();
      if (dbUpdated) {
        updatedProgram = { ...dbUpdated, _id: dbUpdated._id.toString() };
      }
    } catch (dbErr) {
      console.warn("MongoDB update error, persistent file saved:", dbErr);
    }

    return NextResponse.json({ success: true, data: updatedProgram || body });
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

    const current = readPersistedFile<any>(STORAGE_FILE, initialCmsTraining);
    const remaining = current.filter((t: any) => t._id !== id && t.slug !== id);
    writePersistedFile(STORAGE_FILE, remaining);

    try {
      await connectToDatabase();
      await TrainingProgram.findByIdAndDelete(id);
    } catch (dbErr) {
      console.warn("MongoDB delete error, persistent file updated:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Training program deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
