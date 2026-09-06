import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import TrainingProgram from "@/lib/models/TrainingProgram";

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
    if (body.syllabus && typeof body.syllabus === "string") {
      updateData.syllabus = body.syllabus.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    if (body.careerRoles && typeof body.careerRoles === "string") {
      updateData.careerRoles = body.careerRoles.split(",").map((s: string) => s.trim()).filter(Boolean);
    }

    const updated = await TrainingProgram.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!updated) {
      return NextResponse.json({ error: "Training program not found" }, { status: 404 });
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

    const deleted = await TrainingProgram.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Training program not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
