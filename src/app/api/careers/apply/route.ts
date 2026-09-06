import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/lib/models/JobApplication";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const contentType = req.headers.get("content-type") || "";

    let applicationData: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const firstName = (formData.get("firstName") as string) || "";
      const lastName = (formData.get("lastName") as string) || "";
      const fullName = (formData.get("fullName") as string) || `${firstName} ${lastName}`.trim();
      const email = (formData.get("email") as string) || "";
      const phone = (formData.get("phone") as string) || "";
      const currentCompany = (formData.get("currentCompany") as string) || "";
      const linkedin = (formData.get("linkedin") as string) || "";
      const portfolio = (formData.get("portfolio") as string) || "";
      const position = (formData.get("position") as string) || "Applicant";
      const experienceLevel = (formData.get("experienceLevel") as string) || "Fresher (0–1y)";
      const coverLetter = (formData.get("coverLetter") as string) || "";

      let resumeUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      let resumeName = "resume.pdf";

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
          console.error("Error saving resume locally, fallback to dummy url:", fileErr);
        }
      }

      applicationData = {
        firstName,
        lastName,
        fullName,
        email,
        phone,
        currentCompany,
        linkedin,
        portfolio,
        position,
        experienceLevel,
        coverLetter,
        resumeUrl,
        resumeName,
        status: "New",
      };
    } else {
      applicationData = await req.json();
    }

    if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const application = await JobApplication.create({
      ...applicationData,
      status: applicationData.status || "New",
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "Failed to submit application", details: error.message },
      { status: 500 }
    );
  }
}
