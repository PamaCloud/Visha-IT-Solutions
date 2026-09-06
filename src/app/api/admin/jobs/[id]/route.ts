import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Job from "@/lib/models/Job";

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

    if (body.requirements && typeof body.requirements === "string") {
      updateData.requirements = body.requirements
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    if (body.skills && typeof body.skills === "string") {
      updateData.skills = body.skills
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    const updated = await Job.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!updated) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
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

    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
