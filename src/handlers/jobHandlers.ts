"use server";

import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/lib/models/JobApplication";
import { emailService } from "@/services/emailService";
import { careerFormSchema, validateCareerField } from "@/validators/careerValidator";

export async function submitJobApplication(formData: FormData) {
  try {
    const rawData = {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
      currentCompany: (formData.get("currentCompany") as string) || "",
      linkedin: (formData.get("linkedin") as string) || "",
      portfolio: (formData.get("portfolio") as string) || "",
      position: (formData.get("position") as string) || "",
      experienceLevel: (formData.get("experienceLevel") as string) || "",
      coverLetter: (formData.get("coverLetter") as string) || "",
    };

    const validatedFields = careerFormSchema.safeParse(rawData);

    // Validate file
    const resumeFile = formData.get("resume") as File | null;
    const resumeError = validateCareerField("resume", undefined, resumeFile);

    if (!validatedFields.success || resumeError) {
      const fieldErrors = validatedFields.success
        ? {}
        : (validatedFields.error.flatten().fieldErrors as Record<string, string[]>);

      if (resumeError) {
        fieldErrors.resume = [resumeError];
      }

      return {
        success: false,
        errors: fieldErrors,
        message: "Please fix the highlighted errors before submitting.",
      };
    }

    const data = validatedFields.data;
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;
    const resumeName = resumeFile?.name || "resume.pdf";
    const sanitizedName = resumeName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const resumeUrl = `/uploads/resumes/${Date.now()}-${sanitizedName}`;

    // Write file to public/uploads/resumes so admin can view/download real PDF/DOC
    if (resumeFile && typeof resumeFile.arrayBuffer === "function") {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        const filePath = path.join(process.cwd(), "public", resumeUrl);
        fs.writeFileSync(filePath, buffer);
      } catch (fileErr) {
        console.error("Failed to write resume file:", fileErr);
      }
    }

    await connectToDatabase();
    const application = await JobApplication.create({
      jobId: (formData.get("jobId") as string) || data.position,
      position: data.position,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      fullName,
      email: data.email.trim(),
      phone: `+91 ${data.phone}`,
      currentCompany: data.currentCompany?.trim() || undefined,
      linkedin: data.linkedin?.trim() || undefined,
      portfolio: data.portfolio?.trim() || undefined,
      experienceLevel: data.experienceLevel,
      coverLetter: data.coverLetter?.trim() || undefined,
      resumeUrl,
      resumeName,
      status: "New",
    });

    emailService
      .sendAdminNotification(`New Job Application: ${data.position} - ${fullName}`, application)
      .catch(console.error);

    return {
      success: true,
      message: "Application submitted successfully.",
      applicationId: application._id.toString(),
    };
  } catch (error: any) {
    console.error("Application submission error:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again.",
    };
  }
}
