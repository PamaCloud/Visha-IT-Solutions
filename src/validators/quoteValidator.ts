import { z } from "zod";
import { validateEmailStrict } from "@/lib/emailValidator";

export const PROFILE_TYPE_OPTIONS = [
  "Startup",
  "Small Business",
  "Medium Business",
  "Enterprise",
  "Individual",
  "Government Organization",
  "Educational Institution",
  "Other",
] as const;

export const INQUIRY_TYPE_OPTIONS = [
  "New Project",
  "Web Application",
  "Mobile Application",
  "AI / ML Solution",
  "Custom Software",
  "Consulting",
  "Existing Project Support",
  "Other",
] as const;

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name is required.")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Name must start with a letter.",
    })
    .refine((val) => val.length >= 2, {
      message: "Name must be at least 2 characters.",
    })
    .refine((val) => val.length <= 50, {
      message: "Name must not exceed 50 characters.",
    })
    .refine((val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val), {
      message: "Name can contain only letters and single spaces.",
    }),

  profileType: z
    .string()
    .min(1, "Please select an organisation type.")
    .refine((val) => (PROFILE_TYPE_OPTIONS as readonly string[]).includes(val), {
      message: "Please select an organisation type.",
    }),

  inquiryType: z
    .string()
    .min(1, "Please select an inquiry type.")
    .refine((val) => (INQUIRY_TYPE_OPTIONS as readonly string[]).includes(val), {
      message: "Please select an inquiry type.",
    }),

  mobileNumber: z
    .string()
    .min(1, "Mobile number is required.")
    .refine((val) => /^\d+$/.test(val), {
      message: "Mobile number can contain digits only.",
    })
    .refine((val) => /^[6-9]/.test(val), {
      message: "Mobile number must start with 6, 7, 8, or 9.",
    })
    .refine((val) => val.length === 10, {
      message: "Mobile number must contain exactly 10 digits.",
    })
    .refine((val) => /^[6-9][0-9]{9}$/.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number.",
    }),

  email: z
    .string()
    .min(1, "Email address is required.")
    .superRefine((val, ctx) => {
      const res = validateEmailStrict(val);
      if (!res.isValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: res.error || "Please enter a valid email address.",
        });
      }
    }),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export function validateQuoteField(
  field: keyof QuoteFormValues,
  value: string
): string | null {
  switch (field) {
    case "fullName": {
      if (!value || value.trim() === "") return "Name is required.";
      if (!/^[A-Za-z]/.test(value)) return "Name must start with a letter.";
      if (value.length < 2) return "Name must be at least 2 characters.";
      if (value.length > 50) return "Name must not exceed 50 characters.";
      if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
        return "Name can contain only letters and single spaces.";
      }
      return null;
    }
    case "profileType": {
      if (!value || value === "") return "Please select an organisation type.";
      if (!(PROFILE_TYPE_OPTIONS as readonly string[]).includes(value)) {
        return "Please select an organisation type.";
      }
      return null;
    }
    case "inquiryType": {
      if (!value || value === "") return "Please select an inquiry type.";
      if (!(INQUIRY_TYPE_OPTIONS as readonly string[]).includes(value)) {
        return "Please select an inquiry type.";
      }
      return null;
    }
    case "mobileNumber": {
      if (!value || value.trim() === "") return "Mobile number is required.";
      if (/\D/.test(value)) return "Mobile number can contain digits only.";
      if (/^[0-5]/.test(value)) return "Mobile number must start with 6, 7, 8, or 9.";
      if (value.length !== 10) return "Mobile number must contain exactly 10 digits.";
      if (!/^[6-9][0-9]{9}$/.test(value)) {
        return "Please enter a valid 10-digit Indian mobile number.";
      }
      return null;
    }
    case "email": {
      const res = validateEmailStrict(value);
      return res.isValid ? null : (res.error || "Please enter a valid email address.");
    }
    default:
      return null;
  }
}
