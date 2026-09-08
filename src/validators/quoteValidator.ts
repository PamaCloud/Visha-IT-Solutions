import { z } from "zod";
import { validateEmailStrict } from "@/lib/emailValidator";

export const SERVICE_REQUIRED_OPTIONS = [
  "E-Commerce",
  "Digital Marketing",
  "Recruitment",
  "Training",
  "Other",
] as const;

export const BUDGET_RANGE_OPTIONS = [
  "Flexible / Discuss Later",
  "Under ₹50,000",
  "₹50,000 - ₹2,00,000",
  "₹2,00,000 - ₹5,00,000",
  "₹5,00,000+",
] as const;

export const PREFERRED_CONTACT_OPTIONS = [
  "WhatsApp",
  "Phone",
  "Email",
] as const;

// Backward-compatibility alias
export const INQUIRY_TYPE_OPTIONS = SERVICE_REQUIRED_OPTIONS;
export const PROFILE_TYPE_OPTIONS = [
  "Startup",
  "Small Business",
  "Medium Business",
  "Enterprise",
  "Individual",
  "Other",
] as const;

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required.")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Name must start with a letter.",
    })
    .refine((val) => val.length >= 2, {
      message: "Name must be at least 2 characters.",
    })
    .refine((val) => val.length <= 50, {
      message: "Name must not exceed 50 characters.",
    }),

  companyName: z
    .string()
    .max(100, "Company name must not exceed 100 characters.")
    .optional()
    .default(""),

  email: z
    .string()
    .min(1, "Business email is required.")
    .superRefine((val, ctx) => {
      const res = validateEmailStrict(val);
      if (!res.isValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: res.error || "Please enter a valid business email address.",
        });
      }
    }),

  mobileNumber: z
    .string()
    .min(1, "Phone number is required.")
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number can contain digits only.",
    })
    .refine((val) => val.length === 10, {
      message: "Phone number must contain exactly 10 digits.",
    })
    .refine((val) => /^[6-9][0-9]{9}$/.test(val), {
      message: "Please enter a valid 10-digit mobile number.",
    }),

  serviceRequired: z
    .string()
    .min(1, "Please select a required service.")
    .refine((val) => (SERVICE_REQUIRED_OPTIONS as readonly string[]).includes(val), {
      message: "Please select a valid service.",
    }),

  description: z
    .string()
    .min(1, "Project description is required.")
    .min(10, "Please provide at least 10 characters describing your requirement.")
    .max(2000, "Description cannot exceed 2000 characters."),

  budgetRange: z
    .string()
    .optional()
    .default("Flexible / Discuss Later"),

  preferredContactMethod: z
    .string()
    .refine((val) => (PREFERRED_CONTACT_OPTIONS as readonly string[]).includes(val), {
      message: "Please select a valid contact method.",
    })
    .default("WhatsApp"),

  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the privacy policy to submit.",
    }),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export function validateQuoteField(
  field: keyof QuoteFormValues,
  value: any
): string | null {
  switch (field) {
    case "fullName": {
      if (!value || typeof value !== "string" || value.trim() === "") return "Full name is required.";
      if (!/^[A-Za-z]/.test(value)) return "Name must start with a letter.";
      if (value.length < 2) return "Name must be at least 2 characters.";
      if (value.length > 50) return "Name must not exceed 50 characters.";
      return null;
    }
    case "email": {
      if (!value || typeof value !== "string") return "Business email is required.";
      const res = validateEmailStrict(value);
      return res.isValid ? null : (res.error || "Please enter a valid email address.");
    }
    case "mobileNumber": {
      if (!value || typeof value !== "string" || value.trim() === "") return "Phone number is required.";
      if (/\D/.test(value)) return "Phone number can contain digits only.";
      if (value.length !== 10) return "Phone number must contain exactly 10 digits.";
      if (!/^[6-9][0-9]{9}$/.test(value)) return "Please enter a valid 10-digit mobile number.";
      return null;
    }
    case "serviceRequired": {
      if (!value || value === "") return "Please select a required service.";
      if (!(SERVICE_REQUIRED_OPTIONS as readonly string[]).includes(value)) {
        return "Please select a valid service.";
      }
      return null;
    }
    case "description": {
      if (!value || typeof value !== "string" || value.trim() === "") return "Project description is required.";
      if (value.trim().length < 10) return "Please provide at least 10 characters.";
      return null;
    }
    case "consent": {
      if (value !== true) return "You must agree to the privacy policy.";
      return null;
    }
    default:
      return null;
  }
}

