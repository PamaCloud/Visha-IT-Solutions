import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/lib/models/Project";

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

    await connectToDatabase();

    const updateData: any = { ...body };
    if (body.technologies && typeof body.technologies === "string") {
      updateData.technologies = body.technologies.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    if (body.metrics && typeof body.metrics === "string") {
      updateData.metrics = body.metrics.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    if (body.deliverables && typeof body.deliverables === "string") {
      updateData.deliverables = body.deliverables.split(",").map((s: string) => s.trim()).filter(Boolean);
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
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
    await connectToDatabase();

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
