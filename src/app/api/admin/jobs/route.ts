import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Job from "@/lib/models/Job";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const jobs = await Job.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: jobs });
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
    if (!body.title || !body.department) {
      return NextResponse.json(
        { error: "Job title and department are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now().toString().slice(-4);

    const requirements = Array.isArray(body.requirements)
      ? body.requirements
      : (body.requirements || "")
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean);

    const skills = Array.isArray(body.skills)
      ? body.skills
      : (body.skills || "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);

    const newJob = await Job.create({
      title: body.title,
      slug,
      department: body.department,
      location: body.location || "Hyderabad (Hybrid)",
      type: body.type || "Full-Time",
      experienceRequired: body.experienceRequired || "1–3 Years",
      description: body.description || "",
      requirements,
      skills,
      status: body.status || "open",
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
