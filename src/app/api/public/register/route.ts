import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import LeadRegistration from "@/lib/models/LeadRegistration";
import { validateEmailStrict } from "@/lib/emailValidator";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const contentType = req.headers.get("content-type") || "";
    let data: any = {};
    let resumeUrl = "";
    let resumeName = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      data.userType = (formData.get("userType") as string) || "client";
      data.fullName = (formData.get("fullName") as string) || "";
      data.email = (formData.get("email") as string) || "";
      data.phone = (formData.get("phone") as string) || "";
      data.companyName = (formData.get("companyName") as string) || "";
      data.industry = (formData.get("industry") as string) || "";
      data.experienceLevel = (formData.get("experienceLevel") as string) || "";
      data.requirement = (formData.get("requirement") as string) || "";

      const file = formData.get("resume") as File | null;
      if (file && typeof file === "object" && file.size > 0) {
        resumeName = file.name;
        try {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
          await mkdir(uploadDir, { recursive: true });
          const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          const filePath = path.join(uploadDir, safeFileName);
          await writeFile(filePath, buffer);
          resumeUrl = `/uploads/resumes/${safeFileName}`;
        } catch (fileErr) {
          console.error("Error saving resume locally:", fileErr);
        }
      }
    } else {
      data = await req.json();
    }

    const {
      userType = "client",
      fullName,
      email,
      phone,
      companyName,
      industry,
      experienceLevel,
      requirement,
    } = data;

    // Validate required fields
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 400 }
      );
    }

    const emailCheck = validateEmailStrict(email);
    if (!emailCheck.isValid) {
      return NextResponse.json(
        { success: false, message: emailCheck.error || "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim() || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid phone number (min 8 digits)." },
        { status: 400 }
      );
    }

    // Create entry in MongoDB
    const registration = await LeadRegistration.create({
      userType: userType === "candidate" ? "candidate" : "client",
      fullName: fullName.trim(),
      email: (emailCheck.normalizedEmail || email).toLowerCase().trim(),
      phone: phone.trim(),
      companyName: companyName ? companyName.trim() : "",
      industry: industry ? industry.trim() : "",
      experienceLevel: experienceLevel ? experienceLevel.trim() : "",
      requirement: requirement ? requirement.trim() : "",
      resumeUrl: resumeUrl || data.resumeUrl || "",
      resumeName: resumeName || data.resumeName || "",
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! Welcome to Visha IT Solutions.",
        data: {
          id: registration._id,
          fullName: registration.fullName,
          email: registration.email,
          userType: registration.userType,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in public lead registration:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
