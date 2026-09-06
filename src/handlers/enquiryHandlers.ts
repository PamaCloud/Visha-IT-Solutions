"use server";

import { quoteFormSchema } from "@/validators/quoteValidator";
import { contactFormSchema } from "@/validators/contactValidator";
import { enquiryRepository } from "@/repositories/enquiryRepository";
import { emailService } from "@/services/emailService";

export async function submitQuoteEnquiry(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());

    const validatedFields = quoteFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please fix the errors in the form.",
      };
    }

    const { fullName, profileType, inquiryType, mobileNumber, email } = validatedFields.data;

    try {
      // Save to database
      const enquiry = await enquiryRepository.createEnquiry({
        fullName,
        companyName: profileType,
        serviceRequired: inquiryType,
        phone: `+91 ${mobileNumber}`,
        email,
        description: `Profile Type: ${profileType} | Inquiry Type: ${inquiryType}`,
        type: "project",
      });

      // Send email asynchronously without blocking response
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
    const validatedFields = contactFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please fix the errors in the form.",
      };
    }

    const { fullName, email, subject, message } = validatedFields.data;

    try {
      const enquiry = await enquiryRepository.createEnquiry({
        fullName,
        email,
        description: `Subject: ${subject}\n\nMessage:\n${message}`,
        type: "contact",
      });

      emailService.sendAdminNotification(`New General Contact: ${subject}`, enquiry).catch(console.error);
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
