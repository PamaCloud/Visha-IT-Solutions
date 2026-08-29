"use server";

import { quoteFormSchema } from "@/validators/quoteValidator";
import { enquiryRepository } from "@/repositories/enquiryRepository";
import { emailService } from "@/services/emailService";

export async function submitQuoteEnquiry(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // Checkbox parsing
    if (data.consent === "on" || data.consent === "true") {
      data.consent = true as any;
    }

    const validatedFields = quoteFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please fix the errors in the form.",
      };
    }

    try {
      // Save to database
      const enquiry = await enquiryRepository.createEnquiry({
        ...validatedFields.data,
        type: "project",
      });

      // Send email asynchronously without blocking the response
      emailService.sendAdminNotification("New Project Quote Request", enquiry).catch(console.error);
    } catch (dbError) {
      console.error("Failed to save to database or send email:", dbError);
    }

    return {
      success: true,
      message: "Thank you. Our team will contact you shortly.",
    };
  } catch (error) {
    console.error("Quote submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function submitContactEnquiry(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const { contactFormSchema } = await import("@/validators/contactValidator");
    const validatedFields = contactFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please fix the errors in the form.",
      };
    }

    try {
      const enquiry = await enquiryRepository.createEnquiry({
        ...validatedFields.data,
        type: "contact",
      });

      emailService.sendAdminNotification("New General Contact", enquiry).catch(console.error);
    } catch (dbError) {
      console.error("Failed to save to database or send email (ignoring to allow WhatsApp redirect):", dbError);
    }

    return {
      success: true,
      message: "Message sent successfully.",
    };
  } catch (error) {
    console.error("Contact submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
