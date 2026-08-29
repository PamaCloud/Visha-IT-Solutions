"use server";

import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/lib/models/JobApplication";
import { emailService } from "@/services/emailService";

export async function submitJobApplication(formData: FormData) {
  try {
    await connectToDatabase();
    
    const jobId = formData.get("jobId") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resumeFile = formData.get("resume") as File;

    if (!jobId || !fullName || !email || !phone || !resumeFile) {
      return { success: false, message: "Missing required fields." };
    }

    // Mock file upload - in a real app, upload to S3/Vercel Blob and get URL
    const resumeUrl = `/uploads/mock-resume-${Date.now()}-${resumeFile.name}`;

    const application = await JobApplication.create({
      jobId,
      fullName,
      email,
      phone,
      resumeUrl,
      coverLetter,
    });

    emailService.sendAdminNotification("New Job Application", application).catch(console.error);

    return { success: true, message: "Application submitted successfully." };
  } catch (error) {
    console.error("Application submission error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
