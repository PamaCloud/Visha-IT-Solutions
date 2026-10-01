import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import LeadRegistration from "@/lib/models/LeadRegistration";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await connectToDatabase();

    const registration = await LeadRegistration.findById(id).lean();
    if (!registration) {
      return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: registration });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch registration" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    await connectToDatabase();

    const updateFields: any = {};
    if (body.status !== undefined) updateFields.status = body.status;
    if (body.notes !== undefined) updateFields.notes = body.notes;

    const updated = await LeadRegistration.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Registration updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update registration" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await connectToDatabase();

    const deleted = await LeadRegistration.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete registration" },
      { status: 500 }
    );
  }
}
