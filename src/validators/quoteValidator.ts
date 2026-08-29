import { z } from "zod";

export const quoteFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  serviceRequired: z.enum(["E-Commerce", "Digital Marketing", "Recruitment", "Training", "Other"], {
    message: "Please select a valid service.",
  }),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  budgetRange: z.string().optional(),
  preferredContactMethod: z.enum(["Email", "Phone", "WhatsApp"], {
    message: "Please select a contact method.",
  }),
  consent: z.literal(true, {
    message: "You must agree to the privacy policy.",
  }),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
